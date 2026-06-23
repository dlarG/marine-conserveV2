import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplyPageNavbar from "./ApplyPageNavbar";
import Footer from "../layouts/Footer";

const ApplyPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Apply | GREEN Inc.";
  }, []);

  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    dateOfBirth: "",
    nationality: "",
    course: "",

    // Dive Info
    certificationLevel: "",
    numberOfDives: "",
    lastDive: "",

    // Personal Info
    education: "",
    futureEducation: "",
    occupation: "",
    marineBiologyExperience: "",
    heardFrom: "",
    programmeExpectations: "",

    // Health Info
    foodAllergies: "",
    medicalConditions: "",

    // Files
    cv: null,
    coverLetter: null,

    // Consent
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  // Course options
  const courseOptions = [
    "Internship",
    "Research Assistant",
    "Research Fellow",
    "Others",
  ];

  // Certification level options
  const certificationOptions = [
    "PADI Open Water Diver",
    "PADI Advanced Open Water Diver",
    "PADI Rescue Diver",
    "PADI Divemaster",
    "PADI Instructor",
    "Other",
  ];

  // Nationality options
  const nationalityOptions = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Samoa",
    "San Marino",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      // Validate file size (1MB max)
      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [name]: "File size must be less than 1MB",
        }));
        return;
      }
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only .pdf, .doc, .docx, .txt files are allowed",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.nationality)
      newErrors.nationality = "Please select your nationality";
    if (!formData.course) newErrors.course = "Please select a course";
    if (!formData.certificationLevel)
      newErrors.certificationLevel = "Please select your certification level";
    if (!formData.numberOfDives)
      newErrors.numberOfDives = "Number of dives is required";
    if (!formData.lastDive) newErrors.lastDive = "Last dive date is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.futureEducation.trim())
      newErrors.futureEducation = "Future education is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";
    if (!formData.heardFrom.trim())
      newErrors.heardFrom = "Please tell us how you heard about us";
    if (!formData.programmeExpectations.trim())
      newErrors.programmeExpectations = "Programme expectations are required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Create FormData for file uploads
      const submitData = new FormData();

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "cv" && key !== "coverLetter" && key !== "termsAccepted") {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("termsAccepted", formData.termsAccepted);

      // Add files
      if (formData.cv) {
        submitData.append("cv", formData.cv);
      }
      if (formData.coverLetter) {
        submitData.append("coverLetter", formData.coverLetter);
      }

      // Send to backend
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        body: submitData,
        // Don't set Content-Type header when using FormData
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        dateOfBirth: "",
        nationality: "",
        course: "",
        certificationLevel: "",
        numberOfDives: "",
        lastDive: "",
        education: "",
        futureEducation: "",
        occupation: "",
        marineBiologyExperience: "",
        heardFrom: "",
        programmeExpectations: "",
        foodAllergies: "",
        medicalConditions: "",
        cv: null,
        coverLetter: null,
        termsAccepted: false,
      });
      // Reset file inputs
      document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.value = "";
      });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <ApplyPageNavbar />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for applying to volunteer with GREEN Inc. We'll review
              your application and get back to you within 3-5 business days.
            </p>
            <button
              onClick={() => navigate("/volunteer")}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Back to Volunteer Programs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ApplyPageNavbar />

      <div className="mt-20 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Volunteer Application
          </h1>
          <p className="text-gray-600">
            Please fill out ALL fields. Thank you.
          </p>
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold">
                Please fix the following errors:
              </p>
              <ul className="list-disc list-inside text-sm text-red-600 mt-1">
                {Object.values(errors).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{submitError}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Full Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth * (dd/mm/yyyy)
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select your nationality *
                </label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.nationality ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your nationality</option>
                  {nationalityOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select your course *
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.course ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-500">{errors.course}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dive Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Dive Info</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select your Certification Level *
                </label>
                <select
                  name="certificationLevel"
                  value={formData.certificationLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.certificationLevel
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select certification level</option>
                  {certificationOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.certificationLevel && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.certificationLevel}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of dives *
                </label>
                <input
                  type="number"
                  name="numberOfDives"
                  value={formData.numberOfDives}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.numberOfDives ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Total number of logged dives"
                />
                {errors.numberOfDives && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.numberOfDives}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Dive * (dd/mm/yyyy)
                </label>
                <input
                  type="date"
                  name="lastDive"
                  value={formData.lastDive}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.lastDive ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastDive && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastDive}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Personal Info
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education *
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.education ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Highest level of education completed"
                />
                {errors.education && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.education}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Future Education *
                </label>
                <input
                  type="text"
                  name="futureEducation"
                  value={formData.futureEducation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.futureEducation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Any future education plans"
                />
                {errors.futureEducation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.futureEducation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation *
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.occupation ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Current occupation"
                />
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.occupation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Marine Biology Experience *
                </label>
                <textarea
                  name="marineBiologyExperience"
                  value={formData.marineBiologyExperience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Describe any previous marine biology or conservation experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How did you hear about us? *
                </label>
                <input
                  type="text"
                  name="heardFrom"
                  value={formData.heardFrom}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.heardFrom ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Social media, Google, Friend, etc."
                />
                {errors.heardFrom && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.heardFrom}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme Expectations *
                </label>
                <textarea
                  name="programmeExpectations"
                  value={formData.programmeExpectations}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.programmeExpectations
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="What do you hope to gain from this experience?"
                />
                {errors.programmeExpectations && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.programmeExpectations}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Health Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food / Allergies *
                </label>
                <input
                  type="text"
                  name="foodAllergies"
                  value={formData.foodAllergies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Any food allergies or dietary restrictions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Conditions (medication) *
                </label>
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Any medical conditions or medications"
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Documents</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload your CV *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className={`flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 ${
                      errors.cv ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  .pdf/.doc/.docx/.txt only, 1MB max file size
                </p>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-500">{errors.cv}</p>
                )}
                {formData.cv && (
                  <p className="mt-1 text-sm text-green-600">
                    ✓ {formData.cv.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="coverLetter"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className={`flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 ${
                      errors.coverLetter ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  .pdf/.doc/.docx/.txt only, 1MB max file size
                </p>
                {errors.coverLetter && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.coverLetter}
                  </p>
                )}
                {formData.coverLetter && (
                  <p className="mt-1 text-sm text-green-600">
                    ✓ {formData.coverLetter.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              />
              <div>
                <label className="text-sm font-medium text-gray-700">
                  I consent to the Terms & Conditions of this website *
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 rounded-xl text-white font-bold transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-600 to-green-600 hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/volunteer")}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ApplyPage;
