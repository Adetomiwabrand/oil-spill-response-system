// supabase/functions/notify-maintenance-request/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "responseresponse@clean-africa.org";

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record found" }), { status: 400 });
    }

    const priorityColors: Record<string, string> = {
      low: "#22C55E",
      medium: "#0057ff",
      high: "#f59e0b",
      critical: "#DC2626",
    };

    const priorityColor = priorityColors[record.priority_level] || "#0057ff";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: ${priorityColor}; height: 3px;"></div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #0F1B2C; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 12px 0;">
            New Maintenance Request
          </p>
          <h1 style="color: #0F1B2C; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">
            ${record.equipment}
          </h1>
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Company:</td><td style="padding: 8px 0;">${record.company_name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Equipment:</td><td style="padding: 8px 0;">${record.equipment}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Priority:</td><td style="padding: 8px 0;">
              <span style="background: ${priorityColor}; color: #fff; padding: 2px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                ${record.priority_level}
              </span>
            </td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Issue:</td><td style="padding: 8px 0;">${record.issue_description}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${new Date(record.created_at).toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}</td></tr>
          </table>
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Member Portal Notification
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
        subject: `[${record.priority_level.toUpperCase()}] Maintenance Request — ${record.equipment}`,
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
