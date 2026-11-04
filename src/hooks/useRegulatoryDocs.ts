import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPRegulatoryDoc } from '../types/wordpress';

const REG_DOCS_KEY = 'wp-regulatory-docs';

export function useRegulatoryDocs(perPage = 100) {
  return useQuery({
    queryKey: [REG_DOCS_KEY, perPage],
    queryFn: () =>
      wpFetch<WPRegulatoryDoc[]>(`regulatory_docs?per_page=${perPage}&acf_format=standard`),
  });
}

export function useRegulatoryDocsByJurisdiction(jurisdiction: string) {
  return useQuery({
    queryKey: [REG_DOCS_KEY, 'jurisdiction', jurisdiction],
    queryFn: () =>
      wpFetch<WPRegulatoryDoc[]>(`regulatory_docs?per_page=100&acf_format=standard`).then((docs) =>
        docs.filter(
          (doc) => doc.acf.jurisdiction === jurisdiction
        )
      ),
    enabled: Boolean(jurisdiction),
  });
}
