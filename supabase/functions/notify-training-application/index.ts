// supabase/functions/notify-training-application/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "response@clean-africa.org";

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record found" }), { status: 400 });
    }

    const levelLabels: Record<string, string> = {
      imo_level_1: "IMO OPRC Level 1 — First Responder Oil Spill Operations",
      imo_level_2: "IMO OPRC Level 2 — On-Scene Commander Certification",
      imo_level_3: "IMO OPRC Level 3 — Spill Management & Strategic Command",
    };

    const modeLabels: Record<string, string> = {
      physical: "Physical",
      online: "Online",
      hybrid: "Hybrid",
    };

    const applicantTypeLabels: Record<string, string> = {
      individual: "Individual Applicant",
      company_sponsored: "Company-Sponsored Applicant",
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: #0057FF; height: 3px;"></div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #0F1B2C; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 12px 0;">
            New Training Application
          </p>
          <h1 style="color: #0F1B2C; font-size: 18px; font-weight: bold; margin: 0 0 24px 0;">
            ${levelLabels[record.training_level] ?? record.training_level}
          </h1>

          <p style="color: #0F1B2C; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 8px 0;">Applicant</p>
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold; width: 160px;">Full Name:</td><td style="padding: 8px 0;">${record.full_name}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${record.email}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${record.phone}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Nationality:</td><td style="padding: 8px 0;">${record.nationality ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Preferred Date:</td><td style="padding: 8px 0;">${record.preferred_date ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Preferred Location:</td><td style="padding: 8px 0;">${record.preferred_location ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Mode:</td><td style="padding: 8px 0;">${modeLabels[record.mode_of_attendance] ?? "Not specified"}</td></tr>
          </table>

          <p style="color: #0F1B2C; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 8px 0;">Sponsorship</p>
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold; width: 160px;">Applying As:</td><td style="padding: 8px 0;">${applicantTypeLabels[record.applicant_type] ?? "Not specified"}</td></tr>
            ${record.company_name ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${record.company_name}</td></tr>` : ""}
            ${record.job_title ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Job Title:</td><td style="padding: 8px 0;">${record.job_title}</td></tr>` : ""}
          </table>

          <p style="color: #0F1B2C; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 8px 0;">Background</p>
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold; width: 160px; vertical-align: top;">Experience:</td><td style="padding: 8px 0;">${record.current_experience ?? "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Reason for Applying:</td><td style="padding: 8px 0;">${record.reason_for_applying ?? "Not specified"}</td></tr>
          </table>

          ${record.has_medical_condition ? `<p style="margin-top: 16px; padding: 10px; background: #FEF2F2; color: #DC2626; font-size: 12px; border-radius: 6px;"><strong>Medical Note:</strong> ${record.medical_condition_details ?? "Applicant indicated a medical condition — see record."}</p>` : ""}

          ${record.id_document_url ? `<p style="margin-top: 20px;"><a href="${record.id_document_url}" style="color: #0057FF; font-weight: bold; text-decoration: none;">📄 View ID Document</a></p>` : ""}
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Training Application Notification
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
        subject: `New Training Application — ${levelLabels[record.training_level] ?? record.training_level} (${record.full_name})`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return new Response(JSON.stringify({ error: errText }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
