// src/hooks/useHeroVideo.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';

const FALLBACK_VIDEO = '/videos/hero.mp4';

interface SiteSettingsPost {
  acf: {
    hero_video_url?: string;
  };
}

export function useHeroVideo(): string {
  const { data } = useQuery({
    queryKey: ['hero-video'],
    queryFn: async () => {
      const posts = await wpFetch<SiteSettingsPost[]>(
        'site_settings?per_page=1'
      );
      return posts?.[0]?.acf?.hero_video_url || FALLBACK_VIDEO;
    },
    staleTime: 1000 * 60 * 5, // cache 5 min — avoids re-fetching on every nav
    placeholderData: FALLBACK_VIDEO,
  });

  return data ?? FALLBACK_VIDEO;
}
