// src/pages/MemberDashboard.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wrench, ExternalLink, Settings, Shield, MapPin, BookOpen, Package, LogOut, ChevronRight, AlertTriangle, Download, FileText } from 'lucide-react';
import { supabase } from '../libraries/supabase';
import { useProfile } from '../hooks/useProfile';
import { useAssets } from '../hooks/useAssets';
import { useBases } from '../hooks/useBases';
import { useTrainingCourses } from '../hooks/useTrainingCourses';
import { useRegulatoryDocs } from '../hooks/useRegulatoryDocs';
import { AdminPanel } from '../components/portal/AdminPanel';

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { isAdmin, isStaff, profile } = useProfile();

  const { data: assets = [],       isLoading: assetsLoading   } = useAssets(100);
  const { data: bases = [],        isLoading: basesLoading    } = useBases(100);
  const { data: courses = [],      isLoading: coursesLoading  } = useTrainingCourses(3);
  const { data: regulatoryDocs = []                           } = useRegulatoryDocs(100);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/portal/login');
  };

  const totalAssetsCount      = assets.length;
  const activeBasesCount      = bases.filter(b => b.acf?.operational_status === 'active' || b.acf?.operational_status === 'standby').length;
  const totalRegulationsCount = regulatoryDocs.length;

  const roleBadgeColor = profile?.role === 'admin' ? 'bg-alertRed/20 text-alertRed border-alertRed/30'
    : profile?.role === 'staff' ? 'bg-signalBlue/20 text-signalBlue border-signalBlue/30'
    : 'bg-responseGreen/20 text-responseGreen border-responseGreen/30';

  return (
    <div className="min-h-screen bg-fieldBg">

      {/* Portal sub-header */}
      <div className="bg-navyPanel border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto">
            <span className="text-white/30 text-xs uppercase tracking-widest font-bold shrink-0 hidden sm:block">Member Portal</span>
            <Link to="/portal/dashboard" className="text-white/70 hover:text-white text-xs font-bold transition-colors shrink-0">Dashboard</Link>
            <Link to="/portal/maintenance-request" className="text-white/70 hover:text-white text-xs font-bold transition-colors shrink-0">Maintenance</Link>
            {profile?.role === 'member' || profile?.role === 'staff' || profile?.role === 'admin' ? (
              <Link to="/portal/training-application" className="text-white/70 hover:text-white text-xs font-bold transition-colors shrink-0">Training</Link>
            ) : null}
            {isStaff && (
              <a href="https://cleannigeria.org/inventory/login" target="_blank" rel="noopener noreferrer"
                className="text-white/70 hover:text-responseGreen text-xs font-bold transition-colors inline-flex items-center gap-1 shrink-0">
                Staff Portal <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {profile?.role && (
              <span className={`text-[10px] font-mono font-black uppercase tracking-widest px-2 py-1 border rounded ${roleBadgeColor} hidden sm:block`}>
                {profile.role}
              </span>
            )}
            <button onClick={handleSignOut}
              className="flex items-center gap-1.5 text-white/40 hover:text-alertRed text-xs font-bold transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-navyPanel border-b border-white/5 pb-12 pt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-responseGreen mb-2">Member Portal</p>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Operations Dashboard
              </h1>
              <p className="text-sm text-white/40 mt-2">
                Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}. Your real-time operational overview.
              </p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2 text-xs font-mono text-alertRed border border-alertRed/20 bg-alertRed/5 px-3 py-2 rounded">
                <Shield className="w-3.5 h-3.5" /> Admin Access Active
              </div>
            )}
          </div>

          {/* Metric stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Equipment Items', value: assetsLoading ? '—' : totalAssetsCount, color: 'text-white' },
              { label: 'Hubs Operational', value: basesLoading ? '—' : activeBasesCount, color: 'text-responseGreen' },
              { label: 'Regulatory Frameworks', value: totalRegulationsCount > 0 ? totalRegulationsCount : '100+', color: 'text-signalBlue' },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 border border-white/10 rounded-sm px-4 py-5 text-left">
                <p className={`text-2xl sm:text-3xl font-black ${m.color}`}>{m.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Quick Actions */}
        <section>
          <p className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/40 mb-4">Quick Actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Maintenance Request */}
            <Link to="/portal/maintenance-request"
              className="bg-navyPanel border border-white/10 hover:border-responseGreen p-5 flex items-center justify-between gap-4 group transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-responseGreen/10 border border-responseGreen/20 rounded shrink-0">
                  <Wrench className="w-5 h-5 text-responseGreen" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Maintenance Request</p>
                  <p className="text-xs text-white/40 mt-0.5">Report equipment issues</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-responseGreen group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Training Application */}
            <Link to="/portal/training-application"
              className="bg-navyPanel border border-white/10 hover:border-signalBlue p-5 flex items-center justify-between gap-4 group transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-signalBlue/10 border border-signalBlue/20 rounded shrink-0">
                  <BookOpen className="w-5 h-5 text-signalBlue" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Apply for Training</p>
                  <p className="text-xs text-white/40 mt-0.5">IMO Level 1, 2 or 3</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-signalBlue group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Asset Registry */}
            <Link to="/assets"
              className="bg-navyPanel border border-white/10 hover:border-white/30 p-5 flex items-center justify-between gap-4 group transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded shrink-0">
                  <Package className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Asset Registry</p>
                  <p className="text-xs text-white/40 mt-0.5">View equipment inventory</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Post Spill Assessment */}
            <Link to="/portal/post-spill-assessment"
              className="bg-navyPanel border border-white/10 hover:border-responseGreen p-5 flex items-center justify-between gap-4 group transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-responseGreen/10 border border-responseGreen/20 rounded shrink-0">
                  <FileText className="w-5 h-5 text-responseGreen" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Post Spill Assessment</p>
                  <p className="text-xs text-white/40 mt-0.5">Submit a post-response assessment</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-responseGreen group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>

        {/* Staff Portal */}
        {isStaff && (
          <section>
            <p className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/40 mb-4">Staff Access</p>
            <a href="https://cleannigeria.org/inventory/login" target="_blank" rel="noopener noreferrer"
              className="bg-slate-100 border border-slate-200 hover:border-navyPanel p-5 flex items-center justify-between gap-4 group transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-navyPanel border border-navyPanel/10 rounded shrink-0">
                  <Settings className="w-5 h-5 text-responseGreen" />
                </div>
                <div>
                  <p className="text-sm font-black text-navyPanel">Staff Portal</p>
                  <p className="text-xs text-navyPanel/50 mt-0.5">Inventory management system at cleannigeria.org</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-navyPanel/30 group-hover:text-navyPanel transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </section>
        )}

        {/* Admin Panel */}
        {isAdmin && (
          <section>
            <p className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/40 mb-4">Administration</p>
            <AdminPanel />
          </section>
        )}

        {/* Operational Data Widgets */}
        <section>
          <p className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/40 mb-4">Live Operational Data</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Widget 1: Asset Readiness */}
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
              <div className="bg-navyPanel px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-responseGreen" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Asset Readiness</span>
                </div>
                <Link to="/assets" className="text-[10px] font-mono text-white/30 hover:text-responseGreen transition-colors uppercase tracking-wider">
                  View all →
                </Link>
              </div>
              <div className="p-5">
                {assetsLoading ? (
                  <p className="text-xs text-navyPanel/40 font-mono">Loading assets...</p>
                ) : assets.length === 0 ? (
                  <p className="text-xs text-navyPanel/40 font-mono">No assets found.</p>
                ) : (
                  <div className="space-y-3">
                    {assets.slice(0, 4).map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-navyPanel truncate">{asset.title?.rendered || 'Unnamed Asset'}</p>
                          <p className="text-[10px] font-mono text-navyPanel/40">{asset.acf?.model_number || '—'}</p>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border shrink-0 ${
                          asset.acf?.operational_status === 'alpha_ready' ? 'bg-green-50 text-responseGreen border-green-200'
                          : asset.acf?.operational_status === 'deployed' ? 'bg-blue-50 text-signalBlue border-blue-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {asset.acf?.operational_status === 'alpha_ready' ? 'Ready' : asset.acf?.operational_status || 'Ready'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Widget 2: Command Hubs */}
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
              <div className="bg-navyPanel px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-responseGreen" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Command Hubs</span>
                </div>
                <Link to="/presence/bases" className="text-[10px] font-mono text-white/30 hover:text-responseGreen transition-colors uppercase tracking-wider">
                  View all →
                </Link>
              </div>
              <div className="p-5">
                {basesLoading ? (
                  <p className="text-xs text-navyPanel/40 font-mono">Loading bases...</p>
                ) : bases.length === 0 ? (
                  <p className="text-xs text-navyPanel/40 font-mono">No bases found.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {bases.slice(0, 3).map((base) => (
                      <div key={base.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-xs font-bold text-navyPanel truncate">{base.title?.rendered || 'Regional Base'}</p>
                          <span className="text-[9px] font-black uppercase tracking-widest text-responseGreen shrink-0">{base.acf?.region || 'West Africa'}</span>
                        </div>
                        <p className="text-[10px] text-navyPanel/50 line-clamp-1">{base.acf?.equipment_summary || 'Tier Deployment Base'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Widget 3: Training */}
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
              <div className="bg-navyPanel px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-responseGreen" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">IMO Training</span>
                </div>
                <Link to="/services/imo-training" className="text-[10px] font-mono text-white/30 hover:text-responseGreen transition-colors uppercase tracking-wider">
                  View all →
                </Link>
              </div>
              <div className="p-5">
                {coursesLoading ? (
                  <p className="text-xs text-navyPanel/40 font-mono">Loading courses...</p>
                ) : courses.length === 0 ? (
                  <p className="text-xs text-navyPanel/40 font-mono">No courses scheduled.</p>
                ) : (
                  <div className="space-y-4">
                    {courses.slice(0, 3).map((course) => (
                      <div key={course.id}>
                        <p className="text-xs font-bold text-navyPanel line-clamp-1">{course.title?.rendered || 'IMO Course'}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-navyPanel/40 font-mono">Level {course.acf?.imo_level || '—'}</span>
                          <span className="text-[10px] font-mono text-responseGreen">{course.acf?.duration || 'Multi-day'}</span>
                        </div>
                      </div>
                    ))}
                    <Link to="/portal/training-application"
                      className="block w-full text-center text-[10px] font-black uppercase tracking-widest py-2.5 border border-signalBlue text-signalBlue hover:bg-signalBlue hover:text-white transition-colors mt-2">
                      Apply for Training
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Emergency notice */}
        <section>
          <div className="border border-alertRed/20 bg-alertRed/5 rounded-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-alertRed shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-navyPanel">Emergency Response Hotline</p>
                <p className="text-xs text-navyPanel/60 mt-0.5">For immediate Tier-2/3 incident activation, contact CleanAfrica Response directly.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <a href="tel:+2349062873290"
                className="px-5 py-2.5 bg-alertRed hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest transition-colors text-center">
                +234 906 287 3290
              </a>
              <a
                href="/assets/documents/CALLOUT_ALLOWANCE_FORM.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-alertRed/30 hover:border-alertRed text-alertRed text-xs font-black uppercase tracking-widest transition-colors text-center flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Allowance Form
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
