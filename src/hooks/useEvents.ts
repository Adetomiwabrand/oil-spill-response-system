// src/hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPEvent } from '../types/wordpress';

const EVENTS_KEY = 'wp-events';

export function useEvents(perPage = 6) {
  return useQuery({
    queryKey: [EVENTS_KEY, perPage],
    queryFn: () =>
      wpFetch<WPEvent[]>(`events?per_page=${perPage}&acf_format=standard`),
  });
}
