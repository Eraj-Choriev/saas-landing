import { test, expect, Page, ConsoleMessage } from '@playwright/test';
import * as fs from 'fs';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const DIR = process.env.RESULTS_DIR || './e2e-results/latest';
const failures: Array<{type: string, detail: string, suggestedFix?: string}> = [];

const log = (msg: string) => {
  console.log(msg);
  fs.appendFileSync(`${DIR}/run.log`, msg + '\n');
};

// ============================================================
// 1. SMOKE — page loads, no console errors
// ============================================================
test('Smoke — page loads cleanly', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m: ConsoleMessage) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));

  const response = await page.goto(BASE);
  expect(response?.status()).toBeLessThan(400);
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await page.screenshot({ path: `${DIR}/01-home.png`, fullPage: true });

  if (errors.length > 0) {
    failures.push({
      type: 'console_error',
      detail: errors.join('\n'),
      suggestedFix: 'Check the failing line in the source. Common causes: undefined variable, missing import, wrong prop type.'
    });
  }
});

// ============================================================
// 2. EVERY BUTTON clicked
// ============================================================
test('Click every button on every route', async ({ page }) => {
  await page.goto(BASE);
  const routes = await collectInternalRoutes(page);
  routes.unshift('/');

  for (const route of routes) {
    await page.goto(new URL(route, BASE).toString());
    await page.waitForLoadState('domcontentloaded');

    const clickables = page.locator('button, [role="button"], a[href], [onClick], input[type="submit"], input[type="button"]');
    const count = await clickables.count();

    for (let i = 0; i < count; i++) {
      const el = clickables.nth(i);
      if (!await el.isVisible().catch(() => false)) continue;

      const label = (await el.textContent().catch(() => ''))?.trim().slice(0, 40)
                  || await el.getAttribute('aria-label')
                  || `unnamed-${i}`;
      const safeLabel = label.replace(/[^a-z0-9]/gi, '_').slice(0, 30);

      try {
        await el.scrollIntoViewIfNeeded({ timeout: 2000 });
        await el.click({ timeout: 3000, trial: false });
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${DIR}/click-${safeLabel}.png` });
        log(`✅ Clicked: ${label}`);
      } catch (e: any) {
        const html = await el.evaluate(n => (n as Element).outerHTML).catch(() => '');
        failures.push({
          type: 'click_failed',
          detail: `Element "${label}" on ${route}: ${e.message}\nHTML: ${html}`,
          suggestedFix: diagnoseClickFailure(e.message, html)
        });
      }

      if (!page.url().includes(route)) {
        await page.goto(new URL(route, BASE).toString());
        await page.waitForLoadState('domcontentloaded');
      }
    }
  }
});

// ============================================================
// 3. EVERY INPUT filled — including search
// ============================================================
test('Fill every input with realistic data', async ({ page }) => {
  await page.goto(BASE);
  const routes = await collectInternalRoutes(page);

  for (const route of [...routes, '/']) {
    await page.goto(new URL(route, BASE).toString());
    const inputs = page.locator('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), textarea');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      if (!await input.isVisible().catch(() => false)) continue;

      const type = await input.getAttribute('type') || 'text';
      const value = realisticValueFor(type);

      try {
        await input.fill(value);
        await page.waitForTimeout(200);
        log(`✅ Filled ${type} input with "${value}"`);
      } catch (e: any) {
        failures.push({
          type: 'input_failed',
          detail: `Input type=${type} on ${route}: ${e.message}`,
          suggestedFix: 'Check if input is disabled or has readonly attribute.'
        });
      }
    }

    const search = page.locator('input[type=search], input[placeholder*="search" i], [aria-label*="search" i]').first();
    if (await search.count() > 0) {
      await search.fill('test query');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${DIR}/search-${route.replace(/\//g, '_')}.png` });
      log(`✅ Search exercised on ${route}`);
    }
  }
});

// ============================================================
// 4. SCROLL all regions
// ============================================================
test('Scroll page and all scroll containers', async ({ page }) => {
  await page.goto(BASE);

  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(150);
  }
  await page.screenshot({ path: `${DIR}/scroll-bottom.png`, fullPage: false });

  await page.evaluate(() => window.scrollTo(0, 0));

  const scrollables = page.locator('[style*="overflow-y"], [style*="overflow"], .overflow-auto, .overflow-y-auto, .overflow-scroll, [class*="scroll"]');
  const count = await scrollables.count();

  for (let i = 0; i < Math.min(count, 20); i++) {
    const el = scrollables.nth(i);
    if (!await el.isVisible().catch(() => false)) continue;
    await el.evaluate(n => (n as HTMLElement).scrollTop = (n as HTMLElement).scrollHeight).catch(() => {});
    await page.waitForTimeout(200);
  }

  log(`✅ Scrolled main + ${count} inner regions`);
});

// ============================================================
// 5. HOVER + ANIMATIONS
// ============================================================
test('Trigger hover states and let animations finish', async ({ page }) => {
  await page.goto(BASE);

  const hoverable = page.locator('button, a, [class*="hover"], [class*="transition"]');
  const count = Math.min(await hoverable.count(), 20);

  for (let i = 0; i < count; i++) {
    const el = hoverable.nth(i);
    if (!await el.isVisible().catch(() => false)) continue;
    await el.hover({ timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(150);
  }

  const stuck = await page.evaluate(async () => {
    const anims = document.getAnimations();
    const settled = await Promise.race([
      Promise.all(anims.map(a => a.finished.catch(() => 'errored'))),
      new Promise(r => setTimeout(() => r('timeout'), 5000))
    ]);
    return settled === 'timeout' ? anims.length : 0;
  });

  if (stuck > 0) {
    failures.push({
      type: 'stuck_animation',
      detail: `${stuck} animations did not finish in 5s`,
      suggestedFix: 'Check for infinite animations or missing animation-fill-mode. Use prefers-reduced-motion media query.'
    });
  }

  await page.screenshot({ path: `${DIR}/animations-settled.png` });
});

// ============================================================
// 6. RESPONSIVE — breakpoints
// ============================================================
test('Responsive at every breakpoint', async ({ page }) => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile-sm' },
    { width: 414, height: 896, name: 'mobile-lg' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1024, height: 768, name: 'laptop' },
    { width: 1440, height: 900, name: 'desktop' },
    { width: 1920, height: 1080, name: 'wide' },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(BASE);
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    await page.screenshot({ path: `${DIR}/responsive-${vp.name}.png`, fullPage: true });

    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const culprits: string[] = [];
      if (docW > winW) {
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > winW + 1) culprits.push(`${el.tagName}.${(el as HTMLElement).className}`.slice(0, 80));
        });
      }
      return { overflow: docW > winW, by: docW - winW, culprits: culprits.slice(0, 5) };
    });

    if (overflow.overflow) {
      failures.push({
        type: 'horizontal_overflow',
        detail: `${vp.name} (${vp.width}px): overflows by ${overflow.by}px. Culprits: ${overflow.culprits.join(', ')}`,
        suggestedFix: `Add overflow-x: hidden to body, or fix max-width on the listed elements.`
      });
    }

    if (vp.width < 500) {
      const tinyText = await page.evaluate(() => {
        let count = 0;
        document.querySelectorAll('p, span, a, button, li').forEach(el => {
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (size > 0 && size < 12 && el.textContent?.trim()) count++;
        });
        return count;
      });
      if (tinyText > 5) {
        failures.push({
          type: 'tiny_text_mobile',
          detail: `${tinyText} text elements below 12px on ${vp.name}`,
          suggestedFix: 'Increase base font-size for mobile via media query, or use clamp().'
        });
      }
    }

    if (vp.width < 768) {
      const tinyButtons = await page.evaluate(() => {
        let count = 0;
        document.querySelectorAll('button, a').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.height < 36 && r.height > 0) count++;
        });
        return count;
      });
      if (tinyButtons > 3) {
        failures.push({
          type: 'tiny_tap_target',
          detail: `${tinyButtons} buttons/links under 36px tall on ${vp.name}`,
          suggestedFix: 'Set min-height: 44px on interactive elements for mobile.'
        });
      }
    }

    log(`✅ ${vp.name} (${vp.width}x${vp.height}) checked`);
  }
});

// ============================================================
// 7. ROUTES — all internal links resolve
// ============================================================
test('Every internal route returns 2xx', async ({ page }) => {
  await page.goto(BASE);
  const routes = await collectInternalRoutes(page);

  for (const route of routes) {
    const url = new URL(route, BASE).toString();
    const res = await page.goto(url);
    const status = res?.status() || 0;
    if (status >= 400) {
      failures.push({
        type: 'broken_route',
        detail: `${route} → ${status}`,
        suggestedFix: status === 404
          ? 'Register the route in your router.'
          : 'Check server logs for the actual error.'
      });
    } else {
      log(`✅ ${route} → ${status}`);
    }
  }
});

// ============================================================
// 8. IMAGES — no broken sources
// ============================================================
test('All images load', async ({ page }) => {
  await page.goto(BASE);
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  const broken = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => (img as HTMLImageElement).naturalWidth === 0 && (img as HTMLImageElement).src)
      .map(img => (img as HTMLImageElement).src);
  });

  if (broken.length > 0) {
    failures.push({
      type: 'broken_image',
      detail: `${broken.length} broken images: ${broken.slice(0, 3).join(', ')}`,
      suggestedFix: 'Check the image paths. For Next.js, images in /public are referenced as /image.png.'
    });
  }
});

// ============================================================
// 9. ACCESSIBILITY — basic checks
// ============================================================
test('Basic accessibility', async ({ page }) => {
  await page.goto(BASE);

  const issues = await page.evaluate(() => {
    const problems: string[] = [];

    const noAlt = document.querySelectorAll('img:not([alt])');
    if (noAlt.length > 0) problems.push(`${noAlt.length} images without alt`);

    const noLabel = Array.from(document.querySelectorAll('button')).filter(b =>
      !b.textContent?.trim() && !b.getAttribute('aria-label') && !b.getAttribute('title')
    );
    if (noLabel.length > 0) problems.push(`${noLabel.length} buttons without accessible name`);

    const noInputLabel = Array.from(document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button])')).filter(i => {
      const id = (i as HTMLInputElement).id;
      return !i.getAttribute('aria-label') && (!id || !document.querySelector(`label[for="${id}"]`));
    });
    if (noInputLabel.length > 0) problems.push(`${noInputLabel.length} inputs without label`);

    return problems;
  });

  for (const issue of issues) {
    failures.push({
      type: 'a11y',
      detail: issue,
      suggestedFix: 'Add alt="", aria-label="", or wrap input in <label>.'
    });
  }
});

// ============================================================
// HELPERS
// ============================================================
async function collectInternalRoutes(page: Page): Promise<string[]> {
  const links = await page.locator('a[href]').all();
  const hrefs = await Promise.all(links.map(l => l.getAttribute('href')));
  const internal = hrefs
    .filter(h => h && (h.startsWith('/') || h.startsWith(BASE)))
    .map(h => h!.startsWith(BASE) ? new URL(h!).pathname : h!)
    .filter(h => !h.includes('#') && !h.startsWith('mailto:'));
  return [...new Set(internal)].slice(0, 20);
}

function realisticValueFor(type: string): string {
  const map: Record<string, string> = {
    email: 'test@example.com',
    password: 'TestPass123!',
    number: '42',
    tel: '+12025551234',
    url: 'https://example.com',
    search: 'test query',
    date: '2026-01-15',
    time: '14:30',
    color: '#FF6B35',
  };
  return map[type] || 'Test input value';
}

function diagnoseClickFailure(message: string, html: string): string {
  if (message.includes('pointer-events')) return 'Element has pointer-events: none. Remove that style or fix the overlay covering it.';
  if (message.includes('intercepts pointer events')) return 'Another element is on top. Check z-index stacking or absolute-positioned overlays.';
  if (message.includes('not visible')) return 'Element is hidden. Check display: none, visibility: hidden, or opacity: 0.';
  if (message.includes('disabled')) return 'Element is disabled. Remove the disabled attribute or fix the condition that disables it.';
  if (message.includes('timeout')) return 'Element did not become clickable in 3s. May be behind a loading state or modal.';
  return 'Inspect the element and surrounding layout. Common: CSS z-index, pointer-events, or stacking context issues.';
}

test.afterAll(async () => {
  fs.writeFileSync(`${DIR}/failures.json`, JSON.stringify(failures, null, 2));
});
