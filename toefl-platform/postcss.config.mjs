/** @type {import('postcss-load-config').Config} */
// This project is plain CSS and needs no PostCSS plugins — but the file must
// exist. postcss-load-config searches UP the directory tree, so without it Next
// walks out of this folder and picks up the marketing site's config at the repo
// root, which asks for tailwindcss and autoprefixer. Neither is a dependency
// here, so the build fails on require.resolve.
//
// An empty config stops that search at this project's own boundary.
export default { plugins: {} }
