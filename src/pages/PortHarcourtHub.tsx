import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useGallery } from '../hooks/useGallery';
import { Truck, Activity, FlaskConical, GraduationCap, ArrowRight, FileText, Lock } from 'lucide-react';

export default function PortHarcourtHub() {
  const { ref: introRef,  inView: introInView  } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const { ref: galleryRef, inView: galleryInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { data: galleryItems = [] } = useGallery(20, 'hub');

  // Core Infrastructure Blocks [02]
  const infraBlocks = [
    {
      icon: <Truck className="w-6 h-6 text-responseGreen" />,
      title: 'RAPID DEPLOYMENT BAY',
      copy: 'A state-of-the-art logistics hangar housing over 60 specialized response vehicles, high-volume skimmers, and all-terrain deployment units. Optimized for a sub-60-minute load-out sequence during emergency activation.',
    },
    {
      icon: <Activity className="w-6 h-6 text-responseGreen" />,
      title: 'COMMAND INTELLIGENCE',
      copy: 'Real-time monitoring and satellite integration suite for 24/7 surveillance of environmental risk vectors. This center serves as the primary communications node for offshore vessel tracking and incident telemetry.',
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-responseGreen" />,
      title: 'ECOLOGICAL LAB',
      copy: 'In-house testing facilities for immediate water and soil analysis post-incident. Specialized in measuring the efficacy of biological remediation agents and monitoring the recovery of local mangrove biomes.',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-responseGreen" />,
      title: 'TRAINING ACADEMY',
      copy: 'Capacity for training 150 regional technicians simultaneously. Features a dedicated simulation tank for boom deployment exercises and classroom suites for IMO Level 1–3 certification.',
    },
  ];



  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [01] HERO SECTION */}
      <section className="relative min-h-[65vh] bg-navyPanel flex flex-col justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden border-b-4 border-responseGreen">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navyPanel via-navyPanel/90 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale contrast-125" style={{ backgroundImage: "url('/assets/images/site_command_boom_deploy.webp')" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Hero Main Block */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-responseGreen animate-pulse" />
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-semibold">HQ · STRATEGIC OPERATIONS HUB</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] animate-fade-up" style={{ animationDelay: '100ms' }}>
              Port Harcourt Centre
            </h1>
            
            <p className="text-base md:text-xl text-white/80 max-w-2xl leading-relaxed font-normal animate-fade-up" style={{ animationDelay: '200ms' }}>
              The crown jewel of our West African presence. A high-readiness industrial fortress precision-engineered for rapid environmental response, heavy asset maintenance, and specialized maritime safety training.
            </p>
          </div>

          {/* Current Status Sidebar Block */}
          <div className="lg:col-span-4 w-full bg-slate-950 p-6 border border-white/10 relative overflow-hidden text-left animate-fade-up" style={{ animationDelay: '280ms' }}>
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-responseGreen" />
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 font-bold">CURRENT STATUS</span>
                <div className="inline-flex items-center gap-2 text-responseGreen font-mono font-black text-sm tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-responseGreen animate-ping" />
                  STATUS: OPERATIONAL
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 font-bold">DEPLOYMENT CAPABILITY</span>
                <div className="text-white font-mono text-base font-bold uppercase tracking-wide">
                  Level-3 Readiness Confirmed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [02] FACILITY ARCHITECTURE */}
      <section ref={introRef} className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 ${introInView ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="lg:col-span-7 text-left space-y-4">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">INFRASTRUCTURE SPECIFICATIONS</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
                Precision-Engineered Facility Architecture
              </h2>
              <p className="text-slate-700 text-base font-medium leading-relaxed">
                Precision-engineered for the Niger Delta’s unique ecological and industrial demands. Port Harcourt Centre serves as the primary coordination point for all regional assets, combining heavy logistics with scientific oversight.
              </p>
            </div>

            {/* Technical Stats Sidebar */}
            <div className="lg:col-span-5 bg-slate-50 p-6 border border-slate-200 grid grid-cols-2 gap-6 text-left">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest text-slate-400 font-bold">TOTAL ACREAGE</span>
                <span className="block text-3xl font-black text-navyPanel font-mono">14.5 HA</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest text-slate-400 font-bold">STORAGE CAPACITY</span>
                <span className="block text-3xl font-black text-navyPanel font-mono">2,400 MT</span>
                <span className="block text-[9px] font-mono text-slate-500 font-medium leading-tight">Technical Fluids & Containment Gear</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Matrix Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${introInView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            {infraBlocks.map((block, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-responseGreen transition-colors" />
                <div className="space-y-6 text-left">
                  <div className="p-3 bg-navyPanel inline-block border border-white/10 shadow-md">
                    {block.icon}
                  </div>
                  <h3 className="text-base font-bold tracking-wider text-navyPanel">{block.title}</h3>
                  <p className="text-sm text-slate-700 font-normal leading-relaxed">{block.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [03] VIRTUAL GALLERY: VISUAL INSPECTION */}
      <section ref={galleryRef} className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 ${galleryInView ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="text-left">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">SITE MATRIX FRAME</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel mt-1">Virtual Gallery</h2>
              <p className="text-sm text-slate-600 font-normal mt-1">Visual inspection of Port Harcourt Centre structural assets.</p>
            </div>
            <Link 
              to="/assets" 
              className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-navyPanel hover:text-responseGreen font-bold group transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              VIEW ALL ASSETS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Responsive Gallery Grid — powered by WordPress */}
          {galleryItems.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${galleryInView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              {galleryItems.map((item, i) => (
                <div
                  key={item.id}
                  className="relative group bg-navyPanel border border-slate-200 overflow-hidden min-h-[220px] flex flex-col justify-end p-6"
                >
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500" style={{ backgroundImage: `url('${item.acf.gallery_image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="relative z-10 text-left">
                    <p className="text-sm font-mono tracking-wide text-white font-medium bg-navyPanel/80 inline-block px-2 py-1 border border-white/10 backdrop-blur-sm">
                      {item.acf.gallery_caption || item.title.rendered}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40 font-mono text-xs uppercase tracking-widest">
              No gallery images available.
            </div>
          )}
        </div>
      </section>

      {/* [04] OPERATIONAL READINESS GUARANTEED (CTA) */}
      <section className="bg-gradient-to-br from-navyPanel to-slate-950 text-white py-20 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-overlay grayscale" style={{ backgroundImage: "url('/assets/images/registry-lower-conversion.webp')" }} />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Operational Readiness Guaranteed.
            </h2>
            <p className="text-lg text-white/80 font-normal max-w-3xl mx-auto leading-relaxed">
              Access full technical specifications and certification data for the Port Harcourt Centre Facility. Member login is required to view confidential logistics manifests and hazardous material handling protocols.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="/assets/images/Port Harcourt Centre-fact-sheet.pdf"
              download
              className="w-full sm:w-auto px-8 py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors duration-150 shadow-lg inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              <FileText className="w-4 h-4" /> DOWNLOAD FACT SHEET
            </a>
            
            <Link 
              to="/portal/login" 
              className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white text-white font-bold tracking-wider uppercase text-sm transition-colors duration-150 inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              <Lock className="w-4 h-4 text-responseGreen" /> MEMBER LOGIN
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}