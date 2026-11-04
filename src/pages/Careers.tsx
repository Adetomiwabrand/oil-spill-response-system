import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Search, Briefcase, MapPin, Clock, ArrowRight, Navigation, Layers, ShieldCheck, Warehouse } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';

export default function Careers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // [03] Core Disciplines Matrix Raw Architectural Dataset
  const disciplines = [
    {
      id: 'div-01',
      title: 'TECHNICAL OPERATIONS',
      description: 'Deploying real-time containment logistics, marine vessel command, and technical asset integrity management across high-stakes fields.',
      icon: Navigation,
      gridClass: 'lg:col-span-2 lg:row-span-2 bg-slate-900 text-white border border-slate-800 p-8 flex flex-col justify-between text-left min-h-[320px]'
    },
    {
      id: 'div-02',
      title: 'ENVIRONMENTAL STEWARDSHIP',
      description: 'Protecting ecosystem integrity through advanced monitoring, shoreline SCAT methodologies, and wildlife habitat remediation.',
      icon: Layers,
      gridClass: 'lg:col-span-1 bg-white text-navyPanel border border-slate-200 p-8 flex flex-col justify-between text-left'
    },
    {
      id: 'div-03',
      title: 'STRATEGIC ADVISORY',
      description: 'Formulating regulatory framework alignments, cross-border compliance mapping, and stochastic environmental risk audits.',
      icon: ShieldCheck,
      gridClass: 'lg:col-span-1 bg-slate-50 text-navyPanel border border-slate-200 p-8 flex flex-col justify-between text-left'
    },
    {
      id: 'div-04',
      title: 'LOGISTICS & SUPPLY',
      description: 'Managing complex regional stockpile warehouses, fast-response staging networks, and emergency fleet deployment pipelines.',
      icon: Warehouse,
      gridClass: 'lg:col-span-1 bg-white text-navyPanel border border-slate-200 p-8 flex flex-col justify-between text-left'
    }
  ];
 
  // [04] Active Opportunities Feed Database Array
  const { data: jobs = [], isLoading: jobsLoading } = useJobs(50);

  // Filter live WordPress jobs by search query safely
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredVacancies = jobs.filter((job) => {
    const titleMatch = job.title?.rendered?.toLowerCase().includes(normalizedQuery) ?? false;
    const locationMatch = job.acf?.job_location?.toLowerCase().includes(normalizedQuery) ?? false;
    const departmentMatch = job.acf?.joy_department?.toLowerCase().includes(normalizedQuery) ?? false;

    return titleMatch || locationMatch || departmentMatch;
  });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HERO SECTION WITH PERSISTENT DEPLOYMENT ACTIONS */}
      <section className="bg-navyPanel text-white pt-32 pb-24 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity" style={{ backgroundImage: "url('/assets/images/careers-hero-backdrop.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full relative z-10 text-left space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-responseGreen uppercase font-black bg-slate-950/50 px-2.5 py-1 border border-slate-800">
            JOIN THE GUARDIANS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none max-w-4xl">
            Protecting Africa's <br />Future Capacity.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            We are more than a consultancy; we are the architectural sentinel of the continent's industrial integrity. Join a high-performance team where extreme engineering precision meets generational purpose.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs font-bold">
            <a href="#vacancies" className="px-6 py-4 bg-responseGreen text-navyPanel hover:bg-emerald-400 transition-colors uppercase tracking-wider">
              EXPLORE OPPORTUNITIES
            </a>
            <a href="#culture" className="px-6 py-4 border border-white/20 text-white hover:border-white transition-colors uppercase tracking-widest">
              OUR CULTURE
            </a>
          </div>
        </div>
      </section>

      {/* [03] CORE DISCIPLINES ASYMMETRICAL DIVISION GRID */}
      <section id="culture" className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-left space-y-2">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-black block">OUR DISCIPLINES</span>
            <h2 className="text-2xl lg:text-4xl font-black text-navyPanel tracking-tight uppercase">Operational Excellence Across Spheres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {disciplines.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className={item.gridClass}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4 border-slate-100/10">
                      <span className="text-[10px] font-mono tracking-wider font-black opacity-60 uppercase">REGIONAL DEPOT DOMAIN</span>
                      <IconComponent className="w-5 h-5 text-responseGreen" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
                    <p className="text-xs leading-relaxed font-normal opacity-85">{item.description}</p>
                  </div>
                  <div className="pt-6 text-[10px] font-mono tracking-widest font-bold opacity-40 uppercase">
                    SYSTEM SECURE // INTEGRITY VALIDATED
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* [04] LIVE VACANCIES PANEL & INTERACTIVE SEARCH FILTER ENGINE */}
      <section id="vacancies" className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div className="text-left space-y-2">
            <span className="text-xs font-mono tracking-widest text-responseGreen uppercase font-black block">CURRENT VACANCIES</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Operational Readiness</h2>
          </div>

          {/* Interactive Input Node Search Layout Component */}
          <div className="relative border border-slate-300 shadow-sm bg-white">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Filter by role or location..."
              className="w-full pl-11 pr-4 py-4 bg-transparent text-navyPanel font-mono text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-responseGreen font-bold"
            />
          </div>

          {/* Live WordPress Job Listings */}
          <div className="space-y-4">
            {jobsLoading ? (
              <div className="bg-white border border-slate-200 p-12 text-center text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                Loading positions...
              </div>
            ) : filteredVacancies.length > 0 ? (
              filteredVacancies.map((job) => (
                <div key={job.id} className="bg-white border border-slate-200 p-6 shadow-sm hover:border-slate-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-navyPanel tracking-tight uppercase">
                        {job.title?.rendered}
                      </h3>

                      {job.acf?.job_type && (
                        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-[9px] font-bold text-slate-600 tracking-wider">
                          <Briefcase className="w-2.5 h-2.5" />
                          {job.acf.job_type.replace('_', '-').toUpperCase()}
                        </div>
                      )}

                      {job.acf?.job_location && (
                        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-700 tracking-wider">
                          <MapPin className="w-2.5 h-2.5" />
                          {job.acf.job_location}
                        </div>
                      )}
                    </div>

                    {job.acf?.joy_department && (
                      <p className="text-xs font-mono text-slate-500 font-bold uppercase">
                        {job.acf.joy_department}
                      </p>
                    )}

                    {job.acf?.application_deadline && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                        <Clock className="w-3 h-3" /> Deadline: {job.acf.application_deadline}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate('/careers/apply')}
                    className="whitespace-nowrap bg-slate-900 hover:bg-responseGreen hover:text-navyPanel text-white px-5 py-3 font-mono text-[10px] font-black tracking-widest uppercase transition-colors border border-slate-950">
                    APPLY NOW
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200 p-12 text-center text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                No open positions at this time. Check back soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* [05] LOWER CONVERSION PANEL DESIGN ARCHITECTURE */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-35 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/careers-team-culture-portrait.webp')" }} />
        
        <div className="max-w-4xl mx-auto w-full space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-responseGreen">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-mono font-black tracking-widest uppercase">SPECULATIVE PIPELINE ENGAGEMENT</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
            DON'T SEE YOUR FIT?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
            We are always looking for exceptional talent to join our ecosystem. Submit your professional credentials to our active monitoring talent pool for strategic future opportunities.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/careers/apply')}
              className="px-6 py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-xs transition-colors focus:outline-none">
              JOIN TALENT POOL
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}