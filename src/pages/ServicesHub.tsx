import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { GraduationCap, Wrench, FileCheck, Layers, ChevronRight, Download, Sliders, CheckCircle2 } from 'lucide-react';

export default function ServicesHub() {
  // [03] Dual-Pillar Tab State Management
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  // Animation hooks
  const { ref: matrixRef, inView: matrixInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: ctaRef,    inView: ctaInView    } = useInView<HTMLDivElement>({ threshold: 0.2 });

  // [06] Operational Readiness Matrix Technical Specifications Data Table
  const matrixData = [
    {
      id: 'OFFSHORE-T3-IR',
      resource: 'Heavy Marine Vessels + Satellite Ops',
      timeframe: 'Immediate (24/7)',
      compliance: 'IMO LEVEL 3',
    },
    {
      id: 'RECOVERY-SHORE-01',
      resource: 'Mobile Decontamination Units',
      timeframe: 'Within 12 Hours',
      compliance: 'ISO 14001',
    },
    {
      id: 'AUDIT-CONSULT-SPEC',
      resource: 'Lead Technical Strategists',
      timeframe: 'Project Based',
      compliance: 'NOSDRA INTL',
    },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HUB INTRODUCTION HERO */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navyPanel via-navyPanel/85 to-navyPanel/60 mix-blend-multiply" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale contrast-125 pointer-events-none"
        >
          <source src="/assets/images/Drone_tracking_containment_boom.mp4" type="video/mp4" />
        </video>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black animate-fade-up" style={{ animationDelay: '0ms' }}>SERVICES HUB</p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase animate-fade-up" style={{ animationDelay: '100ms' }}>Operational Excellence Hub</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal animate-fade-up" style={{ animationDelay: '200ms' }}>
            CleanAfrica Associates delivers precision-engineered environmental safeguards. From tier-classified response units to long-term asset maintenance, our services are the backbone of industrial integrity across the continent.
          </p>
        </div>
      </section>

      {/* [03] DUAL-PILLAR NAVIGATION TOGGLE CONTROLS */}
      <section className="bg-slate-900 text-white sticky top-20 z-20 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2">
          <button 
            onClick={() => setActiveTab('A')}
            className={`py-5 text-center text-sm font-mono font-bold uppercase tracking-widest transition-all focus:outline-none border-b-2 ${
              activeTab === 'A' 
                ? 'bg-slate-950 text-responseGreen border-responseGreen font-black' 
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Category A: Incident Response
          </button>
          <button 
            onClick={() => setActiveTab('B')}
            className={`py-5 text-center text-sm font-mono font-bold uppercase tracking-widest transition-all focus:outline-none border-b-2 ${
              activeTab === 'B' 
                ? 'bg-slate-950 text-responseGreen border-responseGreen font-black' 
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Category B: Readiness &amp; Preparedness
          </button>
        </div>
      </section>

      {/* DYNAMIC CONTENT CONTAINER BASED ON TAB SELECTION */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          
          {activeTab === 'A' ? (
            /* [04] FEATURED INCIDENT RESPONSE GRID (TAB A) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
              {/* Left Column: Primary Response Core */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between text-left relative overflow-hidden min-h-[380px]">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-multiply" style={{ backgroundImage: "url('/assets/images/tier-hero-backdrop.webp')" }} aria-hidden="true" />
                <div className="space-y-6">
                  <span className="inline-block bg-navyPanel text-white text-[10px] font-mono tracking-widest font-black px-3 py-1 uppercase">
                    PRIMARY RESPONSE
                  </span>
                  <h3 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                    Tier-2 / 3 Incident Management
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
                    Large-scale rapid mobilization for major environmental contingencies, utilizing advanced satellite tracking and heavy containment hardware.
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-200 mt-8">
                  <Link 
                    to="/services/incident-response"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-sm tracking-widest font-bold uppercase transition-colors"
                  >
                    VIEW CAPABILITIES <ChevronRight className="w-4 h-4 text-responseGreen" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 flex flex-col justify-between text-left shadow-sm overflow-hidden">
                <div className="h-40 overflow-hidden shrink-0">
                  <img src="/assets/images/registry-containment-primary.webp" alt="Shoreline Recovery" loading="lazy" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="text-xl font-black text-navyPanel uppercase tracking-tight">Shoreline Recovery</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Precision restoration of delicate coastal ecosystems using non-invasive biological and mechanical extraction techniques.
                  </p>
                  
                  {/* Feature Bullet Points */}
                  <ul className="space-y-2 pt-2">
                    {['ECOSYSTEM ASSESSMENT', 'SAND REMEDIATION', 'MANGROVE PROTECTION'].map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-[10px] font-mono font-bold text-navyPanel">
                        <CheckCircle2 className="w-4 h-4 text-responseGreen" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-slate-100">
                  <Link 
                    to="/services/shoreline-recovery"
                    className="text-sm font-mono tracking-widest uppercase font-black text-navyPanel hover:text-responseGreen border-b border-navyPanel hover:border-responseGreen pb-0.5 transition-colors"
                  >
                    CASE STUDIES
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* [05] READINESS & PREPAREDNESS HIGHER-CONTRAST DISTINCT TILES (TAB B) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-slate-900 text-white border border-slate-800 p-6 flex flex-col justify-between text-left shadow-xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale" style={{ backgroundImage: "url('/assets/images/training-hero-backdrop.webp')" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="p-3 bg-white/5 border border-white/10 w-fit text-responseGreen group-hover:bg-responseGreen group-hover:text-navyPanel transition-all duration-200">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide">Specialized Training</h3>
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    IMO Level 1–3 certification programs and custom field drills for industrial personnel.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                  <Link to="/services/imo-training" className="block text-center py-2.5 bg-responseGreen text-navyPanel hover:bg-emerald-400 font-mono text-sm tracking-widest font-black uppercase transition-colors">
                    VIEW MODULES
                  </Link>
                </div>
              </div>

              {/* Card 2: Equipment Maintenance */}
              <div className="bg-slate-900 text-white border border-slate-800 p-6 flex flex-col justify-between text-left shadow-xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale" style={{ backgroundImage: "url('/assets/images/maintenance-hero-backdrop.webp')" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="p-3 bg-white/5 border border-white/10 w-fit text-responseGreen group-hover:bg-responseGreen group-hover:text-navyPanel transition-all duration-200">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide">Equipment Maintenance</h3>
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    Lifecycle management and rigorous testing protocols for mission-critical response hardware to licensed standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                  <Link to="/services/equipment-maintenance" className="block text-center py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-mono text-sm tracking-widest font-bold uppercase transition-colors">
                    MAINTENANCE SCHEDULES
                  </Link>
                </div>
              </div>

              {/* Card 3: Strategic Consultancy */}
              <div className="bg-slate-900 text-white border border-slate-800 p-6 flex flex-col justify-between text-left shadow-xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale" style={{ backgroundImage: "url('/assets/images/consultancy-hero-backdrop.webp')" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="p-3 bg-white/5 border border-white/10 w-fit text-responseGreen group-hover:bg-responseGreen group-hover:text-navyPanel transition-all duration-200">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide">Strategic Consultancy</h3>
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    Regulatory compliance mapping, risk modeling, and operational readiness auditing for energy leaders.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                  <Link to="/services/consultancy" className="block text-center py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-mono text-sm tracking-widest font-bold uppercase transition-colors">
                    REQUEST ENGAGEMENT
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* [06] OPERATIONAL READINESS MATRIX SPECIFICATION TABLE */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div ref={matrixRef} className={['flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-left', matrixInView ? 'animate-fade-up' : 'opacity-0'].join(' ')}>
            <div className="space-y-1">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">LOGISTICAL OVERVIEW</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">OPERATIONAL READINESS MATRIX</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 border border-slate-300 font-mono text-[10px] tracking-widest text-navyPanel/70 uppercase font-bold">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              TECHNICAL SPECIFICATIONS / VER. 2026.Q3
            </div>
          </div>

          {/* Responsive Technical Border Table Layout */}
          <div className={['overflow-x-auto border border-slate-200 bg-white', matrixInView ? 'animate-fade-up' : 'opacity-0'].join(' ')} style={{ animationDelay: matrixInView ? '100ms' : '0ms' }}>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                  <th className="py-4 px-6 font-black">Service Identifier</th>
                  <th className="py-4 px-6 font-black">Resource Allocation</th>
                  <th className="py-4 px-6 font-black">Response Timeframe</th>
                  <th className="py-4 px-6 font-black">Compliance Level</th>
                  <th className="py-4 px-6 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {matrixData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-navyPanel">{row.id}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium">{row.resource}</td>
                    <td className="py-4 px-6 text-slate-600 font-normal">{row.timeframe}</td>
                    <td className="py-4 px-6 font-mono text-responseGreen font-black">{row.compliance}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="px-4 py-2 bg-slate-100 hover:bg-navyPanel hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider">
                        REQUEST SPECS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* [07] LOWER CONVERSION PANEL (CTA) */}
      <section className="bg-white py-20 px-6 lg:px-16 text-center border-b border-slate-200">
        <div ref={ctaRef} className={['max-w-4xl mx-auto space-y-6', ctaInView ? 'animate-fade-up' : 'opacity-0'].join(' ')}>
          <div className="p-3 bg-slate-50 border border-slate-200 inline-block text-navyPanel">
            <Sliders className="w-6 h-6 text-responseGreen" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-navyPanel">
              REQUEST OPERATIONAL SUPPORT
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
              Speak with our technical leads to configure a customized service package for your specific asset location.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue">
              CONFIGURE SERVICE
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-slate-300 hover:border-slate-800 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors inline-flex items-center justify-center gap-2 font-mono">
              <Download className="w-4 h-4 text-responseGreen" /> DOWNLOAD CATALOGUE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}