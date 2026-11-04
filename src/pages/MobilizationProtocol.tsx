import { AlertCircle, Clock, Radio, Bell, Truck, Anchor, ShieldCheck, LogIn } from 'lucide-react';

export default function MobilizationProtocol() {
  // Timeline Track Steps [04]
  const timelineTrack = [
    {
      time: 'MINUTE 0-15',
      icon: <Bell className="w-5 h-5 text-responseGreen" />,
      title: 'Activation',
      copy: 'Command center alert received; focused team matches verification criteria; Global asset tracking indices activate.',
    },
    {
      time: 'MINUTE 15-45',
      icon: <Truck className="w-5 h-5 text-responseGreen" />,
      title: 'Mobilization',
      copy: 'First responders report. Logistics chain allocates priority transit routes for heavy equipment from regional bases.',
    },
    {
      time: 'HOUR 1-4',
      icon: <Anchor className="w-5 h-5 text-responseGreen" />,
      title: 'Interdiction',
      copy: 'On-site asset deployment. Barrier control initialized. Surface skimming begins under satellite guidance.',
    },
    {
      time: 'HOUR 4+',
      icon: <ShieldCheck className="w-5 h-5 text-responseGreen" />,
      title: 'Containment',
      copy: 'Full-perimeter lockdown. Shift to long-term remediation and waste management protocols.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HERO SECTION: OPERATIONAL SPEED PROOF */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-screen" style={{ backgroundImage: "url('/assets/images/training-field-exercises.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4 text-left">
            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">SYSTEM PROTOCOL</p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">MOBILIZATION PROTOCOL</h1>
          </div>

          {/* Lead Floating Box Card */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-white/10 p-6 backdrop-blur-sm text-left flex flex-col justify-between gap-6">
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              The P13 Protocol ensures architectural precision in crisis management, transforming volatile environmental incidents into structured containment within hours.
            </p>
            <div className="border-t border-white/10 pt-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-responseGreen animate-pulse" />
              <div>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">PRIMARY METRIC HORIZON</span>
                <span className="text-sm font-mono font-black text-white uppercase">0–4h CRITICAL RESPONSE WINDOW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [03] THE CRISIS-TO-CONTAINMENT ROADMAP */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Step-by-Step Flow */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-1">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">LOGISTICAL SEQUENCING</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">THE CRISIS-TO-CONTAINMENT ROADMAP</h2>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-100 pl-6 ml-2">
              {/* Step 01 */}
              <div className="relative space-y-2">
                <span className="absolute -left-10 top-0.5 bg-navyPanel text-responseGreen font-mono text-sm font-black w-6 h-6 flex items-center justify-center">01</span>
                <h3 className="text-sm font-bold tracking-wider text-navyPanel uppercase">DETECTION &amp; TRIAGE</h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  Immediate verification through satellite telemetry and local field sensors to determine the spill magnitude and classification.
                </p>
              </div>

              {/* Step 02 */}
              <div className="relative space-y-2">
                <span className="absolute -left-10 top-0.5 bg-navyPanel text-responseGreen font-mono text-sm font-black w-6 h-6 flex items-center justify-center">02</span>
                <h3 className="text-sm font-bold tracking-wider text-navyPanel uppercase">RESOURCE ALLOCATION</h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  Activation of the closest regional response hub. Specialized containment booms and recovery vessels are dispatched within 45 minutes.
                </p>
              </div>

              {/* Step 03 */}
              <div className="relative space-y-2">
                <span className="absolute -left-10 top-0.5 bg-navyPanel text-responseGreen font-mono text-sm font-black w-6 h-6 flex items-center justify-center">03</span>
                <h3 className="text-sm font-bold tracking-wider text-navyPanel uppercase">FIELD EXECUTION</h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  Industrial-grade deployment of physical barriers and chemical neutralization agents under the supervision of senior environmental engineers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Media & System Statistics Card */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between text-left relative min-h-[350px]">
            {/* Visual Placeholder Overlay Graphic */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 grayscale" style={{ backgroundImage: "url('/assets/images/hero-video.gif')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 font-black uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-responseGreen animate-pulse" /> DEPLOYMENT VISUALIZATION
              </span>
            </div>

            {/* Sub-Metrics Row */}
            <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 bg-slate-950/60 backdrop-blur-sm p-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">PERFORMANCE INDEX</span>
                <span className="text-sm font-mono font-black text-white block">98.4% FLUID RECOVERY</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">DISPATCH MATRIX</span>
                <span className="text-sm font-mono font-black text-responseGreen block">24/7/365 TARGET TIMEFRAME</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] TACTICAL OPERATIONS & EXECUTION TIMELINE TRACK */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">TACTICAL OPERATIONS</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">RESPONSE TIMELINE &amp; EXECUTION</h2>
          </div>

          {/* 4-Column Timeline Track Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineTrack.map((track, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 text-left flex flex-col justify-between gap-6 shadow-sm group hover:border-slate-400 transition-colors">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-responseGreen font-black tracking-wider uppercase bg-emerald-50 border border-emerald-200/50 px-2.5 py-1">
                      {track.time}
                    </span>
                    <div className="p-2 bg-slate-50 border border-slate-100 group-hover:bg-navyPanel group-hover:text-white transition-colors">
                      {track.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-navyPanel uppercase tracking-wide">{track.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{track.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] THE MSA ADVANTAGE BLOCK */}
      <section className="py-24 bg-white px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Legal & Operational Efficiency */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">REGULATORY FRICTION REDUCTION</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">THE MSA ADVANTAGE: ZERO FRICTION RESPONSE</h2>
              <p className="text-sm text-slate-700 font-normal leading-relaxed max-w-xl">
                Crisis mobilization is often delayed by legal and financial bureaucracy. CleanAfrica’s Master Service Agreement (MSA) framework eliminates administrative friction.
              </p>
            </div>

            {/* Verified Checklist */}
            <ul className="space-y-3 max-w-md">
              {['PRE-AUTHORIZED FINANCIAL LIMITS', 'PRE-VETTED LEGAL INDEMNITIES', 'PRE-APPROVED OPERATIONAL STANDARD'].map((check) => (
                <li key={check} className="flex items-center gap-3 text-sm font-mono font-bold text-navyPanel">
                  <span className="w-5 h-5 border border-responseGreen bg-emerald-50 text-responseGreen flex items-center justify-center text-[10px] font-black">✓</span>
                  {check}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Live Control Room Background & Member Box */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-6 flex flex-col justify-end relative min-h-[380px] text-left">
            {/* Live Control Room Background Map Simulation */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25 contrast-125 grayscale" style={{ backgroundImage: "url('/assets/images/Logistics_command_center_portrait.webp')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Green Callout Floating Box */}
            <div className="relative z-10 bg-slate-900 border-l-4 border-responseGreen p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-responseGreen animate-pulse" />
                <h4 className="text-sm font-mono font-black tracking-widest uppercase text-responseGreen">MEMBER BENEFIT</h4>
              </div>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                CleanAfrica members receive guaranteed mobilization priority over generic requests during large-scale regional incidents.
              </p>
              <button className="w-full py-3 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold text-sm tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" /> MEMBER LOGIN
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}