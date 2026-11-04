import { useState } from 'react';
import { Wrench, ShieldAlert, Cpu, Layers, Disc, Sliders, Calendar, Download, Eye, ShieldCheck } from 'lucide-react';

export default function EquipmentMaintenance() {
  // [05] Live Asset Registry Status interactive filtering state map
  const [filterRating, setFilterRating] = useState<'ALL' | 'DEPLOYABLE' | 'MAINTENANCE'>('ALL');

  // [04] Specialized Engineering Core Capabilities Data Grid Array
  const engineeringCapabilities = [
    {
      title: 'Hydraulic Power Pack Calibration',
      icon: <Cpu className="w-5 h-5 text-responseGreen" />,
      copy: 'Precision load balancing, fuel-injector mapping, and governor synchronization for diesel-driven high-pressure hydraulic pumps ensuring steady torque delivery.',
    },
    {
      title: 'Boom Substrate Vulcanization',
      icon: <Layers className="w-5 h-5 text-responseGreen" />,
      copy: 'Advanced thermal vulcanization, puncture repair, and seam-integrity reinforcing for heavy marine containment curtains and air-bladder units.',
    },
    {
      title: 'Skimmer Recovery Disc Overhaul',
      icon: <Disc className="w-5 h-5 text-responseGreen" />,
      copy: 'Replacement and alignment of oleophilic disc matrices, brush arrays, and internal scrape systems to maximize oil-adhesion recovery percentages.',
    },
  ];

  // [05] Live Asset Registry Status Table Raw Data Array
  const assetRegistry = [
    {
      id: 'HYD-PACK-04',
      name: 'Vikoma Tier-3 Diesel Power Core',
      date: 'May 14, 2026',
      rating: '100% DEPLOYABLE',
      type: 'DEPLOYABLE',
      actionLabel: 'VIEW RECORD',
    },
    {
      id: 'BOOM-OFF-12',
      name: 'Ro-Boom 1500 Heavy Marine Set',
      date: 'May 19, 2026',
      rating: '98.2% CERTIFIED',
      type: 'DEPLOYABLE',
      actionLabel: 'VIEW RECORD',
    },
    {
      id: 'SKIM-DISC-02',
      name: 'Oleophilic Multi-Disc Extraction Unit',
      date: 'May 22, 2026',
      rating: 'UNDER MAINTENANCE',
      type: 'MAINTENANCE',
      actionLabel: 'VIEW SCHEDULE',
    },
  ];

  // Real-time structural filtering layout resolution
  const filteredAssets = assetRegistry.filter((asset) => {
    if (filterRating === 'ALL') return true;
    return asset.type === filterRating;
  });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] CATEGORY FOCUS & HEADER HERO BLOCK */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-overlay" style={{ backgroundImage: "url('/assets/images/registry-class-skimmers.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            CATEGORY B: READINESS &amp; PREPAREDNESS
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Equipment Maintenance
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Maximizing asset lifecycle efficiency through specialized, licensed engineering support. Our regional service centers protect upstream hardware reliability to secure non-stop incident response readiness.
          </p>
        </div>
      </section>

      {/* [03] SPLIT SERVICE CENTER ARCHITECTURE MATRIX */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Licensed Service Centre */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / LIC-MAINT</span>
                <Wrench className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Certified Tier-1 OEM Repair Hub
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Operating the region's only factory-licensed service center for premier emergency hardware brands, including Vikoma marine systems. We execute strict, documented diagnostic routines, component validation, and engine overhauls using purely authentic factory parts.
              </p>
            </div>

            {/* Technical Parameter List Details */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL LOGISTICS METRICS</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Licensing Scope:</span><span className="font-bold text-navyPanel text-right">Vikoma International, Ro-Clean, Delta Systems</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Engineering Staff:</span><span className="font-bold text-navyPanel text-right">OEM-Trained Hydraulic &amp; Mechanical Techs</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Testing Assets:</span><span className="font-bold text-responseGreen text-right">Custom Static Hydraulic Pressure Rigs</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Asset Lifecycle Management */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / LIFE-MGMT</span>
                <ShieldCheck className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Predictive Performance &amp; Shelf-Life Audits
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Environmental defense hardware spends extended windows in storage but must operate flawlessly under instant load pressure. CleanAfrica deploys regular structural testing, seal inspections, and boom inflation checks to keep stockpiles active.
              </p>
            </div>

            {/* Technical Parameter List Details */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL DIAGNOSTIC LOGS</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Testing Frequency:</span><span className="font-bold text-navyPanel text-right">Quarterly Static Pressure Checks &amp; Power-Pack Runs</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Traceability Track:</span><span className="font-bold text-navyPanel text-right">Digital Log with Unique Blockchain Identity Stamps</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Validation Output:</span><span className="font-bold text-responseGreen text-right">Verified Regulatory Compliance Certificates</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] SPECIALIZED ENGINEERING CORE CAPABILITIES */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CORE CAPABILITIES</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Upstream Competence Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineeringCapabilities.map((cap, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 text-left flex flex-col justify-between gap-4 shadow-sm group hover:border-slate-400 transition-colors">
                <div className="space-y-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 w-fit rounded-sm">
                    {cap.icon}
                  </div>
                  <h3 className="text-sm font-black text-navyPanel uppercase tracking-wider leading-snug">{cap.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{cap.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] LIVE ASSET REGISTRY STATUS GRID */}
      <section className="py-24 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Action Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">STOCKPILE INTEGRITY MATRIX</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">LIVE ASSET STATUS LOGS</h2>
            </div>
            
            {/* Real-time filtering controller tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 border border-slate-200 font-mono text-sm font-bold">
              <button 
                onClick={() => setFilterRating('ALL')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${filterRating === 'ALL' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                All Components
              </button>
              <button 
                onClick={() => setFilterRating('DEPLOYABLE')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${filterRating === 'DEPLOYABLE' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                Deployable
              </button>
              <button 
                onClick={() => setFilterRating('MAINTENANCE')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${filterRating === 'MAINTENANCE' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                Under Maintenance
              </button>
            </div>
          </div>

          {/* Logistical Registry Table Architecture */}
          <div className="border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                  <th className="p-4 font-black">ASSET CLASS</th>
                  <th className="p-4 font-black">HARDWARE / SYSTEM COMPONENT</th>
                  <th className="p-4 font-black">LAST DIAGNOSTICS</th>
                  <th className="p-4 font-black">INTEGRITY RATING</th>
                  <th className="p-4 font-black text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans text-sm">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="p-4 font-mono font-bold text-navyPanel tracking-wider">{asset.id}</td>
                    <td className="p-4 font-black text-navyPanel uppercase">{asset.name}</td>
                    <td className="p-4 font-mono text-slate-600 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {asset.date}
                    </td>
                    <td className="p-4">
                      <span className={`font-mono font-bold px-2 py-1 text-[10px] border tracking-wider uppercase ${
                        asset.type === 'MAINTENANCE' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {asset.rating}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase font-black transition-colors flex items-center justify-center gap-1.5 ml-auto ${
                        asset.type === 'MAINTENANCE' 
                          ? 'border border-slate-300 text-navyPanel hover:bg-slate-900 hover:text-white'
                          : 'bg-responseGreen text-navyPanel hover:bg-emerald-600'
                      }`}>
                        <Eye className="w-3 h-3" /> {asset.actionLabel}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical Hardware Tracking Log Footnote Block */}
          <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <Sliders className="w-3 h-3 text-responseGreen" /> HARDWARE SYSTEM LOGS / RE-VER. 2026.Q3
          </div>
        </div>
      </section>

      {/* [06] LOWER CONVERSION PANEL */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/maintenance-quality-assurance.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-mono font-black tracking-widest uppercase">ENGINEERING OFFICE DIRECTIVE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              PROTECT YOUR ENVIRONMENTAL ASSET LIFE
            </h2>
            <p className="text-sm md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Connect with our engineering superintendents to commission a certified testing audit or initialize a custom fleet repair cycle.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 w-full relative z-10">
            <a href="/portal/maintenance-request" className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-xs transition-colors flex items-center justify-center">SCHEDULE MAINTENANCE</a>
            <button disabled className="w-full py-4 border border-white/10 text-white/30 font-mono text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-2 bg-slate-900/40 cursor-not-allowed opacity-50" title="Coming soon">
              <Download className="w-4 h-4" /> DOWNLOAD MAINTENANCE SPECS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}