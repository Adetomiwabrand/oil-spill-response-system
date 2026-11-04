import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../libraries/supabase";

type Mode = "login" | "signup" | "reset";

export default function MemberPortalLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const ensureProfileForUser = async (user: { id: string; user_metadata?: Record<string, unknown> } | null | undefined) => {
    if (!user?.id) return null;

    const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
    const profileFullName = typeof metadata.full_name === "string" ? metadata.full_name : "";
    const profileCompanyName = typeof metadata.company_name === "string" ? metadata.company_name : "";

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: profileFullName || null,
        company_name: profileCompanyName || null,
        role: existingProfile?.role ?? "member",
      },
      { onConflict: "id" }
    );

    return error;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        const profileError = await ensureProfileForUser(data.user);
        if (profileError) {
          setMessage({ type: "error", text: `Signed in, but profile setup failed: ${profileError.message}` });
        } else {
          navigate("/portal/dashboard");
        }
      }

    } else if (mode === "signup") {
      if (!fullName.trim() || !companyName.trim()) {
        setMessage({ type: "error", text: "Please enter your full name and company name." });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            company_name: companyName.trim(),
          },
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else if (data.user && data.session) {
        const profileError = await ensureProfileForUser(data.user);
        if (profileError) {
          setMessage({ type: "error", text: `Account created, but profile setup failed: ${profileError.message}` });
        } else {
          setMessage({ type: "success", text: "Account created successfully." });
        }
      } else {
        setMessage({ type: "success", text: "Check your email to confirm your account." });
      }

    } else if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.clean-africa.org/portal/reset-password",
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Password reset link sent — check your inbox." });
      }
    }

    setLoading(false);
  };

  // Clear access token from URL hash after email confirmation redirect
  useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-fieldBg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-navyPanel px-8 py-6">
          <img src="/caa_logo2.png" alt="CAA" className="h-10 mix-blend-screen mb-4" />
          <h1 className="text-white text-xl font-bold">
            {mode === "login" && "Member Portal Login"}
            {mode === "signup" && "Create Member Account"}
            {mode === "reset" && "Reset Password"}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Restricted to authorised CAA personnel and partners.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-navyPanel mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organisation.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
            />
          </div>

          {/* Signup-only profile fields */}
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-navyPanel mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navyPanel mb-1">
                  Company name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="CAA Partner Ltd"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
                />
              </div>
            </>
          )}

          {/* Password (not shown on reset) */}
          {mode !== "reset" && (
            <div>
              <label className="block text-sm font-semibold text-navyPanel mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
              />
            </div>
          )}

          {/* Feedback message */}
          {message && (
            <p className={`text-sm rounded-lg px-4 py-3 ${
              message.type === "error"
                ? "bg-red-50 text-alertRed"
                : "bg-green-50 text-responseGreen"
            }`}>
              {message.text}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-responseGreen hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 min-h-[44px]"
          >
            {loading ? "Please wait…" : (
              mode === "login" ? "Sign In" :
              mode === "signup" ? "Create Account" :
              "Send Reset Link"
            )}
          </button>

          {/* Mode switchers */}
          <div className="flex justify-between text-sm pt-1">
            {mode !== "login" && (
              <button onClick={() => setMode("login")} className="text-signalBlue hover:underline">
                Back to login
              </button>
            )}
            {mode === "login" && (
              <>
                <button onClick={() => setMode("reset")} className="text-signalBlue hover:underline">
                  Forgot password?
                </button>
                <button onClick={() => setMode("signup")} className="text-signalBlue hover:underline">
                  Request access
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}