// supabase/functions/notify-career-application/index.ts
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

    const employmentTypeLabels: Record<string, string> = {
      full_time: "Full-time",
      part_time: "Part-time",
      contract: "Contract",
      internship: "Internship",
      volunteer: "Volunteer",
      other: "Other",
    };

    const availabilityLabels: Record<string, string> = {
      immediately: "Immediately",
      two_weeks: "2 Weeks",
      one_month: "1 Month",
      other: "Other",
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: #22C55E; height: 3px;"></div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #0F1B2C; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 12px 0;">
            New Career Application
          </p>
          <h1 style="color: #0F1B2C; font-size: 20px; font-weight: bold; margin: 0 0 24px 0;">
            ${record.position_applied_for}
          </h1>
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold; width: 160px;">Applicant:</td><td style="padding: 8px 0;">${record.full_name}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${record.email}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${record.phone}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Employment Type:</td><td style="padding: 8px 0;">${employmentTypeLabels[record.employment_type] ?? record.employment_type}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Location:</td><td style="padding: 8px 0;">${record.preferred_location ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Current Role:</td><td style="padding: 8px 0;">${record.current_job_title ?? "—"} ${record.current_employer ? "at " + record.current_employer : ""}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Experience:</td><td style="padding: 8px 0;">${record.years_experience ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Qualification:</td><td style="padding: 8px 0;">${record.highest_qualification ?? "Not specified"}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px 0; font-weight: bold;">Availability:</td><td style="padding: 8px 0;">${availabilityLabels[record.availability] ?? record.availability ?? "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Skills:</td><td style="padding: 8px 0;">${record.relevant_skills ?? "—"}</td></tr>
          </table>

          ${record.cv_url ? `<p style="margin-top: 20px;"><a href="${record.cv_url}" style="color: #0057FF; font-weight: bold; text-decoration: none;">📄 View CV / Resume</a></p>` : ""}
          ${record.cover_letter_url ? `<p style="margin-top: 8px;"><a href="${record.cover_letter_url}" style="color: #0057FF; font-weight: bold; text-decoration: none;">📄 View Cover Letter</a></p>` : ""}
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Careers Application Notification
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
        subject: `New Application — ${record.position_applied_for} (${record.full_name})`,
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
