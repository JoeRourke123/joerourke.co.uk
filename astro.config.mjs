import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Default: GitHub Pages project path. For the custom domain joerourke.co.uk
// instead, set site: 'https://joerourke.co.uk' and base: '/'.
export default defineConfig({
  site: 'https://joerourke123.github.io/joerourke.co.uk',
  base: '/joerourke.co.uk',
  integrations: [mdx()],
  markdown: {
    // DESIGN.md §9: no syntax highlighting — ink block, Courier Prime, plain.
    syntaxHighlight: false,
  },
});
