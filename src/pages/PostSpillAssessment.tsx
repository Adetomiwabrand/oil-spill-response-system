// src/pages/PostSpillAssessment.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../libraries/supabase';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const ENVIRONMENT_TYPES = ['Offshore', 'Subsea', 'Shoreline', 'Estuary', 'Swamp', 'Port', 'Harbour', 'Inland', 'River', 'Seasonal Swamp'];
const WELFARE_PROVISIONS = [
  'Decent Accommodation',
  'Safety of Location & routine Risk Assessment & Control Measures',
  'Security (Armed Escort & Protection)',
  'Transportation (Equipment & Personnel)',
  'Communication (Radios, Pagers etc)',
  'Access to/fro incident site (Boats, Vessel, Hovercraft etc)',
  'On-site Medical services (First aid, Medic etc)',
  'Welfare (Food, Water, Snacks etc)',
  'Provision of safety critical devices: Intrinsically safe cameras, gas testers etc.',
];

export default function PostSpillAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Header
  const [incidentReference, setIncidentReference] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');

  // Section A
  const [personnelName, setPersonnelName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [roleDesignation, setRoleDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');

  // Section B
  const [dateDeployed, setDateDeployed] = useState('');
  const [dateReturned, setDateReturned] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [deploymentLocation, setDeploymentLocation] = useState('');
  const [environmentTypes, setEnvironmentTypes] = useState<string[]>([]);

  // Section C
  const [natureOfWork, setNatureOfWork] = useState('');
  const [equipmentUsed, setEquipmentUsed] = useState('');
  const [observationsRemarks, setObservationsRemarks] = useState('');

  // Section D
  const [dailyRate, setDailyRate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');

  // Section E
  const [welfareReceived, setWelfareReceived] = useState<string[]>([]);

  // Section F
  const [memberCompany, setMemberCompany] = useState('');
  const [memberRepName, setMemberRepName] = useState('');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  const toggleCheckbox = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const handleSubmit = async () => {
    if (!personnelName || !dateDeployed || !natureOfWork || !memberCompany) {
      setError('Please fill in all required fields marked with *.');
      return;
    }
    if (!declarationAgreed) {
      setError('Please agree to the declaration before submitting.');
      return;
    }
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    const { error: dbError } = await supabase.from('post_spill_assessments').insert({
      incident_reference: incidentReference || null,
      incident_date: incidentDate || null,
      incident_location: incidentLocation || null,
      personnel_name: personnelName,
      staff_id: staffId || null,
      role_designation: roleDesignation || null,
      department: department || null,
      phone: phone || null,
      date_deployed: dateDeployed,
      date_returned: dateReturned || null,
      total_days: totalDays ? parseInt(totalDays) : null,
      deployment_location: deploymentLocation || null,
      environment_type: environmentTypes,
      nature_of_work: natureOfWork,
      equipment_used: equipmentUsed || null,
      observations_remarks: observationsRemarks || null,
      daily_rate: dailyRate ? parseFloat(dailyRate) : null,
      number_of_days: numberOfDays ? parseInt(numberOfDays) : null,
      total_amount: totalAmount ? parseFloat(totalAmount) : null,
      currency,
      welfare_provisions_received: welfareReceived,
      member_company: memberCompany,
      member_rep_name: memberRepName || null,
      declaration_agreed: declarationAgreed,
      submitted_by: userData.user?.id,
    });

    if (dbError) { setError(dbError.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate('/portal/dashboard'), 3000);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue";
  const labelClass = "block text-sm font-semibold text-navyPanel mb-1";

  const sectionHeader = (n: number | string, title: string) => (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
      <span className="w-7 h-7 rounded-full bg-navyPanel text-white text-[10px] font-black flex items-center justify-center shrink-0">{n}</span>
      <h3 className="text-sm font-black text-navyPanel uppercase tracking-wider">{title}</h3>
    </div>
  );

  if (success) return (
    <div className="min-h-screen bg-fieldBg flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-responseGreen mx-auto" />
        <h2 className="text-xl font-black text-navyPanel uppercase">Assessment Submitted</h2>
        <p className="text-sm text-navyPanel/60 max-w-sm mx-auto">Your Post Spill Response Assessment has been received and will be reviewed by the CAA team.</p>
        <p className="text-xs text-navyPanel/40">Redirecting to dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-fieldBg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-navyPanel border border-white/10">
            <FileText className="w-5 h-5 text-responseGreen" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-1">Member Portal</p>
            <h1 className="text-2xl font-bold text-navyPanel">Post Spill Response Assessment</h1>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-navyPanel/40">
            <span>Section {step} of 6</span>
            <span>{Math.round((step / 6) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full">
            <div className="h-1.5 bg-responseGreen rounded-full transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

          {/* HEADER FIELDS */}
          {step === 1 && (
            <div className="space-y-5">
              {sectionHeader('A', 'Incident Information')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Incident Reference</label><input value={incidentReference} onChange={e => setIncidentReference(e.target.value)} className={inputClass} placeholder="e.g. INC-2026-001" /></div>
                <div><label className={labelClass}>Incident Date</label><input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} className={inputClass} /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Incident Location</label><input value={incidentLocation} onChange={e => setIncidentLocation(e.target.value)} className={inputClass} placeholder="Location of the spill incident" /></div>
              </div>
              {sectionHeader('B', 'Personnel Details')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Full Name <span className="text-alertRed">*</span></label><input value={personnelName} onChange={e => setPersonnelName(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Staff ID</label><input value={staffId} onChange={e => setStaffId(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Role / Designation</label><input value={roleDesignation} onChange={e => setRoleDesignation(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Department</label><input value={department} onChange={e => setDepartment(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Phone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* SECTION B - Deployment */}
          {step === 2 && (
            <div className="space-y-5">
              {sectionHeader('C', 'Deployment Details')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Date Deployed <span className="text-alertRed">*</span></label><input type="date" value={dateDeployed} onChange={e => setDateDeployed(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Date Returned</label><input type="date" value={dateReturned} onChange={e => setDateReturned(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Total Days</label><input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Deployment Location</label><input value={deploymentLocation} onChange={e => setDeploymentLocation(e.target.value)} className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Type of Environment</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {ENVIRONMENT_TYPES.map(env => (
                    <label key={env} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={environmentTypes.includes(env)} onChange={() => toggleCheckbox(env, environmentTypes, setEnvironmentTypes)} className="accent-responseGreen w-4 h-4" />
                      <span className="text-sm text-navyPanel/70">{env}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION C - Work */}
          {step === 3 && (
            <div className="space-y-5">
              {sectionHeader('D', 'Work Description')}
              <div>
                <label className={labelClass}>Nature of Work Performed <span className="text-alertRed">*</span></label>
                <textarea value={natureOfWork} onChange={e => setNatureOfWork(e.target.value)} rows={4} className={inputClass + ' resize-none'} placeholder="Describe the work performed during the response operation..." />
              </div>
              <div>
                <label className={labelClass}>Equipment Used</label>
                <textarea value={equipmentUsed} onChange={e => setEquipmentUsed(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="List equipment used during the operation..." />
              </div>
              <div>
                <label className={labelClass}>Observations / Remarks</label>
                <textarea value={observationsRemarks} onChange={e => setObservationsRemarks(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Any observations, challenges, or remarks..." />
              </div>
            </div>
          )}

          {/* SECTION D - Allowance */}
          {step === 4 && (
            <div className="space-y-5">
              {sectionHeader('E', 'Allowance Computation')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Currency</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputClass}>
                    <option value="NGN">NGN (Nigerian Naira)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                  </select>
                </div>
                <div><label className={labelClass}>Daily Rate</label><input type="number" value={dailyRate} onChange={e => setDailyRate(e.target.value)} className={inputClass} placeholder="0.00" /></div>
                <div><label className={labelClass}>Number of Days</label><input type="number" value={numberOfDays} onChange={e => setNumberOfDays(e.target.value)} className={inputClass} placeholder="0" /></div>
                <div><label className={labelClass}>Total Amount</label><input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} className={inputClass} placeholder="0.00" /></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-navyPanel/60">
                Total is calculated as Daily Rate × Number of Days. You may enter the total directly if using a different computation.
              </div>
            </div>
          )}

          {/* SECTION E - Welfare */}
          {step === 5 && (
            <div className="space-y-5">
              {sectionHeader('F', 'Welfare Provisions Received')}
              <p className="text-sm text-navyPanel/60">Select all welfare provisions that were made available during the response operation:</p>
              <div className="space-y-2.5">
                {WELFARE_PROVISIONS.map(w => (
                  <label key={w} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={welfareReceived.includes(w)} onChange={() => toggleCheckbox(w, welfareReceived, setWelfareReceived)} className="accent-responseGreen w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-sm text-navyPanel/70 group-hover:text-navyPanel transition-colors leading-relaxed">{w}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* SECTION F - Declaration */}
          {step === 6 && (
            <div className="space-y-5">
              {sectionHeader('G', 'Declaration')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Member Company <span className="text-alertRed">*</span></label><input value={memberCompany} onChange={e => setMemberCompany(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Company Representative Name</label><input value={memberRepName} onChange={e => setMemberRepName(e.target.value)} className={inputClass} /></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-navyPanel/70 leading-relaxed">
                I/We hereby confirm that the information provided in this Post Spill Response Assessment is accurate and complete. I/We acknowledge that this form is submitted for allowance computation and operational record purposes under the CleanAfrica Associates response framework.
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={declarationAgreed} onChange={e => setDeclarationAgreed(e.target.checked)} className="accent-responseGreen w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-sm text-navyPanel/80 leading-relaxed">I confirm that all information provided is accurate and I agree to the declaration above.</span>
              </label>
              {error && <p className="text-sm text-alertRed bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className="flex items-center gap-1.5 text-sm font-bold text-navyPanel/40 hover:text-navyPanel disabled:opacity-20 disabled:cursor-not-allowed transition-colors uppercase tracking-wider">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < 6 ? (
              <button onClick={() => setStep(s => Math.min(6, s + 1))}
                className="flex items-center gap-1.5 px-6 py-3 bg-navyPanel hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-1.5 px-6 py-3 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Assessment'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
