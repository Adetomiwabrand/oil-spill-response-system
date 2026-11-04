// src/pages/Gallery.tsx
import { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useInView } from '../hooks/useInView';
import { DataStatus } from '../components/DataStatus';

type Category = 'all' | 'equipment' | 'stockpile' | 'hub' | 'training';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'stockpile', label: 'Stockpile' },
  { value: 'hub',       label: 'Hub Facilities' },
  { value: 'training',  label: 'Training' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const { data: items, isLoading, isError } = useGallery(50, activeCategory);
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0, once: false });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">

      {/* HERO */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/images/registry-hero-backdrop.webp')" }}
        />
        <div
          ref={heroRef}
          className={`max-w-7xl mx-auto w-full relative z-10 text-left space-y-4 ${heroInView ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="text-[10px] font-mono tracking-widest text-responseGreen uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            VISUAL ARCHIVE
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Equipment &amp; Stockpile Gallery
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            A visual record of CleanAfrica Associates' operational equipment, stockpile reserves, hub
            facilities, and field training activities.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto w-full">

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 bg-slate-100 p-1.5 border border-slate-200 w-fit">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-navyPanel text-white'
                    : 'text-slate-600 hover:text-navyPanel'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <DataStatus isLoading={isLoading} isError={isError} isEmpty={!items?.length} />

          {items && items.length > 0 && (
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-slate-200 border border-slate-200 h-56"
                >
                  {item.acf.gallery_image && (
                    <img
                      src={item.acf.gallery_image}
                      alt={item.acf.gallery_caption || item.title.rendered}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navyPanel/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.acf.gallery_caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs font-mono text-white font-medium">
                        {item.acf.gallery_caption}
                      </p>
                    </div>
                  )}
                  {item.acf.gallery_category && (
                    <span className="absolute top-3 left-3 text-[9px] font-mono font-black uppercase tracking-widest bg-navyPanel/80 text-responseGreen px-2 py-1 border border-responseGreen/30">
                      {item.acf.gallery_category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
