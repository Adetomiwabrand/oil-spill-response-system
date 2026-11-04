import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GridRule } from '../components/GridRule';
import { EventsStrip } from '../components/EventsStrip';
import { useHeroVideo } from '../hooks/useHeroVideo';

// ── Africa Strategic Map ───────────────────────────────────────

const BASE_LOCATIONS = [
  { id: 'gulf',     label: 'GULF OF GUINEA HUB',      x: 153, y: 248, delay: 0    },
  { id: 'east',     label: 'EAST AFRICA SHOREBASE',   x: 310, y: 257, delay: 0.4  },
  { id: 'southern', label: 'SOUTHERN CAPE LOGISTICS', x: 197, y: 412, delay: 0.8  },
];

function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 400 460"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Africa strategic base locations map"
      role="img"
    >
      <defs>
        {/* Subtle grid */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        {/* Glow filter for dots */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Gradient for continent fill */}
        <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2d4a" />
          <stop offset="100%" stopColor="#0F1B2C" />
        </linearGradient>
        {/* Pulse animation keyframes via CSS */}
        <style>{`
          @keyframes ping {
            0%   { r: 6;  opacity: 0.7; }
            100% { r: 22; opacity: 0;   }
          }
          @keyframes ping2 {
            0%   { r: 6;  opacity: 0.4; }
            100% { r: 16; opacity: 0;   }
          }
          .pulse-ring-1 { animation: ping  2.4s ease-out infinite; }
          .pulse-ring-2 { animation: ping2 2.4s ease-out infinite; animation-delay: 0.6s; }
          .dot-gulf     .pulse-ring-1, .dot-gulf     .pulse-ring-2 { animation-delay: 0s;   }
          .dot-east     .pulse-ring-1                               { animation-delay: 0.4s; }
          .dot-east     .pulse-ring-2                               { animation-delay: 1.0s; }
          .dot-southern .pulse-ring-1                               { animation-delay: 0.8s; }
          .dot-southern .pulse-ring-2                               { animation-delay: 1.4s; }
          @keyframes radarSweep {
            from { transform: rotate(0deg);   }
            to   { transform: rotate(360deg); }
          }
          .radar-sweep { 
            transform-origin: 200px 280px;
            animation: radarSweep 6s linear infinite;
          }
          @keyframes fadeInMap {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0);   }
          }
          .map-fadein { animation: fadeInMap 0.8s ease-out forwards; }
        `}</style>
      </defs>

      {/* Background */}
      <rect width="400" height="460" fill="#0a1628" />
      <rect width="400" height="460" fill="url(#grid)" />

      {/* Radar sweep centred on Gulf of Guinea */}
      <g className="radar-sweep" style={{ transformOrigin: '153px 248px' }}>
        <path
          d="M153 248 L153 208 A40 40 0 0 1 187 248 Z"
          fill="rgba(34,197,94,0.08)"
        />
      </g>

      {/* Africa continent outline — mathematically transformed from accurate SVG source */}
      <path
        className="map-fadein"
        d="M 156.7,40.1 C 149.1,41.5 145.5,41.9 137.0,42.1 122.4,42.5 121.5,42.7 105.5,49.0 L 97.2,52.2 89.7,52.5 C 82.5,52.8 82.0,52.9 79.2,54.2 75.4,55.9 67.2,61.4 64.8,63.8 61.5,67.1 59.6,71.9 57.9,80.2 57.3,83.7 55.8,85.3 49.9,88.6 38.9,94.6 36.9,97.0 28.7,113.0 25.3,119.6 23.8,123.0 23.8,124.0 23.8,124.9 24.7,128.6 25.8,132.4 28.8,142.6 28.6,144.5 23.2,153.2 21.6,155.7 20.1,158.5 20.0,159.4 19.8,160.4 20.0,162.0 20.6,164.1 21.2,165.8 21.6,168.9 21.8,170.9 22.0,176.0 22.9,177.2 29.3,181.4 35.7,185.5 37.9,187.6 40.5,191.5 44.3,197.3 47.0,200.3 54.7,207.1 63.5,214.9 66.8,217.4 68.9,218.0 70.9,218.6 71.5,218.3 74.2,215.8 77.7,212.7 78.5,212.6 94.1,212.3 L 107.9,212.0 114.3,208.8 C 121.7,205.2 124.2,204.3 127.6,204.0 131.2,203.6 133.5,205.0 135.9,208.7 136.9,210.3 138.3,212.5 139.0,213.6 141.9,218.1 145.1,218.6 151.2,215.8 155.7,213.7 157.5,213.5 159.9,215.3 163.9,218.3 164.1,219.4 161.4,224.8 160.0,227.6 159.4,229.4 158.9,232.7 158.5,235.0 157.9,238.6 157.4,240.7 156.2,245.9 156.4,246.5 161.7,252.0 164.1,254.4 166.7,257.2 167.4,258.2 169.4,260.8 175.6,270.8 176.4,272.6 176.7,273.4 177.2,276.6 177.4,279.6 177.7,285.1 178.3,287.0 181.1,293.9 182.8,297.8 182.5,298.9 178.5,303.1 174.5,307.5 173.0,309.8 172.2,313.7 170.2,323.0 172.3,331.6 179.6,344.1 186.5,355.9 187.6,359.2 188.4,369.6 188.7,372.7 189.0,376.0 189.3,376.8 189.9,378.9 191.7,381.8 194.9,386.2 200.8,394.2 203.0,399.1 204.4,407.2 205.6,414.5 207.4,417.6 211.7,419.8 214.7,421.3 217.4,421.3 221.9,419.8 226.8,418.2 229.6,417.7 238.4,417.2 242.9,417.0 246.9,416.5 248.3,416.1 253.5,414.5 258.5,411.3 263.9,406.1 267.5,402.6 282.8,386.5 284.2,384.7 285.0,383.6 285.2,382.9 285.2,378.9 285.2,373.1 285.5,372.5 291.0,369.5 295.8,366.8 297.9,364.8 298.5,362.4 299.0,360.3 298.8,359.3 296.8,352.2 295.2,346.3 295.2,346.3 296.0,344.3 297.9,339.2 303.7,333.9 310.0,331.3 315.3,329.2 319.0,325.6 321.8,319.9 323.8,315.6 324.2,313.3 324.6,302.7 325.1,290.9 325.0,290.7 321.8,286.5 319.5,283.4 318.6,280.7 317.5,274.2 315.9,264.5 316.4,262.1 321.0,257.3 322.4,255.8 325.6,252.1 328.0,249.1 336.4,238.6 343.8,231.6 350.2,228.0 356.8,224.3 359.9,221.2 363.0,215.0 363.9,213.1 366.2,209.3 368.1,206.4 370.0,203.6 372.6,199.6 373.8,197.4 376.3,193.0 379.7,183.5 380.0,179.8 380.2,177.4 380.2,177.2 378.8,175.8 377.4,174.5 377.3,174.5 374.4,174.7 371.1,174.9 363.0,177.4 355.3,180.4 352.0,181.7 348.8,182.7 346.4,183.0 340.4,183.9 338.8,182.9 337.7,177.4 336.6,172.0 334.8,169.3 327.7,161.9 321.3,155.2 321.2,155.1 317.9,148.5 316.0,144.9 313.2,139.8 311.5,137.3 309.9,134.7 307.6,130.6 306.5,128.2 305.3,125.7 301.6,117.8 298.2,110.6 294.8,103.5 291.0,95.8 289.7,93.7 288.4,91.5 285.7,86.8 283.8,83.3 279.7,75.8 278.4,74.0 276.5,73.1 274.8,72.2 271.1,72.2 267.5,73.1 263.5,74.1 262.7,74.0 260.9,72.3 259.0,70.4 259.0,70.4 248.3,69.9 240.8,69.5 239.6,69.3 234.8,67.8 225.6,65.0 222.5,65.6 215.9,71.4 211.6,75.1 209.7,76.0 206.4,76.0 202.8,76.0 200.4,75.3 193.3,71.9 190.0,70.3 185.2,68.3 182.6,67.5 174.3,64.7 167.1,60.6 167.1,58.5 167.1,58.2 167.8,57.1 168.7,56.1 169.9,54.6 170.2,53.9 170.2,52.3 170.2,47.3 166.0,41.3 161.7,40.2 159.5,39.6 159.3,39.6 156.7,40.1 Z M 286.6,237.9 C 287.8,239.0 287.6,241.5 286.1,243.8 282.4,249.6 279.1,249.0 279.5,242.6 279.7,239.9 279.8,239.5 281.1,238.4 282.7,236.9 285.2,236.7 286.6,237.9 Z"
        fill="url(#continentGrad)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        fillRule="evenodd"
      />

      {/* Subtle country-divider lines inside continent */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" fill="none">
        <line x1="155" y1="130" x2="250" y2="145" />
        <line x1="100" y1="190" x2="295" y2="200" />
        <line x1="95"  y1="250" x2="290" y2="255" />
        <line x1="110" y1="310" x2="275" y2="308" />
        <line x1="185" y1="130" x2="188" y2="428" />
      </g>

      {/* Connecting lines between bases */}
      {BASE_LOCATIONS.map((from, i) =>
        BASE_LOCATIONS.slice(i + 1).map((to) => (
          <line
            key={`${from.id}-${to.id}`}
            x1={from.x} y1={from.y}
            x2={to.x}   y2={to.y}
            stroke="rgba(34,197,94,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))
      )}

      {/* Base pulse dots */}
      {BASE_LOCATIONS.map((base) => (
        <g
          key={base.id}
          className={`dot-${base.id}`}
          onMouseEnter={() => setHovered(base.id)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: 'pointer' }}
        >
          {/* Outer pulse rings */}
          <circle className="pulse-ring-1" cx={base.x} cy={base.y} r="6" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          <circle className="pulse-ring-2" cx={base.x} cy={base.y} r="6" fill="none" stroke="#22C55E" strokeWidth="1" />
          {/* Static dot */}
          <circle
            cx={base.x} cy={base.y} r="5"
            fill={hovered === base.id ? '#22C55E' : '#0F1B2C'}
            stroke="#22C55E"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <circle cx={base.x} cy={base.y} r="2" fill="#22C55E" />

          {/* Tooltip on hover */}
          {hovered === base.id && (
            <g>
              <rect
                x={base.x + 10} y={base.y - 16}
                width={base.label.length * 5.8 + 12} height={22}
                rx="3" fill="#0F1B2C" stroke="#22C55E" strokeWidth="1"
              />
              <text
                x={base.x + 16} y={base.y - 1}
                fontSize="8" fontFamily="Arial" fontWeight="bold"
                fill="#22C55E" letterSpacing="0.8"
              >
                {base.label}
              </text>
            </g>
          )}
        </g>
      ))}

      {/* Legend */}
      <g transform="translate(20, 410)">
        <circle cx="6" cy="6" r="4" fill="#0F1B2C" stroke="#22C55E" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1.5" fill="#22C55E" />
        <text x="16" y="10" fontSize="8" fontFamily="Arial" fill="rgba(255,255,255,0.35)" letterSpacing="1">
          STRATEGIC BASE
        </text>
        <line x1="110" y1="6" x2="130" y2="6" stroke="rgba(34,197,94,0.4)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="136" y="10" fontSize="8" fontFamily="Arial" fill="rgba(255,255,255,0.35)" letterSpacing="1">
          CORRIDOR
        </text>
      </g>
    </svg>
  );
}



const stats = [
  { value: '$15M+', label: 'ACTIVE ASSETS' },
  { value: '35+',   label: 'YEARS LEGACY' },
  { value: '18',    label: 'IOC MEMBERS' },
  { value: '5',     label: 'STRATEGIC BASES' },
];

const hubs = [
  { number: '01', name: 'GULF OF GUINEA HUB',       desc: 'Primary Port Harcourt Engineering Nerve Center.' },
  { number: '02', name: 'EAST AFRICA SHOREBASE',    desc: 'Dedicated support for growing maritime activities.' },
  { number: '03', name: 'SOUTHERN CAPE LOGISTICS',  desc: 'Southern operational base for regional resilience.' },
];

const pillarThemes = [
  {
    base: '#0B132B',
    icon: '#5EE7DF',
    title: '#E5F2FF',
    copy: '#CBD5E1',
    footer: '#94A3B8',
    border: 'rgba(229, 242, 255, 0.18)',
    glow: '0 0 28px rgba(94, 231, 223, 0.22)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 35%, rgba(0,0,0,0.82) 100%)',
  },
  {
    base: '#050914',
    icon: '#7DD3FC',
    title: '#F8FAFC',
    copy: '#CBD5E1',
    footer: '#94A3B8',
    border: 'rgba(248, 250, 252, 0.16)',
    glow: '0 0 28px rgba(125, 211, 252, 0.22)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 35%, rgba(0,0,0,0.82) 100%)',
  },
  {
    base: '#39FF14',
    icon: '#FFFFFF',
    title: '#FFFFFF',
    copy: '#F8FAFC',
    footer: '#E0FFBB',
    border: 'rgba(255, 255, 255, 0.22)',
    glow: '0 0 28px rgba(255, 255, 255, 0.24)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 35%, rgba(0,0,0,0.82) 100%)',
  },
  {
    base: '#165B00',
    icon: '#C7F76F',
    title: '#ECFDF5',
    copy: '#D1FAE5',
    footer: '#A7F3D0',
    border: 'rgba(255, 255, 255, 0.16)',
    glow: '0 0 28px rgba(199, 247, 111, 0.22)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 35%, rgba(0,0,0,0.82) 100%)',
  },
];

const pillars = [
  {
    title: 'RESPONSE PREPAREDNESS',
    copy:  'Comprehensive Tier-2 equipment leasing and specialized readiness programs tailored for IOC operational requirements, ensuring continuous regulatory compliance.',
    footer: '01 TECHNICAL SHELL',
    image: '/assets/images/home-pillar-res.webp',
    icon: (
      <svg className="w-8 h-8 text-responseGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'IMO TRAINING',
    copy:  'Accredited IMO Level 1, 2, and 3 oil spill response training and professional development for regional regulatory bodies, technical experts, and commercial operators.',
    footer: '02 HUMAN CAPITAL',
    image: '/assets/images/home-pillar-imo-certi.webp',
    icon: (
      <svg className="w-8 h-8 text-responseGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: 'REGULATORY AUDIT',
    copy:  'Independent technical audits and specialized risk assessment services. Rigorously assessing contingency plans for national operators and international companies across the continental shelf.',
    footer: '03 GOVERNANCE',
    image: '/assets/images/home-pillar-com.webp',
    icon: (
      <svg className="w-8 h-8 text-responseGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'TIER-3 CRISIS',
    copy:  'Immediate activation and rapid strategic mobilization of global Tier-3 containment assets, expert logistics support, and dedicated response teams for large-scale environmental emergencies.',
    footer: '04 FRONTLINE',
    image: '/assets/images/home-pillar-los.webp',
    icon: (
      <svg className="w-8 h-8 text-responseGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const parseStatValue = (value: string) => {
  const numeric = Number(value.replace(/[^0-9]/g, ''));
  const prefixMatch = value.match(/^(\D*)/);
  const suffixMatch = value.match(/(\D*)$/);

  return {
    numeric: Number.isNaN(numeric) ? 0 : numeric,
    prefix: prefixMatch?.[0] ?? '',
    suffix: suffixMatch?.[0] ?? '',
  };
};

// ── Newsletter section ────────────────────────────────────────

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit() {
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Subscription failed.');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="bg-fieldBg border-y border-slate-200 py-20 px-4" aria-label="Newsletter signup">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <p className="text-sm font-bold uppercase tracking-widest text-responseGreen">
          STAY INFORMED
        </p>
        <h2 className="text-3xl font-bold text-navyPanel leading-tight">
          CAA Intelligence Briefings
        </h2>
        <p className="text-sm text-navyPanel/60 leading-relaxed max-w-lg mx-auto">
          Receive regulatory updates, incident reports, training schedules, and
          equipment advisories direct from the CAA operations desk.
        </p>

        {status === 'success' ? (
          <div className="bg-responseGreen/10 border border-responseGreen/30 rounded-lg px-6 py-5 text-center">
            <p className="font-bold text-navyPanel text-sm tracking-wide">
              You're subscribed.
            </p>
            <p className="text-sm text-navyPanel/60 mt-1">
              You'll receive the next briefing when it's published.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="you@email.com"
              disabled={status === 'loading'}
              aria-label="Email address"
              className="flex-1 px-4 py-3 border border-slate-300 bg-white text-navyPanel text-sm rounded focus:outline-none focus:ring-2 focus:ring-signalBlue placeholder:text-slate-400 disabled:opacity-50 min-h-[44px]"
            />
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="px-7 py-3 bg-navyPanel hover:bg-slate-800 text-white font-bold text-sm tracking-widest uppercase rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue disabled:opacity-50 min-h-[44px] shrink-0"
            >
              {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </div>
        )}

        {status === 'error' && errorMsg && (
          <p className="text-sm text-alertRed font-mono">{errorMsg}</p>
        )}

        <p className="text-[10px] text-navyPanel/30 uppercase tracking-widest">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function Home() {
  const heroVideoSrc = useHeroVideo();

  const parsedStats = useMemo(
    () => stats.map((s) => parseStatValue(s.value)),
    []
  );

  const [currentCounts, setCurrentCounts] = useState<number[]>(
    parsedStats.map(() => 0)
  );

  const hubRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hubVisible, setHubVisible] = useState<boolean[]>(
    parsedStats.map(() => false)
  );
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillarVisible, setPillarVisible] = useState<boolean[]>(
    pillars.map(() => false)
  );

  useEffect(() => {
    const duration = 1200;
    const targets = parsedStats.map((stat) => stat.numeric);
    let rafId = 0;

    // Defer animation start past initial paint to avoid forced reflow on LCP
    const timeout = setTimeout(() => {
      const start = performance.now();

      const animate = (now: number) => {
        const elapsed = Math.min(now - start, duration);
        const progress = elapsed / duration;
        setCurrentCounts(
          targets.map((target) => Math.round(target * progress))
        );
        if (elapsed < duration) {
          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, 200);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [parsedStats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(index)) {
              setHubVisible((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    hubRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-pillar-index'));
            if (!Number.isNaN(index)) {
              setPillarVisible((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    pillarRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>

      {/* ── [02] HERO ─────────────────────────────────────── */}
      <section className="relative bg-navyPanel min-h-[88vh] flex items-end overflow-hidden" aria-label="Hero">

        {/* Background Video Component */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <video
            key={heroVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-45 grayscale mix-blend-screen"
          >
            <source src={heroVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Cinematic Gradient Overlay to maintain dark tones and high text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-navyPanel/80 via-navyPanel/30 to-transparent" />
        </div>

        {/* Tier badge — top left */}
        <div className="absolute top-10 left-4 lg:left-8 z-10">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-responseGreen border border-responseGreen px-3 py-1 rounded-sm">
            TIER-2 &amp; TIER-3 CERTIFIED
          </span>
        </div>

        {/* Content (Bumped z-index to stay above video) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-16 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-end">

            {/* Left: headline + copy + CTAs */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 hero-fade-title">
                Africa&apos;s Centre of Excellence for Oil Spill Management.
              </h1>
              <p
                className="text-white/70 text-base lg:text-lg max-w-xl mb-10 leading-relaxed hero-fade-copy"
                style={{ animationDelay: '0.12s' }}
              >
                Tier-2 &amp; Tier-3 Response, Accredited Technical Training, and Specialized Regulatory
                Compliance across the African Continental Shelf. Dedicated to safeguarding regional marine
                ecosystems through industrial precision and indigenous technical expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center min-h-[44px] bg-responseGreen text-navyPanel font-bold text-sm tracking-wider px-8 py-3 rounded hover:bg-green-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue request-pulse-button"
                >
                  REQUEST CAPABILITIES
                </Link>
                <Link
                  to="/assets"
                  className="inline-flex items-center min-h-[44px] border-2 border-white/40 text-white font-bold text-sm tracking-wider px-8 py-3 rounded hover:border-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                >
                  VIEW ASSET REGISTRY
                </Link>
              </div>
            </div>

            {/* Right: stats panel */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 grid grid-cols-2 gap-x-6 gap-y-7">
              {stats.map((s, index) => {
                const { prefix, suffix } = parsedStats[index];
                return (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-bold text-white">
                      {`${prefix}${currentCounts[index]}${suffix}`}
                    </p>
                    <p className="text-sm font-bold text-white/50 tracking-widest mt-1">{s.label}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .hero-fade-title,
        .hero-fade-copy {
          opacity: 0;
          transform: translateY(1.125rem);
          animation: heroFadeInUp 0.9s ease-out forwards;
        }

        .hero-fade-copy {
          animation-delay: 0.12s;
        }

        .request-pulse-button {
          animation: softPulseGlow 1.25s ease-out 0.35s both;
          will-change: transform, box-shadow;
        }

        .section3-fade-item,
        .section3-map-entry {
          opacity: 0;
          transform: translateY(1rem);
          animation: section3FadeIn 0.85s ease-out forwards;
        }

        .section3-map-entry {
          opacity: 0;
          transform: translateY(1rem);
          animation: section3FadeIn 0.85s ease-out forwards;
        }

        .hub-card {
          opacity: 0;
          transform: translateY(1rem);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .hub-card-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section4-fade-item {
          opacity: 0;
          transform: translateY(1rem);
          animation: section4FadeIn 0.85s ease-out forwards;
        }

        .flip-card {
          opacity: 0;
          transform: perspective(1000px) rotateY(-90deg);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .flip-card-visible {
          opacity: 1;
          animation: horizontalFlipIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes horizontalFlipIn {
          0% {
            transform: perspective(1000px) rotateY(-90deg);
            opacity: 0;
          }
          100% {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(1.125rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softPulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(94, 231, 223, 0.22);
            transform: scale(1);
          }
          45% {
            box-shadow: 0 0 0 16px rgba(94, 231, 223, 0.09);
            transform: scale(1.006);
          }
          100% {
            box-shadow: 0 0 0 32px rgba(94, 231, 223, 0);
            transform: scale(1);
          }
        }

        @keyframes section3FadeIn {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes section4FadeIn {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ── [03] CONTINENTAL STRATEGIC PRESENCE ──────────── */}
      <section className="py-20 bg-white" aria-label="Continental Strategic Presence">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left: text + hub list */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-responseGreen mb-4 section3-fade-item" style={{ animationDelay: '0s' }}>
                OPERATIONAL INTEL
              </p>
              <h2 className="text-4xl font-bold text-navyPanel leading-tight mb-5 section3-fade-item" style={{ animationDelay: '0.08s' }}>
                Continental Strategic Presence
              </h2>
              <div className="section3-fade-item" style={{ animationDelay: '0.16s' }}>
                <GridRule />
              </div>
              <p
                className="text-navyPanel/60 mt-6 mb-10 leading-relaxed text-sm lg:text-base section3-fade-item"
                style={{ animationDelay: '0.24s' }}
              >
                Strategically positioned across Africa&apos;s most critical maritime corridors, our 5 dedicated
                bases and 2 specialized depots provide immediate mobilization for Tier-2 and Tier-3 incidents,
                ensuring rapid containment and response to minimize environmental and community impact.
              </p>

              <div className="space-y-3">
                {hubs.map((hub, index) => (
                  <div
                    key={hub.number}
                    ref={(el) => {
                      hubRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`flex items-start gap-5 px-5 py-4 border-l-2 border-responseGreen bg-fieldBg rounded-r hub-card ${hubVisible[index] ? 'hub-card-visible' : ''}`}
                    style={{ transitionDelay: `${100 * (index + 1)}ms` }}
                  >
                    <span className="text-sm font-bold text-responseGreen tracking-widest shrink-0 pt-0.5">
                      {hub.number}
                    </span>
                    <div>
                      <p className="font-bold text-navyPanel text-sm tracking-wide">{hub.name}</p>
                      <p className="text-navyPanel/50 text-sm mt-0.5">{hub.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: map placeholder + CTA */}
            <div className="relative section3-map-entry" style={{ animationDelay: '0.12s' }}>
              <div className="relative bg-navyPanel rounded-lg overflow-hidden aspect-[3.85/3.75] flex items-center justify-center">
                {/* Africa SVG Map */}
                <div className="absolute inset-0">
                  <AfricaMap />
                </div>
                {/* Overlay CTA button */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 w-max">
                  <Link
                    to="/presence"
                    className="inline-flex items-center gap-2 min-h-[44px] bg-signalBlue text-white font-bold text-sm tracking-wide px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    ENTER COMMAND CENTRE MAP
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── [04] STRATEGIC PILLARS OF READINESS ──────────── */}
      <section className="py-20 bg-fieldBg" aria-label="Strategic Pillars of Readiness">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-responseGreen mb-3 section4-fade-item" style={{ animationDelay: '0s' }}>
                OUR FRAMEWORK
              </p>
              <h2 className="text-4xl font-bold text-navyPanel leading-tight section4-fade-item" style={{ animationDelay: '0.08s' }}>
                Strategic Pillars<br className="hidden sm:block" /> of Readiness
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center min-h-[44px] text-sm font-bold text-signalBlue underline hover:text-navyPanel transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded shrink-0 section4-fade-item"
              style={{ animationDelay: '0.16s' }}
            >
              FULL SERVICE PORTFOLIO &rarr;
            </Link>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, index) => {
              const theme = pillarThemes[index % pillarThemes.length];
              return (
                <div 
                  key={p.title} 
                  ref={(el) => {
                    pillarRefs.current[index] = el;
                  }}
                  data-pillar-index={index}
                  className={`relative group border border-white/15 ring-1 ring-white/5 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_0_28px_rgba(255,255,255,0.15)] hover:border-white/30 transition duration-200 ease-out min-h-[400px] flip-card ${pillarVisible[index] ? 'flip-card-visible' : ''}`}
                  style={{ backgroundColor: theme.base, borderColor: theme.border, boxShadow: theme.glow, animationDelay: `${index * 100}ms` }}
                >
                  {/* Background image if available */}
                  {p.image && (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${p.image})`, backgroundColor: theme.base }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-100"
                        style={{ backgroundImage: theme.overlay, opacity: 1 }}
                        aria-hidden="true"
                      />
                    </>
                  )}

                  {/* Content */}
                  <div className="relative p-7 flex flex-col h-full"
                    style={{ color: theme.title }}
                  >
                    <div className="mb-5" style={{ color: theme.icon }}>
                      {p.icon}
                    </div>
                    <h3 className="font-bold text-sm tracking-widest mb-4" style={{ color: theme.title }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: theme.copy }}>{p.copy}</p>
                    <div className="mt-7 pt-5 border-t" style={{ borderColor: theme.border }}>
                      <p className="text-sm font-bold tracking-widest" style={{ color: theme.footer }}>{p.footer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── [04B] UPCOMING EVENTS STRIP ──────────────────── */}
      <EventsStrip />

      {/* ── [04C] NEWSLETTER SECTION ─────────────────────── */}
      <NewsletterSection />

      {/* ── [05] OPERATIONAL READINESS PANEL ─────────────── */}
      <section className="bg-navyPanel overflow-hidden" aria-label="Operational Readiness">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

            {/* Left: dark image block */}
            <div className="relative bg-navyPanel flex flex-col justify-end p-10 min-h-[360px] lg:min-h-0 overflow-hidden">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/images/home-strategic-statement.webp')` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navyPanel via-navyPanel/80 to-signalBlue/10" aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-sm font-bold uppercase tracking-widest text-responseGreen mb-3">
                  INDUSTRIAL CONTAINMENT
                </p>
                <p className="text-3xl font-bold text-white mb-3 leading-tight">
                  Industrial<br />Containment
                </p>
                <p className="text-white/60 text-sm mb-8 max-w-sm leading-relaxed">
                  $5M+ investment in deepwater containment technology and shoreline protection systems.
                </p>
                <Link
                  to="/assets"
                  className="inline-flex items-center min-h-[44px] bg-white text-navyPanel font-bold text-sm tracking-wider px-7 py-3 rounded hover:bg-fieldBg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                >
                  GET THE WHOLE STORY
                </Link>
              </div>
            </div>

            {/* Right: readiness + accreditations */}
            <div className="flex flex-col">

              {/* Green readiness block */}
              <div className="bg-responseGreen flex flex-col items-center justify-center py-14 px-10 text-center flex-1">
                <p className="text-8xl font-bold text-navyPanel leading-none">100%</p>
                <p className="text-sm font-bold tracking-widest text-navyPanel mt-4 uppercase">
                  Operational Readiness
                </p>
                <p className="text-sm text-navyPanel/60 mt-2 tracking-widest uppercase">
                  Operational &middot; Port Harcourt Hub
                </p>
              </div>

              {/* Accreditation cards */}
              <div className="grid grid-cols-2 border-t border-white/10">
                <div className="bg-fieldBg p-7 border-r border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-navyPanel/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-sm font-bold uppercase tracking-widest text-navyPanel/40">CERTIFICATION</p>
                  </div>
                  <p className="font-bold text-navyPanel text-sm">OSRL Partnership 2024</p>
                  <p className="text-sm text-navyPanel/50 mt-1.5 leading-relaxed">Alignment with Global Response Standards.</p>
                </div>
                <div className="bg-white p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-navyPanel/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-bold uppercase tracking-widest text-navyPanel/40">GLOBAL NETWORK</p>
                  </div>
                  <p className="font-bold text-navyPanel text-sm">Real-time Satellite Feed</p>
                  <p className="text-sm text-navyPanel/50 mt-1.5 leading-relaxed">Continuous situational awareness for active incidents.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}
