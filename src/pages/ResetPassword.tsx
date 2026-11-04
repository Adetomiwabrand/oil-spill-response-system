import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../libraries/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // Supabase fires PASSWORD_RECOVERY and, after email confirmation,
  // SIGNED_IN when the recovery flow is active. We listen for both so the
  // user can continue without leaving the token in the URL.
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }

      if (event === "SIGNED_IN") {
        const url = new URL(window.location.href);

        if (url.hash) {
          url.hash = "";
          window.history.replaceState(null, "", `${url.pathname}${url.search}`);
        }

        navigate("/portal/reset-password", { replace: true });
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const handleReset = async () => {
    if (password !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Password updated successfully. Redirecting to login…" });
      setTimeout(() => navigate("/portal/login"), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-fieldBg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-navyPanel px-8 py-6">
          <img src="/caa_logo2.png" alt="CAA" className="h-10 mix-blend-screen mb-4" />
          <h1 className="text-white text-xl font-bold">Set a New Password</h1>
          <p className="text-white/60 text-sm mt-1">
            Choose a strong password for your member account.
          </p>
        </div>

        {/* Green accent bar */}
        <div className="bg-responseGreen h-[3px]" />

        {/* Form */}
        <div className="px-8 py-8 space-y-5">

          {!ready && !message && (
            <p className="text-sm text-navyPanel/60 text-center py-4">
              Verifying reset link…
            </p>
          )}

          {ready && (
            <>
              <div>
                <label className="block text-sm font-semibold text-navyPanel mb-1">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navyPanel mb-1">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
                />
              </div>
            </>
          )}

          {message && (
            <p className={`text-sm rounded-lg px-4 py-3 ${
              message.type === "error"
                ? "bg-red-50 text-alertRed"
                : "bg-green-50 text-responseGreen"
            }`}>
              {message.text}
            </p>
          )}

          {ready && (
            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full bg-responseGreen hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? "Updating…" : "Set New Password"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}