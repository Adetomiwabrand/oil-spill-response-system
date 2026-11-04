// supabase/functions/notify-callout/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "response@clean-africa.org";

const SCALE_COLORS: Record<string, string> = {
  minor:        "#22C55E",
  moderate:     "#f59e0b",
  major:        "#f97316",
  catastrophic: "#DC2626",
};

const TYPE_LABELS: Record<string, string> = {
  oil_spill: "Oil Spill",
  chemical:  "Chemical",
  other:     "Other",
};

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record found" }), { status: 400 });
    }

    const scaleColor = SCALE_COLORS[record.estimated_scale] || "#DC2626";
    const typeLabel  = TYPE_LABELS[record.incident_type]    || record.incident_type;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: #DC2626; height: 4px;"></div>
        <div style="background: #DC2626; padding: 12px 32px;">
          <p style="color: #ffffff; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">
            ⚠ EMERGENCY CALLOUT REQUEST — IMMEDIATE ACTION REQUIRED
          </p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 160px;">Company:</td><td style="padding: 8px 0;">${record.company_name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Contact Person:</td><td style="padding: 8px 0;">${record.contact_person}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${record.phone_number}" style="color: #DC2626; font-weight: bold;">${record.phone_number}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Location:</td><td style="padding: 8px 0;">${record.incident_location}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Incident Type:</td><td style="padding: 8px 0;">${typeLabel}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Estimated Scale:</td><td style="padding: 8px 0;">
              <span style="background: ${scaleColor}; color: #fff; padding: 2px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                ${record.estimated_scale}
              </span>
            </td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Description:</td><td style="padding: 8px 0;">${record.description}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${new Date(record.created_at).toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}</td></tr>
          </table>
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Emergency Callout System
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
        from: "CleanAfrica Associates <newsletter@clean-africa.org>",
        to: [ADMIN_EMAIL],
        subject: `🚨 [CALLOUT] ${typeLabel} — ${record.estimated_scale?.toUpperCase()} — ${record.company_name}`,
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
