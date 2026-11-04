// src/hooks/usePost.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPPost } from '../types/wordpress';

const POSTS_KEY = 'wp-posts';

export function usePost(slug: string) {
  const query = new URLSearchParams({
    slug,
    acf_format: 'standard',
  }).toString();

  return useQuery({
    queryKey: [POSTS_KEY, slug],
    queryFn: async () => {
      const results = await wpFetch<WPPost[]>(`posts?${query}`);
      if (!results.length) throw new Error('Post not found: ' + slug);
      const post = results[0];

      // Fetch featured image separately — _embed triggers WAF 403 on Hostinger
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
    },
    enabled: Boolean(slug),
  });
}
