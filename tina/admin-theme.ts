/**
 * Reskin for TinaCMS's admin panel (sidebar/toolbar/buttons).
 *
 * Tina exposes its look through CSS custom properties
 * (see https://tina.io/docs/ui/styles) — overriding them here matches the
 * portfolio site's own palette (dark charcoal + tan/bronze accent) instead
 * of Tina's default blue.
 *
 * IMPORTANT: this has to be a plain string injected at runtime via
 * cmsCallback in tina/config.ts — a normal `import "./admin-theme.css"`
 * gets silently stripped by Tina's config prebuild step (it only keeps
 * code that's part of the evaluated config object), so a side-effect CSS
 * import never reaches the admin bundle.
 */
export const adminThemeCSS = /* css */ `
  :root {
    /* Brand accent — replaces Tina's default blue with the site's tan/bronze */
    --tina-color-primary-light: #dab890;
    --tina-color-primary: #c9a26d;
    --tina-color-primary-dark: #8f6b42;

    /* Slightly larger corner radius, matching the site's soft glass cards */
    --tina-radius-small: 8px;
    --tina-radius-big: 20px;

    /* Typography aligned with the site's own fonts */
    --tina-font-family: 'Inter', -apple-system, sans-serif;
  }

  /* Headings inside the Tina admin (collection titles, form section titles) */
  .tina-tailwind h1,
  .tina-tailwind h2,
  .tina-tailwind h3 {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
  }
`;

export const adminFontLinkHref =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
