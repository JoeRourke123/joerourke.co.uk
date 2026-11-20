import rss from '@astrojs/rss';
import { getPosts, postSlug } from '../utils/posts';

export async function GET(context) {
  const posts = await getPosts();
  const site = (context.site?.toString() ?? 'https://joerourke123.github.io/joerourke.co.uk').replace(
    /\/?$/,
    '/',
  );
  return rss({
    title: 'Joe Rourke — Writing',
    description: 'A risograph zine about code, cities and other fixations.',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: new URL(`writing/${postSlug(post)}/`, site).href,
    })),
  });
}
