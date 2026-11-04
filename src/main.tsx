// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { WPApiError } from './libraries/wordpress'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            1000 * 60 * 5,   // 5 min — serve cached data without refetching
      gcTime:               1000 * 60 * 30,  // 30 min — keep in memory longer
      refetchOnWindowFocus: false,           // don't refetch when tab regains focus
      refetchOnReconnect:   true,            // refetch when internet reconnects
      refetchOnMount:       true,            // fetch on first mount if stale
      // Exponential backoff: 1s → 2s → 4s, skip retry on definitive errors
      retry: (failureCount, error) => {
        if (error instanceof WPApiError) {
          if ([401, 403, 404].includes(error.status)) return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Analytics />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
