"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-coral text-white hover:bg-brand-coral/90 pl-5 pr-1.5 py-1.5 [&_.dot]:bg-white [&_.dot]:text-brand-coral",
        light:
          "bg-cream-50 text-ink hover:bg-white pl-5 pr-1.5 py-1.5 [&_.dot]:bg-ink [&_.dot]:text-cream-50",
        ghost: "bg-transparent text-ink hover:bg-ink/5 px-4 py-2",
        outline: "border border-ink/15 text-ink hover:border-ink/40 px-5 py-2",
        accent:
          "bg-brand-coral text-white hover:bg-brand-coral/90 pl-5 pr-1.5 py-1.5 [&_.dot]:bg-white [&_.dot]:text-brand-coral",
      },
      size: {
        sm: "text-[13px]",
        md: "text-sm",
        lg: "text-[15px] pl-6 pr-2 py-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string
  arrow?: boolean
  children?: React.ReactNode
}

export type ButtonProps =
  | (CommonProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (CommonProps &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

function ButtonInner({
  arrow,
  children,
}: {
  arrow: boolean
  children?: React.ReactNode
}) {
  return (
    <>
      <span className="leading-none">{children}</span>
      {arrow && (
        <span className="dot flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      )}
    </>
  )
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, arrow = true, children, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size }), className)

  if ("href" in props && props.href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <ButtonInner arrow={arrow}>{children}</ButtonInner>
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  )
})
Button.displayName = "Button"
