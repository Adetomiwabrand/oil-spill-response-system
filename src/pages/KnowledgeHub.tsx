import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, Scale, Cpu, CheckCircle, Download, Key, Sliders, Layers, ArrowRight } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';

export default function KnowledgeHub() {
  // [03] Content Stream Categorization Filters State
  const [activeTab, setActiveTab] = useState<'ALL' | 'CASE' | 'WHITE'>('ALL');
  const { data: posts, isLoading: postsLoading } = usePosts();

  // [04] Featured Research & Analysis Layout Grid Data
  const researchInsights = {
    mainFeature: {
      badge: 'FEATURED OPERATIONAL CASE STUDY',
      headline: 'Evaluating SIMA Protocols in Mangrove Swamps',
      description: 'An extensive post-incident review detailing Spill Impact Mitigation Assessment (SIMA) deployments across estuarine mudflats, tracking habitat restoration velocities over a 24-month operational horizon.',
      linkText: 'READ FULL DEFENSE CASE →'
    },
    subPanel: {
      headline: 'Trans-Boundary Legal Frameworks',
      description: 'Navigating overlapping jurisdictional guidelines during Tier-3 open ocean incidents spanning exclusive economic zones within the Gulf of Guinea.',
      bullets: [
        'JURISDICTION RECONCILIATION',
        'TRANS-BORDER FLEET ROUTING',
        'NOTIFICATION TIMELINE LAWS'
      ],
      linkText: 'ACCESS DISCOURSE'
    }
  };

  // [06] Document Distribution Registry Data Array
  const documentRegistry = [
    {
      id: 'REP-NEBA-2026-1',
      title: 'Deepwater Dispersant Net Environmental Benefit Analysis',
      date: 'May 12, 2026',
      classification: 'PUBLIC RECORD',
      type: 'WHITE',
      secure: false,
      actionText: 'DOWNLOAD PDF'
    },
    {
      id: 'GUIDE-SCAT-STRD',
      title: 'Intertidal Substrate Evaluation & Shoreline Segmentation',
      date: 'April 29, 2026',
      classification: 'TECHNICAL BRIEF',
      type: 'CASE',
      secure: false,
      actionText: 'DOWNLOAD PDF'
    },
    {
      id: 'STAT-NOS-COMP-2',
      title: 'National Oil Spill Contingency Plan Structural Alignment',
      date: 'March 15, 2026',
      classification: 'MEMBER SECURE',
      type: 'WHITE',
      secure: true,
      actionText: 'AUTHORIZE VIEW'
    }
  ];

  // Client-side stream filter processing logic
  const filteredDocuments = documentRegistry.filter((doc) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'CASE') return doc.type === 'CASE';
    return doc.type === 'WHITE';
  });

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HUB INTRODUCTION HERO LAYOUT */}
      <section className="bg-navyPanel text-white pt-24 pb-16 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/knowledge-hero-backdrop.webp')" }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black bg-slate-950/40 px-2.5 py-1 border border-white/5">
            DATA &amp; RESEARCH DEPOT
          </span>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Knowledge Hub
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Access sovereign compliance reports, emergency response white papers, and historical field analysis. CleanAfrica Associates documents operational methodologies to cultivate baseline industrial transparency across the continent.
          </p>
        </div>
      </section>

      {/* [03] CONTENT STREAM CATEGORIZATION FILTERS TAB-BAR */}
      <section className="bg-slate-900 px-6 lg:px-16 py-4 border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex flex-wrap gap-2 font-mono text-sm font-bold">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-5 py-3 transition-colors uppercase tracking-wider ${activeTab === 'ALL' ? 'bg-responseGreen text-navyPanel' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              All Resource Records
            </button>
            <button
              onClick={() => setActiveTab('CASE')}
              className={`px-5 py-3 transition-colors uppercase tracking-wider ${activeTab === 'CASE' ? 'bg-responseGreen text-navyPanel' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Technical Case Studies
            </button>
            <button
              onClick={() => setActiveTab('WHITE')}
              className={`px-5 py-3 transition-colors uppercase tracking-wider ${activeTab === 'WHITE' ? 'bg-responseGreen text-navyPanel' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Regulatory White Papers
            </button>
          </div>
          <div className="hidden md:block font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            INDEX METRICS: SECURE VETTED ACCESS
          </div>
        </div>
      </section>

      {/* [06] DOCUMENT DISTRIBUTION REGISTRY TABLE BLOCK (MOVED DIRECTLY HERE) */}
      <section className="py-24 bg-white border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">VERIFIED RESEARCH ARCHIVE</span>
            <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">Document Control Log Index</h2>
            <p className="text-sm text-slate-500 font-normal max-w-3xl">
              Registry Integration Sync: This matrix catalogs the verified technical field inventory synced from the canonical network registry archive.
            </p>
          </div>

          {/* Data Grid Matrix Architecture */}
          <div className="border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] tracking-widest uppercase border-b border-slate-800">
                  <th className="p-4 font-black">DOCUMENT IDENTIFIER</th>
                  <th className="p-4 font-black">RESOURCE TITLE / FOCUS AREA</th>
                  <th className="p-4 font-black">PUBLICATION DATE</th>
                  <th className="p-4 font-black">CLASSIFICATION</th>
                  <th className="p-4 font-black text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans text-sm">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="p-4 font-mono font-bold text-navyPanel tracking-wider">{doc.id}</td>
                    <td className="p-4 font-black text-navyPanel uppercase">{doc.title}</td>
                    <td className="p-4 text-slate-600 font-mono uppercase">{doc.date}</td>
                    <td className="p-4">
                      <span className={`font-mono font-bold px-2.5 py-1 text-[9px] border tracking-wider uppercase ${
                        doc.secure 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {doc.classification}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className={`px-3 py-1.5 font-mono text-[10px] font-black tracking-widest uppercase transition-colors flex items-center gap-1.5 ml-auto border ${
                        doc.secure 
                          ? 'bg-slate-900 text-white border-slate-950 hover:bg-responseGreen hover:text-navyPanel' 
                          : 'bg-slate-100 text-navyPanel border-slate-200 hover:bg-slate-900 hover:text-white'
                      }`}>
                        {doc.secure ? <Key className="w-3 h-3 text-responseGreen" /> : <Download className="w-3 h-3" />}
                        {doc.actionText}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification Footnote Metadata Code Block */}
          <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2 pt-2">
            <Sliders className="w-3 h-3 text-responseGreen" /> DATABASE INDEX / VER. 2026.Q3
          </div>
        </div>
      </section>

      {/* [03B] BLOG / NEWS & UPDATES ─────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-200 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full space-y-8">
            <div className="text-left space-y-2">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">
                FIELD INTELLIGENCE FEED
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-navyPanel tracking-tight uppercase">
                News &amp; Updates
              </h2>
            </div>

            {/* Loading shimmer */}
            {postsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="border border-slate-200 rounded-sm overflow-hidden">
                    <div className="aspect-[16/9] bg-slate-100 animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 bg-slate-100 rounded animate-pulse w-1/3" />
                      <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Post cards */}
            {!postsLoading && posts && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => {
                  const media = post._embedded?.['wp:featuredmedia'];
                  const imgUrl = media?.[0]?.source_url ?? null;
                  const excerpt = post.excerpt.rendered
                    .replace(/<[^>]+>/g, '')
                    .trim();
                  const date = new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  });

                  return (
                    <article
                      key={post.id}
                      className="border border-slate-200 bg-white flex flex-col shadow-sm hover:shadow-md hover:border-responseGreen/40 transition-all duration-200 rounded-sm overflow-hidden"
                    >
                      {/* Featured image */}
                      {imgUrl ? (
                        <div className="aspect-[16/9] overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={imgUrl}
                            alt={post.title.rendered}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">NO IMAGE</span>
                        </div>
                      )}

                      {/* Card body */}
                      <div className="p-6 flex flex-col flex-1 gap-3">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          {date}
                        </span>
                        <h3 className="font-black text-navyPanel text-sm uppercase leading-snug tracking-wide">
                          {post.title.rendered}
                        </h3>
                        {excerpt && (
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                            {excerpt}
                          </p>
                        )}
                        <div className="pt-3 border-t border-slate-100 mt-auto">
                          <Link
                            to={`/knowledge/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-responseGreen uppercase tracking-widest hover:text-navyPanel transition-colors"
                          >
                            READ MORE <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!postsLoading && (!posts || posts.length === 0) && (
              <p className="text-center font-mono text-sm text-slate-400 uppercase tracking-widest py-16">
                No posts published yet.
              </p>
            )}

            <div className="text-left font-mono text-[9px] text-slate-400 tracking-wider uppercase flex items-center gap-2 pt-2">
              <Sliders className="w-3 h-3 text-responseGreen" />
              LIVE CMS SYNC — WORDPRESS POSTS
            </div>
          </div>
        </section>

      {/* [04] FEATURED RESEARCH & ANALYSIS SPLIT GRID LAYOUT */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Primary Technical Feature Card */}
          <div className="lg:col-span-7 border border-slate-200 p-8 bg-slate-900 text-white flex flex-col justify-between text-left shadow-sm relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-[10px] font-mono text-responseGreen font-black uppercase tracking-widest">
                  {researchInsights.mainFeature.badge}
                </span>
                <BookOpen className="w-5 h-5 text-responseGreen" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
                {researchInsights.mainFeature.headline}
              </h2>
              <p className="text-sm md:text-sm text-slate-400 font-normal leading-relaxed max-w-xl">
                {researchInsights.mainFeature.description}
              </p>
            </div>
            <div className="mt-12 pt-6 border-t border-slate-800 relative z-10">
              <a href="#case-defense" className="text-sm font-mono font-black text-responseGreen hover:text-emerald-400 tracking-wider transition-colors uppercase">
                {researchInsights.mainFeature.linkText}
              </a>
            </div>
          </div>

          {/* Right Column: Industry Insights Sub-Panel Card */}
          <div className="lg:col-span-5 border border-slate-200 p-8 bg-slate-50 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">JURISDICTIONAL RISK REPORT</span>
                <Scale className="w-5 h-5 text-navyPanel" />
              </div>
              <h2 className="text-2xl font-black text-navyPanel uppercase tracking-tight">
                {researchInsights.subPanel.headline}
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                {researchInsights.subPanel.description}
              </p>

              {/* Dynamic Feature Bullet Points Block */}
              <ul className="space-y-2 pt-2 text-sm font-mono font-bold text-navyPanel">
                {researchInsights.subPanel.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-responseGreen" /> {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <a href="mailto:enquiry@clean-africa.org" className="px-4 py-2 bg-slate-900 text-white font-mono text-[10px] font-black tracking-widest uppercase transition-colors hover:bg-responseGreen hover:text-navyPanel inline-block">
                {researchInsights.subPanel.linkText}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* [05] CORE KNOWLEDGE REPOSITORY DATA CARDS BLOCK */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Technical Bulletins */}
          <div className="bg-white border border-slate-200 flex flex-col justify-between text-left shadow-sm">
            <div className="p-8 space-y-4">
              <Cpu className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">Equipment Capability Briefings</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Empirical performance updates analyzing oleophilic disc skimmer yield statistics under varying oil-viscosity thresholds.
              </p>
            </div>
            <div className="bg-slate-950 text-responseGreen font-mono text-[10px] font-black px-6 py-3 tracking-widest border-t border-slate-900 uppercase">
              LATEST RELEASE: May 2026 Hydrodynamic Report
            </div>
          </div>

          {/* Card 2: Operational Frameworks */}
          <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-4">
              <Layers className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">SCAT Survey Standardization</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Methodological checklists transforming Shoreline Cleanup Assessment Technique observations into structured, machine-readable backend data.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase">
              CLASSIFICATION: FIELD OPERATION CHECKLIST
            </div>
          </div>

          {/* Card 3: Regulatory Compliance */}
          <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between text-left shadow-sm">
            <div className="space-y-4">
              <Scale className="w-6 h-6 text-responseGreen" />
              <h3 className="text-lg font-black text-navyPanel uppercase tracking-tight">Sovereign Navigator Compendium</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Consolidated legal interpretations of emerging environmental discharge limits and spatial planning protocols for regional energy leads.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase">
              CLASSIFICATION: SOVEREIGN DIRECTIVES
            </div>
          </div>

        </div>
      </section>

      {/* [07] LOWER CONVERSION PANEL */}
      <section className="bg-slate-950 text-white py-24 px-6 lg:px-16 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-color-dodge" style={{ backgroundImage: "url('/assets/images/knowledge-thumb-whitepaper.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-responseGreen">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-mono font-black tracking-widest uppercase">SCIENTIFIC REVIEW OFFICE BOARD</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              SUBMIT RESEARCH INQUIRIES
            </h2>
            <p className="text-sm md:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Connect with our scientific panel to request specific field datasets, partner on ecological audits, or unlock restricted corporate documentation loops.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <a href="mailto:enquiry@clean-africa.org" className="w-full py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors focus:outline-none flex items-center justify-center">
              CONTACT SCIENTIFIC CELL
            </a>
            <a href="mailto:enquiry@clean-africa.org" className="w-full py-4 border border-white/20 hover:border-white text-white font-mono text-sm tracking-widest font-bold uppercase transition-colors flex items-center justify-center gap-2 bg-slate-900/40 backdrop-blur-sm">
              <Download className="w-4 h-4 text-responseGreen" /> ACCESS FULL INDEX
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}