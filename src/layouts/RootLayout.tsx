import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { DesktopNav } from '../components/nav/DesktopNav';
import { MobileNav } from '../components/nav/MobileNav';
import { EmergencyPill } from '../components/EmergencyPill';
import { MobiliseCAA } from '../components/MobiliseCAA';
import { EMERGENCY_PHONE, MEMBER_PORTAL_HREF } from '../components/nav/navConfig';
import { GridRule } from '../components/GridRule';
import { supabase } from '../libraries/supabase';
import { ScrollRestoration } from 'react-router-dom';

function useMemberSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return isLoggedIn;
}

function TranslateButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Move the hidden Google widget into our dropdown when it opens
  useEffect(() => {
    const widget = document.getElementById('google_translate_element');
    const container = document.getElementById('translate_dropdown');
    if (widget && container && open) {
      widget.style.display = 'block';
      container.appendChild(widget);
    }
    if (!open && widget) {
      widget.style.display = 'none';
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center w-9 h-9 border border-white/30 rounded-md text-white/60 hover:text-white hover:border-white/60 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
        aria-label="Translate page"
        title="Translate page"
      >
        {/* Globe icon */}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
      </button>
      {open && (
        <div
          id="translate_dropdown"
          className="absolute right-0 top-11 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50 min-w-[180px]"
        />
      )}
    </div>
  );
}

const footerLinks = {
  quickLinks: [
    { label: 'About the Association', href: '/who-we-are' },
    { label: 'Membership Portal',     href: '/portal/login' },
    { label: 'Industry Reports',      href: '/knowledge' },
    { label: 'Media Centre',          href: '/knowledge' },
    { label: 'Equipment Gallery',     href: '/gallery' },
  ],
  accreditations: [
    { label: 'ISO 9001:2015',       href: '/who-we-are' },
    { label: 'ISO 14001:2015',      href: '/who-we-are' },
    { label: 'NOSDRA Compliance',   href: '/presence/regulatory-navigator' },
    { label: 'OPRC Convention',     href: '/presence/regulatory-navigator' },
  ],
};

export const RootLayout: React.FC = () => {
  const isLoggedIn = useMemberSession();
  const [mobiliseOpen, setMobiliseOpen] = useState(false);

  useEffect(() => {
    const handler = () => setMobiliseOpen(true);
    window.addEventListener('mobilise-open', handler);
    return () => window.removeEventListener('mobilise-open', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-fieldBg">

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="bg-navyPanel sticky top-0 z-30 h-[93px]" role="banner">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded"
            aria-label="Clean Africa Response - Home"
          >
            <img
              src="/caa_logo2.png"
              alt="Clean Africa Response"
              className="h-16 w-auto mix-blend-screen"
              width={64}
              height={64}
            />
          </Link>

          <ScrollRestoration />
          
          {/* Desktop nav — centred */}
          <div className="hidden lg:flex flex-1 justify-center">
            <DesktopNav />
          </div>

          {/* Utility actions — aligned to top so phone number sits below emergency button */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <TranslateButton />
            {isLoggedIn ? (
              <Link
                to="/portal/dashboard"
                className="inline-flex items-center h-11 border border-white/30 text-fieldBg text-xs font-bold tracking-widest px-5 rounded-md hover:border-white/60 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue whitespace-nowrap"
              >
                MY DASHBOARD
              </Link>
            ) : (
              <Link
                to={MEMBER_PORTAL_HREF}
                className="inline-flex items-center h-11 border border-white/30 text-fieldBg text-xs font-bold tracking-widest px-5 rounded-md hover:border-white/60 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue whitespace-nowrap"
              >
                MEMBER LOGIN
              </Link>
            )}
            <EmergencyPill phoneNumber={EMERGENCY_PHONE} onActivate={() => setMobiliseOpen(true)} />
          </div>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </header>

      {/* ── PAGE CONTENT ───────────────────────────────── */}
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="bg-navyPanel" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
          <GridRule />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Col 1: Brand */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">CLEANAFRICA</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Africa&apos;s leading oil spill response organization, providing technical assistance and
                environmental protection since 1981.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://linkedin.com/company/clean-nigeria-associates-ltd-gte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 border border-white/20 rounded hover:border-responseGreen transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                  aria-label="LinkedIn page"
                >
                  <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/cleannigeriaassociates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 border border-white/20 rounded hover:border-responseGreen transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                  aria-label="Facebook page"
                >
                  <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">QUICK LINKS</p>
              <ul className="space-y-2.5">
                {footerLinks.quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/50 hover:text-responseGreen underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded min-h-[44px] inline-flex items-center"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Accreditations */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">ACCREDITATIONS</p>
              <ul className="space-y-2.5">
                {footerLinks.accreditations.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/50 hover:text-responseGreen underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded min-h-[44px] inline-flex items-center"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div className="bg-navyPanel border border-white/10 rounded-lg p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                OPERATIONAL HEADQUARTERS
              </p>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">
                Port Harcourt, Rivers State, Nigeria.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-2">
                24/7 EMERGENCY HOTLINE:
              </p>
              <a
                href="tel:+2349062873290"
                className="text-white font-bold text-base hover:text-responseGreen underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded min-h-[44px] inline-flex items-center"
              >
                +234 906 287 3290
              </a>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; 2026 CleanAfrica Associates. All Rights Reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy"  className="hover:text-white underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded">Privacy Policy</Link>
              <Link to="/terms"    className="hover:text-white underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded">Terms of Engagement</Link>
              <Link to="/cookies"  className="hover:text-white underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue rounded">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </footer>
      <MobiliseCAA
        isOpen={mobiliseOpen}
        onClose={() => setMobiliseOpen(false)}
      />
    </div>
  );
};
