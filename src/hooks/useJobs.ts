// src/hooks/useJobs.ts
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';

export interface WPJobListing {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    job_type: string;
    job_location: string;
    joy_department: string;  // typo in ACF field name — matches WordPress exactly
    posted_date: string;
    application_deadline: string;
  };
}

const JOBS_KEY = 'wp-job-listings';

export function useJobs(perPage = 20) {
  return useQuery({
    queryKey: [JOBS_KEY, perPage],
    queryFn: () =>
      wpFetch<WPJobListing[]>(`job_listings?per_page=${perPage}&acf_format=standard`),
  });
}
