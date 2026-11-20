// Base-safe URL helper: import.meta.env.BASE_URL comes from `base` in
// astro.config.mjs, so links work both on the Pages project path and on a
// custom domain without edits here.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path: string): string {
  return `${base}${path}`;
}
