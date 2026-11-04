import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../libraries/supabase";
import { Wrench } from "lucide-react";

type Priority = "low" | "medium" | "high" | "critical";

export default function MaintenanceRequest() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState<Priority>("medium");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async () => {
    if (!companyName || !equipment || !issueDescription) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const { error } = await supabase.from("maintenance_requests").insert({
      company_name: companyName,
      equipment,
      issue_description: issueDescription,
      priority_level: priorityLevel,
      submitted_by: userId,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Request submitted. Our maintenance team has been notified." });
      setCompanyName("");
      setEquipment("");
      setIssueDescription("");
      setPriorityLevel("medium");
      setTimeout(() => navigate("/portal/dashboard"), 2500);
    }

    setLoading(false);
  };

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: "low",      label: "Low",      color: "bg-slate-100 text-slate-600 border-slate-300" },
    { value: "medium",   label: "Medium",   color: "bg-blue-50 text-signalBlue border-blue-200" },
    { value: "high",     label: "High",     color: "bg-amber-50 text-amber-600 border-amber-200" },
    { value: "critical", label: "Critical", color: "bg-red-50 text-alertRed border-red-200" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* Portal sub-header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-navyPanel border border-white/10">
          <Wrench className="w-5 h-5 text-responseGreen" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-1">
            Member Portal
          </p>
          <h1 className="text-2xl font-bold text-navyPanel">Maintenance Request</h1>
        </div>
      </div>

      <p className="text-sm text-navyPanel/70 leading-relaxed mb-8">
        Submit a request for equipment maintenance, repair, or inspection. Our team will be
        notified immediately and will respond based on the priority level selected.
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-5">

        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-navyPanel mb-1">
            Company Name <span className="text-alertRed">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. CleanAfrica Logistics Ltd"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-semibold text-navyPanel mb-1">
            Equipment <span className="text-alertRed">*</span>
          </label>
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="e.g. Vikoma Skimmer Unit #4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue"
          />
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-sm font-semibold text-navyPanel mb-1">
            Issue Description <span className="text-alertRed">*</span>
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signalBlue resize-none"
          />
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-sm font-semibold text-navyPanel mb-2">
            Priority Level <span className="text-alertRed">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriorityLevel(opt.value)}
                className={`text-xs font-bold uppercase tracking-wider py-3 px-2 rounded-lg border-2 transition-all min-h-[44px] ${
                  priorityLevel === opt.value
                    ? `${opt.color} border-current`
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

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
          {loading ? "Submitting…" : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
