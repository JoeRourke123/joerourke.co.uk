import { defineConfig } from 'astro/config';

// Default: GitHub Pages project path. For the custom domain joerourke.co.uk
// instead, set site: 'https://joerourke.co.uk' and base: '/'.
export default defineConfig({
  site: 'https://joerourke123.github.io/joerourke.co.uk',
  base: '/joerourke.co.uk',
  markdown: {
    // DESIGN.md §9: no syntax highlighting — ink block, Courier Prime, plain.
    syntaxHighlight: false,
  },
});
