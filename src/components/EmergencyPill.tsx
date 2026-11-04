// src/components/EmergencyPill.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../libraries/supabase';

interface EmergencyProps {
  phoneNumber: string;
  onActivate?: () => void;
}

export const EmergencyPill: React.FC<EmergencyProps> = ({ phoneNumber, onActivate }) => {
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

  if (!isLoggedIn) return null;

  return (
    <div className="relative">
      <button
        onClick={onActivate}
        className="inline-flex items-center justify-center gap-2 bg-alertRed hover:bg-red-700 text-white font-bold text-xs tracking-widest px-4 h-11 rounded-md transition-colors duration-150 min-w-[44px] focus:outline-none focus:ring-2 focus:ring-signalBlue whitespace-nowrap"
        aria-label="Mobilise CAA Emergency Response"
      >
        <span className="animate-pulse h-2 w-2 rounded-full bg-white block shrink-0" aria-hidden="true"></span>
        MOBILISE CAA
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-white/50 text-[11px] font-light tracking-wide leading-none whitespace-nowrap pointer-events-none">
        {phoneNumber}
      </span>
    </div>
  );
};
