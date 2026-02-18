import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Terrerov Blog',
    description: 'A cyberpunk blog about technology, code, and the digital frontier.',
    site: context.site ?? 'https://blog.terrerov.cu',
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
