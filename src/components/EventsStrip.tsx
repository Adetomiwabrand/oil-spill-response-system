// src/components/EventsStrip.tsx
import { useState } from 'react';
import { Calendar, MapPin, ArrowRight, X, ExternalLink } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { useInView } from '../hooks/useInView';
import type { WPEvent } from '../types/wordpress';

export function EventsStrip() {
  const { data: events, isLoading, isError } = useEvents(6);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [selectedEvent, setSelectedEvent] = useState<WPEvent | null>(null);

  const hasEvents = Boolean(events?.length);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    // Handle human-readable format e.g. "October 14, 2026"
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    // Fallback for YYYYMMDD format
    const y = dateStr.substring(0, 4);
    const m = dateStr.substring(4, 6);
    const d = dateStr.substring(6, 8);
    return new Date(`${y}-${m}-${d}`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getFlyerUrl = (flyer: WPEvent['acf']['event_flyer']): string => {
    if (!flyer) return '';
    if (typeof flyer === 'string') return flyer;
    if (typeof flyer === 'object' && 'url' in flyer) return (flyer as { url: string }).url;
    return '';
  };

  return (
    <>
      <section className="py-20 px-6 lg:px-16 bg-navyPanel border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full">

          <div
            ref={ref}
            className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <div className="space-y-1 text-left">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">
                UPCOMING EVENTS
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
                Training &amp; Field Events
              </h2>
            </div>
            <a
              href="/services/imo-training"
              className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-white/60 hover:text-responseGreen font-bold transition-colors group"
            >
              VIEW ALL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading && (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-64 rounded-lg border border-white/10 bg-white/5 animate-pulse" />
              ))
            )}

            {!isLoading && !hasEvents && (
              <div className="sm:col-span-2 lg:col-span-3 rounded-lg border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-responseGreen">
                  {isError ? 'EVENTS UNAVAILABLE' : 'CHECK BACK SOON'}
                </p>
                <p className="mt-3 text-sm text-white/70">
                  {isError
                    ? 'We could not load the latest training and field events right now.'
                    : 'New training and field events will appear here as soon as they are published.'}
                </p>
              </div>
            )}

            {!isLoading && hasEvents && events?.map((event, i) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`bg-white/5 border border-white/10 hover:border-responseGreen transition-all duration-200 group flex flex-col text-left w-full cursor-pointer ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: inView ? `${i * 80}ms` : '0ms' }}
              >
                {getFlyerUrl(event.acf.event_flyer) && (
                  <div className="relative overflow-hidden h-44 shrink-0">
                    <img
                      src={getFlyerUrl(event.acf.event_flyer)}
                      alt={event.title.rendered}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navyPanel/80 to-transparent" />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wide leading-snug group-hover:text-responseGreen transition-colors">
                    {event.title.rendered}
                  </h3>

                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    {event.acf.event_date && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                        <Calendar className="w-3.5 h-3.5 text-responseGreen shrink-0" />
                        {formatDate(event.acf.event_date)}
                      </div>
                    )}
                    {event.acf.event_location && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                        <MapPin className="w-3.5 h-3.5 text-responseGreen shrink-0" />
                        {event.acf.event_location}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-responseGreen group-hover:text-white transition-colors inline-flex items-center gap-1 mt-2">
                    VIEW DETAILS <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyPanel/80 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white max-w-lg w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-1.5 bg-navyPanel text-white hover:bg-responseGreen hover:text-navyPanel transition-colors rounded"
            >
              <X className="w-4 h-4" />
            </button>

            {getFlyerUrl(selectedEvent.acf.event_flyer) && (
              <div className="h-56 overflow-hidden">
                <img
                  src={getFlyerUrl(selectedEvent.acf.event_flyer)}
                  alt={selectedEvent.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-responseGreen uppercase font-black">UPCOMING EVENT</span>
                <h2 className="text-xl font-black text-navyPanel uppercase tracking-tight leading-tight">
                  {selectedEvent.title.rendered}
                </h2>
              </div>

              <div className="space-y-2">
                {selectedEvent.acf.event_date && (
                  <div className="flex items-center gap-2 text-sm font-mono text-navyPanel/70">
                    <Calendar className="w-4 h-4 text-responseGreen shrink-0" />
                    {formatDate(selectedEvent.acf.event_date)}
                  </div>
                )}
                {selectedEvent.acf.event_location && (
                  <div className="flex items-center gap-2 text-sm font-mono text-navyPanel/70">
                    <MapPin className="w-4 h-4 text-responseGreen shrink-0" />
                    {selectedEvent.acf.event_location}
                  </div>
                )}
              </div>

              {selectedEvent.acf.event_description && (
                <p className="text-sm text-navyPanel/80 leading-relaxed border-t border-slate-100 pt-4">
                  {selectedEvent.acf.event_description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedEvent.acf.event_link && (
                  <a
                    href={selectedEvent.acf.event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    LEARN MORE <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href="/portal/training-application"
                  className="flex-1 py-3 border border-navyPanel hover:bg-navyPanel hover:text-white text-navyPanel font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
