import { defineConfig } from 'astro/config';

// `site`/`base` assume the custom domain joerourke.co.uk at the root.
// If serving under a project path instead (joerourke123.github.io/joerourke.co.uk),
// set base: '/joerourke.co.uk' and site accordingly.
export default defineConfig({
  site: 'https://joerourke.co.uk',
  base: '/',
  markdown: {
    // DESIGN.md §9: no syntax highlighting — ink block, Courier Prime, plain.
    syntaxHighlight: false,
  },
});
