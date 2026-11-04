// src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPPost } from '../types/wordpress';

const POSTS_KEY = 'wp-posts';

export function usePosts(perPage = 10) {
  const query = new URLSearchParams({
    per_page: String(perPage),
    acf_format: 'standard',
  }).toString();

  return useQuery({
    queryKey: [POSTS_KEY, perPage],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>(`posts?${query}`);

      // Fetch featured images separately — _embed triggers WAF 403 on Hostinger
      const withMedia = await Promise.all(
        posts.map(async (post) => {
          if (!post.featured_media) return post;
          try {
            const media = await wpFetch<{ source_url: string; alt_text: string }>(
              `media/${post.featured_media}`
            );
            return {
              ...post,
              _embedded: {
                'wp:featuredmedia': [media],
              },
            };
          } catch {
            return post;
          }
        })
      );

      return withMedia;
    },
  });
}
