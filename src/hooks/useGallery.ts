// src/hooks/useGallery.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';

export interface WPGalleryItem {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    gallery_image: string;
    gallery_caption: string;
    gallery_category: string;
  };
}

const GALLERY_KEY = 'wp-gallery';

export function useGallery(perPage = 20, category?: string) {
  return useQuery({
    queryKey: [GALLERY_KEY, perPage, category],
    queryFn: async () => {
      const items = await wpFetch<WPGalleryItem[]>(
        `gallery?per_page=${perPage}&acf_format=standard`
      );
      if (category && category !== 'all') {
        return items.filter((item) => item.acf.gallery_category === category);
      }
      return items;
    },
  });
}
