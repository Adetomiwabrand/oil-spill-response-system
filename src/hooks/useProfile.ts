// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '../libraries/supabase';

export type UserRole = 'member' | 'staff' | 'admin';

export interface Profile {
  id: string;
  role: UserRole;
  full_name?: string;
}

export function useProfile() {
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [loading, setLoading]   = useState(true);

  const fetchProfile = async (userId?: string) => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data: p } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    setProfile(p ?? null);
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!isMounted) return;
      await fetchProfile(data.user?.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      void fetchProfile(session?.user?.id);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin  = profile?.role === 'admin';
  const isStaff  = profile?.role === 'staff' || isAdmin;
  const isMember = !!profile;

  return { profile, loading, isAdmin, isStaff, isMember };
}
