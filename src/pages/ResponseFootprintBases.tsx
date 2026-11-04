import { MapPin, Globe, Radio, Shield, Download, ArrowUpRight, Terminal, Phone } from 'lucide-react';
import { useBases } from '../hooks/useBases';
import { DataStatus } from '../components/DataStatus';

export default function ResponseFootprintBases() {
  const { data: bases, isLoading, isError } = useBases();

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HERO / STRATEGIC INFRASTRUCTURE INTRODUCTION */}
      <section className="relative min-h-[45vh] bg-navyPanel flex flex-col justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden border-b-4 border-responseGreen">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navyPanel via-navyPanel/90 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-15 grayscale contrast-125 transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: "url('/assets/images/registry-hero-backdrop.webp')" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-6 text-left dynamic-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-responseGreen animate-pulse" />
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-semibold">LOGISTICAL NETWORK TOPO</span>
            </div>
            
            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black block">STRATEGIC INFRASTRUCTURE</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] uppercase">
              RESPONSE FOOTPRINT
            </h1>
            
            <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed font-normal">
              Real-time visualization of CleanAfrica’s logistical network, operational bases, and satellite-monitored intervention zones across the continent.
            </p>
          </div>

          {/* Live Stat Metrics Grid */}
          <div className="lg:col-span-5 w-full grid grid-cols-3 gap-4 dynamic-fade-in-delayed">
            <div className="bg-slate-950 p-5 border border-white/10 text-left transition-all duration-300 hover:border-white/20">
              <span className="block text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase">AVAILABILITY</span>
              <span className="block text-xl font-black text-white font-mono mt-2">24/7</span>
              <span className="block text-[9px] font-mono text-responseGreen uppercase tracking-wider font-bold mt-1">READINESS</span>
            </div>
            <div className="bg-slate-950 p-5 border border-white/10 text-left transition-all duration-300 hover:border-white/20">
              <span className="block text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase">DEPLOYMENT</span>
              <span className="block text-xl font-black text-white font-mono mt-2">12</span>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider font-medium mt-1">ACTIVE BASES</span>
            </div>
            <div className="bg-slate-950 p-5 border border-white/10 text-left transition-all duration-300 hover:border-white/20">
              <span className="block text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase">MAX HORIZON</span>
              <span className="block text-xl font-black text-responseGreen font-mono mt-2">48h</span>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider font-medium mt-1">DEPLOYMENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* [03] LIVE SATELLITE & TRACKING DASHBOARD COCKPIT */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: GIS Interactive Map Viewport Simulation */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden min-h-[420px] text-left group">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
            
            {/* Map Top Metadata Bar */}
            <div className="relative z-10 flex justify-between items-center">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider text-responseGreen uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-responseGreen animate-ping" />
                SATELLITE LIVE FEED [GHG-T2]
              </div>
              <Globe className="w-5 h-5 text-slate-700 transition-transform duration-700 group-hover:rotate-12" />
            </div>

            {/* Simulated Target Layout Graphics Overlay */}
            <div className="relative z-10 border border-white/5 p-4 bg-white/[0.02] max-w-xs space-y-1.5 font-mono text-sm text-slate-400 my-auto backdrop-blur-sm transition-all duration-300 group-hover:border-white/10">
              <div>CURRENT SECTOR: <span className="text-white font-bold">Gulf of Guinea</span></div>
              <div>INTERVENTION INDEX: <span className="text-responseGreen font-bold">Optimal</span></div>
              <div>ASSET TRACKING: <span className="text-white font-bold">14 Active Units</span></div>
            </div>

            <div className="relative z-10 border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-600">
              <span>MAPPING ENGINE V2.41</span>
              <span>AZIMUTH POLAR LOCK: TRUE</span>
            </div>
          </div>

          {/* Right Column: GIS & Tracking Info Side Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 text-left space-y-4 h-full transition-shadow duration-300 hover:shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Radio className="w-4 h-4 text-responseGreen animate-pulse" />
                <h3 className="text-sm font-mono font-black tracking-widest uppercase text-navyPanel">GIS &amp; TRACKING INFO</h3>
              </div>
              
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                Utilizing Sentinel-2 and high-resolution commercial constellation data for near real-time spill detection and coastal erosion monitoring.
              </p>

              <div className="pt-2">
                <div className="flex justify-between items-end text-[10px] font-mono font-bold mb-1.5">
                  <span className="text-slate-500">NETWORK STATUS</span>
                  <span className="text-responseGreen">99% Uptime</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-none overflow-hidden">
                  <div className="bg-responseGreen h-full w-[99%] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </div>

            {/* Live Telemetry Output Terminal Box */}
            <div className="bg-slate-950 border border-slate-900 p-5 font-mono text-sm text-left text-slate-400 space-y-2 relative group">
              <div className="absolute top-3 right-3">
                <Terminal className="w-3.5 h-3.5 text-slate-700" />
              </div>
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-responseGreen" /> [•] LIVE TELEMETRY
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div>05:22:01 LAT 4.432-N</div>
                <div>05:21:44 LONG 7.112-E</div>
                <div className="text-responseGreen font-bold animate-pulse">STATUS: OPERATIONAL</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] STRATEGIC BASE PROFILES GRID */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 text-left">
            <div className="space-y-1">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">LOGISTICAL BASE STATIONS</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel uppercase tracking-tight">STRATEGIC BASE PROFILES</h2>
            </div>
          </div>

          {/* FIXED: Removed internal rendering node block from DataStatus wrapper to accurately resolve IntrinsicAttributes configuration requirements */}
          <DataStatus isLoading={isLoading} isError={isError} isEmpty={!bases?.length} />

          {bases && bases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bases.map((base) => (
                <div key={base.id} className="bg-white border border-slate-200 p-6 flex flex-col justify-between text-left group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-slate-400 block font-black uppercase">
                      {base.acf.region}{base.acf.operational_status ? ` / ${base.acf.operational_status.toUpperCase()}` : ''}
                    </span>
                    <h3 className="text-base font-bold text-navyPanel group-hover:text-responseGreen transition-colors uppercase tracking-wide">
                      {base.title.rendered}
                    </h3>

                    <div className="space-y-1.5 pt-4 border-t border-slate-100 font-mono text-sm text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-400 text-[10px] uppercase font-bold">PERSONNEL CAP:</span>
                        <span className="font-bold text-navyPanel">{base.acf.capacity_personnel}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-400 text-[10px] uppercase font-bold">STATUS:</span>
                        <span className={`font-bold ${
                          base.acf.operational_status === 'active'
                            ? 'text-responseGreen'
                            : base.acf.operational_status === 'standby'
                            ? 'text-amber-500'
                            : 'text-alertRed'
                        }`}>
                          {base.acf.operational_status ? base.acf.operational_status.toUpperCase() : ''}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400 text-[10px] uppercase font-bold">COORDINATES:</span>
                        <span className="font-bold text-navyPanel">{base.acf.coordinates}</span>
                      </div>
                    </div>

                    {base.acf.equipment_summary && (
                      <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                        {base.acf.equipment_summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 font-medium inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-responseGreen group-hover:animate-bounce" />
                      {base.acf.coordinates}
                    </span>
                    {base.acf.map_url ? (
                      <a
                        href={base.acf.map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 hover:text-navyPanel transition-colors group-hover:text-navyPanel"
                      >
                        MAP <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-navyPanel transition-colors transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* [05] STANDBY DEPLOYMENT PANEL (CTA) */}
      <section className="bg-white border-b border-slate-200 py-16 px-6 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-3 bg-slate-50 border border-slate-200 inline-block text-navyPanel rounded-none transition-transform duration-300 hover:rotate-12">
            <Shield className="w-6 h-6 text-responseGreen" />
          </div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-navyPanel max-w-2xl mx-auto leading-tight">
            READY TO DEPLOY WITHIN 24 HOURS NOTICE.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <a href="mailto:enquiry@clean-africa.org" className="w-full sm:w-auto px-8 py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue text-center">
              REQUEST READINESS AUDIT
            </a>
            <button disabled className="w-full sm:w-auto px-8 py-4 border border-slate-300 text-slate-400 font-bold tracking-wider uppercase text-sm inline-flex items-center justify-center gap-2 font-mono cursor-not-allowed opacity-50" title="Coming soon">
              <Download className="w-4 h-4" /> DOWNLOAD FOOTPRINT MAP
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}