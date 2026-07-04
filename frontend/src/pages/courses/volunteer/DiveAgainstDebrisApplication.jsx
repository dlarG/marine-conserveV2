import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, Star, Waves, Fish, ArrowLeft } from "lucide-react";

const DiveAgainstDebrisApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
    confirmation_checked: false,
  });
  const navigate = useNavigate();
  const [medicalFile, setMedicalFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const programs = [
    {
      id: "weeks-1-6",
      title: "Weeks 1 – 6",
      price: "₱25,000.00",
      period: "/ week",
      badge: null,
      color: "from-teal-500 to-teal-600",
      inclusions: [
        "Basic debris survey training",
        "Underwater clean-up certification",
        "Shared accommodation",
        "3 meals per day",
        "Project orientation & safety briefing",
        "Local transportation to dive sites",
        "Basic dive equipment rental",
      ],
    },
    {
      id: "weeks-7-12",
      title: "Weeks 7 – 12",
      price: "₱20,000.00",
      period: "/ week",
      discount: "20% discount",
      badge: "MOST POPULAR",
      color: "from-emerald-500 to-emerald-600",
      featured: true,
      inclusions: [
        "Advanced debris survey techniques",
        "Ghost gear removal specialization",
        "Private room accommodation",
        "3 meals per day (premium menu)",
        "Data collection & reporting training",
        "Marine pollution impact assessment",
        "Community education workshop",
        "Boat diving excursions",
      ],
    },
    {
      id: "weeks-13-24",
      title: "Weeks 13 – 24",
      price: "₱15,000.00",
      period: "/ week",
      discount: "40% discount",
      color: "from-cyan-500 to-cyan-600",
      inclusions: [
        "Master debris management specialist",
        "Lead your own survey team",
        "Private beachfront bungalow",
        "All meals included",
        "Contribute to global database",
        "Policy recommendation training",
        "Research methodology workshop",
        "Publication opportunity",
        "Career placement assistance",
      ],
    },
  ];

  const handleApplyClick = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setMedicalFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const submitFormData = new FormData();
    submitFormData.append("full_name", formData.full_name);
    submitFormData.append("email", formData.email);
    submitFormData.append("program_type", "Dive Against Debris");
    submitFormData.append("week_selection", selectedProgram?.title || "");
    submitFormData.append("message", formData.message);
    submitFormData.append(
      "confirmation_checked",
      formData.confirmation_checked ? "1" : "0"
    );

    if (medicalFile) {
      submitFormData.append("medical_certificate", medicalFile);
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:10000"
        }/volunteer/apply`,
        {
          method: "POST",
          body: submitFormData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: `Application submitted successfully! Your reference number is #${data.application_id}. Check your email for confirmation.`,
        });
        setTimeout(() => {
          setIsModalOpen(false);
          setFormData({
            full_name: "",
            email: "",
            message: "",
            confirmation_checked: false,
          });
          setMedicalFile(null);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message || "Failed to submit application. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section */}
      <section
        className="relative h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777343078/P8190137_zohnsu.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          {/* Back Button */}
          <button
            onClick={() => navigate("/volunteer/dive-against-debris")}
            className="cursor-pointer flex items-center gap-2 text-white/70 hover:text-white transition-colors group mb-6 w-fit"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Program Details</span>
          </button>

          {/* Main Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Dive Against Debris Program
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Remove ghost gear and plastic pollution, documenting every piece
              to help drive global policy changes for cleaner oceans.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-emerald-300" />
                <span className="text-white/80">Flexible Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-emerald-300" />
                <span className="text-white/80">Hands-on Conservation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Cards Section */}
      <section className="py-15 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Journey
          </h2>
          <p className="text-base text-gray-600">
            Select the program duration that fits your conservation goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col ${
                program.featured
                  ? "ring-2 ring-emerald-500 md:-mt-4 md:mb-4"
                  : ""
              }`}
            >
              {/* Badge */}
              {program.badge && (
                <div className="absolute top-8 right-4 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {program.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div
                className={`bg-gradient-to-r ${program.color} p-8 text-white`}
              >
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{program.price}</span>
                  <span className="text-base opacity-90">{program.period}</span>
                </div>
                {program.discount && (
                  <div className="mt-2 inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-semibold">
                      {program.discount}
                    </span>
                  </div>
                )}
              </div>

              {/* Inclusions - Takes remaining space */}
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-teal-500" />
                  Program Inclusions
                </h4>
                <ul className="space-y-3 flex-1">
                  {program.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button - Fixed at bottom */}
              <div className="px-8 pb-8 mt-auto">
                <button
                  onClick={() => handleApplyClick(program)}
                  className={`cursor-pointer w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                    program.featured
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg"
                      : `bg-gradient-to-r ${program.color} hover:shadow-lg`
                  }`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 my-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      VOLUNTEER APPLICATION
                    </h2>
                    <p className="text-teal-100 mt-1">Dive Against Debris</p>
                    <p className="text-teal-50 text-sm mt-2">
                      Join our marine debris removal mission in Sogod Bay.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {selectedProgram && (
                  <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-semibold">
                      Selected: {selectedProgram.title} -{" "}
                      {selectedProgram.price}/week
                    </p>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Anything we should know (experience level, questions, availability)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medical Certificate (PDF) (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional but highly encouraged for faster processing.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="confirmation_checked"
                    checked={formData.confirmation_checked}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <label className="text-sm text-gray-600">
                    I confirm that the email I entered is my personal email
                    address and can be used to contact me for confirmation and
                    feedback.
                  </label>
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiveAgainstDebrisApplication;
