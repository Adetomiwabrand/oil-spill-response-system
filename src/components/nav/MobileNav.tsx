import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, EMERGENCY_PHONE, MEMBER_PORTAL_HREF } from './navConfig';
import type { NavItem } from './navConfig';
import { EmergencyPill } from '../EmergencyPill';
import { MobiliseCAA } from '../MobiliseCAA';

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [calloutOpen, setCalloutOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  const toggleItem = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  const hasChildren = (item: NavItem) => item.children || item.isMegaMenu;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-11 h-11 text-fieldBg focus:outline-none focus:ring-2 focus:ring-signalBlue rounded"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 top-[93px] bg-navyPanel z-40 overflow-y-auto pb-28"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col divide-y divide-white/10 pt-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link
                    to={item.href}
                    onClick={close}
                    className="flex-1 flex items-center px-6 min-h-[44px] text-base font-bold text-fieldBg focus:outline-none focus:ring-2 focus:ring-signalBlue"
                  >
                    {item.label}
                  </Link>
                  {hasChildren(item) && (
                    <button
                      onClick={() => toggleItem(item.label)}
                      className="flex items-center justify-center px-4 min-h-[44px] min-w-[44px] text-fieldBg focus:outline-none focus:ring-2 focus:ring-signalBlue"
                      aria-label={expandedItem === item.label ? 'Collapse ' + item.label : 'Expand ' + item.label}
                      aria-expanded={expandedItem === item.label}
                    >
                      <span className="text-2xl leading-none font-light">
                        {expandedItem === item.label ? '−' : '+'}
                      </span>
                    </button>
                  )}
                </div>

                {item.children && expandedItem === item.label && (
                  <div className="bg-white/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={close}
                        className="flex items-center px-8 min-h-[44px] text-sm text-white/80 hover:text-responseGreen underline focus:outline-none focus:ring-2 focus:ring-signalBlue"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {item.isMegaMenu && item.categories && expandedItem === item.label && (
                  <div className="bg-white/5">
                    {item.categories.map((cat) => (
                      <div key={cat.label} className="px-6 py-4 border-t border-white/5">
                        <p className={['text-xs font-bold uppercase tracking-widest mb-3', cat.highlighted ? 'text-alertRed' : 'text-responseGreen'].join(' ')}>
                          {cat.label}
                        </p>
                        {cat.items.map((i) => (
                          <Link
                            key={i.href}
                            to={i.href}
                            onClick={close}
                            className="flex items-center pl-2 min-h-[44px] text-sm text-white/80 hover:text-responseGreen underline focus:outline-none focus:ring-2 focus:ring-signalBlue"
                          >
                            {i.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Translate Page</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'fr', label: 'Français' },
                  { code: 'ar', label: 'العربية' },
                  { code: 'pt', label: 'Português' },
                  { code: 'ha', label: 'Hausa' },
                  { code: 'yo', label: 'Yorùbá' },
                  { code: 'ig', label: 'Igbo' },
                ].map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      document.cookie = `googtrans=/en/${code}; path=/`;
                      document.cookie = `googtrans=/en/${code}; domain=${window.location.hostname}; path=/`;
                      window.location.reload();
                    }}
                    className="text-[11px] font-bold px-3 py-1.5 border border-white/20 text-white/60 hover:text-white hover:border-white/50 rounded transition-colors duration-150"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/`;
                    window.location.reload();
                  }}
                  className="text-[11px] font-bold px-3 py-1.5 border border-white/10 text-white/30 hover:text-white/60 rounded transition-colors duration-150"
                >
                  English
                </button>
              </div>
            </div>

            <div className="px-6 py-5">
              <Link
                to={MEMBER_PORTAL_HREF}
                onClick={close}
                className="flex items-center justify-center w-full min-h-[44px] border border-white/30 text-fieldBg font-bold rounded-md hover:border-white/60 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
              >
                Member Login
              </Link>
            </div>
          </nav>

          <div className="fixed bottom-0 left-0 right-0 bg-navyPanel border-t border-white/10 p-4 z-50 flex justify-center">
            <EmergencyPill
              phoneNumber={EMERGENCY_PHONE}
              onActivate={() => {
                setIsOpen(false);
                setExpandedItem(null);
                setCalloutOpen(true);
              }}
            />
          </div>

            </div>
      )}

      <MobiliseCAA
        isOpen={calloutOpen}
        onClose={() => setCalloutOpen(false)}
      />
    </div>
  );
};