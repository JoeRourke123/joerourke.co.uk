import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

export function postSlug(post: Post): string {
  return post.id.replace(/\.mdx?$/, '');
}

export function wordCount(body: string): number {
  return body.trim().split(/\s+/).length;
}

export function readingTime(body: string): number {
  return Math.max(1, Math.round(wordCount(body) / 200));
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function allTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  for (const p of posts) for (const t of p.data.tags) tags.add(t);
  return [...tags].sort();
}

export function formatDate(d: Date): string {
  return d
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
}
