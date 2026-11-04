// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../libraries/supabase';
import type { Session } from '@supabase/supabase-js';
import type { UserRole } from '../hooks/useProfile';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const [session, setSession]   = useState<Session | null | undefined>(undefined);
  const [role, setRole]         = useState<UserRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch role only when a requiredRole is specified and we have a session
  useEffect(() => {
    if (!requiredRole || !session) return;
    setRoleLoading(true);
    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        setRole((data?.role as UserRole) ?? null);
        setRoleLoading(false);
      });
  }, [requiredRole, session]);

  // Still checking auth — show nothing to avoid flash
  if (session === undefined) return null;

  // Not logged in — redirect to login
  if (session === null) return <Navigate to="/portal/login" replace />;

  // Role check required — wait for role to load
  if (requiredRole && roleLoading) return null;

  // Role check failed — redirect to dashboard with insufficient access
  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = { member: 1, staff: 2, admin: 3 };
    const userLevel     = roleHierarchy[role ?? 'member'] ?? 0;
    const requiredLevel = roleHierarchy[requiredRole] ?? 0;
    if (userLevel < requiredLevel) {
      return <Navigate to="/portal/dashboard" replace />;
    }
  }

  // All checks passed — render the protected page
  return <Outlet />;
}
