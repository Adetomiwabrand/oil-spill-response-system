import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPBase } from '../types/wordpress';

const BASES_KEY = 'wp-bases';

export function useBases(perPage = 20) {
  return useQuery({
    queryKey: [BASES_KEY, perPage],
    queryFn: () =>
      wpFetch<WPBase[]>(`bases?per_page=${perPage}&acf_format=standard`),
  });
}

export function useBase(slug: string) {
  return useQuery({
    queryKey: [BASES_KEY, slug],
    queryFn: async () => {
      const results = await wpFetch<WPBase[]>(`bases?slug=${slug}&acf_format=standard`);
      if (!results.length) throw new Error('Base not found: ' + slug);
      return results[0];
    },
    enabled: Boolean(slug),
  });
}
