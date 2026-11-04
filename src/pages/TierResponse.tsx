import { Radio, ShieldAlert, Database, Ship, Plane, Anchor, Cpu, Compass, Download, CheckSquare } from 'lucide-react';

export default function TierResponse() {
  // [03] Four-Quadrant Core Strategy Matrix Data Setup
  const strategyMatrix = [
    {
      title: 'OFFSHORE CONTAINMENT',
      icon: <Ship className="w-5 h-5 text-responseGreen" />,
      desc: 'High-sea boom deployment systems and skimming vessels capable of sustained operations in Beaufort Scale 6 conditions.',
    },
    {
      title: 'AERIAL DISPERSANT',
      icon: <Plane className="w-5 h-5 text-responseGreen" />,
      desc: 'Strategic partnerships for large-scale aerial application of environmental neutralizing agents globally.',
    },
    {
      title: 'SUBSEA INTERVENTION',
      icon: <Anchor className="w-5 h-5 text-responseGreen" />,
      desc: 'ROV and capping stack mobilization protocols for deep-water well-head containment operations.',
    },
    {
      title: 'TRAJECTORY MODELING',
      icon: <Compass className="w-5 h-5 text-responseGreen" />,
      desc: 'Real-time satellite data integration and predictive spill modeling for tactical deployment optimization.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HERO SECTION & PRIMARY CAPABILITIES */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 grayscale mix-blend-overlay" style={{ backgroundImage: "url('/assets/images/tier-matrix-1.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            STRATEGIC CAPABILITY
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            TIER 2 &amp; 3 RESPONSE
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Global mobilization readiness for large-scale offshore and deepwater environmental incidents. Authoritative command and control protocols.
          </p>
        </div>
      </section>

      {/* [03] DEEPWATER STRATEGY GRID */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Description & Critical Metric Box */}
          <div className="lg:col-span-4 text-left space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-responseGreen tracking-widest uppercase block">OPERATIONAL DEPTH</span>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">DEEPWATER STRATEGY</h2>
            </div>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Deploying specialized technology and high-volume response assets across international maritime boundaries. Our Tier-3 response architecture is built on redundancy and rapid scaling.
            </p>
            
            {/* Metric Box Component */}
            <div className="border border-slate-200 bg-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-5 text-white pointer-events-none">
                <ShieldAlert className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-1">
                <div className="text-4xl font-black font-mono tracking-tight text-responseGreen">24h</div>
                <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                  GLOBAL MOBILIZATION WINDOW
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: 4-Quadrant Strategy Grid Matrix */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strategyMatrix.map((matrix, idx) => (
              <div key={idx} className="border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between text-left shadow-sm hover:border-slate-400 transition-colors group">
                <div className="space-y-4">
                  <div className="p-2 bg-white border border-slate-200 w-fit group-hover:bg-navyPanel group-hover:text-white transition-colors">
                    {matrix.icon}
                  </div>
                  <h3 className="text-sm font-black font-mono tracking-wider text-navyPanel uppercase">
                    {matrix.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    {matrix.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* [04] COMMAND, CONTROL & COMMUNICATIONS (C3) SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          
          {/* Header Row split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end text-left">
            <div className="lg:col-span-5 space-y-1">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">TACTICAL OVERVIEW</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">COMMAND, CONTROL &amp; COMMS (C3)</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
                CleanAfrica operates a unified command structure that integrates seamlessly with local authorities and international regulators during Tier-2 activations.
              </p>
            </div>
          </div>

          {/* Tactical Control Infrastructure Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Primary Module */}
            <div className="lg:col-span-7 bg-navyPanel text-white p-8 flex flex-col justify-between text-left relative overflow-hidden min-h-[340px]">
              <div className="absolute inset-0 bg-cover bg-center opacity-5 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/tier-hero-backdrop.webp')" }} />
              <div className="space-y-4 relative z-10">
                <span className="inline-block bg-slate-900 border border-white/10 text-slate-400 text-[9px] font-mono tracking-widest font-bold px-2.5 py-1 uppercase">
                  CENTRAL NEXUS
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  MOBILE COMMAND CENTER (MCC)
                </h3>
                <p className="text-sm text-slate-300 max-w-lg font-normal leading-relaxed">
                  Self-contained communications hub with satellite backhaul, secure voice, and integrated GIS mapping capabilities.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mt-6 relative z-10 flex items-center gap-3 text-responseGreen text-[10px] font-mono font-bold tracking-widest uppercase">
                <Radio className="w-4 h-4 animate-pulse" /> SATELLITE COMMS UPLINK ACTIVE
              </div>
            </div>

            {/* Right Stacked Column Secondary Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 p-6 flex items-start gap-4 text-left shadow-sm">
                <div className="p-2.5 bg-slate-50 border border-slate-100 text-navyPanel shrink-0">
                  <Cpu className="w-5 h-5 text-responseGreen" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black font-mono tracking-wide text-navyPanel uppercase">INTEROPERABILITY</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Full-spectrum radio bridging between maritime VHF, satellite, and local emergency frequencies.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 p-6 flex items-start gap-4 text-left shadow-sm">
                <div className="p-2.5 bg-slate-50 border border-slate-100 text-navyPanel shrink-0">
                  <Database className="w-5 h-5 text-responseGreen" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black font-mono tracking-wide text-navyPanel uppercase">LIVE TELEMETRY</h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Direct uplink from field response teams providing real-time visual and sensor data to the command node.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Operational Philosophy Lower Band Overlay */}
          <div className="bg-slate-900 text-white p-6 border-l-4 border-responseGreen text-left max-w-4xl mx-auto mt-6">
            <span className="block text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">OPERATIONAL PHILOSOPHY</span>
            <p className="text-sm md:text-sm italic font-medium text-slate-200 leading-relaxed">
              &ldquo;Information clarity is the primary driver of tactical success in complex maritime emergencies.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* [05] OPERATIONAL READINESS CALL TO ACTION (CONVERSION) */}
      <section className="bg-white py-24 px-6 lg:px-16 text-center border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CONTINGENCY AUDITING</span>
            <h2 className="text-3xl font-black text-navyPanel tracking-tight uppercase">MAINTAIN OPERATIONAL READINESS</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
              Ensure asset protection deployment configurations align with multi-jurisdictional criteria prior to marine theater entry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto relative z-10">
            <a href="mailto:enquiry@clean-africa.org" className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none flex items-center justify-center">
              AUDIT RESPONSE PLAN
            </a>
            <button disabled className="w-full py-4 border border-slate-300 text-slate-400 font-mono text-sm tracking-widest font-bold uppercase flex items-center justify-center gap-2 cursor-not-allowed opacity-50 whitespace-nowrap" title="Coming soon">
              <Download className="w-4 h-4" /> DOWNLOAD TECHNICAL SPECS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}