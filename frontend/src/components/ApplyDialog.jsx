import React, { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import { ALLIANCE_OPTIONS } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = {
  faction_name: "",
  size: "",
  specialization: "",
  alliance_type: "",
  contribution_capacity: "",
  notes: "",
};

export default function ApplyDialog({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setSuccess(false);
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/alliances/apply`, form);
      setSuccess(true);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Submission failed. Please review the fields and try again.";
      setError(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const Select = ({ label, name, options, testId }) => (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] text-secondary tracking-wide">{label}</span>
      <div className="relative">
        <select
          data-testid={testId}
          required
          value={form[name]}
          onChange={update(name)}
          className="input-dark appearance-none pr-10 cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-[11px]">
          ▾
        </span>
      </div>
    </label>
  );

  return (
    <div
      data-testid="apply-dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        data-testid="apply-dialog-backdrop"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[600px] card-base p-6 sm:p-8 animate-fadeUp">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="tag-locked mb-3">Alliance Intake</div>
            <h2 className="text-[22px] font-semibold text-primary">
              Apply for Alliance
            </h2>
            <p className="text-[13px] text-secondary mt-1 max-w-md">
              Submissions are reviewed by the Yazanaki Empire governance layer.
              Only structured agreements are accepted.
            </p>
          </div>
          <button
            data-testid="apply-dialog-close"
            onClick={onClose}
            className="text-muted hover:text-primary p-2 rounded-[10px] border border-line transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {success ? (
          <div
            data-testid="apply-success"
            className="flex flex-col items-start gap-3 p-5 rounded-[12px] border border-line bg-elevated"
          >
            <CheckCircle2 className="text-accent" size={22} />
            <div>
              <div className="text-primary font-medium">Application received.</div>
              <div className="text-secondary text-[13px] mt-1">
                Your submission has been registered. A review will be issued
                through formal channels.
              </div>
            </div>
            <button
              data-testid="apply-success-close"
              onClick={onClose}
              className="btn-secondary mt-2"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-[13px] text-secondary tracking-wide">
                Faction Name
              </span>
              <input
                data-testid="apply-faction-name"
                type="text"
                required
                minLength={1}
                maxLength={120}
                value={form.faction_name}
                onChange={update("faction_name")}
                placeholder="e.g. Excalibur"
                className="input-dark"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Size"
                name="size"
                options={ALLIANCE_OPTIONS.size}
                testId="apply-size"
              />
              <Select
                label="Specialization"
                name="specialization"
                options={ALLIANCE_OPTIONS.specialization}
                testId="apply-specialization"
              />
              <Select
                label="Desired Alliance Type"
                name="alliance_type"
                options={ALLIANCE_OPTIONS.alliance_type}
                testId="apply-alliance-type"
              />
              <Select
                label="Contribution Capacity"
                name="contribution_capacity"
                options={ALLIANCE_OPTIONS.contribution_capacity}
                testId="apply-contribution"
              />
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-[13px] text-secondary tracking-wide">
                Notes
              </span>
              <textarea
                data-testid="apply-notes"
                rows={4}
                maxLength={1000}
                value={form.notes}
                onChange={update("notes")}
                placeholder="Provide relevant structural details, current posture, or intent."
                className="input-dark resize-none"
              />
            </label>

            {error && (
              <div
                data-testid="apply-error"
                className="flex items-start gap-2 text-[13px] text-[#E2A36B] bg-[#1a130a] border border-[#3a2a13] rounded-[10px] p-3"
              >
                <AlertCircle size={16} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              data-testid="apply-submit-button"
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
            <p className="text-[12px] text-muted text-center">
              Submission does not guarantee acceptance. Reviewed under Yazanaki
              governance protocol.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
