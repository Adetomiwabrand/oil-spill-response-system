import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../libraries/supabase';
import { GraduationCap, Upload, CheckCircle2 } from 'lucide-react';

type TrainingLevel = 'imo_level_1' | 'imo_level_2' | 'imo_level_3';
type ModeOfAttendance = 'physical' | 'online' | 'hybrid';
type ApplicantType = 'individual' | 'company_sponsored';

export default function TrainingApplication() {
  const navigate = useNavigate();

  // Section A
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>('imo_level_1');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [modeOfAttendance, setModeOfAttendance] = useState<ModeOfAttendance>('physical');

  // Section B
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');

  // Section C
  const [applicantType, setApplicantType] = useState<ApplicantType>('individual');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [companyContactPerson, setCompanyContactPerson] = useState('');
  const [companyContactDetails, setCompanyContactDetails] = useState('');

  // Section D
  const [attendedBefore, setAttendedBefore] = useState(false);
  const [previousTrainingDetails, setPreviousTrainingDetails] = useState('');
  const [currentExperience, setCurrentExperience] = useState('');
  const [reasonForApplying, setReasonForApplying] = useState('');

  // Section E
  const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
  const [medicalConditionDetails, setMedicalConditionDetails] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');

  // Section F
  const [idDocFile, setIdDocFile] = useState<File | null>(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState<File | null>(null);
  const [sponsorshipLetterFile, setSponsorshipLetterFile] = useState<File | null>(null);
  const [trainingEvidenceFile, setTrainingEvidenceFile] = useState<File | null>(null);
  const [paymentEvidenceFile, setPaymentEvidenceFile] = useState<File | null>(null);

  // Section G
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const levelOptions: { value: TrainingLevel; label: string }[] = [
    { value: 'imo_level_3', label: 'IMO OPRC Level 3 — Spill Management & Strategic Command' },
    { value: 'imo_level_2', label: 'IMO OPRC Level 2 — On-Scene Commander Certification' },
    { value: 'imo_level_1', label: 'IMO OPRC Level 1 — First Responder Oil Spill Operations' },
  ];

  const modeOptions: { value: ModeOfAttendance; label: string }[] = [
    { value: 'physical', label: 'Physical' },
    { value: 'online',   label: 'Online' },
    { value: 'hybrid',   label: 'Hybrid' },
  ];

  const uploadFile = async (file: File, prefix: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `${prefix}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('training-documents').upload(path, file);
    if (error) { console.error('Upload error:', error); return null; }
    const { data } = supabase.storage.from('training-documents').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !phone) {
      setMessage({ type: 'error', text: 'Please fill in all required fields marked with *.' });
      return;
    }
    if (!consentGiven) {
      setMessage({ type: 'error', text: 'Please agree to the declaration before submitting.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    let idDocUrl: string | null = null;
    let passportPhotoUrl: string | null = null;
    let sponsorshipLetterUrl: string | null = null;
    let trainingEvidenceUrl: string | null = null;
    let paymentEvidenceUrl: string | null = null;

    if (idDocFile) idDocUrl = await uploadFile(idDocFile, 'id-document');
    if (passportPhotoFile) passportPhotoUrl = await uploadFile(passportPhotoFile, 'passport-photo');
    if (sponsorshipLetterFile) sponsorshipLetterUrl = await uploadFile(sponsorshipLetterFile, 'sponsorship-letter');
    if (trainingEvidenceFile) trainingEvidenceUrl = await uploadFile(trainingEvidenceFile, 'training-evidence');
    if (paymentEvidenceFile) paymentEvidenceUrl = await uploadFile(paymentEvidenceFile, 'payment-evidence');

    const { error } = await supabase.from('training_applications').insert({
      training_level: trainingLevel,
      preferred_date: preferredDate || null,
      preferred_location: preferredLocation || null,
      mode_of_attendance: modeOfAttendance,
      full_name: fullName,
      date_of_birth: dateOfBirth || null,
      gender: gender || null,
      nationality: nationality || null,
      phone,
      email,
      residential_address: residentialAddress || null,
      applicant_type: applicantType,
      company_name: companyName || null,
      job_title: jobTitle || null,
      department: department || null,
      office_address: officeAddress || null,
      company_contact_person: companyContactPerson || null,
      company_contact_details: companyContactDetails || null,
      attended_before: attendedBefore,
      previous_training_details: previousTrainingDetails || null,
      current_experience: currentExperience || null,
      reason_for_applying: reasonForApplying || null,
      has_medical_condition: hasMedicalCondition,
      medical_condition_details: medicalConditionDetails || null,
      emergency_contact_name: emergencyContactName || null,
      emergency_contact_phone: emergencyContactPhone || null,
      emergency_contact_relationship: emergencyContactRelationship || null,
      id_document_url: idDocUrl,
      passport_photo_url: passportPhotoUrl,
      sponsorship_letter_url: sponsorshipLetterUrl,
      previous_training_evidence_url: trainingEvidenceUrl,
      payment_evidence_url: paymentEvidenceUrl,
      consent_given: consentGiven,
      submitted_by: userId,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Application submitted successfully. Our training team will contact you to confirm your seat.' });
    setTimeout(() => navigate('/portal/dashboard'), 2500);
    setLoading(false);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue";
  const labelClass = "block text-sm font-semibold text-navyPanel mb-1";

  return (
    <div className="bg-fieldBg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-navyPanel border border-white/10">
            <GraduationCap className="w-5 h-5 text-responseGreen" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-1">Member Portal</p>
            <h1 className="text-2xl font-bold text-navyPanel">Training Application Form</h1>
          </div>
        </div>

        <p className="text-sm text-navyPanel/70 leading-relaxed mb-8">
          This form captures essential applicant information for CleanAfrica Response oil spill response
          training programmes.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-10">

          {/* SECTION A */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section A — Training Programme Selection
            </h2>

            <div>
              <label className={labelClass}>Training Level Applied For</label>
              <div className="space-y-2">
                {levelOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:border-signalBlue transition-colors">
                    <input type="radio" name="trainingLevel" checked={trainingLevel === opt.value}
                      onChange={() => setTrainingLevel(opt.value)} className="accent-signalBlue w-4 h-4" />
                    <span className="text-sm text-navyPanel">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Preferred Training Date</label>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Preferred Training Location</label>
                <input type="text" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Mode of Attendance</label>
              <div className="grid grid-cols-3 gap-2">
                {modeOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setModeOfAttendance(opt.value)}
                    className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                      modeOfAttendance === opt.value ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION B */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section B — Applicant Personal Information
            </h2>

            <div>
              <label className={labelClass}>Full Name <span className="text-alertRed">*</span></label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nationality</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number <span className="text-alertRed">*</span></label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email Address <span className="text-alertRed">*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Residential Address</label>
              <input type="text" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} className={inputClass} />
            </div>
          </section>

          {/* SECTION C */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section C — Organization / Sponsorship Information
            </h2>

            <div>
              <label className={labelClass}>Are you applying as?</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setApplicantType('individual')}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    applicantType === 'individual' ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200'
                  }`}>Individual Applicant</button>
                <button type="button" onClick={() => setApplicantType('company_sponsored')}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    applicantType === 'company_sponsored' ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200'
                  }`}>Company-Sponsored</button>
              </div>
            </div>

            {applicantType === 'company_sponsored' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <label className={labelClass}>Company / Organization Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Job Title / Role</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Department / Unit</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Office Address</label>
                  <input type="text" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company Contact Person</label>
                    <input type="text" value={companyContactPerson} onChange={(e) => setCompanyContactPerson(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Contact Email / Phone</label>
                    <input type="text" value={companyContactDetails} onChange={(e) => setCompanyContactDetails(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION D */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section D — Training Background and Experience
            </h2>

            <div>
              <label className={labelClass}>Have you attended any oil spill response training before?</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setAttendedBefore(true)}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    attendedBefore ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200'
                  }`}>Yes</button>
                <button type="button" onClick={() => setAttendedBefore(false)}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    !attendedBefore ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200'
                  }`}>No</button>
              </div>
            </div>

            {attendedBefore && (
              <div>
                <label className={labelClass}>Course name, level, provider, and year</label>
                <textarea value={previousTrainingDetails} onChange={(e) => setPreviousTrainingDetails(e.target.value)} rows={2} className={inputClass + ' resize-none'} />
              </div>
            )}

            <div>
              <label className={labelClass}>Current experience in oil spill response, HSE, marine operations, emergency response, or related field</label>
              <textarea value={currentExperience} onChange={(e) => setCurrentExperience(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>

            <div>
              <label className={labelClass}>Reason for applying for this training</label>
              <textarea value={reasonForApplying} onChange={(e) => setReasonForApplying(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>
          </section>

          {/* SECTION E */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section E — Health, Safety, and Emergency Contact
            </h2>

            <div>
              <label className={labelClass}>Any medical condition CleanAfrica Response should be aware of?</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setHasMedicalCondition(true)}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    hasMedicalCondition ? 'bg-amber-50 text-amber-600 border-amber-400' : 'bg-white text-slate-400 border-slate-200'
                  }`}>Yes</button>
                <button type="button" onClick={() => setHasMedicalCondition(false)}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                    !hasMedicalCondition ? 'bg-green-50 text-responseGreen border-responseGreen' : 'bg-white text-slate-400 border-slate-200'
                  }`}>No</button>
              </div>
            </div>

            {hasMedicalCondition && (
              <div>
                <label className={labelClass}>Please specify</label>
                <textarea value={medicalConditionDetails} onChange={(e) => setMedicalConditionDetails(e.target.value)} rows={2} className={inputClass + ' resize-none'} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Emergency Contact Name</label>
                <input type="text" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Emergency Contact Phone</label>
                <input type="tel" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Relationship to Applicant</label>
              <input type="text" value={emergencyContactRelationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)} className={inputClass} />
            </div>
          </section>

          {/* SECTION F */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section F — Required Documents
            </h2>

            {[
              { label: 'Valid ID Card / International Passport', file: idDocFile, setFile: setIdDocFile },
              { label: 'Passport Photograph', file: passportPhotoFile, setFile: setPassportPhotoFile },
              { label: 'Company Sponsorship Letter (if applicable)', file: sponsorshipLetterFile, setFile: setSponsorshipLetterFile },
              { label: 'Evidence of Previous Training (if applicable)', file: trainingEvidenceFile, setFile: setTrainingEvidenceFile },
              { label: 'Payment Evidence (if required)', file: paymentEvidenceFile, setFile: setPaymentEvidenceFile },
            ].map((doc, idx) => (
              <div key={idx}>
                <label className={labelClass}>{doc.label}</label>
                <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-pointer hover:border-signalBlue transition-colors">
                  <Upload className="w-4 h-4" />
                  {doc.file ? doc.file.name : 'Choose file'}
                  <input type="file" className="hidden" onChange={(e) => doc.setFile(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            ))}
          </section>

          {/* SECTION G */}
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section G — Declaration
            </h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 accent-responseGreen" />
              <span className="text-sm text-navyPanel/80 leading-relaxed">
                I confirm that the information provided in this application is accurate and complete. I agree to
                comply with CleanAfrica Response training requirements, safety instructions, and programme guidelines.
              </span>
            </label>
          </section>

          {message && (
            <p className={`text-sm rounded-lg px-4 py-3 flex items-center gap-2 ${
              message.type === 'error' ? 'bg-red-50 text-alertRed' : 'bg-green-50 text-responseGreen'
            }`}>
              {message.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {message.text}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-responseGreen hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 min-h-[44px]"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </div>
    </div>
  );
}
