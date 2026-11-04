// src/components/CalloutModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { supabase } from '../libraries/supabase';

const inputCls = 'w-full bg-white/5 border border-white/10 text-white text-xs px-3 py-2.5 rounded-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-signalBlue focus:border-transparent min-h-[44px] [&>option]:bg-slate-900 [&>option]:text-white [&>option]:py-2';

interface CalloutModalProps {
  open: boolean;
  onClose: () => void;
  phoneNumber: string;
}

interface FormState {
  company_name: string;
  contact_person: string;
  phone_number: string;
  incident_location: string;
  incident_type: string;
  estimated_scale: string;
  description: string;
}

const EMPTY: FormState = {
  company_name: '',
  contact_person: '',
  phone_number: '',
  incident_location: '',
  incident_type: '',
  estimated_scale: '',
  description: '',
};

export const CalloutModal: React.FC<CalloutModalProps> = ({ open, onClose, phoneNumber }) => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Focus first field when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => firstFieldRef.current?.focus(), 50);
    } else {
      setForm(EMPTY);
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const required: (keyof FormState)[] = [
      'company_name', 'contact_person', 'phone_number',
      'incident_location', 'incident_type', 'estimated_scale', 'description'
    ];
    const missing = required.find(f => !form[f].trim());
    if (missing) {
      setErrorMsg('Please complete all fields before submitting.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // Insert to Supabase
      const { data, error } = await supabase
        .from('callout_requests')
        .insert([{ ...form, priority: 'critical' }])
        .select()
        .single();

      if (error) throw error;

      // Trigger notification edge function
      await supabase.functions.invoke('notify-callout', { body: { record: data } });

      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Submission failed. Please call the emergency line directly.');
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="callout-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-navyPanel border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm">

        {/* Header */}
        <div className="sticky top-0 bg-navyPanel border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="animate-pulse h-2.5 w-2.5 rounded-full bg-alertRed block shrink-0" aria-hidden="true" />
            <h2 id="callout-modal-title" className="text-sm font-black text-white uppercase tracking-widest">
              MOBILISE CAA
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-6 py-12 text-center space-y-4">
            <div className="w-12 h-12 bg-responseGreen/10 border border-responseGreen/30 rounded-full flex items-center justify-center mx-auto">
              <span className="text-responseGreen text-xl font-black">✓</span>
            </div>
            <p className="font-black text-white uppercase tracking-wide text-sm">Request Received</p>
            <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto">
              Our emergency response team has been notified and will contact you immediately.
            </p>
            <p className="text-xs text-white/30 pt-2">
              If urgent, call directly: <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="text-alertRed font-bold">{phoneNumber}</a>
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-responseGreen text-navyPanel font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div className="px-6 py-6 space-y-5">

            {/* Urgent callout strip */}
            <div className="bg-alertRed/10 border border-alertRed/30 rounded-sm px-4 py-3 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-alertRed shrink-0 mt-0.5" />
              <p className="text-xs text-white/70 leading-relaxed">
                For life-threatening emergencies call directly:{' '}
                <a href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`} className="text-alertRed font-black">
                  {phoneNumber}
                </a>
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    value={form.company_name}
                    onChange={e => set('company_name', e.target.value)}
                    placeholder="Organisation name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Contact Person" required>
                  <input
                    type="text"
                    value={form.contact_person}
                    onChange={e => set('contact_person', e.target.value)}
                    placeholder="Full name"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Phone Number" required>
                <input
                  type="tel"
                  value={form.phone_number}
                  onChange={e => set('phone_number', e.target.value)}
                  placeholder="+234 000 000 0000"
                  className={inputCls}
                />
              </Field>

              <Field label="Incident Location" required>
                <input
                  type="text"
                  value={form.incident_location}
                  onChange={e => set('incident_location', e.target.value)}
                  placeholder="Coordinates or description"
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 color gap-4">
                <Field label="Incident Type" required>
                  <select
                    value={form.incident_type}
                    onChange={e => set('incident_type', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select type</option>
                    <option value="oil_spill">Oil Spill</option>
                    <option value="chemical">Chemical</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Estimated Scale" required>
                  <select
                    value={form.estimated_scale}
                    onChange={e => set('estimated_scale', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select scale</option>
                    <option value="minor">Minor</option>
                    <option value="moderate">Moderate</option>
                    <option value="major">Major</option>
                    <option value="catastrophic">Catastrophic</option>
                  </select>
                </Field>
              </div>

              <Field label="Brief Description" required>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe the incident — what happened, current conditions, immediate risks"
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>

            {status === 'error' && errorMsg && (
              <p className="text-xs text-alertRed font-mono">{errorMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full py-4 bg-alertRed hover:bg-red-700 text-white font-black text-xs tracking-widest uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-signalBlue disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className={`h-2 w-2 rounded-full bg-white block shrink-0 ${status === 'loading' ? 'animate-ping' : 'animate-pulse'}`} aria-hidden="true" />
              {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT CALLOUT REQUEST'}
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────



function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest block">
        {label}{required && <span className="text-alertRed ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
