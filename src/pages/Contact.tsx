import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Phone, Mail, Radio } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { wpFetch } from '../libraries/wordpress';

interface WPHubLocation {
  id: number;
  title: { rendered: string };
  acf: {
    hub_name: string;
    hub_address: string;
    hub_phone: string;
    hub_email: string;
    hub_region: string;
  };
}

function useHubLocations() {
  return useQuery({
    queryKey: ['hub-locations'],
    queryFn: () => wpFetch<WPHubLocation[]>('hub_locations?per_page=10&acf_format=standard'),
  });
}

export default function Contact() {
  // [04] Parameterized Liaison Intake Engine State Form Controllers
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    jurisdiction: '',
    intentCategory: '',
    scopeDetails: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
  const { data: hubLocations = [] } = useHubLocations();

  // Parameterized submission handler dispatch loop
  const handleDispatchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('IDLE');

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-contact-enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('SUCCESS');
      setFormData({ fullName: '', organization: '', jurisdiction: '', intentCategory: '', scopeDetails: '' });
    } catch (err) {
      setSubmitStatus('ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-fieldBg text-navyPanel font-sans overflow-x-hidden">
      
      {/* [02] HERO SECTION & GLOBAL LIAISON OVERVIEW */}
      <section className="bg-navyPanel text-white pt-32 pb-20 px-6 lg:px-16 border-b-4 border-responseGreen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-screen" style={{ backgroundImage: "url('/assets/images/Helmet_worn_on_site.webp')" }} />
        
        <div className="max-w-5xl mx-auto w-full relative z-10 text-left space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-responseGreen font-black uppercase bg-slate-950/60 px-2.5 py-1 border border-slate-800">
            LIAISON CHANNELS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            Contact &amp; Liaison Operations
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Connecting sovereign authorities, multinational energy partners, and environmental stakeholders directly with CleanAfrica’s operational command infrastructure platforms.
          </p>
        </div>
      </section>

      {/* TWO-COLUMN INTEL SPLIT ARCHITECTURE BLOCK */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* [03] REGIONAL COMMAND HUBS & DIPLOMATIC CHANNELS */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-navyPanel tracking-tight uppercase">
                Regional Operational Hubs
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                For direct physical verification, industrial equipment audits, or immediate regional response containment alignments, connect directly with our active tracking stations.
              </p>
            </div>

            <div className="space-y-4">
              {hubLocations.map((hub) => (
                <div key={hub.id} className="border border-slate-200 bg-slate-50 p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-200 font-mono text-3xl font-black select-none">//</div>
                  <h3 className="text-sm font-black text-navyPanel uppercase tracking-tight mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-responseGreen" />
                    {hub.acf.hub_name}
                  </h3>
                  <div className="space-y-2 text-xs font-mono text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span><strong className="text-navyPanel">COORD:</strong> {hub.acf.hub_address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span><strong className="text-navyPanel">COMM:</strong> {hub.acf.hub_phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${hub.acf.hub_email}`} className="text-slate-600 hover:text-responseGreen transition-colors break-all">
                        <strong className="text-navyPanel">SECURE:</strong> {hub.acf.hub_email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* [04] MOBILISATION ACTIVATION CTA */}
          <div className="lg:col-span-7 bg-slate-900 text-white border border-slate-950 shadow-sm text-left flex flex-col">
            <div className="border-b border-slate-800 p-8 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black uppercase tracking-tight text-white">
                  Emergency Response Activation
                </h2>
                <Radio className="w-4 h-4 text-alertRed animate-pulse" />
              </div>
              <p className="text-xs text-slate-400 font-normal">
                For immediate oil spill response mobilisation, activate the CAA response protocol. Our team will be on standby pending General Manager approval.
              </p>
            </div>

            <div className="p-8 flex flex-col flex-1 justify-between gap-8">
              <div className="space-y-4">
                {[
                  { step: '01', label: 'Submit Mobilisation Request', desc: 'Complete the 7-section incident form with spill details, location, and resource requirements.' },
                  { step: '02', label: 'Immediate Notification', desc: 'CAA response team is notified instantly via our secure routing system.' },
                  { step: '03', label: 'Standby Activation', desc: 'Responders and equipment placed on standby pending General Manager approval.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-responseGreen/10 border border-responseGreen/30 text-responseGreen text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-wider">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-alertRed/10 border border-alertRed/20 p-4 text-xs text-slate-400 leading-relaxed">
                  Note: Please call the General Manager before submitting this form. Response services are guaranteed <strong className="text-white">ONLY for members</strong>. Non-members must sign a third-party agreement before response is initiated.
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('mobilise-open'))}
                  className="w-full py-4 bg-alertRed hover:bg-red-700 text-white font-black tracking-wider uppercase text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  ACTIVATE MOBILISE CAA
                </button>

                <a href="tel:+2349062873290"
                  className="w-full py-3 border border-white/10 hover:border-white/30 text-white/60 hover:text-white font-mono text-xs tracking-widest font-bold uppercase transition-colors flex items-center justify-center gap-2">
                  OR CALL DIRECTLY: +234 906 287 3290
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}