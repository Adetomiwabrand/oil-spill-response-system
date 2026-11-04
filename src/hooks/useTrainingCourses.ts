import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';
import type { WPTrainingCourse } from '../types/wordpress';

const COURSES_KEY = 'wp-training-courses';

export function useTrainingCourses(perPage = 50) {
  return useQuery({
    queryKey: [COURSES_KEY, perPage],
    queryFn: () =>
      wpFetch<WPTrainingCourse[]>(`training_courses?per_page=${perPage}&acf_format=standard`),
  });
}

export function useTrainingCourse(slug: string) {
  return useQuery({
    queryKey: [COURSES_KEY, slug],
    queryFn: async () => {
      const results = await wpFetch<WPTrainingCourse[]>(
        `training_courses?slug=${encodeURIComponent(slug)}&acf_format=standard`
      );
      if (!results.length) throw new Error('Course not found: ' + slug);
      return results[0];
    },
    enabled: Boolean(slug),
  });
}
