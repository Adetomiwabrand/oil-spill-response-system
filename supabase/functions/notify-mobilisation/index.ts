// supabase/functions/notify-mobilisation/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "response@clean-africa.org";

serve(async (req) => {
  try {
    const payload = await req.json();
    const r = payload.record;
    if (!r) return new Response(JSON.stringify({ error: "No record" }), { status: 400 });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: #DC2626; height: 4px;"></div>
        <div style="background: #DC2626; padding: 12px 32px;">
          <p style="color: #fff; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">
            ⚠ URGENT — MOBILISATION REQUEST RECEIVED
          </p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <h1 style="color: #0F1B2C; font-size: 20px; font-weight: bold; margin: 0 0 8px 0;">${r.member_company}</h1>
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 24px 0;">Submitted by ${r.person_notifying} (${r.job_title ?? '—'}) at ${r.time_of_activation} on ${r.date_of_activation}</p>

          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 1 — Contact Details</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; width: 200px;">Direct Phone:</td><td style="padding: 8px 12px;">${r.direct_phone}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Mobile Phone:</td><td style="padding: 8px 12px;">${r.mobile_phone}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Email:</td><td style="padding: 8px 12px;">${r.email}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Command Centre:</td><td style="padding: 8px 12px;">${r.command_centre_number ?? '—'}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 2 — Spill Details</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Date of Spill:</td><td style="padding: 8px 12px;">${r.date_of_spill} ${r.time_of_spill ? 'at ' + r.time_of_spill : ''}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Status:</td><td style="padding: 8px 12px; text-transform: uppercase; font-weight: bold; color: ${r.status_of_spill === 'uncontrolled' ? '#DC2626' : '#374151'};">${r.status_of_spill ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Source:</td><td style="padding: 8px 12px;">${r.source_of_spill ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Cause:</td><td style="padding: 8px 12px;">${r.cause_of_spill ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Production Type:</td><td style="padding: 8px 12px;">${r.type_of_production ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Facility:</td><td style="padding: 8px 12px;">${r.facility_installation ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Location:</td><td style="padding: 8px 12px;">${r.location_name ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Nearby Town:</td><td style="padding: 8px 12px;">${r.nearby_town ?? '—'}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 3 — Environment</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold;">Environment Type:</td><td style="padding: 8px 12px;">${r.environment_type?.join(', ') ?? '—'}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 4 — Resources at Risk</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td colspan="2" style="padding: 8px 12px;">${r.resources_at_risk ?? '—'}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 5 — Personnel & Equipment</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td colspan="2" style="padding: 8px 12px;">${r.personnel_equipment_required}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 6 — Health, Safety & Security</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Protection Protocol:</td><td style="padding: 8px 12px;">${r.protection_protocol}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Crew Change:</td><td style="padding: 8px 12px;">${r.crew_change_requirements ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Security Risks:</td><td style="padding: 8px 12px;">${r.safety_security_risks ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Security Arrangements:</td><td style="padding: 8px 12px;">${r.security_arrangements ?? '—'}</td></tr>

            <tr style="background: #f9fafb;"><td colspan="2" style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Section 7 — Welfare & Further Information</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Welfare Provisions:</td><td style="padding: 8px 12px;">${r.welfare_provisions?.join(', ') ?? '—'}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Applicable Welfare:</td><td style="padding: 8px 12px;">${r.applicable_welfare_provisions ?? '—'}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Additional Info:</td><td style="padding: 8px 12px;">${r.additional_information ?? '—'}</td></tr>
          </table>

          <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="color: #DC2626; font-size: 12px; font-weight: bold; margin: 0;">
              Response services are guaranteed ONLY for members. Non-members will be required to sign a third-party agreement before a response is initiated.
            </p>
          </div>
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Mobilisation Request System • response@clean-africa.org
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CleanAfrica Associates <noreply@clean-africa.org>",
        to: [ADMIN_EMAIL],
        subject: `⚠ MOBILISATION REQUEST — ${r.member_company} (${r.status_of_spill?.toUpperCase() ?? 'SPILL'})`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
