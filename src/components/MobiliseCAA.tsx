// src/components/MobiliseCAA.tsx
import { useState, useEffect } from 'react';
import { X, AlertTriangle, ChevronRight, ChevronLeft, CheckCircle2, Download } from 'lucide-react';
import { supabase } from '../libraries/supabase';

interface MobiliseCAAProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function MobiliseCAA({ isOpen, onClose }: MobiliseCAAProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Section 1
  const [memberCompany, setMemberCompany] = useState('');
  const [personNotifying, setPersonNotifying] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');
  const [commandCentreNumber, setCommandCentreNumber] = useState('');
  const [dateOfActivation, setDateOfActivation] = useState('');
  const [timeOfActivation, setTimeOfActivation] = useState('');

  // Section 2
  const [dateOfSpill, setDateOfSpill] = useState('');
  const [timeOfSpill, setTimeOfSpill] = useState('');
  const [sourceOfSpill, setSourceOfSpill] = useState('');
  const [causeOfSpill, setCauseOfSpill] = useState('');
  const [statusOfSpill, setStatusOfSpill] = useState('');
  const [typeOfProduction, setTypeOfProduction] = useState('');
  const [facilityInstallation, setFacilityInstallation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [nearbyTown, setNearbyTown] = useState('');

  // Section 3
  const [environmentTypes, setEnvironmentTypes] = useState<string[]>([]);

  // Section 4
  const [resourcesAtRisk, setResourcesAtRisk] = useState('');

  // Section 5
  const [personnelEquipmentRequired, setPersonnelEquipmentRequired] = useState('');

  // Section 6
  const [protectionProtocol, setProtectionProtocol] = useState('');
  const [crewChangeRequirements, setCrewChangeRequirements] = useState('');
  const [safetySecurityRisks, setSafetySecurityRisks] = useState('');
  const [securityArrangements, setSecurityArrangements] = useState('');

  // Section 7
  const [welfareProvisions, setWelfareProvisions] = useState<string[]>([]);
  const [applicableWelfareProvisions, setApplicableWelfareProvisions] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      setIsLoggedIn(!!data.session);
      if (data.session?.user) {
        setEmail(data.session.user.email ?? '');
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setSuccess(false);
      setError(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleCheckbox = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const handleSubmit = async () => {
    if (!declarationAgreed) {
      setError('Please agree to the declaration before submitting.');
      return;
    }
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const { error: dbError } = await supabase.from('mobilisation_requests').insert({
      member_company: memberCompany,
      person_notifying: personNotifying,
      job_title: jobTitle || null,
      direct_phone: directPhone,
      mobile_phone: mobilePhone,
      email,
      command_centre_number: commandCentreNumber || null,
      date_of_activation: dateOfActivation,
      time_of_activation: timeOfActivation,
      date_of_spill: dateOfSpill,
      time_of_spill: timeOfSpill || null,
      source_of_spill: sourceOfSpill || null,
      cause_of_spill: causeOfSpill || null,
      status_of_spill: statusOfSpill || null,
      type_of_production: typeOfProduction || null,
      facility_installation: facilityInstallation || null,
      location_name: locationName || null,
      nearby_town: nearbyTown || null,
      environment_type: environmentTypes,
      resources_at_risk: resourcesAtRisk || null,
      personnel_equipment_required: personnelEquipmentRequired,
      protection_protocol: protectionProtocol,
      crew_change_requirements: crewChangeRequirements || null,
      safety_security_risks: safetySecurityRisks || null,
      security_arrangements: securityArrangements || null,
      welfare_provisions: welfareProvisions,
      applicable_welfare_provisions: applicableWelfareProvisions || null,
      additional_information: additionalInformation || null,
      declaration_agreed: declarationAgreed,
      submitted_by: userId,
    });

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (!isOpen) return null;

  const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-3 py-2.5 text-sm focus:outline-none focus:border-responseGreen transition-colors rounded-sm";
  const labelClass = "block text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 mb-1.5";
  const sectionHeader = (n: number, title: string) => (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
      <span className="w-6 h-6 rounded-full bg-responseGreen text-navyPanel text-[10px] font-black flex items-center justify-center shrink-0">{n}</span>
      <h3 className="text-sm font-black text-white uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navyPanel/90 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-navyPanel border border-white/10 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-alertRed/20 border border-alertRed/30 rounded">
              <AlertTriangle className="w-4 h-4 text-alertRed" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Emergency Protocol</p>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Mobilise CAA — Incident Form</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/30 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth gate */}
        {isLoggedIn === null ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="text-sm text-white/60">Checking access…</div>
          </div>
        ) : !isLoggedIn ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center space-y-4">
            <div>
              <AlertTriangle className="w-8 h-8 text-alertRed mx-auto mb-4" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Members Only</h3>
              <p className="text-xs text-white/50 mb-6 max-w-sm mx-auto">Mobilisation requests are available to CleanAfrica member organisations only. Please log in to continue.</p>
              <a href="/portal/login" className="inline-flex items-center gap-2 px-6 py-3 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-black text-xs uppercase tracking-wider transition-colors">
                Member Login
              </a>
            </div>
          </div>
        ) : success ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <CheckCircle2 className="w-10 h-10 text-responseGreen mx-auto mb-4" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">Request Submitted</h3>
              <p className="text-sm text-white/50 max-w-sm mx-auto mb-2">Your mobilisation request has been received. The CleanAfrica Response team has been notified immediately.</p>
              <p className="text-xs text-alertRed font-mono font-bold mb-6">Please call +234 906 287 3290 for immediate verbal confirmation.</p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button onClick={onClose} className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="px-6 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Section {step} of 7</span>
                <span className="text-[10px] font-mono text-responseGreen">{Math.round((step / 7) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full">
                <div className="h-1 bg-responseGreen rounded-full transition-all duration-300" style={{ width: `${(step / 7) * 100}%` }} />
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

              {/* Note */}
              <div className="bg-alertRed/10 border border-alertRed/20 px-4 py-3 text-xs text-alertRed font-mono">
                Note: Please call the General Manager before e-mailing this form. On receiving completed mobilisation form, CAA Responders and Equipment shall be on standby pending CAA General Managers' approval to mobilise.
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  {sectionHeader(1, 'Contact Details')}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Member Company / Spiller *</label><input value={memberCompany} onChange={e => setMemberCompany(e.target.value)} className={inputClass} placeholder="Member Company/Spiller" /></div>
                    <div><label className={labelClass}>Person Notifying CAA *</label><input value={personNotifying} onChange={e => setPersonNotifying(e.target.value)} className={inputClass} placeholder="Full Name" /></div>
                    <div><label className={labelClass}>Job Title (Designation)</label><input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className={inputClass} placeholder="Job Title" /></div>
                    <div><label className={labelClass}>Command Centre Number</label><input value={commandCentreNumber} onChange={e => setCommandCentreNumber(e.target.value)} className={inputClass} placeholder="Command Centre Number (if any)" /></div>
                    <div><label className={labelClass}>Direct Phone Number *</label><input value={directPhone} onChange={e => setDirectPhone(e.target.value)} className={inputClass} placeholder="+234..." /></div>
                    <div><label className={labelClass}>Mobile Phone Number *</label><input value={mobilePhone} onChange={e => setMobilePhone(e.target.value)} className={inputClass} placeholder="+234..." /></div>
                    <div><label className={labelClass}>Email Address *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="email@company.com" /></div>
                    <div><label className={labelClass}>Date of Activation *</label><input type="date" value={dateOfActivation} onChange={e => setDateOfActivation(e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Time of Activation *</label><input type="time" value={timeOfActivation} onChange={e => setTimeOfActivation(e.target.value)} className={inputClass} /></div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {sectionHeader(2, 'Spill Details')}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Date of Spill *</label><input type="date" value={dateOfSpill} onChange={e => setDateOfSpill(e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Time of Spill</label><input type="time" value={timeOfSpill} onChange={e => setTimeOfSpill(e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Source of Spill</label><input value={sourceOfSpill} onChange={e => setSourceOfSpill(e.target.value)} className={inputClass} placeholder="Source of Spill" /></div>
                    <div><label className={labelClass}>Cause of Spill</label><input value={causeOfSpill} onChange={e => setCauseOfSpill(e.target.value)} className={inputClass} placeholder="Cause of Spill" /></div>
                    <div><label className={labelClass}>Name of Location / Facility</label><input value={locationName} onChange={e => setLocationName(e.target.value)} className={inputClass} placeholder="Location/Facility" /></div>
                    <div><label className={labelClass}>Name of Nearby Town / Community</label><input value={nearbyTown} onChange={e => setNearbyTown(e.target.value)} className={inputClass} placeholder="Nearby Town or Community" /></div>
                    <div><label className={labelClass}>Facility / Installation</label><input value={facilityInstallation} onChange={e => setFacilityInstallation(e.target.value)} className={inputClass} placeholder="Wellhead, Manifold, FPSO, Tank Farm..." /></div>
                  </div>
                  <div>
                    <label className={labelClass}>Status of Spill *</label>
                    <div className="flex gap-3 flex-wrap">
                      {['secured', 'uncontrolled', 'unknown'].map(s => (
                        <button key={s} type="button" onClick={() => setStatusOfSpill(s)}
                          className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border transition-all ${statusOfSpill === s ? 'bg-responseGreen text-navyPanel border-responseGreen' : 'border-white/20 text-white/60 hover:border-white/40'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Type of Production</label>
                    <div className="flex gap-3 flex-wrap">
                      {['pipeline', 'flow_line', 'flow_station'].map(t => (
                        <button key={t} type="button" onClick={() => setTypeOfProduction(t)}
                          className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border transition-all ${typeOfProduction === t ? 'bg-signalBlue text-white border-signalBlue' : 'border-white/20 text-white/60 hover:border-white/40'}`}>
                          {t.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {sectionHeader(3, 'Location / Type of Environment')}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ENVIRONMENT_TYPES.map(env => (
                      <label key={env} className="flex items-center gap-2.5 cursor-pointer group">
                        <input type="checkbox" checked={environmentTypes.includes(env)} onChange={() => toggleCheckbox(env, environmentTypes, setEnvironmentTypes)} className="accent-responseGreen w-4 h-4" />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">{env}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {sectionHeader(4, 'Resources at Risk (If Available)')}
                  <p className="text-xs text-white/50">Environmental or socio-economic sensitivities that may be impacted. Provide the relevant oil spill Contingency plan and sensitivity maps if available.</p>
                  <textarea value={resourcesAtRisk} onChange={e => setResourcesAtRisk(e.target.value)} rows={6} className={inputClass + ' resize-none'} placeholder="Include Contingency/Sensitive Map details..." />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  {sectionHeader(5, 'Equipment Required and Personnel')}
                  <label className={labelClass}>Number of Personnel & Equipment to be mobilised by CAA *</label>
                  <textarea value={personnelEquipmentRequired} onChange={e => setPersonnelEquipmentRequired(e.target.value)} rows={5} className={inputClass + ' resize-none'} placeholder="Describe the number of personnel and equipment required..." />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  {sectionHeader(6, 'Health, Safety and Security')}
                  <div>
                    <label className={labelClass}>Describe Location specific Protection Protocol *</label>
                    <textarea value={protectionProtocol} onChange={e => setProtectionProtocol(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Describe Location specific Protection Protocol" />
                  </div>
                  <div>
                    <label className={labelClass}>Describe Crew change requirements *</label>
                    <textarea value={crewChangeRequirements} onChange={e => setCrewChangeRequirements(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Describe Crew change requirements" />
                  </div>
                  <div>
                    <label className={labelClass}>Highlight any known safety or security risks</label>
                    <textarea value={safetySecurityRisks} onChange={e => setSafetySecurityRisks(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="e.g. concurrent operation, robbery prone area etc." />
                  </div>
                  <div>
                    <label className={labelClass}>Describe security arrangements for CAA staff</label>
                    <textarea value={securityArrangements} onChange={e => setSecurityArrangements(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Describe security arrangements for CAA staff" />
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-5">
                  {sectionHeader(7, 'Further Information & Declaration')}
                  <div>
                    <label className={labelClass}>Additional Information</label>
                    <textarea value={additionalInformation} onChange={e => setAdditionalInformation(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Additional Information" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-3">On behalf of my organization, I/We hereby commit to provide the following arrangement for mobilization and demobilization of CAA to/fro incident location:</p>
                    <div className="space-y-2.5">
                      {WELFARE_PROVISIONS.map(w => (
                        <label key={w} className="flex items-start gap-2.5 cursor-pointer group">
                          <input type="checkbox" checked={welfareProvisions.includes(w)} onChange={() => toggleCheckbox(w, welfareProvisions, setWelfareProvisions)} className="accent-responseGreen w-4 h-4 mt-0.5 shrink-0" />
                          <span className="text-xs text-white/70 group-hover:text-white transition-colors leading-relaxed">{w}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Please State applicable welfare provisions</label>
                    <textarea value={applicableWelfareProvisions} onChange={e => setApplicableWelfareProvisions(e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Applicable Welfare Provisions" />
                  </div>
                  <div className="bg-alertRed/10 border border-alertRed/20 p-4 text-xs text-white/70 rounded-sm leading-relaxed">
                    Please note: Response services are guaranteed ONLY for members. Non-members will be required to sign a third-party agreement before a response is initiated. A work order will need to be completed before responders arrive and begin a response.
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={declarationAgreed} onChange={e => setDeclarationAgreed(e.target.checked)} className="accent-responseGreen w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-xs text-white/70 leading-relaxed">I confirm all information provided is accurate and I agree to the terms above.</span>
                  </label>
                  {error && <p className="text-xs text-alertRed bg-alertRed/10 border border-alertRed/20 px-4 py-2 rounded">{error}</p>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0">
              <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {step < 7 ? (
                <button onClick={() => setStep(s => Math.min(7, s + 1))}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-black text-xs uppercase tracking-wider transition-colors">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-alertRed hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Mobilisation Request'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
