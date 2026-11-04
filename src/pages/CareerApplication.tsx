import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../libraries/supabase';
import { Briefcase, Upload, CheckCircle2 } from 'lucide-react';

type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'volunteer' | 'other';
type Availability = 'immediately' | 'two_weeks' | 'one_month' | 'other';

export default function CareerApplication() {
  const navigate = useNavigate();

  // Section A
  const [positionAppliedFor, setPositionAppliedFor] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('full_time');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [heardAboutUs, setHeardAboutUs] = useState('');

  // Section B
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [cityState, setCityState] = useState('');
  const [nationality, setNationality] = useState('');

  // Section C
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentEmployer, setCurrentEmployer] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [relevantSkills, setRelevantSkills] = useState('');
  const [availability, setAvailability] = useState<Availability>('immediately');

  // Section D
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [additionalFile, setAdditionalFile] = useState<File | null>(null);

  // Section E
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const employmentOptions: { value: EmploymentType; label: string }[] = [
    { value: 'full_time',  label: 'Full-time' },
    { value: 'part_time',  label: 'Part-time' },
    { value: 'contract',   label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'volunteer',  label: 'Volunteer' },
    { value: 'other',      label: 'Other' },
  ];

  const availabilityOptions: { value: Availability; label: string }[] = [
    { value: 'immediately', label: 'Immediately' },
    { value: 'two_weeks',   label: '2 Weeks' },
    { value: 'one_month',   label: '1 Month' },
    { value: 'other',       label: 'Other' },
  ];

  const uploadFile = async (file: File, prefix: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `${prefix}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('career-documents').upload(path, file);
    if (error) {
      console.error('Upload error:', error);
      return null;
    }
    const { data } = supabase.storage.from('career-documents').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!positionAppliedFor || !fullName || !email || !phone) {
      setMessage({ type: 'error', text: 'Please fill in all required fields marked with *.' });
      return;
    }
    if (!consentGiven) {
      setMessage({ type: 'error', text: 'Please agree to the declaration before submitting.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    let cvUrl: string | null = null;
    let coverLetterUrl: string | null = null;
    let additionalUrl: string | null = null;

    if (cvFile) cvUrl = await uploadFile(cvFile, 'cv');
    if (coverLetterFile) coverLetterUrl = await uploadFile(coverLetterFile, 'cover-letter');
    if (additionalFile) additionalUrl = await uploadFile(additionalFile, 'additional');

    const { error } = await supabase.from('career_applications').insert({
      position_applied_for: positionAppliedFor,
      employment_type: employmentType,
      preferred_location: preferredLocation || null,
      heard_about_us: heardAboutUs || null,
      full_name: fullName,
      email,
      phone,
      residential_address: residentialAddress || null,
      city_state: cityState || null,
      nationality: nationality || null,
      current_job_title: currentJobTitle || null,
      current_employer: currentEmployer || null,
      years_experience: yearsExperience || null,
      highest_qualification: highestQualification || null,
      relevant_skills: relevantSkills || null,
      availability,
      cv_url: cvUrl,
      cover_letter_url: coverLetterUrl,
      additional_document_url: additionalUrl,
      consent_given: consentGiven,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Application submitted successfully. Our HR team will review and reach out if shortlisted.' });
    setTimeout(() => navigate('/careers'), 2500);
    setLoading(false);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue";
  const labelClass = "block text-sm font-semibold text-navyPanel mb-1";

  return (
    <div className="bg-fieldBg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-navyPanel border border-white/10">
            <Briefcase className="w-5 h-5 text-responseGreen" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-1">Careers</p>
            <h1 className="text-2xl font-bold text-navyPanel">Career Application Form</h1>
          </div>
        </div>

        <p className="text-sm text-navyPanel/70 leading-relaxed mb-8">
          This form captures essential applicant information for CleanAfrica Response career opportunities.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-10">

          {/* SECTION A */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section A — Position Information
            </h2>

            <div>
              <label className={labelClass}>Position Applied For <span className="text-alertRed">*</span></label>
              <input type="text" value={positionAppliedFor} onChange={(e) => setPositionAppliedFor(e.target.value)}
                placeholder="Type the role you are applying for" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Employment Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {employmentOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setEmploymentType(opt.value)}
                    className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                      employmentType === opt.value ? 'bg-blue-50 text-signalBlue border-signalBlue' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Preferred Work Location</label>
              <input type="text" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>How did you hear about this vacancy?</label>
              <select value={heardAboutUs} onChange={(e) => setHeardAboutUs(e.target.value)} className={inputClass}>
                <option value="">Select...</option>
                <option value="company_website">Company Website</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
                <option value="referral">Referral</option>
                <option value="job_board">Job Board</option>
                <option value="other">Other</option>
              </select>
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
                <label className={labelClass}>Email Address <span className="text-alertRed">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number <span className="text-alertRed">*</span></label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Residential Address</label>
              <input type="text" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City / State</label>
                <input type="text" value={cityState} onChange={(e) => setCityState(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nationality</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} className={inputClass} />
              </div>
            </div>
          </section>

          {/* SECTION C */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section C — Professional Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Current Job Title</label>
                <input type="text" value={currentJobTitle} onChange={(e) => setCurrentJobTitle(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Current Employer / Organization</label>
                <input type="text" value={currentEmployer} onChange={(e) => setCurrentEmployer(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Years of Relevant Experience</label>
                <input type="text" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Highest Qualification</label>
                <input type="text" value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Relevant Skills / Certifications</label>
              <textarea value={relevantSkills} onChange={(e) => setRelevantSkills(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>

            <div>
              <label className={labelClass}>Availability to Start</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availabilityOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setAvailability(opt.value)}
                    className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                      availability === opt.value ? 'bg-green-50 text-responseGreen border-responseGreen' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION D */}
          <section className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section D — Document Uploads
            </h2>

            <div>
              <label className={labelClass}>Upload CV / Resume</label>
              <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-pointer hover:border-signalBlue transition-colors">
                <Upload className="w-4 h-4" />
                {cvFile ? cvFile.name : 'Choose file (PDF, DOC, DOCX)'}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCvFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>

            <div>
              <label className={labelClass}>Upload Cover Letter</label>
              <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-pointer hover:border-signalBlue transition-colors">
                <Upload className="w-4 h-4" />
                {coverLetterFile ? coverLetterFile.name : 'Choose file (PDF, DOC, DOCX)'}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCoverLetterFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>

            <div>
              <label className={labelClass}>Additional Supporting Document (optional)</label>
              <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-pointer hover:border-signalBlue transition-colors">
                <Upload className="w-4 h-4" />
                {additionalFile ? additionalFile.name : 'Choose file'}
                <input type="file" className="hidden" onChange={(e) => setAdditionalFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>
          </section>

          {/* SECTION E */}
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-responseGreen border-b border-slate-100 pb-2">
              Section E — Declaration
            </h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 accent-responseGreen" />
              <span className="text-sm text-navyPanel/80 leading-relaxed">
                I confirm that the information provided in this application is accurate and complete. I understand
                that CleanAfrica Response may contact me regarding my application and may retain my details for
                recruitment purposes.
              </span>
            </label>
          </section>

          {/* Feedback */}
          {message && (
            <p className={`text-sm rounded-lg px-4 py-3 flex items-center gap-2 ${
              message.type === 'error' ? 'bg-red-50 text-alertRed' : 'bg-green-50 text-responseGreen'
            }`}>
              {message.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {message.text}
            </p>
          )}

          {/* Submit */}
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
