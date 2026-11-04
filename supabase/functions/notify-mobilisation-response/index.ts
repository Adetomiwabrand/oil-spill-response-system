// supabase/functions/notify-mobilisation-response/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;
const RECORD_EMAIL = "response@clean-africa.org";

const STATUS_COLORS: Record<string, string> = {
  acknowledged: "#0057FF",
  mobilised:    "#22C55E",
  stood_down:   "#F59E0B",
  received:     "#6B7280",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_MESSAGES: Record<string, { subject: string; message: string; next_steps: string }> = {
  received: {
    subject: "Your Mobilisation Request Has Been Received",
    message: "Thank you for submitting your mobilisation request. We have received your incident report and it is currently being reviewed by our response team.",
    next_steps: "Please ensure you have contacted the General Manager by phone to confirm receipt. Our team will be in touch shortly with further instructions.",
  },
  acknowledged: {
    subject: "Mobilisation Request Acknowledged — Standby Activated",
    message: "Your mobilisation request has been acknowledged. CleanAfrica Associates responders and equipment have been placed on standby pending General Manager approval to mobilise.",
    next_steps: "Please ensure site access, accommodation, and security arrangements are in place as outlined in your submitted form. Our Divisional Manager will contact you directly to confirm logistics.",
  },
  mobilised: {
    subject: "CAA Response Team Mobilised",
    message: "CleanAfrica Associates has mobilised a response team to your incident location. Our personnel and equipment are en route.",
    next_steps: "Please ensure the following are ready upon arrival: site access clearance, accommodation, transportation, and on-site security escort. The Callout Allowance Form must be completed by all deployed personnel during the response operation.",
  },
  stood_down: {
    subject: "Mobilisation Request — Stood Down",
    message: "Following review of your mobilisation request, the CleanAfrica Associates response team has been stood down.",
    next_steps: "If you believe this decision is in error or if the situation changes, please contact our response team immediately at response@clean-africa.org or call +234 906 287 3290.",
  },
};

serve(async (req: Request) => {
  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = await req.json();
    const { mobilisation_request_id, status, message, next_steps, responded_by } = body;

    if (!mobilisation_request_id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the original mobilisation request to get member email
    const reqRes = await fetch(
      `${SUPABASE_URL}/rest/v1/mobilisation_requests?id=eq.${mobilisation_request_id}&select=email,member_company,person_notifying`,
      {
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );
    const requests = await reqRes.json();
    const request = requests?.[0];

    if (!request) {
      return new Response(JSON.stringify({ error: "Mobilisation request not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const defaults = DEFAULT_MESSAGES[status] ?? DEFAULT_MESSAGES.received;
    const finalMessage = message || defaults.message;
    const finalNextSteps = next_steps || defaults.next_steps;
    const statusColor = STATUS_COLORS[status] ?? "#6B7280";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0F1B2C; padding: 24px 32px;">
          <img src="https://www.clean-africa.org/caa_logo2.png" alt="CleanAfrica Associates" height="40" style="display: block;" />
        </div>
        <div style="background: ${statusColor}; height: 4px;"></div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #6b7280; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px 0;">
            Mobilisation Response — ${status.replace('_', ' ').toUpperCase()}
          </p>
          <h1 style="color: #0F1B2C; font-size: 20px; font-weight: bold; margin: 0 0 8px 0;">${defaults.subject}</h1>
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 24px 0;">
            Dear ${request.person_notifying} (${request.member_company}),
          </p>

          <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
            ${finalMessage}
          </p>

          ${finalNextSteps ? `
          <div style="background: #F4F6F9; border-left: 4px solid ${statusColor}; padding: 16px 20px; margin-bottom: 24px;">
            <p style="color: #0F1B2C; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Next Steps</p>
            <p style="color: #374151; font-size: 13px; line-height: 1.6; margin: 0;">${finalNextSteps}</p>
          </div>` : ''}

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px 0;">For urgent matters, contact our response team directly:</p>
            <p style="color: #0F1B2C; font-size: 14px; font-weight: bold; margin: 0;">+234 906 287 3290</p>
            <p style="color: #0F1B2C; font-size: 13px; margin: 4px 0 0 0;">response@clean-africa.org</p>
          </div>
        </div>
        <div style="background: #F4F6F9; padding: 16px 32px; font-size: 11px; color: #999;">
          CleanAfrica Associates — Mobilisation Response System
        </div>
      </div>
    `;

    // Send to member
    const memberRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CleanAfrica Associates <noreply@clean-africa.org>",
        to: [request.email],
        cc: [RECORD_EMAIL],
        subject: `[CAA Response] ${defaults.subject}`,
        html: emailHtml,
      }),
    });

    if (!memberRes.ok) {
      const err = await memberRes.text();
      return new Response(JSON.stringify({ error: `Resend failed: ${err}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save response to database
    await fetch(`${SUPABASE_URL}/rest/v1/mobilisation_responses`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        mobilisation_request_id,
        status,
        message: finalMessage,
        next_steps: finalNextSteps,
        responded_by,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
