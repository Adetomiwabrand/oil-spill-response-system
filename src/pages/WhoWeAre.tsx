import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Cpu, ShieldAlert, Clock } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useTestimonials } from '../hooks/useTestimonials';

export default function WhoWeAre() {

  // ── Animation refs ───────────────────────────────────────────
  const { ref: sentinelHeaderRef, inView: sentinelHeaderInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: cardsRef,          inView: cardsInView          } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: timelineHeaderRef, inView: timelineHeaderInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { ref: timelineRef,       inView: timelineInView       } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const { ref: accredRef,         inView: accredInView         } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const { ref: missionRef,        inView: missionInView        } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: membersRef,        inView: membersInView        } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: whyMemberRef,    inView: whyMemberInView    } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef,          inView: ctaInView          } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { data: testimonials = [] } = useTestimonials(10);

  // Strategy Tiles Data [02]
  const strategyTiles = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-responseGreen" />,
      title: 'OPERATIONAL INTEGRITY',
      copy: 'Maintaining zero-compromise standards across all deployment zones through rigorous technical auditing and continuous asset verification.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-responseGreen" />,
      title: 'ENVIRONMENTAL STEWARDSHIP',
      copy: 'Advancing ecological recovery through scientifically-backed intervention protocols and sustainable, low-impact asset management.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-responseGreen" />,
      title: 'TECHNOLOGICAL PRECISION',
      copy: 'Leveraging state-of-the-art surveillance and response technologies, including GIS mapping and satellite telemetry, to predict and mitigate industrial risks.',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-responseGreen" />,
      title: 'REGIONAL SOVEREIGNTY',
      copy: 'Empowering local infrastructures through knowledge transfer, accredited IMO training programs, and the cultivation of indigenous technical expertise.',
    },
  ];

  // Timeline Milestone Data [03]
  const milestones = [
    {
      year: '1981',
      title: 'FOUNDATION',
      copy: 'Clean Africa Associates (CAA) is formed by a co-operative of 11 oil companies to provide the first collective Tier-2 response capability in Sub-Saharan Africa.',
    },
    {
      year: '1995',
      title: 'IOC RECOGNITION',
      copy: 'Industrial Expansion. Major investment in high-volume weir skimmers and offshore boom systems, establishing the Port Harcourt Engineering Hub as a regional center of excellence.',
    },
    {
      year: '2008',
      title: 'PAN-AFRICAN SCALING',
      copy: 'Formal alignment with the NOSDRA Act. CAA becomes the primary technical partner for national oil spill contingency planning and shoreline sensitivity mapping.',
    },
    {
      year: '2020',
      title: 'DIGITAL TWIN LAUNCH',
      copy: 'Upgrade to satellite-tracked deployment and real-time situational awareness tools, integrating GIS mapping for Niger Delta swamp operations.',
    },
    {
      year: '2026',
      title: 'HORIZON 2030',
      copy: 'The CAA Transition. Transitioning to CleanAfrica Associates. Expanding the mandate to cover the full African Continental Shelf and establishing the "Sentinel Strategy" for 18+ IOC members.',
    },
  ];

  // Verified Accreditation Partner Logos [04]
  const logos = [
    { src: '/ogtan_logo.png',   alt: 'OGTAN Logo',  label: 'NUPRC AUTHORIZED' },
    { src: '/Nosdra_logo.png',  alt: 'NOSDRA Logo', label: 'NOSDRA CERTIFIED' },
    { src: '/Nimasa_Logo.webp',  alt: 'NIMASA Logo', label: 'ISO 14001' },
    { src: '/IMO_Logo.png',     alt: 'IMO Logo',    label: 'IMO ACCREDITED' },
    { src: '/Vikoma_Logo.png',  alt: 'Vikoma Logo', label: 'OSRL PARTNER' },
  ];

  // Member Companies [04b]
  const memberCompanies = [
    { name: 'Amni International Petroleum Development Co.', file: 'Amni_official_logo.jpg' },
    { name: 'Belema Oil Producing Limited',                  file: 'Belema-Oil.png' },
    { name: 'Chevron',                                        file: 'Chevron.png' },
    { name: 'Clean Africa Associates (CAA)',                 file: 'CAA-Logo.jpg' },
    { name: 'Esso (ExxonMobil)',                              file: 'Esso.png' },
    { name: 'First E&P',                                      file: 'First-EP.png' },
    { name: 'Heirs Energies',                                 file: 'Heirs-Energies.png' },
    { name: 'Midwestern Oil & Gas',                           file: 'Midwestern.jpg' },
    { name: 'Moni Pulo Limited',                              file: 'Moni-Pulo.jpg' },
    { name: 'NNPC Antan Producing Limited',                   file: 'NNPC-Antan.png' },
    { name: 'NNPC',                                           file: 'NNPC.png' },
    { name: 'Oando',                                          file: 'Oando-1.png' },
    { name: 'Pan Ocean',                                      file: 'Pan-Ocean.png' },
    { name: 'Renaissance Africa Energy',                      file: 'Renaissance.png' },
    { name: 'Seplat Energy',                                  file: 'Seplat-Energy.png' },
    { name: 'Shell (SNEPCo)',                                 file: 'Snepco.jpg' },
    { name: 'TotalEnergies',                                  file: 'total-energies.jpg' },
    { name: 'Walter Smith Petroman Oil Limited',              file: 'Waltersmith.png' },
  ];

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">

      {/* [01] HERO SECTION — staggered fade-up on mount ──────── */}
      <section className="relative min-h-[75vh] bg-navyPanel flex flex-col justify-center pt-28 pb-16 px-6 lg:px-16 overflow-hidden border-b-4 border-responseGreen">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-navyPanel via-navyPanel/85 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale contrast-125" style={{ backgroundImage: "url('/assets/images/site_command_boom_deploy.webp')" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mt-auto">
          <div className="lg:col-span-9 space-y-6 text-left">

            {/* Badge — delay 0ms */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-responseGreen animate-pulse" />
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-semibold">ESTABLISHED 1981</span>
            </div>

            {/* Headline — delay 100ms */}
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              35 Years of Environmental <br />Guardianship.
            </h1>

            {/* Lead paragraph — delay 200ms */}
            <p
              className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-normal animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              Founded on the principles of trust, technical excellence, and regional sovereignty, CleanAfrica Associates (CAA) has evolved from a regional response unit into Africa's most authoritative guardian. We bridge the gap between global response standards and the unique logistical realities of the African maritime landscape.
            </p>

          </div>
        </div>
      </section>

      {/* [01b] MISSION, VISION & OBJECTIVES ──────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div
          ref={missionRef}
          className={[
            'max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8',
            missionInView ? 'animate-fade-up' : 'opacity-0',
          ].join(' ')}
        >
          <div className="bg-slate-50 border border-slate-200 p-8 text-left space-y-3">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">MISSION</span>
            <p className="text-slate-700 font-normal leading-relaxed">
              To maintain a sustained and effective Tier 2 oil spill response capability for members, while
              supporting national emergency response efforts through training, equipment maintenance, research,
              and environmental advisory services.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 text-left space-y-3">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">VISION</span>
            <p className="text-slate-700 font-normal leading-relaxed">
              To be a world-class leader in oil spill emergency management, recognized for excellence in response
              preparedness, capacity building, and environmental protection.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 text-left space-y-3">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">OBJECTIVES</span>
            <p className="text-slate-700 font-normal leading-relaxed">
              To protect, preserve, and restore the environment after oil spills by delivering rapid response
              services, skilled personnel, specialized training, and responsible waste management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* [02] THE ARCHITECTURAL SENTINEL STRATEGY ───────────── */}
      <section className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">

          {/* Section header — fade-up on scroll */}
          <div
            ref={sentinelHeaderRef}
            className={[
              'max-w-3xl text-left space-y-4 mb-16 transition-none',
              sentinelHeaderInView ? 'animate-fade-up' : 'opacity-0',
            ].join(' ')}
          >
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">CORE DOCTRINE</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
              The Architectural Sentinel Strategy
            </h2>
            <p className="text-slate-600 text-lg font-normal leading-relaxed">
              Our Sentinel Strategy ensures that IOCs and national operators have a reliable, indigenous partner capable of Tier-2 and Tier-3 interventions. Our approach is built on four non-negotiable pillars of operational integrity.
            </p>
          </div>

          {/* Cards — staggered fade-up on scroll */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {strategyTiles.map((tile, i) => (
              <div
                key={i}
                className={[
                  'bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative',
                  cardsInView ? 'animate-fade-up' : 'opacity-0',
                ].join(' ')}
                style={{ animationDelay: cardsInView ? `${i * 60}ms` : '0ms' }}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-responseGreen transition-colors" />
                <div className="space-y-6 text-left">
                  <div className="p-3 bg-navyPanel inline-block border border-white/10 shadow-md">
                    {tile.icon}
                  </div>
                  <h3 className="text-base font-bold tracking-wider text-navyPanel">{tile.title}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{tile.copy}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* [03] TIMELINE OF READINESS (1981–2026) ─────────────── */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">

          {/* Timeline header — fade-up on scroll */}
          <div
            ref={timelineHeaderRef}
            className={[
              'flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16',
              timelineHeaderInView ? 'animate-fade-up' : 'opacity-0',
            ].join(' ')}
          >
            <div className="text-left">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">OPERATIONAL RECORD</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel mt-2">A Timeline of Readiness: 1981–2026</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-slate-400 font-bold">
              <Clock className="w-4 h-4 text-responseGreen" /> HISTORICAL ARCHIVE
            </div>
          </div>

          {/* Timeline milestones — staggered fade-up + node scale-in */}
          <div
            ref={timelineRef}
            className="relative border-l-2 border-slate-200 pl-6 ml-4 md:ml-0 md:pl-0 md:border-l-0 md:grid md:grid-cols-5 md:gap-6 space-y-12 md:space-y-0"
          >
            <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[2px] bg-slate-200 z-0" />

            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={[
                  'relative z-10 text-left group',
                  timelineInView ? 'animate-fade-up' : 'opacity-0',
                ].join(' ')}
                style={{ animationDelay: timelineInView ? `${i * 80}ms` : '0ms' }}
              >
                {/* Node dot — scale-in with matching stagger */}
                <div
                  className={[
                    'absolute -left-[35px] md:left-0 top-[6px] md:top-4 w-6 h-6 rounded-none border-2 border-slate-300 bg-white group-hover:border-responseGreen transition-colors flex items-center justify-center',
                    timelineInView ? 'animate-scale-in' : 'opacity-0',
                  ].join(' ')}
                  style={{ animationDelay: timelineInView ? `${i * 80}ms` : '0ms' }}
                >
                  <div className="w-2 h-2 bg-slate-300 group-hover:bg-responseGreen transition-colors" />
                </div>

                <div className="md:pt-12 space-y-3">
                  <div className="font-mono text-2xl font-black text-responseGreen bg-navyPanel inline-block px-2 py-0.5 shadow-sm">
                    {milestone.year}
                  </div>
                  <h4 className="text-sm font-bold tracking-wide text-navyPanel uppercase">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-sm">
                    {milestone.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* [04] ACCREDITED BY THE GLOBAL GIANTS ───────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          <div
            ref={accredRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >

            {/* Left text block — fade-up on scroll */}
            <div
              className={[
                'lg:col-span-5 text-left space-y-4',
                accredInView ? 'animate-fade-up' : 'opacity-0',
              ].join(' ')}
            >
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">REGULATORY AUTHORITY</span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
                Accredited by the <br />Global Giants.
              </h2>
              <p className="text-slate-600 font-normal leading-relaxed">
                We are the only African response organization with direct partnership tiers with global leaders. Our technical standards are verified by the industry's most rigorous governing bodies.
              </p>
            </div>

            {/* Logo cards — staggered fade-up on scroll */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-4 items-center justify-center">
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className={[
                    'bg-slate-50 border border-slate-200 p-4 flex flex-col items-center justify-center min-h-[140px] text-center space-y-3 shadow-sm hover:bg-white transition-colors duration-150',
                    accredInView ? 'animate-fade-up' : 'opacity-0',
                  ].join(' ')}
                  style={{ animationDelay: accredInView ? `${100 + i * 60}ms` : '0ms' }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-12 w-auto object-contain mix-blend-multiply filter contrast-125 grayscale hover:grayscale-0 transition-all duration-150"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="text-[9px] font-mono tracking-tight text-slate-500 font-bold block uppercase leading-none">
                    {logo.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* [04b] MEMBER COMPANIES ──────────────────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full">
          <div
            ref={membersRef}
            className={[
              'max-w-3xl text-left space-y-4 mb-12',
              membersInView ? 'animate-fade-up' : 'opacity-0',
            ].join(' ')}
          >
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">OUR MEMBERS</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
              Trusted by Africa's Energy Leaders.
            </h2>
            <p className="text-slate-600 text-lg font-normal leading-relaxed">
              Our member companies represent the backbone of Africa's upstream energy sector, united under a
              shared commitment to environmental protection and emergency response readiness.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {memberCompanies.map((company, i) => (
              <div
                key={company.file}
                className={[
                  'bg-white border border-slate-200 p-5 flex items-center justify-center min-h-[100px] shadow-sm hover:shadow-md transition-shadow duration-150',
                  membersInView ? 'animate-fade-up' : 'opacity-0',
                ].join(' ')}
                style={{ animationDelay: membersInView ? `${i * 40}ms` : '0ms' }}
              >
                <img
                  src={`/assets/member-companies/${company.file}`}
                  alt={company.name}
                  loading="lazy"
                  title={company.name}
                  className="h-12 w-auto max-w-full object-contain filter contrast-110 grayscale hover:grayscale-0 transition-all duration-150"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [04c] WHY BECOME A MEMBER ───────────────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div
          ref={whyMemberRef}
          className={[
            'max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start',
            whyMemberInView ? 'animate-fade-up' : 'opacity-0',
          ].join(' ')}
        >
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">MEMBERSHIP</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-navyPanel">
              Why Become a Member.
            </h2>
            <p className="text-slate-600 text-lg font-normal leading-relaxed">
              Membership in CleanAfrica Associates connects your organisation to over four decades of collective
              Tier-2 oil spill response capability, built and refined by Africa's leading energy companies.
            </p>
            <p className="text-slate-600 font-normal leading-relaxed">
              As a member, you gain direct access to a shared technical asset base, accredited IMO-level training
              programmes, equipment maintenance support, and a rapid mobilisation network that no single operator
              could build alone. Membership is more than insurance against environmental risk — it is participation
              in a co-operative model that has protected the Niger Delta and the wider African Continental Shelf
              since 1981.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              Apply for Membership
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Shared access to a multi-million dollar technical asset base, without the capital cost of building it alone',
              'Priority deployment during Tier-2 and Tier-3 incidents',
              'IMO OPRC Level 1–3 training access for your personnel',
              'Equipment maintenance and readiness auditing for member-held assets',
              'A direct technical voice through TECOM and the Board of Directors',
              'Standing in a co-operative trusted by 18+ IOC members across the continent',
            ].map((benefit, i) => (
              <div
                key={i}
                className={[
                  'bg-slate-50 border border-slate-200 p-5 text-left flex items-start gap-3',
                  whyMemberInView ? 'animate-fade-up' : 'opacity-0',
                ].join(' ')}
                style={{ animationDelay: whyMemberInView ? `${100 + i * 60}ms` : '0ms' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-responseGreen mt-2 shrink-0" />
                <p className="text-sm text-slate-700 font-normal leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [04d] TESTIMONIALS ─────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 lg:px-16 bg-navyPanel border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-left mb-12 space-y-1">
              <span className="text-sm font-mono tracking-widest text-responseGreen uppercase font-black">MEMBER TESTIMONIALS</span>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">
                Trusted by Africa's Energy Leaders.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.filter(t => t.acf?.quote).map((t) => (
                <div
                  key={t.id}
                  className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <span className="text-4xl text-responseGreen font-black leading-none">"</span>
                    <p className="text-sm text-white/70 leading-relaxed font-normal">
                      {t.acf?.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    {t.acf?.author_photo && (
                      <img
                        src={t.acf.author_photo}
                        alt={t.acf?.author_name}
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-contain bg-white p-1 shrink-0"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <div>
                      <p className="text-xs font-black text-white">{t.acf?.author_name}</p>
                      <p className="text-[10px] font-mono text-white/40">{t.acf?.author_title}, {t.acf?.author_company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* [05] CALL TO ACTION ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-navyPanel to-slate-950 text-white py-20 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay grayscale" style={{ backgroundImage: "url('/assets/images/RHIB_cutting_through_coastal_waters_portrait.webp')" }} />

        {/* CTA content — fade-up on scroll */}
        <div
          ref={ctaRef}
          className={[
            'relative z-10 max-w-5xl mx-auto text-center space-y-8',
            ctaInView ? 'animate-fade-up' : 'opacity-0',
          ].join(' ')}
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Partner with the Sentinel.
            </h2>
            <p className="text-lg text-white/70 font-normal max-w-2xl mx-auto leading-relaxed">
              Secure your operations with 35 years of institutional memory and a $15M technical asset base.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold tracking-wider uppercase text-sm transition-colors duration-150 shadow-lg focus:outline-none focus:ring-2 focus:ring-signalBlue"
            >
              REQUEST A CAPABILITY AUDIT
            </Link>

            <div className="inline-flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 font-mono text-sm tracking-widest uppercase text-responseGreen font-bold backdrop-blur-sm select-none">
              <span className="w-2 h-2 rounded-full bg-responseGreen animate-ping" />
              OPERATIONAL READINESS: ALPHA (24/7)
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
