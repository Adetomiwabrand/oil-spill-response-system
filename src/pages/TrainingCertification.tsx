import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldAlert, GraduationCap, Users, ClipboardCheck, Compass, Sliders, Calendar, Download } from 'lucide-react';
import { useTrainingCourses } from '../hooks/useTrainingCourses';
import { DataStatus } from '../components/DataStatus';

export default function TrainingCertification() {
  const { data: courses, isLoading, isError } = useTrainingCourses();
  const [activeTab, setActiveTab] = useState<'ALL' | 'level_1' | 'level_2' | 'level_3'>('ALL');

  // [04] Upstream Competence Matrix Array
  const competenceMatrix = [
    {
      level: 'IMO Level 1',
      title: 'Operational Responder',
      icon: <GraduationCap className="w-5 h-5 text-responseGreen" />,
      copy: 'Hands-on training covering the selection, layout, and operation of booms, skimmers, and sorbents in varied current regimes and sea conditions.',
    },
    {
      level: 'IMO Level 2',
      title: 'Supervisor & Coordinator',
      icon: <Users className="w-5 h-5 text-responseGreen" />,
      copy: 'Focuses on tactics, site safety, communications, spill-volume estimation, waste storage management, and command structures for multi-team responses.',
    },
    {
      level: 'IMO Level 3',
      title: 'On-Scene Commander',
      icon: <ClipboardCheck className="w-5 h-5 text-responseGreen" />,
      copy: 'High-level strategic guidance detailing media interaction protocols, trans-boundary legal liabilities, resource economics, and cross-border liaison management.',
    },
  ];

  // [05] Dynamic Course Calendar Data
  const filteredCourses = (courses ?? []).filter((course) => {
    if (activeTab === 'ALL') return true;
    return course.acf.imo_level === activeTab;
  });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] CATEGORY FOCUS & HEADER HERO */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-35 grayscale mix-blend-overlay" style={{ backgroundImage: "url('/assets/images/training-hero-backdrop.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            CATEGORY B: READINESS &amp; PREPAREDNESS
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Training &amp; Certification
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Accredited institutional development and field-drill simulations certifying oil and gas professionals to global standards. Build localized competence to mitigate risk across high-consequence marine and onshore assets.
          </p>
        </div>
      </section>

      {/* [03] SPLIT TRAINING STREAM ARCHITECTURE */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: IMO Level Certification */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / IMO-CERT</span>
                <Award className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                IMO Model Courses 1, 2 &amp; 3
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Globally recognized accreditation path for oil spill responders, supervisors, and on-scene commanders. This curriculum delivers verified mastery over deployment logistics, legal liabilities, and inter-agency incident command mechanics.
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL PARAMETERS</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Certification Authority:</span><span className="font-bold text-navyPanel">Nautical Institute / IMO</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Target Audience:</span><span className="font-bold text-navyPanel">HSE Managers, Offshore Leads, Coast Guards</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Core Modules:</span><span className="font-bold text-responseGreen">NEBA, Contingency Planning</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Industrial Drills */}
          <div className="border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">CODE / DRILL-OPS</span>
                <Compass className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                Bespoke Facility &amp; Deployment Simulations
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Tailored live exercises mapped to your asset’s specific bathymetry, shoreline type, and risk layout. We pressure-test your local workforce's reaction time, communication loops, and hardware handling constraints under realistic emergency loads.
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-white p-4 border space-y-2">
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">TECHNICAL PARAMETERS</span>
              <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Simulation Type:</span><span className="font-bold text-navyPanel">Live Boom Deployment, Tabletop Crisis</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Target Locations:</span><span className="font-bold text-navyPanel">Terminals, FPSOs, Flowstations, Estuarine Assets</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Validation Output:</span><span className="font-bold text-responseGreen">Comprehensive Vulnerability &amp; Gap Analysis</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* [04] UPSTREAM COMPETENCE MATRIX */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-1">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CORE CAPABILITIES</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Upstream Competence Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competenceMatrix.map((cap, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 text-left flex flex-col justify-between gap-4 shadow-sm group hover:border-slate-400 transition-colors">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-mono font-black text-responseGreen uppercase tracking-wider">{cap.level}</span>
                    <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-sm">
                      {cap.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-navyPanel uppercase tracking-wider">{cap.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{cap.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [05] DYNAMIC COURSE CALENDAR & MATRIX */}
      <section className="py-24 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Row Split */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">LIVE SCHEDULE</span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">ACADEMIC MATRIX</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 border border-slate-200 font-mono text-sm font-bold">
              <button 
                onClick={() => setActiveTab('ALL')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${activeTab === 'ALL' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                Show All
              </button>
              <button 
                onClick={() => setActiveTab('level_1')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${activeTab === 'level_1' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                IMO Level 1
              </button>
              <button 
                onClick={() => setActiveTab('level_2')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${activeTab === 'level_2' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                IMO Level 2
              </button>
              <button 
                onClick={() => setActiveTab('level_3')} 
                className={`px-4 py-2 uppercase tracking-wider transition-colors ${activeTab === 'level_3' ? 'bg-navyPanel text-white' : 'text-slate-600 hover:text-navyPanel'}`}
              >
                IMO Level 3
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Data Table Matrix Interface */}
          <DataStatus
            isLoading={isLoading}
            isError={isError}
            isEmpty={!isLoading && !isError && filteredCourses.length === 0}
            emptyMessage="No courses available for this level"
          />
          <div className="border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                  <th className="p-4 font-black">TRACK ID</th>
                  <th className="p-4 font-black">COURSE / CERTIFICATION FOCUS</th>
                  <th className="p-4 font-black">DATE &amp; WINDOW</th>
                  <th className="p-4 font-black">SEATS / STATUS</th>
                  <th className="p-4 font-black text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans text-sm">
                {isLoading || isError || !filteredCourses?.length ? (
                  <tr>
                    <td colSpan={5} className="p-4">
                      <DataStatus
                        isLoading={isLoading}
                        isError={isError}
                        isEmpty={!filteredCourses?.length}
                      />
                    </td>
                  </tr>
                ) : (
                  filteredCourses?.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors bg-white">
                      <td className="p-4 font-mono font-bold text-navyPanel tracking-wider uppercase">
                        {course.acf.imo_level.replace('_', '-').toUpperCase()}
                      </td>
                      <td className="p-4 font-black text-navyPanel uppercase">
                        {course.title.rendered}
                      </td>
                      <td className="p-4 font-mono text-slate-600">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {course.acf.next_date}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono font-bold px-2 py-1 text-[10px] border tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                          {course.acf.max_participants} MAX
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          to="/portal/training-application"
                          className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase font-black transition-colors bg-responseGreen text-navyPanel hover:bg-emerald-600"
                        >
                          REGISTER NOW
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Operational Version Footnote */}
          <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <Sliders className="w-3 h-3 text-responseGreen" /> SYSTEM VERSION: ACADEMIC MATRIX / RE-VER. 2026.Q3
          </div>
        </div>
      </section>

      {/* [06] LOWER CONVERSION PANEL */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-35 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/registry-containment-primary.webp')" }} />
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-mono font-black tracking-widest uppercase">REGISTRAR MATRIX</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              VALIDATE YOUR WORKFORCE READINESS
            </h2>
            <p className="text-sm md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Contact our technical training registrar to commission a custom drill schedule or reserve an organizational seat block.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <Link
              to="/portal/training-application"
              className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none text-center"
            >
              BOOK COHORT SEATS
            </Link>
            <button className="w-full py-4 border border-white/20 hover:border-white text-white font-mono text-sm tracking-widest font-bold uppercase transition-colors flex items-center justify-center gap-2 bg-slate-900/40 backdrop-blur-sm">
              <Download className="w-4 h-4 text-responseGreen" /> DOWNLOAD SYLLABUS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}