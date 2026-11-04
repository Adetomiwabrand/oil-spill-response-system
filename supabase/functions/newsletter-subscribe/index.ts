// supabase/functions/newsletter-subscribe/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY")!;
const RESEND_AUDIENCE = "7ade3d64-41d9-42ca-bbfc-b36c629fbff4";
const SUPABASE_URL    = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let email: string;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) throw new Error("Invalid email");
  } catch {
    return new Response(JSON.stringify({ error: "A valid email address is required." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 1. Add to Resend Audience ───────────────────────────────
  const resendRes = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE}/contacts`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  );

  // 422 = contact already exists — treat as success
  if (!resendRes.ok && resendRes.status !== 422) {
    const resendBody = await resendRes.json().catch(() => ({}));
    console.error("Resend error:", resendBody);
    return new Response(JSON.stringify({ error: "Failed to subscribe. Please try again." }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ── 2. Backup insert via Supabase REST API ──────────────────
  const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",  // upsert on conflict
    },
    body: JSON.stringify({ email, subscribed_at: new Date().toISOString() }),
  });

  if (!dbRes.ok) {
    // Log but don't fail — Resend is the source of truth
    const dbBody = await dbRes.text();
    console.error("Supabase backup error:", dbBody);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
