import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPAsset } from '../types/wordpress';

const ASSETS_KEY = 'wp-assets';

export function useAssets(perPage = 100) {
  const query = new URLSearchParams({
    per_page: String(perPage),
    _embed: '1',
  }).toString();

  return useQuery({
    queryKey: [ASSETS_KEY, perPage],
    queryFn: () => wpFetch<WPAsset[]>(`assets?${query}`),
  });
}

export function useAsset(slug: string) {
  return useQuery({
    queryKey: [ASSETS_KEY, slug],
    queryFn: async () => {
      const query = new URLSearchParams({ slug }).toString();
      const results = await wpFetch<WPAsset[]>(`assets?${query}`);
      if (!results.length) throw new Error('Asset not found: ' + slug);
      return results[0];
    },
    enabled: Boolean(slug),
  });
}
