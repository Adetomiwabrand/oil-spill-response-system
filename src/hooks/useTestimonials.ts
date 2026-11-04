// src/hooks/useTestimonials.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';

export interface WPTestimonial {
  id: number;
  slug: string;
  acf: {
    quote: string;
    author_name: string;
    author_title: string;
    author_company: string;
    author_photo: string;
  };
}

const TESTIMONIALS_KEY = 'wp-testimonials';

export function useTestimonials(perPage = 10) {
  return useQuery({
    queryKey: [TESTIMONIALS_KEY, perPage],
    queryFn: () =>
      wpFetch<WPTestimonial[]>(`testimonials?per_page=${perPage}&acf_format=standard`),
  });
}
