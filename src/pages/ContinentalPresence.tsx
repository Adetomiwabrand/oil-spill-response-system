import { useState } from 'react';
import { useInView } from '../hooks/useInView';
// Cleaned up imports: removed ShieldAlert and CheckCircle
import { Shield, Anchor, Download, Layers, Users, Clock, Compass, Activity } from 'lucide-react';

interface HubDetail {
  id: string;
  name: string;
  coordinates: string;
  description: string;
  personnel: string;
  responseTime: string;
  status: 'OPERATIONAL' | 'UPGRADING' | 'PROPOSED';
  assets: string[];
}

export default function ContinentalPresence() {
  const [activeHub, setActiveHub] = useState<string>('lagos');

  // Animation hooks
  const { ref: hubHeaderRef,  inView: hubHeaderInView  } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: hubPanelRef,   inView: hubPanelInView   } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: protocolRef,   inView: protocolInView   } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: capsRef,       inView: capsInView       } = useInView<HTMLDivElement>({ threshold: 0.15 });

  // Hub Intelligence Data Map [02]
  const hubsList: Record<string, HubDetail> = {
    lagos: {
      id: 'lagos',
      name: 'Lagos Hub (HQ-Benin)',
      coordinates: '6.4281° N, 3.4219° E',
      description: 'Primary logistics and maritime coordination center for the Bight of Benin.',
      personnel: '142 Staff',
      responseTime: '45 Mins',
      status: 'OPERATIONAL',
      assets: ['Tier-3 Containment Booms', 'High-Volume Skimmers', 'Offshore Escort Vessels'],
    },
    accra: {
      id: 'accra',
      name: 'Accra Site',
      coordinates: '5.6037° N, 0.1870° W',
      description: 'Strategic deep-water asset deployment and environmental monitoring station.',
      personnel: '88 Staff',
      responseTime: '60 Mins',
      status: 'OPERATIONAL',
      assets: ['Fast-Response Crafts', 'Dispersant Spray Systems', 'GIS Mapping Marine Unit'],
    },
    abidjan: {
      id: 'abidjan',
      name: 'Abidjan Port',
      coordinates: '5.3167° N, 4.0333° W',
      description: 'Western sector coordination facility with specialized chemical response units.',
      personnel: '64 Staff',
      responseTime: '75 Mins',
      status: 'OPERATIONAL',
      assets: ['Chemical Hazmat Gear', 'Bio-Remediation stockpiles', 'Shallow Water Skimmers'],
    },
  };

  // Mobilization Protocol Data Sequence [03]
  const protocolSteps = [
    {
      step: '01',
      title: 'EVENT DETECTION',
      copy: 'Continuous satellite and AIS monitoring triggers automated threat detection and regional alert protocols.',
    },
    {
      step: '02',
      title: 'VERIFICATION',
      copy: 'Intelligence analysis at the nearest command hub validates the incident scale and resource requirements.',
    },
    {
      step: '03',
      title: 'DEPLOYMENT',
      copy: 'Immediate launch of primary strike teams and pre-cleared assets from the designated regional base.',
    },
    {
      step: '04',
      title: 'RESTORATION',
      copy: 'Long-term environmental remediation and post-incident impact assessment reporting phase.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [01] HERO / STRATEGIC INFRASTRUCTURE */}
      <section className="relative min-h-[50vh] bg-navyPanel flex flex-col justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden border-b-4 border-responseGreen">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navyPanel via-navyPanel/85 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25 grayscale contrast-125" style={{ backgroundImage: "url('/assets/images/RHIB_cutting_through_coastal_waters_portrait.webp')" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md animate-fade-up" style={{ animationDelay: '0ms' }}>
              <span className="w-2 h-2 rounded-full bg-responseGreen animate-pulse" />
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-semibold">REGIONAL FOOTPRINT CONFIGURATION</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] animate-fade-up" style={{ animationDelay: '100ms' }}>
              Continental Presence
            </h1>
            
            <p className="text-base md:text-xl text-white/80 max-w-3xl leading-relaxed font-normal animate-fade-up" style={{ animationDelay: '200ms' }}>
              CleanAfrica Associates maintains high-readiness operational bases across the West African coastline, ensuring rapid environmental response and industrial compliance monitoring within hours of notification.
            </p>
          </div>

          {/* Quick Technical Counters */}
          <div className="lg:col-span-4 w-full grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '280ms' }}>
            <div className="bg-slate-950/60 backdrop-blur-sm p-5 border border-white/10 text-left">
              <span className="block text-[10px] font-mono tracking-widest text-slate-500 font-bold">BASE MATRIX</span>
              <span className="block text-3xl font-black text-responseGreen font-mono mt-1">12</span>
              <span className="block text-[10px] font-mono text-white/70 uppercase tracking-wider mt-0.5">Operational Bases</span>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-sm p-5 border border-white/10 text-left">
              <span className="block text-[10px] font-mono tracking-widest text-slate-500 font-bold">STATUS CONTEXT</span>
              <span className="block text-2xl font-black text-white font-mono mt-1.5">24/7</span>
              <span className="block text-[10px] font-mono text-responseGreen uppercase tracking-wider font-bold mt-1">Readiness Status</span>
            </div>
          </div>
        </div>
      </section>

      {/* [02] HUB INTELLIGENCE INTERACTIVE PANEL */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          <div ref={hubHeaderRef} className={['text-left space-y-2 mb-12', hubHeaderInView ? 'animate-fade-up' : 'opacity-0'].join(' ')}>
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">INFRASTRUCTURE EXPLORER</span>
            <h2 className="text-3xl font-black tracking-tight text-navyPanel">Hub Intelligence Node Data</h2>
          </div>

          <div ref={hubPanelRef} className={['grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch', hubPanelInView ? 'animate-fade-up' : 'opacity-0'].join(' ')}>
            
            {/* Interactive Data Control Column (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                {Object.values(hubsList).map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub.id)}
                    className={`w-full text-left p-5 border transition-all duration-150 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-signalBlue ${
                      activeHub === hub.id 
                        ? 'bg-navyPanel text-white border-navyPanel shadow-md' 
                        : 'bg-slate-50 text-navyPanel border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-sm font-bold tracking-wide uppercase block">{hub.name}</span>
                      <span className={`text-[10px] font-mono block ${activeHub === hub.id ? 'text-responseGreen' : 'text-slate-400'}`}>
                        {hub.coordinates}
                      </span>
                    </div>
                    <Compass className={`w-5 h-5 ${activeHub === hub.id ? 'text-responseGreen' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>

              {/* Selected Node Status Manifest Panel */}
              <div className="bg-slate-900 text-white p-6 border-b-4 border-responseGreen text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">METRIC MONITOR</span>
                  <span className="text-[10px] font-mono bg-responseGreen text-navyPanel font-black px-2 py-0.5">
                    {hubsList[activeHub].status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {hubsList[activeHub].description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Personnel Deployment</span>
                    <div className="flex items-center gap-2 text-sm font-bold font-mono text-white">
                      <Users className="w-4 h-4 text-responseGreen" />
                      {hubsList[activeHub].personnel}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">Response Horizon</span>
                    <div className="flex items-center gap-2 text-sm font-bold font-mono text-white">
                      <Clock className="w-4 h-4 text-responseGreen" />
                      {hubsList[activeHub].responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Vector Visualization Display Box (Right) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden text-left min-h-[400px]">
              <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity" style={{ backgroundImage: "url('/assets/images/Logistics_command_center_portrait.webp')" }} />
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-600 block uppercase font-bold">RADAR RENDER VECTORS</span>
                  <span className="text-sm font-mono text-responseGreen uppercase font-black tracking-wider">
                    GRID TARGET: {hubsList[activeHub].coordinates}
                  </span>
                </div>
                <Activity className="w-5 h-5 text-responseGreen animate-pulse" />
              </div>

              <div className="relative z-10 my-auto py-8 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase font-bold">STATIONED LOGISTICS INVENTORY</span>
                <div className="flex flex-wrap gap-2">
                  {hubsList[activeHub].assets.map((asset, index) => (
                    <span key={index} className="text-sm font-mono bg-white/5 border border-white/10 text-white px-3 py-1.5 flex items-center gap-2">
                      <Anchor className="w-3 h-3 text-responseGreen" />
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 border-t border-slate-800 pt-4 flex items-center justify-between text-sm font-mono text-slate-500">
                <span>SYSTEM SCANNER: CA-WEST-01</span>
                <span className="text-responseGreen font-bold">✓ STREAM STABLE</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [03] MOBILIZATION PROTOCOL FLUID CHAIN */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="text-left space-y-2">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CRISIS-TO-CONTAINMENT TIMELINE</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">The Mobilization Protocol</h2>
            </div>
            
            <a 
              href="/assets/images/mobilization-protocol.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navyPanel hover:bg-slate-800 text-white font-mono text-sm tracking-widest uppercase font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              <Download className="w-4 h-4 text-responseGreen" /> DOWNLOAD PROTOCOL PDF
            </a>
          </div>

          {/* Process Flow Interface Chain */}
          <div ref={protocolRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {protocolSteps.map((step, i) => (
              <div key={i} className={['bg-white border border-slate-200 p-8 text-left space-y-4 relative shadow-sm hover:border-slate-300 transition-colors', protocolInView ? 'animate-fade-up' : 'opacity-0'].join(' ')} style={{ animationDelay: protocolInView ? `${i * 70}ms` : '0ms' }}>
                <div className="absolute top-4 right-4 text-5xl font-mono font-black text-slate-100 select-none">
                  {step.step}
                </div>
                
                <div className="w-8 h-8 rounded-none bg-navyPanel flex items-center justify-center text-sm font-mono font-black text-responseGreen shadow-sm relative z-10">
                  {step.step}
                </div>
                
                <h3 className="text-sm font-bold tracking-wider text-navyPanel uppercase relative z-10 pt-2">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-700 font-normal leading-relaxed relative z-10">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [04] CAPABILITIES GRID */}
      <section className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="max-w-3xl text-left space-y-2 mb-16">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">TECHNICAL FRAMEWORKS</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
              Strategic Assets &amp; Compliance Capabilities
            </h2>
          </div>

          <div ref={capsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Box 1 */}
            <div className={['space-y-4 p-2', capsInView ? 'animate-fade-up' : 'opacity-0'].join(' ')} style={{ animationDelay: capsInView ? '0ms' : '0ms' }}>
              <div className="p-3 bg-slate-50 border border-slate-200 inline-block text-navyPanel">
                <Anchor className="w-6 h-6 text-responseGreen" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-navyPanel uppercase">Vessel Fleet</h3>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                Specialized containment vessels, skimmers, and fast-response craft stationed at 5 coastal points.
              </p>
            </div>

            {/* Box 2 */}
            <div className={['space-y-4 p-2', capsInView ? 'animate-fade-up' : 'opacity-0'].join(' ')} style={{ animationDelay: capsInView ? '80ms' : '0ms' }}>
              <div className="p-3 bg-slate-50 border border-slate-200 inline-block text-navyPanel">
                <Layers className="w-6 h-6 text-responseGreen" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-navyPanel uppercase">Mobile Labs</h3>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                On-site analysis capability for water quality, soil contamination, and hazardous chemical tracking.
              </p>
            </div>

            {/* Box 3 */}
            <div className={['space-y-4 p-2', capsInView ? 'animate-fade-up' : 'opacity-0'].join(' ')} style={{ animationDelay: capsInView ? '160ms' : '0ms' }}>
              <div className="p-3 bg-slate-50 border border-slate-200 inline-block text-navyPanel">
                <Shield className="w-6 h-6 text-responseGreen" />
              </div>
              <h3 className="text-base font-bold tracking-wider text-navyPanel uppercase">Global Standards, Local Expertise</h3>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                CleanAfrica Associates is the only indigenous firm maintaining Tier-3 response capabilities certified by international maritime authorities.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}