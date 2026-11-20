import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Custom domain is configured (Pages cname: joerourke.co.uk), so the site is
// served at the root. To serve at the Pages project path instead, set
// site: 'https://joerourke123.github.io/joerourke.co.uk' and base: '/joerourke.co.uk'.
export default defineConfig({
  site: 'https://joerourke.co.uk',
  base: '/',
  integrations: [mdx()],
  markdown: {
    // DESIGN.md §9: no syntax highlighting — ink block, Courier Prime, plain.
    syntaxHighlight: false,
  },
});
