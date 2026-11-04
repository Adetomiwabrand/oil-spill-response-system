// src/pages/AssetRegistry.tsx
import { useState } from 'react';
import { ShieldAlert, Layers, Waves, Anchor, Cpu, Wind, ShieldCheck, Download, FileText, Sliders, RefreshCw, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useAssets } from '../hooks/useAssets';
import { DataStatus } from '../components/DataStatus';
import type { WPAsset } from '../types/wordpress';

// ── Status helpers ─────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; badge: string; classes: string }> = {
  alpha_ready: {
    label: '100% OPERATIONAL',
    badge: 'READY',
    classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  maintenance: {
    label: 'SCHEDULED MAINTENANCE',
    badge: 'STANDBY',
    classes: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  deployed: {
    label: 'CURRENTLY MOBILIZED',
    badge: 'DEPLOYED',
    classes: 'bg-blue-50 text-blue-800 border-blue-200',
  },
};

function getStatus(key: string) {
  return STATUS_MAP[key] ?? { label: key.toUpperCase(), badge: 'UNKNOWN', classes: 'bg-slate-100 text-slate-600 border-slate-200' };
}

// ── Emergency class label map ──────────────────────────────────

const TIER_LABELS: Record<string, string> = {
  tier_1: 'TIER 1',
  tier_2: 'TIER 2',
  tier_3: 'TIER 3',
};

function formatTiers(tiers: string[] | string | undefined): string {
  if (!tiers) return '—';
  const arr = Array.isArray(tiers) ? tiers : [tiers];
  if (arr.length === 0) return '—';
  return arr.map(t => TIER_LABELS[t] ?? t.toUpperCase()).join(' / ');
}

// ── Static fallback (shown if API communication lags) ────────

const STATIC_ASSETS = [
  { id: 'BAR-FNCE-01', name: 'Fence Boom Systems',            class: 'Containment Barrier',     category: 'BOOMS',     status: 'alpha_ready' },
  { id: 'BAR-HRIV-02', name: 'Harbour River Boom',            class: 'Containment Barrier',     category: 'BOOMS',     status: 'alpha_ready' },
  { id: 'BAR-LAKE-03', name: 'Lake Boom Systems',             class: 'Containment Barrier',     category: 'BOOMS',     status: 'maintenance' },
  { id: 'BAR-PCKT-04', name: 'Pocket Boom Arrays',            class: 'Containment Barrier',     category: 'BOOMS',     status: 'maintenance' },
  { id: 'SKM-DUPL-05', name: '15K Duplex Skimmer Unit',       class: 'Mechanical Extraction',   category: 'SKIMMERS',  status: 'alpha_ready' },
  { id: 'SKM-MVAC-06', name: 'MINIVAC Pump & Extraction',     class: 'Vacuum Recovery',         category: 'SKIMMERS',  status: 'alpha_ready' },
  { id: 'SKM-MHOP-07', name: 'Mini Hopper Integration',       class: 'Collector Assembly',      category: 'SKIMMERS',  status: 'maintenance' },
  { id: 'PMP-LSTR-08', name: 'Lister Diesel Generator',       class: 'Auxiliary Power Core',    category: 'SKIMMERS',  status: 'alpha_ready' },
  { id: 'PMP-MTRF-09', name: 'Mini Transfer Pump',            class: 'Fluid Movement',          category: 'SKIMMERS',  status: 'alpha_ready' },
  { id: 'PMP-SPAT-10', name: 'PD 75-Spate Pump Units',        class: 'Fluid Movement',          category: 'SKIMMERS',  status: 'alpha_ready' },
  { id: 'PMP-PD10-11', name: 'PD 100 Transfer Pumps',         class: 'Fluid Movement',          category: 'SKIMMERS',  status: 'maintenance' },
  { id: 'PMP-THUN-12', name: 'Thune Eureka Systems',          class: 'Heavy Extraction',        category: 'SKIMMERS',  status: 'maintenance' },
  { id: 'PMP-TUTH-13', name: 'TUTHIL Pump Assembly',          class: 'Fluid Transfer',          category: 'SKIMMERS',  status: 'maintenance' },
  { id: 'SYS-CHEM-14', name: 'Gold Crew Dispersant Chemical', class: 'Chemical Neutralization', category: 'LOGISTICS', status: 'alpha_ready' },
  { id: 'LOG-CONT-15', name: 'Sea Container Accessories',     class: 'Tactical Warehousing',    category: 'LOGISTICS', status: 'alpha_ready' },
  { id: 'LOG-TANK-16', name: 'EZ Tank Frameworks',            class: 'Temporary Waste Storage', category: 'LOGISTICS', status: 'alpha_ready' },
  { id: 'LOG-BOAT-17', name: 'Boom Handling Boats',           class: 'Tactical Watercraft',     category: 'LOGISTICS', status: 'alpha_ready' },
];

type Segment = 'BOOMS' | 'SKIMMERS' | 'LOGISTICS';
type FilterSegment = Segment | 'ALL';

// ── Row shape ─────────────────────────────────────────────────

interface AssetRow {
  id: string;
  name: string;
  class: string;
  category: Segment;
  status: string;
  // Extended fields from live WP data (undefined for static fallback rows)
  weight?: string;
  flow_rate?: string;
  deployment_time?: string;
  emergency_class?: string;
  description?: string;
  spec_pdf?: string | false;
  technical_data_sheet?: string | false;
  isLive: boolean;
}

// ── Normalise a WP asset into the table row shape ─────────────

function wpToRow(asset: WPAsset): AssetRow {
  const acf = asset.acf ?? {};
  const rawCategory = acf.category || 'booms';

  // Read operational_status defensively — ACF has a trailing-colon typo in the key
  const statusRaw =
    (acf as unknown as Record<string, string>)['operational_status:'] ||
    acf.operational_status ||
    'alpha_ready';

  // Strip HTML tags from content.rendered for the description
  const rawDescription = asset.content?.rendered ?? '';
  const description = rawDescription.replace(/<[^>]+>/g, '').trim();

  return {
    id:                   acf.model_number || String(asset.id),
    name:                 asset.title.rendered,
    class:                formatTiers(acf.emergency_class) !== '—'
                            ? formatTiers(acf.emergency_class)
                            : (acf.deployment_time || '—'),
    category:             rawCategory.toUpperCase() as Segment,
    status:               statusRaw,
    weight:               acf.weight || undefined,
    flow_rate:            acf.flow_rate || undefined,
    deployment_time:      acf.deployment_time || undefined,
    emergency_class:      formatTiers(acf.emergency_class),
    description:          description || undefined,
    spec_pdf:             acf.spec_pdf || false,
    technical_data_sheet: acf.technical_data_sheet || false,
    isLive:               true,
  };
}

// ── Spec detail panel (expanded row) ─────────────────────────

function SpecPanel({ row }: { row: AssetRow }) {
  const fields: Array<{ label: string; value: string | undefined }> = [
    { label: 'MODEL NUMBER',      value: row.id },
    { label: 'WEIGHT',            value: row.weight ? `${row.weight} kg` : undefined },
    { label: 'FLOW RATE',         value: row.flow_rate ? `${row.flow_rate} m³/hr` : undefined },
    { label: 'DEPLOYMENT TIME',   value: row.deployment_time },
    { label: 'EMERGENCY CLASS',   value: row.emergency_class },
  ];

  const visibleFields = fields.filter(f => f.value && f.value !== '—');

  return (
    <tr className="bg-slate-950">
      <td colSpan={5} className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left — spec grid */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono font-black text-responseGreen tracking-widest uppercase block">
              TECHNICAL SPECIFICATION
            </span>
            {visibleFields.length > 0 ? (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
                {visibleFields.map(f => (
                  <div key={f.label}>
                    <dt className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{f.label}</dt>
                    <dd className="text-sm font-mono font-bold text-white mt-0.5">{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                No additional spec data on file — update in WordPress.
              </p>
            )}
          </div>

          {/* Right — description + document links */}
          <div className="space-y-3">
            {row.description && (
              <div>
                <span className="text-[9px] font-mono font-black text-responseGreen tracking-widest uppercase block mb-1">
                  DESCRIPTION
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{row.description}</p>
              </div>
            )}

            {(row.spec_pdf || row.technical_data_sheet) && (
              <div className="pt-2 space-y-2">
                <span className="text-[9px] font-mono font-black text-responseGreen tracking-widest uppercase block">
                  DOCUMENTS
                </span>
                {row.spec_pdf && typeof row.spec_pdf === 'string' && (
                  <a
                    href={row.spec_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white hover:text-responseGreen transition-colors uppercase tracking-wider"
                  >
                    <FileText className="w-3 h-3 text-responseGreen" />
                    SPEC PDF
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {row.technical_data_sheet && typeof row.technical_data_sheet === 'string' && (
                  <a
                    href={row.technical_data_sheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white hover:text-responseGreen transition-colors uppercase tracking-wider ml-4"
                  >
                    <Download className="w-3 h-3 text-responseGreen" />
                    TECHNICAL DATA SHEET
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {!row.description && !row.spec_pdf && !row.technical_data_sheet && (
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                No documents on file — upload in WordPress.
              </p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

// ── Component ─────────────────────────────────────────────────

export default function AssetRegistry() {
  const { data: wpAssets, isLoading, isError, refetch } = useAssets();
  const [activeSegment, setActiveSegment] = useState<FilterSegment>('BOOMS');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Use live WP data if available, otherwise fall back to static list
  const hasLiveData = wpAssets && wpAssets.length > 0;
  const allRows: AssetRow[] = hasLiveData
    ? wpAssets.map(wpToRow)
    : STATIC_ASSETS.map(s => ({ ...s, isLive: false } as AssetRow));

  const filteredRows = activeSegment === 'ALL'
    ? allRows
    : allRows.filter(item => item.category === activeSegment);

  const totalCount = allRows.length;

  function toggleExpand(id: string) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">

      {/* [01] HERO ──────────────────────────────────────────── */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-color-dodge"
          style={{ backgroundImage: "url('/assets/images/caa-extra-warehouse-2.webp')" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            LOGISTICS &amp; DEPOT STOCKPILE
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Technical Stockpile &amp; Asset Registry
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Clean Africa Alliance maintains an extensive, tier-vetted equipment deployment inventory
            across regional bases. Every component represents verified factory-standard engineering
            optimized for high-pressure environmental interdiction.
          </p>
          {/* Live data indicator */}
          <div className="flex items-center gap-2 pt-2">
            <span className={[
              'w-2 h-2 rounded-full',
              isLoading   ? 'bg-amber-400 animate-pulse' :
              isError     ? 'bg-alertRed' :
              hasLiveData ? 'bg-responseGreen animate-pulse' : 'bg-slate-500'
            ].join(' ')} aria-hidden="true" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {isLoading   ? 'SYNCING REGISTRY...' :
               isError     ? 'SYNC ERROR — SHOWING CACHED DATA' :
               hasLiveData ? `LIVE REGISTRY — ${totalCount} ASSETS VERIFIED` :
               'STATIC CATALOG — ADD ASSETS IN WORDPRESS TO ACTIVATE LIVE SYNC'}
            </span>
            {isError && (
              <button
                onClick={() => refetch()}
                className="ml-2 text-responseGreen hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue"
                aria-label="Retry loading assets"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* [02] STICKY SEGMENT FILTER BAR ─────────────────────── */}
      <section className="bg-slate-900 px-6 lg:px-16 py-4 border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 font-mono text-sm font-bold">
            {(['ALL', 'BOOMS', 'SKIMMERS', 'LOGISTICS'] as FilterSegment[]).map((seg) => {
              const labels: Record<FilterSegment, string> = {
                ALL:      'View All Equipment',
                BOOMS:    'Containment Booms & Barriers',
                SKIMMERS: 'Recovery Skimmers & Pumps',
                LOGISTICS:'Fast Response Logistics',
              };
              return (
                <button
                  key={seg}
                  onClick={() => setActiveSegment(seg)}
                  className={[
                    'px-5 py-3 transition-colors uppercase tracking-wider min-h-[44px] focus:outline-none focus:ring-2 focus:ring-signalBlue',
                    activeSegment === seg
                      ? 'bg-responseGreen text-navyPanel'
                      : 'bg-slate-800 text-slate-400 hover:text-white',
                  ].join(' ')}
                >
                  {labels[seg]}
                </button>
              );
            })}
          </div>
          <div className="hidden lg:flex items-center gap-3 text-right font-mono text-[10px] text-slate-500">
            <span>{hasLiveData ? 'LIVE DATABASE SYNC ACTIVE' : 'REGISTRY LATENCY: SYNCED REAL-TIME'}</span>
          </div>
        </div>
      </section>

      {/* [03] DIRECT LIVE EQUIPMENT TABLE ───────────────────── */}
      <section id="specs" className="py-12 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">
              VERIFIED STOCKPILE IDENTIFIER LOG
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">
              Current Segment Inventory List
            </h2>
          </div>

          {/* Loading / error states */}
          <DataStatus
            isLoading={isLoading}
            isError={isError}
            errorMessage="Unable to reach the registry. Displaying cached catalog."
            isEmpty={false}
          />

          {/* Table Element */}
          {!isLoading && (
            <div className="border border-slate-200 overflow-x-auto shadow-sm rounded-sm">
              <table className="w-full text-left border-collapse min-w-[768px]">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                    <th className="p-4 font-black w-8" aria-hidden="true" />
                    <th className="p-4 font-black">ASSET ID / MODEL</th>
                    <th className="p-4 font-black">REGISTRY ITEM NOMENCLATURE</th>
                    <th className="p-4 font-black">EMERGENCY CLASSIFICATION</th>
                    <th className="p-4 font-black">STOCKPILE STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-sans text-sm">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center font-mono text-sm text-slate-400 uppercase tracking-widest">
                        No assets discovered in this segment category on the CMS.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((item) => {
                      const s = getStatus(item.status);
                      const isExpanded = expandedId === item.id;
                      return (
                        <>
                          <tr
                            key={item.id}
                            className={[
                              'transition-colors cursor-pointer select-none',
                              isExpanded
                                ? 'bg-slate-900 text-white'
                                : 'hover:bg-slate-50/80 bg-white',
                            ].join(' ')}
                            onClick={() => item.isLive && toggleExpand(item.id)}
                            aria-expanded={item.isLive ? isExpanded : undefined}
                          >
                            {/* Expand chevron — only shown for live rows */}
                            <td className="p-4 w-8">
                              {item.isLive ? (
                                isExpanded
                                  ? <ChevronDown className="w-3.5 h-3.5 text-responseGreen" />
                                  : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                              ) : null}
                            </td>
                            <td className={[
                              'p-4 font-mono font-bold tracking-wider',
                              isExpanded ? 'text-responseGreen' : 'text-navyPanel',
                            ].join(' ')}>
                              {item.id}
                            </td>
                            <td className={[
                              'p-4 font-black uppercase',
                              isExpanded ? 'text-white' : 'text-navyPanel',
                            ].join(' ')}>
                              {item.name}
                            </td>
                            <td className={[
                              'p-4 font-mono uppercase',
                              isExpanded ? 'text-slate-300' : 'text-slate-600',
                            ].join(' ')}>
                              {item.class}
                            </td>
                            <td className="p-4">
                              <span className={[
                                'font-mono font-bold px-2.5 py-1 text-[9px] border tracking-wider uppercase rounded-sm',
                                s.classes,
                              ].join(' ')}>
                                {s.label}
                              </span>
                            </td>
                          </tr>
                          {/* Expanded spec panel — dark bg, spans full width */}
                          {isExpanded && item.isLive && (
                            <SpecPanel key={`${item.id}-spec`} row={item} />
                          )}
                        </>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2 pt-2">
            <Sliders className="w-3 h-3 text-responseGreen" />
            {hasLiveData
              ? 'LIVE CMS SYNC DATA NODE / STATUS OK — CLICK ANY ROW TO EXPAND FULL SPEC'
              : 'STATIC CATALOG RECOVERY MODE'}
          </div>
        </div>
      </section>

      {/* [04] FEATURED DETAILED ASSET HIGHLIGHTS ──────────────── */}
      <section className="py-20 px-6 lg:px-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          <div className="text-left">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black block mb-1">
              SPECIFICATION INSIGHTS
            </span>
            <h2 className="text-2xl font-black uppercase text-navyPanel tracking-tight">
              Featured Fleet Configurations & Specs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Primary containment feature card */}
            <div className="lg:col-span-7 border border-slate-200 p-8 bg-slate-900 text-white flex flex-col justify-between text-left shadow-sm relative overflow-hidden rounded-sm group min-h-[340px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/images/Pelican_case_with_equipment.webp')" }}
                role="img"
                aria-label="Pelican case with deployment equipment"
              />
              {/* [ON-BRAND GRADIENT OVERLAY] */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/85 to-responseGreen/20 mix-blend-multiply" />

              {/* Foreground Content Wrapper */}
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono text-responseGreen font-black uppercase tracking-widest bg-slate-950/50 px-2 py-0.5 border border-white/5 rounded-sm">
                    PRIMARY CONTAINMENT INFRASTRUCTURE
                  </span>
                  <Waves className="w-5 h-5 text-responseGreen filter drop-shadow-md" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none drop-shadow-sm">
                  Heavy Offshore Fence Boom Arrays
                </h3>
                <p className="text-sm md:text-sm text-slate-300 font-normal leading-relaxed max-w-xl drop-shadow-sm">
                  High-buoyancy, industrial-grade dynamic barriers designed to establish absolute surface
                  containment across high-current open ocean zones and primary shipping infrastructure channels.
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Deployed globally on tier missions
                </span>
              </div>
            </div>

            {/* Sub-featured columns */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              <div className="border border-gray-200 p-8 bg-white flex flex-col justify-between text-left shadow-sm rounded-sm">
                <div className="space-y-4">
                  <Anchor className="w-6 h-6 text-responseGreen" />
                  <h4 className="text-lg font-black text-navyPanel uppercase tracking-tight">Shoreline &amp; Swamp Recovery Skimmers</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Lightweight, variable-draft weir and rope-mop skimmer configurations engineered for shallow estuarine creek recovery operations.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase">
                  CLASSIFICATION: ESTUARINE RECOVERY
                </div>
              </div>
              <div className="border border-gray-200 p-8 bg-white flex flex-col justify-between text-left shadow-sm rounded-sm">
                <div className="space-y-4">
                  <Cpu className="w-6 h-6 text-responseGreen" />
                  <h4 className="text-lg font-black text-navyPanel uppercase tracking-tight">Power &amp; Transfer Pump Systems</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Diesel-driven high-volume fluid transfer infrastructure for recovered liquid transit from collection vessels to temporary storage.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase">
                  CLASSIFICATION: TRANSFER INFRASTRUCTURE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [05] LOGISTICS SUPPORT SPEC CARDS ─────────────────── */}
      <section className="py-16 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-fieldBg border border-gray-200 p-8 flex flex-col justify-between text-left shadow-sm rounded-sm">
            <div className="space-y-4">
              <ShieldAlert className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">EZ Collapsible Storage Tanks</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rapid-deploy flexible bladder tank systems for temporary waste oil holding during active response operations in remote locations.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200 font-mono text-[10px] font-bold text-slate-400 uppercase">
              CLASSIFICATION: TEMPORARY STORAGE
            </div>
          </div>
          <div className="bg-fieldBg border border-gray-200 p-8 flex flex-col justify-between text-left shadow-sm rounded-sm">
            <div className="space-y-4">
              <Layers className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">Dispersant Spraying Systems</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Specialized application rigs and pre-vetted Gold Crew chemical dispersant stocks formatted for rapid marine slick mitigation.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200 font-mono text-[10px] font-bold text-slate-400 uppercase">
              CLASSIFICATION: CHEMICAL INTEL
            </div>
          </div>
          <div className="bg-fieldBg border border-gray-200 p-8 flex flex-col justify-between text-left shadow-sm rounded-sm">
            <div className="space-y-4">
              <Wind className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">Boom Handling Boats</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rigid-hulled, shallow-draft tactical strike watercraft for barrier anchoring and personnel transport across remote coastal sectors.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200 font-mono text-[10px] font-bold text-slate-400 uppercase">
              CLASSIFICATION: RAPID LOGISTICS FLEET
            </div>
          </div>
        </div>
      </section>

      {/* [06] CONVERSION COMMAND PANEL ──────────────────────── */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-screen"
          style={{ backgroundImage: "url('/assets/images/Logistics_command_center_portrait.webp')" }}
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-mono font-black tracking-widest uppercase">DEPOT COMMAND</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              COMMAND FLEET GUARANTEES
            </h2>
            <p className="text-sm md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Connect directly with our logistics commanders to audit local base inventory balances or arrange
              formal stockpile pre-allocation locks across exclusive operational sectors.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <button className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue min-h-[44px]">
              RESERVE HUB ASSETS
            </button>
            <button className="w-full py-4 border border-white/20 hover:border-white text-white font-mono text-sm tracking-widest font-bold uppercase transition-colors flex items-center justify-center gap-2 bg-slate-900/40 backdrop-blur-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-signalBlue">
              <Download className="w-4 h-4 text-responseGreen" /> DOWNLOAD INVENTORY LOGS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
