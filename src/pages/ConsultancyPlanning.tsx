import { useState } from 'react';
import { ShieldAlert, BarChart3, FileText, Scale, Globe, Compass, Sliders, Download, Eye, CheckCircle2 } from 'lucide-react';

export default function ConsultancyPlanning() {
  // [05] Dynamic Framework Registry interactive state filtering map
  const [registryFilter, setRegistryFilter] = useState<'ALL' | 'ACTIVE' | 'REVIEW'>('ALL');

  // [04] Strategic Advisory Frameworks - Capability Array
  const strategicCapabilities = [
    {
      title: 'Net Environmental Benefit Analysis (NEBA / SIMA)',
      icon: <BarChart3 className="w-5 h-5 text-responseGreen" />,
      copy: 'Data-driven strategic assessments weighing response choices (e.g., dispersants vs. mechanical skimming) to select the exact path that minimizes aggregate environmental footprints.',
    },
    {
      title: 'Tactical Shoreline Mapping',
      icon: <Compass className="w-5 h-5 text-responseGreen" />,
      copy: 'Systematic structural geomorphology assessments dividing operational perimeters into precise SCAT segments to establish baseline pre-spill conditions.',
    },
    {
      title: 'Trans-Boundary Risk Auditing',
      icon: <Scale className="w-5 h-5 text-responseGreen" />,
      copy: 'High-level policy consulting resolving compliance friction for assets spanning intersecting exclusive economic zones (EEZs) or shared maritime shipping lanes.',
    },
  ];

  // [05] Dynamic Framework Registry Table Data Array
  const registryRecords = [
    {
      id: 'OSCP-MAR-NG',
      focus: 'Tier-2/3 Terminal Contingency Layout',
      window: 'Active Renewal',
      statusType: 'ACTIVE',
      code: 'NOSDRA-APPROVED',
      actionLabel: 'VIEW SCHEME',
    },
    {
      id: 'NEBA-DEEP-GOG',
      focus: 'Deepwater Dispersant Optimization Matrix',
      window: 'Completed Q2',
      statusType: 'ACTIVE',
      code: 'IMO-COMPLIANT',
      actionLabel: 'DOWNLOAD REQ',
    },
    {
      id: 'ESI-MANG-04',
      focus: 'Delta Mangrove Sensitivity Index Map',
      window: 'Under Review',
      statusType: 'REVIEW',
      code: 'ISO-14001-VAL',
      actionLabel: 'TRACK STATUS',
    },
  ];

  // Structural runtime filtering logic
  const filteredRegistry = registryRecords.filter((record) => {
    if (registryFilter === 'ALL') return true;
    return record.statusType === registryFilter;
  });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] CATEGORY FOCUS & HEADER HERO BLOCK */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-overlay" style={{ backgroundImage: "url('/assets/images/consultancy-advisory-backdrop.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            CATEGORY C: RISK GOVERNANCE &amp; STRATEGY
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Consultancy &amp; Contingency Planning
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Developing sovereign compliance frameworks, hydrodynamic oil spill modeling, and predictive risk auditing. We engineer ironclad, multi-tier contingency strategies that shield energy producers from structural liabilities.
          </p>
        </div>
      </section>

      {/* [03] SPLIT ADVISORY STREAM ARCHITECTURE */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Risk Modeling & Mapping */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / RISK-MOD</span>
                <Globe className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Hydrodynamic Spill &amp; Sensitivity Modeling
              </h2>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Utilizing advanced stochastic algorithms and localized ocean current data to map potential spill trajectories across delicate coastlines. Our technical teams provide high-fidelity predictive modeling that allows upstream operators to pre-position response assets accurately before a crisis breaks.
              </p>
            </div>

            {/* Technical Parameters Sub-Block */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">MODELING METRICS SPECIFICATION</span>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Software Engines:</span><span className="font-bold text-navyPanel text-right">MIKE 21, OSCAR (Spill Contingency &amp; Response)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Mapping Output:</span><span className="font-bold text-navyPanel text-right">Environmental Sensitivity Index (ESI) Coastal Maps</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Data Inputs:</span><span className="font-bold text-responseGreen text-right">Real-Time Bathymetric Surveys &amp; Tidal Records</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Contingency Plan Authoring */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / CONT-PLAN</span>
                <FileText className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Regulatory Oil Spill Contingency Plans (OSCP)
              </h2>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Drafted and defense-tested to pass strict local and trans-boundary operational protocols. We align your asset's internal safety architectures with sovereign mandates, ensuring that Tier-1, Tier-2, and Tier-3 mobilization thresholds are clearly articulated and certified.
              </p>
            </div>

            {/* Technical Parameters Sub-Block */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">COMPLIANCE STRATEGY SCOPE</span>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Regulatory Compliance:</span><span className="font-bold text-navyPanel text-right">NOSDRA, EPA, IMO OPRC Convention Standards</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Plan Integration:</span><span className="font-bold text-navyPanel text-right">Incident Command System (ICS) Role Mapping</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Validation Output:</span><span className="font-bold text-responseGreen text-right">Official Government-Approved Operating Permits</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] STRATEGIC ADVISORY CAPABILITIES MATRIX */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-xs font-mono tracking-widest text-responseGreen uppercase font-black">CORE CAPABILITIES</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Upstream Competence Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategicCapabilities.map((cap, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 text-left flex flex-col justify-between gap-4 shadow-sm hover:border-slate-400 transition-colors">
                <div className="space-y-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 w-fit rounded-sm">
                    {cap.icon}
                  </div>
                  <h3 className="text-sm font-black text-navyPanel uppercase tracking-wider leading-snug">{cap.title}</h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{cap.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] DYNAMIC FRAMEWORK REGISTRY LAYER */}
      <section className="py-24 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Section Dynamic Filtering Layout */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-responseGreen uppercase font-black">COMPLIANCE &amp; MODELING REGISTRY</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">GOVERNANCE AUDIT PORTAL</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 border border-slate-200 font-mono text-xs font-bold">
              <button 
                onClick={() => setRegistryFilter('ALL')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${registryFilter === 'ALL' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                All Schemes
              </button>
              <button 
                onClick={() => setRegistryFilter('ACTIVE')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${registryFilter === 'ACTIVE' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                Active Renewals
              </button>
              <button 
                onClick={() => setRegistryFilter('REVIEW')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${registryFilter === 'REVIEW' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                Under Review
              </button>
            </div>
          </div>

          {/* Governance Table Grid Layout */}
          <div className="border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                  <th className="p-4 font-black">PROJECT ID</th>
                  <th className="p-4 font-black">STRATEGY / COMPLIANCE FOCUS</th>
                  <th className="p-4 font-black">AUDIT WINDOW</th>
                  <th className="p-4 font-black">ACCREDITATION CODE</th>
                  <th className="p-4 font-black text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans text-xs">
                {filteredRegistry.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="p-4 font-mono font-bold text-navyPanel tracking-wider">{record.id}</td>
                    <td className="p-4 font-black text-navyPanel uppercase">{record.focus}</td>
                    <td className="p-4 font-mono text-slate-600">{record.window}</td>
                    <td className="p-4">
                      <span className={`font-mono font-bold px-2 py-1 text-[10px] border tracking-wider uppercase ${
                        record.statusType === 'REVIEW' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {record.code}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase font-black transition-colors flex items-center justify-center gap-1.5 ml-auto ${
                        record.statusType === 'REVIEW' 
                          ? 'border border-slate-300 text-navyPanel hover:bg-slate-900 hover:text-white'
                          : 'bg-responseGreen text-navyPanel hover:bg-emerald-600'
                      }`}>
                        <Eye className="w-3 h-3" /> {record.actionLabel}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical System Log Footnote Block */}
          <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <Sliders className="w-3 h-3 text-responseGreen" /> AUDIT LOG ARCHIVE / RE-VER. 2026.Q3
          </div>
        </div>
      </section>

      {/* [06] LOWER CONVERSION PANEL */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: "url('/assets/images/consultancy-hero-backdrop.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-black tracking-widest uppercase">STRATEGY COMMAND SYSTEM</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              PRE-EMPT OPERATIONAL VULNERABILITIES
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Commission a comprehensive environmental risk modeling study or initialize an official OSCP compliance review with our strategy team.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <a href="mailto:enquiry@clean-africa.org" className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-xs transition-colors focus:outline-none flex items-center justify-center">
              ENGAGE CONSULTANCY
            </a>
            <button disabled className="w-full py-4 border border-white/10 text-white/30 font-mono text-xs tracking-widest font-bold uppercase flex items-center justify-center gap-2 bg-slate-900/40 cursor-not-allowed opacity-50 whitespace-nowrap" title="Coming soon">
              <Download className="w-4 h-4" /> DOWNLOAD CASE STUDIES
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}