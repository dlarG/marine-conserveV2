import { useState, useEffect } from "react";

const DonateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    donationType: "one-time",
    amount: "",
    customAmount: "",
    message: "",
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [donationStep, setDonationStep] = useState("form"); // 'form' or 'payment'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectedAmount = formData.customAmount || formData.amount || "0";

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setDonationStep("payment");
  };

  const handleConfirmDonation = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare data for submission
      const donationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        donationType: formData.donationType,
        amount: selectedAmount,
        message: formData.message,
        newsletter: formData.newsletter,
      };

      // Call backend API
      const response = await fetch("http://localhost:10000/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setDonationStep("form");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            donationType: "one-time",
            amount: "",
            customAmount: "",
            message: "",
            newsletter: false,
          });
        }, 3000);
      } else if (response.status === 429) {
        // Rate limit exceeded
        setSubmitStatus("error");
        alert(
          result.message ||
            "You have exceeded the donation limit. Please try again later."
        );
      } else {
        throw new Error(result.message || "Failed to process donation");
      }
    } catch (error) {
      console.error("Donation submission error:", error);
      setSubmitStatus("error");
      // Fallback: Still show success if API is down (for development)
      // Remove this in production
      if (import.meta.env.DEV) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setDonationStep("form");
        }, 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const donationAmounts = ["250", "500", "1000", "2500", "5000"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {donationStep === "form"
                  ? "Support Our Mission"
                  : "Complete Your Donation"}
              </h2>
              <p className="text-green-100 mt-1">
                {donationStep === "form"
                  ? "Help us protect marine life for future generations"
                  : `Donating ₱${selectedAmount} via GCash`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Step */}
        {donationStep === "form" && (
          <form
            onSubmit={handleProceedToPayment}
            className="p-6 space-y-6 max-h-[75vh] overflow-y-auto"
          >
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>
            </div>

            {/* Donation Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Donation Type
              </h3>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="donationType"
                    value="one-time"
                    checked={formData.donationType === "one-time"}
                    onChange={handleInputChange}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">One-time</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="donationType"
                    value="monthly"
                    checked={formData.donationType === "monthly"}
                    onChange={handleInputChange}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">Monthly</span>
                </label>
              </div>
              {formData.donationType === "monthly" && (
                <p className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  For monthly donations, please set up a recurring GCash
                  transfer. You'll be reminded each month via email.
                </p>
              )}
            </div>

            {/* Donation Amount */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Donation Amount
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount,
                        customAmount: "",
                      }))
                    }
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all font-medium ${
                      formData.amount === amount
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300 text-gray-700"
                    }`}
                  >
                    ₱{amount}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₱
                  </span>
                  <input
                    type="number"
                    name="customAmount"
                    value={formData.customAmount}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFormData((prev) => ({ ...prev, amount: "" }));
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us what inspired you to donate..."
              />
            </div>

            {/* Newsletter */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="text-green-500 focus:ring-green-500 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Subscribe to our newsletter for updates on our conservation
                efforts
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedAmount || selectedAmount === "0"}
                className="cursor-pointer flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        )}

        {/* Payment Step */}
        {donationStep === "payment" && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">How to donate via QR Ph:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Open your mobile banking or e-wallet app</li>
                    <li>Look for "Scan QR" or "QR Pay" option</li>
                    <li>Scan the QR code below</li>
                    <li>
                      Enter the amount: <strong>₱{selectedAmount}</strong>
                    </li>
                    <li>
                      Complete the transaction and click "I've Sent My Donation"
                      below
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Scan GCash QR Code
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 inline-block border-2 border-dashed border-gray-300">
                <img
                  src="/asset/qr_cropped.jpg"
                  alt="GCash QR Code"
                  className="w-64 h-64 object-contain mx-auto"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/256x256/FFFFFF/000000?text=GCash+QR+Code";
                  }}
                />
                <p className="text-sm text-gray-500 mt-3">
                  Scan this QR code with your GCash app
                </p>
              </div>

              {/* GCash Number */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">
                  Or send directly to:
                </p>
                <p className="text-xl font-bold text-gray-900">
                  GCash: 0976-028-8908
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Account Name: Jerome Napala(JE***N N.)
                </p>
              </div>
            </div>

            {/* Donation Summary */}
            <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
              <h4 className="font-semibold text-teal-800 mb-2">
                Donation Summary
              </h4>
              <div className="space-y-1 text-sm text-teal-700">
                <p>
                  Name: {formData.firstName} {formData.lastName}
                </p>
                <p>Amount: ₱{selectedAmount}</p>
                <p>
                  Type:{" "}
                  {formData.donationType === "one-time"
                    ? "One-time"
                    : "Monthly"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmDonation}
                disabled={isSubmitting || submitStatus === "success"}
                className="cursor-pointer w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thank You!
                  </>
                ) : (
                  "I've Sent My Donation"
                )}
              </button>

              <button
                onClick={() => setDonationStep("form")}
                className="cursor-pointer w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ← Back to Edit Details
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-green-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Thank you for your donation!</p>
                    <p className="text-sm">
                      We'll send a confirmation to your email once verified.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Note */}
            <p className="text-xs text-gray-400 text-center">
              Your donation information is secure. We'll verify your payment and
              send a confirmation email within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateModal;
