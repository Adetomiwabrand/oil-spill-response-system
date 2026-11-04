import { ShieldAlert, Droplet, Trees, Bird, ClipboardCheck, Layers, Waves, Flame, Download } from 'lucide-react';

export default function ShorelineRecovery() {
  // [04] SCAT Assessment Process Capabilities Data Array
  const coreCapabilities = [
    {
      title: 'Shoreline Cleanup Assessment Technique (SCAT)',
      icon: <ClipboardCheck className="w-5 h-5 text-responseGreen" />,
      copy: 'Systematic intertidal land surveys to categorize oiling degrees, select optimal cleanup tactics, and establish data-driven termination criteria for operational sign-off.',
    },
    {
      title: 'In-Situ Soil & Sand Washing',
      icon: <Layers className="w-5 h-5 text-responseGreen" />,
      copy: 'On-site segregation, high-efficiency flushing, and fluid filtration systems that extract hydrocarbons from contaminated substrate layers without removing native organic deposits.',
    },
    {
      title: 'Fauna Exclusion & Hazing Barriers',
      icon: <Waves className="w-5 h-5 text-responseGreen" />,
      copy: 'Proactive deployment of acoustic deterrent arrays and visual exclusion fencing to prevent uncontaminated wildlife populations from migrating into active spill zones.',
    },
  ];

  // [05] Specialized Field Hardware Inventory Grid Data Array
  const hardwareInventory = [
    {
      type: 'RECOVERY TYPE 01',
      name: 'Low-Pressure Flushing Pumps',
      icon: <Droplet className="w-5 h-5 text-responseGreen" />,
      metrics: [
        { label: 'Model', val: 'Hydro-Flusher 250-L' },
        { label: 'Operating Pressure', val: 'Adjustable 2–6 Bar' },
        { label: 'Optimal Target', val: 'Mangrove root protection' },
      ],
    },
    {
      type: 'RECOVERY TYPE 02',
      name: 'Mobile Fauna Cleaning Clinics',
      icon: <Bird className="w-5 h-5 text-responseGreen" />,
      metrics: [
        { label: 'Container Type', val: '20ft Tactical ISO Module' },
        { label: 'Daily Throughput', val: 'Up to 120 Avian cases' },
        { label: 'Feature', val: 'Self-contained water treatment' },
      ],
    },
    {
      type: 'RECOVERY TYPE 03',
      name: 'Sorbent Boom Array Stockpiles',
      icon: <Flame className="w-5 h-5 text-responseGreen" />,
      metrics: [
        { label: 'Material', val: 'Hydrophobic Polypropylene' },
        { label: 'Absorption Ratio', val: '25x its weight in fluid' },
        { label: 'Target Deployment', val: 'Marsh and mudflat perimeters' },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] CATEGORY FOCUS HERO PANEL */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-overlay" style={{ backgroundImage: "url('/assets/images/recovery_barrels_on_quay_side.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
          <div className="lg:col-span-8 space-y-4 text-left">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
              CATEGORY A: INCIDENT RESPONSE
            </span>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
              Shoreline &amp; Wildlife Recovery
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
              Specialized environmental remediation for complex coastal intertidal zones, sensitive mangrove swamps, and vulnerable marine fauna populations impacted by petrochemical contamination.
            </p>
          </div>
        </div>
      </section>

      {/* [03] ENVIRONMENTAL REMEDIATION PILLARS */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Shoreline Remediation */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODES / SHORELINE</span>
                <Trees className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Mangrove &amp; Estuarine Restoration
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Low-pressure flushing and targeted bioremediation protocols designed explicitly for fragile root networks and muddy substrate ecosystems. CleanAfrica deploys specialized Shoreline Cleanup Assessment Technique (SCAT) teams to map contamination zones accurately while minimizing mechanical disruption.
              </p>
            </div>

            {/* Technical Parameter List */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL CRITERIA</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Ecosystem Target:</span><span className="font-bold text-navyPanel">Mangrove Creeks, Tidal Flats</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Methodology:</span><span className="font-bold text-navyPanel">SCAT Assessment + Bio-Agents</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Standards Alignment:</span><span className="font-bold text-responseGreen">ISO 14001 Compliant</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Wildlife Recovery */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODES / WILDLIFE</span>
                <Bird className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Avian &amp; Marine Fauna Oiled Mitigation
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Immediate field stabilization, chemical decontamination, and veterinary rehabilitation infrastructure for oiled birds, sea turtles, and local marine mammals. Operating in strict alignment with international wildlife response networks to maintain biodiversity indicators.
              </p>
            </div>

            {/* Technical Parameter List */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL CRITERIA</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Fauna Focus:</span><span className="font-bold text-navyPanel">Migratory Birds &amp; Reptiles</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Infrastructure:</span><span className="font-bold text-navyPanel">Mobile ISO Stabilization Units</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Standards Alignment:</span><span className="font-bold text-responseGreen">IPIECA Framework Blueprint</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] SCAT ASSESSMENT PROCESS (CORE CAPABILITIES) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CORE CAPABILITIES</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Precision Ecological Mitigation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreCapabilities.map((cap, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 text-left flex flex-col justify-between gap-4 shadow-sm">
                <div className="space-y-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 w-fit">
                    {cap.icon}
                  </div>
                  <h3 className="text-sm font-bold text-navyPanel uppercase tracking-wider leading-snug">{cap.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{cap.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] SPECIALIZED FIELD HARDWARE INVENTORY GRID */}
      <section className="py-24 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">SPECIALIZED RECOVERY ASSETS</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">LOGISTICAL INVENTORY</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hardwareInventory.map((item, i) => (
              <div key={i} className="border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between text-left shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-navyPanel uppercase tracking-wide">{item.name}</h4>
                  
                  <div className="pt-2 space-y-1.5 font-mono text-[11px]">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-200/40 pb-1 last:border-0">
                        <span className="text-slate-500">{m.label}:</span>
                        <span className="font-bold text-navyPanel text-right">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [06] CONTINUOUS ENVIRONMENTAL STANDBY (CONVERSION) */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity" style={{ backgroundImage: "url('/assets/images/consultancy-risk-modeling-portrait.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-mono font-black tracking-widest uppercase">CRITICAL SYSTEM DIRECTIVE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              RECOVERY OPERATIONS CANNOT WAIT FOR LEGAL REVIEWS.
            </h2>
            <p className="text-sm md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Secure pre-approved environmental remediation and SCAT prioritization frameworks under an active CleanAfrica MSA to combat ecosystem threats immediately.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 relative z-10 w-full">
            <a href="mailto:enquiry@clean-africa.org" className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none flex items-center justify-center">
              REQUEST REMEDIATION FRAMEWORK
            </a>
            <button disabled className="w-full py-4 border border-white/10 text-white/30 font-mono text-sm tracking-widest font-bold uppercase flex items-center justify-center gap-2 bg-slate-900/40 cursor-not-allowed opacity-50" title="Coming soon">
              <Download className="w-4 h-4" /> DOWNLOAD SCAT BLUEPRINTS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}