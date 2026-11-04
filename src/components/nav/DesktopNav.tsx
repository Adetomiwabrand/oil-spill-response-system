import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from './navConfig';
import type { NavItem } from './navConfig';

const HOVER_DELAY_MS = 250;

export const DesktopNav: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const handleMouseEnter = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveMenu(label), HOVER_DELAY_MS);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveMenu(null);
  };

  const isActive = (item: NavItem): boolean => {
    if (location.pathname === item.href) return true;
    if (item.children) return item.children.some((c) => location.pathname === c.href);
    if (item.categories) return item.categories.some((cat) => cat.items.some((i) => location.pathname === i.href));
    return false;
  };

  const hasDropdown = (item: NavItem) => item.children || item.isMegaMenu;

  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
      {navItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => hasDropdown(item) ? handleMouseEnter(item.label) : undefined}
          onMouseLeave={() => hasDropdown(item) ? handleMouseLeave() : undefined}
        >
          <Link
            to={item.href}
            className={[
              'flex items-center gap-1 px-3 py-2 text-sm font-bold text-fieldBg hover:text-responseGreen transition-colors duration-150 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-signalBlue rounded',
              isActive(item) ? 'border-b-2 border-alertRed' : '',
            ].join(' ')}
          >
            {item.label}
            {hasDropdown(item) && (
              <svg className="w-3 h-3 ml-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </Link>

          {item.children && activeMenu === item.label && (
            <div className="absolute top-full left-0 pt-2 w-72 z-50">
              <div className="bg-navyPanel border border-white/10 rounded-md shadow-xl">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="flex flex-col justify-center px-4 py-3 min-h-[44px] text-sm text-fieldBg hover:bg-white/10 hover:text-responseGreen underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                >
                  <span className="font-bold no-underline">{child.label}</span>
                  {child.description && (
                    <span className="text-sm text-white/50 mt-0.5 no-underline">{child.description}</span>
                  )}
                </Link>
              ))}
              </div>
            </div>
          )}

          {item.isMegaMenu && item.categories && activeMenu === item.label && (
            <div className="absolute top-full left-0 pt-2 w-[560px] z-50">
              <div className="bg-navyPanel border border-white/10 rounded-md shadow-xl grid grid-cols-2">
              {item.categories.map((cat, idx) => (
                <div
                  key={cat.label}
                  className={[
                    'p-5',
                    cat.highlighted ? 'bg-alertRed/10' : '',
                    idx === 0 ? 'border-r border-white/10' : '',
                  ].join(' ')}
                >
                  <p className={['text-sm font-bold uppercase tracking-widest mb-4', cat.highlighted ? 'text-alertRed' : 'text-responseGreen'].join(' ')}>
                    {cat.label}
                  </p>
                  {cat.items.map((i) => (
                    <Link
                      key={i.href}
                      to={i.href}
                      className="flex items-center py-2 text-sm text-fieldBg hover:text-responseGreen underline min-h-[44px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-signalBlue"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
