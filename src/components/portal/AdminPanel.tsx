// src/components/portal/AdminPanel.tsx
import { useEffect, useState } from 'react';
import { Shield, ExternalLink, RefreshCw, ChevronDown, ChevronUp, Briefcase, GraduationCap, Users, Database, AlertTriangle, Send } from 'lucide-react';
import { supabase } from '../../libraries/supabase';
import type { UserRole } from '../../hooks/useProfile';

interface UserProfile { id: string; role: UserRole; full_name?: string; }
interface CareerApplication { id: string; full_name: string; email: string; position_applied_for: string; employment_type: string; created_at: string; status: string; }
interface TrainingApplication { id: string; full_name: string; email: string; training_level: string; mode_of_attendance: string; created_at: string; status: string; }
interface MobilisationRequest { id: string; member_company: string; person_notifying: string; mobile_phone: string; email: string; date_of_spill: string; status_of_spill: string; location_name: string; created_at: string; status: string; }

const ROLES: UserRole[] = ['member', 'staff', 'admin'];

const levelLabels: Record<string, string> = {
  imo_level_1: 'IMO Level 1',
  imo_level_2: 'IMO Level 2',
  imo_level_3: 'IMO Level 3',
};

const statusColors: Record<string, string> = {
  received:    'bg-blue-50 text-blue-700 border-blue-200',
  reviewed:    'bg-amber-50 text-amber-700 border-amber-200',
  shortlisted: 'bg-purple-50 text-purple-700 border-purple-200',
  confirmed:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:    'bg-red-50 text-red-700 border-red-200',
  hired:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  acknowledged:'bg-blue-50 text-blue-700 border-blue-200',
  mobilised:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  stood_down:  'bg-amber-50 text-amber-700 border-amber-200',
  submitted:   'bg-blue-50 text-blue-700 border-blue-200',
};

const DEFAULT_MESSAGES: Record<string, { message: string; next_steps: string }> = {
  received:     { message: "Thank you for submitting your mobilisation request. We have received your incident report and it is currently being reviewed by our response team.", next_steps: "Please ensure you have contacted the General Manager by phone to confirm receipt. Our team will be in touch shortly." },
  acknowledged: { message: "Your mobilisation request has been acknowledged. CleanAfrica Associates responders and equipment have been placed on standby pending General Manager approval to mobilise.", next_steps: "Please ensure site access, accommodation, and security arrangements are in place as outlined in your submitted form." },
  mobilised:    { message: "CleanAfrica Associates has mobilised a response team to your incident location. Our personnel and equipment are en route.", next_steps: "Please ensure the following are ready upon arrival: site access clearance, accommodation, transportation, and on-site security escort." },
  stood_down:   { message: "Following review of your mobilisation request, the CleanAfrica Associates response team has been stood down.", next_steps: "If you believe this decision is in error or if the situation changes, please contact our response team immediately at response@clean-africa.org or call +234 906 287 3290." },
};

const CMS_LINKS = [
  { label: 'Bases',            type: 'base' },
  { label: 'Assets',           type: 'asset' },
  { label: 'Training Courses', type: 'training_course' },
  { label: 'Regulatory Docs',  type: 'regulatory_doc' },
  { label: 'Events',           type: 'event' },
  { label: 'Gallery',          type: 'gallery_item' },
  { label: 'Hub Locations',    type: 'hub_location' },
  { label: 'Job Listings',     type: 'job_listing' },
  { label: 'Testimonials',     type: 'testimonial' },
  { label: 'Blog Posts',       type: 'post' },
];

export function AdminPanel() {
  const [users, setUsers]                   = useState<UserProfile[]>([]);
  const [careerApps, setCareerApps]         = useState<CareerApplication[]>([]);
  const [trainingApps, setTrainingApps]     = useState<TrainingApplication[]>([]);
  const [mobilisationReqs, setMobilisationReqs] = useState<MobilisationRequest[]>([]);
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState<string | null>(null);
  const [message, setMessage]               = useState<string | null>(null);
  const [showCareers, setShowCareers]       = useState(false);
  const [showTraining, setShowTraining]     = useState(false);
  const [showMobilisation, setShowMobilisation] = useState(false);
  const [showCMS, setShowCMS]               = useState(false);

  // Response form state
  const [respondingTo, setRespondingTo]         = useState<string | null>(null);
  const [responseStatus, setResponseStatus]     = useState('acknowledged');
  const [responseMessage, setResponseMessage]   = useState('');
  const [responseNextSteps, setResponseNextSteps] = useState('');
  const [sendingResponse, setSendingResponse]   = useState(false);
  const [responseResult, setResponseResult]     = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [usersRes, careerRes, trainingRes, mobilisationRes] = await Promise.all([
      supabase.from('profiles').select('id, role, full_name').order('role'),
      supabase.from('career_applications').select('id,full_name,email,position_applied_for,employment_type,created_at,status').order('created_at', { ascending: false }),
      supabase.from('training_applications').select('id,full_name,email,training_level,mode_of_attendance,created_at,status').order('created_at', { ascending: false }),
      supabase.from('mobilisation_requests').select('id,member_company,person_notifying,mobile_phone,email,date_of_spill,status_of_spill,location_name,created_at,status').order('created_at', { ascending: false }),
    ]);
    if (usersRes.data)        setUsers(usersRes.data as UserProfile[]);
    if (careerRes.data)       setCareerApps(careerRes.data as CareerApplication[]);
    if (trainingRes.data)     setTrainingApps(trainingRes.data as TrainingApplication[]);
    if (mobilisationRes.data) setMobilisationReqs(mobilisationRes.data as MobilisationRequest[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateRole = async (userId: string, newRole: UserRole) => {
    setSaving(userId);
    setMessage(null);
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    if (error) { setMessage('Error: ' + error.message); }
    else { setUsers((p) => p.map((u) => u.id === userId ? { ...u, role: newRole } : u)); setMessage('Role updated.'); setTimeout(() => setMessage(null), 3000); }
    setSaving(null);
  };

  const updateCareerStatus      = async (id: string, status: string) => { await supabase.from('career_applications').update({ status }).eq('id', id); setCareerApps((p) => p.map((a) => a.id === id ? { ...a, status } : a)); };
  const updateTrainingStatus    = async (id: string, status: string) => { await supabase.from('training_applications').update({ status }).eq('id', id); setTrainingApps((p) => p.map((a) => a.id === id ? { ...a, status } : a)); };
  const updateMobilisationStatus = async (id: string, status: string) => { await supabase.from('mobilisation_requests').update({ status }).eq('id', id); setMobilisationReqs((p) => p.map((r) => r.id === id ? { ...r, status } : r)); };

  const handleOpenResponse = (id: string, currentStatus: string) => {
    setRespondingTo(id);
    const nextStatus = currentStatus === 'received' ? 'acknowledged' : currentStatus;
    setResponseStatus(nextStatus);
    const defaults = DEFAULT_MESSAGES[nextStatus] ?? DEFAULT_MESSAGES.acknowledged;
    setResponseMessage(defaults.message);
    setResponseNextSteps(defaults.next_steps);
    setResponseResult(null);
  };

  const handleSendResponse = async () => {
    if (!respondingTo) return;
    setSendingResponse(true);
    const { data: userData } = await supabase.auth.getUser();
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-mobilisation-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          mobilisation_request_id: respondingTo,
          status: responseStatus,
          message: responseMessage,
          next_steps: responseNextSteps,
          responded_by: userData.user?.id,
        }),
      });

      const responseBody = await res.text();
      let parsedBody: { error?: string; success?: boolean } | null = null;

      try {
        parsedBody = JSON.parse(responseBody);
      } catch {
        parsedBody = null;
      }

      if (res.ok && parsedBody?.success) {
        setResponseResult('Response sent successfully.');
        updateMobilisationStatus(respondingTo, responseStatus);
        setTimeout(() => { setRespondingTo(null); setResponseResult(null); }, 2500);
      } else {
        const message = parsedBody?.error || responseBody || 'Failed to send. Please try again.';
        setResponseResult(`Failed to send: ${message}`);
      }
    } catch (error) {
      setResponseResult(`Failed to send: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setSendingResponse(false);
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const SectionToggle = ({ label, icon, count, open, onToggle }: { label: string; icon: React.ReactNode; count: number; open: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-slate-100 rounded">{icon}</div>
        <span className="text-xs font-black uppercase tracking-widest text-navyPanel">{label}</span>
        <span className="bg-navyPanel text-white text-[10px] font-black px-2 py-0.5 rounded-full">{count}</span>
      </div>
      {open ? <ChevronUp className="w-4 h-4 text-navyPanel/30" /> : <ChevronDown className="w-4 h-4 text-navyPanel/30" />}
    </button>
  );

  return (
    <div className="rounded-sm overflow-hidden border border-slate-200 mb-8 shadow-sm">

      {/* Header */}
      <div className="bg-navyPanel px-5 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-responseGreen/10 border border-responseGreen/20 rounded">
            <Shield className="w-4 h-4 text-responseGreen" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/60">Access Level: Admin</p>
            <p className="text-sm font-black text-white uppercase tracking-wider">Admin Control Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://cms.clean-africa.org/wp-admin" target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-responseGreen transition-colors border border-white/20 hover:border-responseGreen/30 px-3 py-1.5 rounded">
            WordPress CMS <ExternalLink className="w-3 h-3" />
          </a>
          <button onClick={fetchAll} className="p-1.5 text-white/30 hover:text-white transition-colors border border-white/10 rounded" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-4 divide-x divide-slate-200 border-b border-slate-200 bg-white">
          {[
            { label: 'Members',       value: users.length,            color: 'text-navyPanel'     },
            { label: 'Career Apps',   value: careerApps.length,       color: 'text-signalBlue'    },
            { label: 'Training Apps', value: trainingApps.length,     color: 'text-responseGreen' },
            { label: 'Mobilisations', value: mobilisationReqs.length, color: 'text-alertRed'      },
          ].map((s) => (
            <div key={s.label} className="px-4 py-3 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="px-6 py-12 flex items-center justify-center gap-2 text-xs text-navyPanel/40 font-mono uppercase tracking-widest">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Loading data...
        </div>
      ) : (
        <>
          {/* Member Roles */}
          <SectionToggle label="Member Roles" icon={<Users className="w-3.5 h-3.5 text-navyPanel" />} count={users.length} open={true} onToggle={() => {}} />
          <div className="px-6 py-4 border-b border-slate-200 bg-white">
            {message && <p className="text-xs text-responseGreen bg-green-50 border border-green-200 px-4 py-2 rounded mb-4">{message}</p>}
            <div className="divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-navyPanel">{user.full_name || 'Unnamed Member'}</p>
                    <p className="text-[10px] font-mono text-navyPanel/50 truncate max-w-[200px]">{user.id}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {ROLES.map((r) => (
                      <button key={r} disabled={saving === user.id} onClick={() => updateRole(user.id, r)}
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 border transition-all ${user.role === r ? 'bg-navyPanel text-white border-navyPanel' : 'bg-white text-navyPanel/40 border-slate-200 hover:border-navyPanel/40 hover:text-navyPanel'} disabled:opacity-40`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Applications */}
          <SectionToggle label="Career Applications" icon={<Briefcase className="w-3.5 h-3.5 text-signalBlue" />} count={careerApps.length} open={showCareers} onToggle={() => setShowCareers(!showCareers)} />
          {showCareers && (
            <div className="bg-white border-b border-slate-200 overflow-x-auto">
              {careerApps.length === 0 ? <p className="px-6 py-6 text-xs text-navyPanel/40 font-mono">No applications yet.</p> : (
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead><tr className="bg-slate-50 text-[10px] font-mono font-black uppercase tracking-widest text-navyPanel/40 border-b border-slate-200"><th className="px-6 py-3">Applicant</th><th className="px-4 py-3">Position</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {careerApps.map((app) => (
                      <tr key={app.id} className="text-xs hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3"><p className="font-bold text-navyPanel">{app.full_name}</p><p className="text-navyPanel/40 font-mono text-[10px]">{app.email}</p></td>
                        <td className="px-4 py-3 font-bold text-navyPanel uppercase text-[11px]">{app.position_applied_for}</td>
                        <td className="px-4 py-3 font-mono text-navyPanel/50 capitalize">{app.employment_type?.replace('_', '-')}</td>
                        <td className="px-4 py-3 font-mono text-navyPanel/50">{fmt(app.created_at)}</td>
                        <td className="px-4 py-3">
                          <select value={app.status} onChange={(e) => updateCareerStatus(app.id, e.target.value)} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded cursor-pointer ${statusColors[app.status] ?? 'bg-slate-50 text-navyPanel border-slate-200'}`}>
                            {['received','reviewed','shortlisted','rejected','hired'].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Training Applications */}
          <SectionToggle label="Training Applications" icon={<GraduationCap className="w-3.5 h-3.5 text-responseGreen" />} count={trainingApps.length} open={showTraining} onToggle={() => setShowTraining(!showTraining)} />
          {showTraining && (
            <div className="bg-white border-b border-slate-200 overflow-x-auto">
              {trainingApps.length === 0 ? <p className="px-6 py-6 text-xs text-navyPanel/40 font-mono">No applications yet.</p> : (
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead><tr className="bg-slate-50 text-[10px] font-mono font-black uppercase tracking-widest text-navyPanel/40 border-b border-slate-200"><th className="px-6 py-3">Applicant</th><th className="px-4 py-3">Level</th><th className="px-4 py-3">Mode</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {trainingApps.map((app) => (
                      <tr key={app.id} className="text-xs hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3"><p className="font-bold text-navyPanel">{app.full_name}</p><p className="text-navyPanel/40 font-mono text-[10px]">{app.email}</p></td>
                        <td className="px-4 py-3 font-bold text-navyPanel">{levelLabels[app.training_level] ?? app.training_level}</td>
                        <td className="px-4 py-3 font-mono text-navyPanel/50 capitalize">{app.mode_of_attendance}</td>
                        <td className="px-4 py-3 font-mono text-navyPanel/50">{fmt(app.created_at)}</td>
                        <td className="px-4 py-3">
                          <select value={app.status} onChange={(e) => updateTrainingStatus(app.id, e.target.value)} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded cursor-pointer ${statusColors[app.status] ?? 'bg-slate-50 text-navyPanel border-slate-200'}`}>
                            {['received','reviewed','confirmed','rejected'].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Mobilisation Requests */}
          <SectionToggle label="Mobilisation Requests" icon={<AlertTriangle className="w-3.5 h-3.5 text-alertRed" />} count={mobilisationReqs.length} open={showMobilisation} onToggle={() => setShowMobilisation(!showMobilisation)} />
          {showMobilisation && (
            <div className="bg-white border-b border-slate-200">
              {mobilisationReqs.length === 0 ? <p className="px-6 py-6 text-xs text-navyPanel/40 font-mono">No mobilisation requests yet.</p> : (
                <div className="divide-y divide-slate-100">
                  {mobilisationReqs.map((req) => (
                    <div key={req.id} className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        <div>
                          <p className="text-sm font-bold text-navyPanel">{req.member_company}</p>
                          <p className="text-xs text-navyPanel/50">{req.person_notifying} · {req.mobile_phone} · {fmt(req.created_at)}</p>
                          <p className="text-xs text-navyPanel/50">Spill: {req.date_of_spill} · {req.location_name ?? '—'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded ${req.status_of_spill === 'uncontrolled' ? 'bg-red-50 text-alertRed border-red-200' : req.status_of_spill === 'secured' ? 'bg-green-50 text-responseGreen border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {req.status_of_spill ?? '—'}
                          </span>
                          <select value={req.status} onChange={(e) => updateMobilisationStatus(req.id, e.target.value)} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border rounded cursor-pointer ${statusColors[req.status] ?? 'bg-slate-50 text-navyPanel border-slate-200'}`}>
                            {['received','acknowledged','mobilised','stood_down'].map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                          </select>
                          <button onClick={() => handleOpenResponse(req.id, req.status)}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-navyPanel text-white hover:bg-responseGreen hover:text-navyPanel transition-colors rounded">
                            <Send className="w-3 h-3" /> Respond
                          </button>
                        </div>
                      </div>

                      {/* Response Form */}
                      {respondingTo === req.id && (
                        <div className="mt-4 bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-navyPanel">Send Response to {req.person_notifying}</p>
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/50 block mb-1">Status Update</label>
                            <select value={responseStatus}
                              onChange={(e) => {
                                setResponseStatus(e.target.value);
                                const d = DEFAULT_MESSAGES[e.target.value];
                                if (d) { setResponseMessage(d.message); setResponseNextSteps(d.next_steps); }
                              }}
                              className="w-full border border-slate-200 rounded px-3 py-2 text-xs font-bold uppercase text-navyPanel">
                              {['received','acknowledged','mobilised','stood_down'].map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/50 block mb-1">Message</label>
                            <textarea value={responseMessage} onChange={(e) => setResponseMessage(e.target.value)} rows={4}
                              className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-navyPanel resize-none focus:outline-none focus:border-navyPanel" />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-navyPanel/50 block mb-1">Next Steps</label>
                            <textarea value={responseNextSteps} onChange={(e) => setResponseNextSteps(e.target.value)} rows={3}
                              className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-navyPanel resize-none focus:outline-none focus:border-navyPanel" />
                          </div>
                          {responseResult && (
                            <p className={`text-xs px-3 py-2 rounded ${responseResult.includes('success') ? 'bg-green-50 text-responseGreen' : 'bg-red-50 text-alertRed'}`}>{responseResult}</p>
                          )}
                          <div className="flex gap-2">
                            <button onClick={handleSendResponse} disabled={sendingResponse}
                              className="flex items-center gap-1.5 px-4 py-2 bg-responseGreen hover:bg-emerald-600 text-navyPanel text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-50">
                              <Send className="w-3 h-3" /> {sendingResponse ? 'Sending...' : 'Send Response'}
                            </button>
                            <button onClick={() => setRespondingTo(null)}
                              className="px-4 py-2 border border-slate-200 text-navyPanel text-xs font-bold uppercase tracking-wider hover:border-slate-400 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CMS Content Manager */}
          <SectionToggle label="CMS Content Manager" icon={<Database className="w-3.5 h-3.5 text-navyPanel" />} count={CMS_LINKS.length} open={showCMS} onToggle={() => setShowCMS(!showCMS)} />
          {showCMS && (
            <div className="bg-white px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CMS_LINKS.map((l) => (
                <a key={l.type} href={`https://cms.clean-africa.org/wp-admin/edit.php?post_type=${l.type}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-4 py-3 border border-slate-200 hover:border-responseGreen hover:bg-slate-50 transition-all group rounded-sm">
                  <span className="text-xs font-bold text-navyPanel group-hover:text-responseGreen uppercase tracking-wider transition-colors">{l.label}</span>
                  <ExternalLink className="w-3 h-3 text-navyPanel/30 group-hover:text-responseGreen transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
