import { useMemo, useState } from "react";

const VolunteerApplyModal = ({ isOpen, onClose, programTitle }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ack, setAck] = useState(false);
  const [medicalPdf, setMedicalPdf] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const apiBaseUrl = "http://localhost:5000";

  const canSubmit = useMemo(() => {
    return fullName.trim() && email.trim() && ack && !isSubmitting;
  }, [fullName, email, ack, isSubmitting]);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setStatus(null);
    setIsSubmitting(false);
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const fd = new FormData();
      fd.append("fullName", fullName.trim());
      fd.append("email", email.trim());
      fd.append("programTitle", programTitle);
      fd.append("message", message.trim());
      fd.append("acknowledgedPersonalEmail", String(ack));

      if (medicalPdf) {
        fd.append("medicalPdf", medicalPdf);
      }

      const res = await fetch(`${apiBaseUrl}/api/volunteer/apply`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to submit application");
      }

      setStatus({ type: "success", message: data.message });
      setFullName("");
      setEmail("");
      setMessage("");
      setAck(false);
      setMedicalPdf(null);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      {/* Modal Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold tracking-wider opacity-90">
                VOLUNTEER APPLICATION
              </div>
              <div className="text-lg md:text-xl font-extrabold">
                {programTitle || "Apply"}
              </div>
              <div className="text-xs opacity-90 mt-1">
                Join our conservation mission in Sogod Bay.
              </div>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Success Message */}
            {status?.type === "success" && (
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
                {status.message}
              </div>
            )}

            {/* Error Message */}
            {status?.type === "error" && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                {status.message}
              </div>
            )}

            {/* Full Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="you@gmail.com"
                  type="email"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
                placeholder="Anything we should know (experience level, questions, availability)..."
              />
            </div>

            {/* Medical Certificate Upload (Optional) */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Medical Certificate (PDF){" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setMedicalPdf(e.target.files?.[0] || null)}
                className="cursor-pointer block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
              {medicalPdf && (
                <p className="mt-1 text-xs text-teal-600 font-medium">
                  ✓ {medicalPdf.name} ({(medicalPdf.size / 1024).toFixed(1)} KB)
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Optional but highly encouraged for faster processing.
              </p>
            </div>

            {/* Email Confirmation Checkbox */}
            <div className="mt-4 flex items-start gap-3">
              <input
                id="ack-volunteer"
                type="checkbox"
                checked={ack}
                onChange={(e) => setAck(e.target.checked)}
                className="mt-1 h-4 w-4 accent-teal-600"
                required
              />
              <label htmlFor="ack-volunteer" className="text-sm text-gray-600">
                I confirm that the email I entered is my personal email address
                and can be used to contact me for confirmation and feedback.
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={resetAndClose}
                className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-extrabold tracking-wide shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplyModal;
