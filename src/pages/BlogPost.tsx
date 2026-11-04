// src/pages/BlogPost.tsx
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePost } from '../hooks/usePost';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePost(slug ?? '');

  const media = post?._embedded?.['wp:featuredmedia'];
  const imgUrl = media?.[0]?.source_url ?? null;
  const date = post
    ? new Date(post.date).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans">

      {/* Back link */}
      <div className="bg-navyPanel px-6 lg:px-16 pt-24 pb-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-slate-400 hover:text-responseGreen uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> BACK TO KNOWLEDGE HUB
          </Link>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="max-w-4xl mx-auto px-6 lg:px-0 py-16 space-y-6 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="aspect-[16/9] bg-slate-200 rounded" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 bg-slate-200 rounded" />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="max-w-4xl mx-auto px-6 lg:px-0 py-24 text-center space-y-4">
          <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">
            Post not found or failed to load.
          </p>
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 text-sm font-mono font-black text-responseGreen uppercase tracking-widest hover:text-navyPanel transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Return to Knowledge Hub
          </Link>
        </div>
      )}

      {/* Post content */}
      {post && (
        <>
          {/* Hero */}
          <div className="bg-navyPanel pb-12 px-6 lg:px-16 border-b-4 border-responseGreen">
            <div className="max-w-4xl mx-auto space-y-4">
              {date && (
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  {date}
                </span>
              )}
              <h1
                className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
          </div>

          {/* Featured image */}
          {imgUrl && (
            <div className="w-full max-w-4xl mx-auto px-6 lg:px-0 -mt-1">
              <img
                src={imgUrl}
                alt={post.title.rendered}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}

          {/* Body */}
          <article className="max-w-4xl mx-auto px-6 lg:px-0 py-16">
            <style>{`
              .wp-content p { margin-bottom: 1.25rem; color: #4B5563; line-height: 1.75; font-size: 0.875rem; }
              .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
                font-weight: 900; text-transform: uppercase; color: #0F1B2C;
                letter-spacing: -0.02em; margin-top: 2rem; margin-bottom: 0.75rem;
              }
              .wp-content h1 { font-size: 1.5rem; }
              .wp-content h2 { font-size: 1.25rem; }
              .wp-content h3 { font-size: 1.1rem; }
              .wp-content a { color: #22C55E; }
              .wp-content a:hover { text-decoration: underline; }
              .wp-content strong { font-weight: 700; color: #0F1B2C; }
              .wp-content ul, .wp-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
              .wp-content li { color: #4B5563; line-height: 1.75; font-size: 0.875rem; margin-bottom: 0.25rem; }
              .wp-content ul li { list-style-type: disc; }
              .wp-content ol li { list-style-type: decimal; }
              .wp-content blockquote { border-left: 3px solid #22C55E; padding-left: 1rem; margin: 1.5rem 0; color: #6B7280; font-style: italic; }
              .wp-content img { max-width: 100%; height: auto; margin: 1.5rem 0; }
            `}</style>
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Footer nav */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <Link
                to="/knowledge"
                className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-responseGreen uppercase tracking-widest hover:text-navyPanel transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> BACK TO KNOWLEDGE HUB
              </Link>
            </div>
          </article>
        </>
      )}

    </div>
  );
}
