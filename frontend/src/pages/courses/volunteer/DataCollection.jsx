import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, Users, Star, ArrowLeft } from "lucide-react";
import VolunteerApplyModal from "./VolunteerApplyModal";

const DataCollection = () => {
  const navigate = useNavigate();

  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Scientific Data Collection | GREEN Inc. Volunteer";
  }, []);

  const programData = {
    title: "Scientific Data Collection",
    tagline:
      "Master ecological data gathering, learn to identify key fish species and substrate types, contributing to long-term datasets.",
    heroImage:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777342895/DSCF5597_lmehg1.jpg",
    fullDescription: [
      "Sound conservation decisions require sound data. Our Scientific Data Collection program trains you in the methods and techniques used by marine biologists to assess reef health and track ecosystem changes over time.",
      "You'll learn to identify key indicator species, conduct photo quadrats, and record substrate composition—skills that form the backbone of professional reef monitoring programs worldwide.",
      "The data you collect becomes part of long-term datasets that help us understand how Sogod Bay's reefs are responding to both threats and conservation interventions. This is citizen science at its most impactful.",
    ],
    activities: [
      "Conduct fish population surveys and species identification",
      "Learn photo quadrat and video transect methods",
      "Record substrate composition and coral cover data",
      "Monitor water quality parameters",
      "Enter and manage ecological data in databases",
      "Assist in data analysis and report preparation",
      "Participate in long-term monitoring transects",
      "Learn scientific diving protocols and techniques",
    ],
    duration: "Flexible (1–24+ weeks)",
    bestFor: "Science-minded divers and researchers",
    level: "Intermediate to Advanced",
    pricing: {
      amount: "₱25,000",
      note: "Long-term discounts available",
    },
    inclusions: [
      "Comprehensive training in reef monitoring methods",
      "Introduction to coral reef data collection techniques",
      "Regular survey and monitoring dives",
      "30-40 training and survey dives per month (weather permitting)",
      "Complete scuba gear rental (BCD and Regulator)",
      "Free use of snorkeling gear when off-duty",
      "Tuition and lectures on marine science",
      "All marine park fees",
      "Support and supervision from experienced instructors",
      "Shared accommodation",
      "All meals, water, tea, and coffee",
      "GREEN, Inc. T-shirt",
    ],
    outcomes: [
      "Practical skills in scientific data collection",
      "Understanding of reef monitoring methodology",
      "Experience with photo quadrats and fish surveys",
      "Knowledge of data management and analysis",
      "Certificate of participation/completion (based on duration)",
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={programData.heroImage}
            alt={programData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-900/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button
            onClick={() => navigate("/volunteer")}
            className="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>See All Programs</span>
          </button>
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              {programData.title}
            </h1>
            <p className="text-base text-gray-200 max-w-2xl">
              {programData.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-12 bg-gradient-to-b from-white to-teal-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Program
              </h2>
              <div className="space-y-3 text-gray-600">
                {programData.fullDescription.map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  What You'll Do
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {programData.activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 p-3 rounded-xl bg-white border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
                    >
                      <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
                <h4 className="text-base font-bold text-gray-800 mb-3">
                  Program Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-sm text-gray-800">
                        {programData.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Best For</p>
                      <p className="font-semibold text-sm text-gray-800">
                        {programData.bestFor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="font-semibold text-sm text-gray-800">
                        {programData.level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-green-600 p-5 text-white shadow-lg">
                <h4 className="text-base font-bold mb-2">Program Fee</h4>
                <p className="text-2xl font-bold mb-3">
                  {programData.pricing.amount}
                </p>
                <p className="text-teal-100 text-xs mb-4">
                  {programData.pricing.note}
                </p>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="cursor-pointer w-full py-2.5 rounded-xl bg-white text-teal-700 font-bold text-sm hover:shadow-xl transition-all"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions & Outcomes */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-teal-600" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {programData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-teal-600" />
                Outcomes & Certification
              </h3>
              <ul className="space-y-2">
                {programData.outcomes.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Extensions & Discounts */}
      <section className="py-12 bg-teal-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Project Extensions & Special Discounts
          </h2>
          <p className="text-sm text-gray-600 text-center max-w-3xl mx-auto mb-8">
            We find that most of our volunteers find it hard to leave! While the
            average stay is 4 weeks, we offer flexible extensions and
            progressive rewards.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {[
              { weeks: "Weeks 1 – 6", price: "₱25,000.00", period: "/ week" },
              {
                weeks: "Weeks 7 – 12",
                price: "₱20,000.00",
                period: "/ week",
                discount: "20% discount",
                popular: true,
              },
              {
                weeks: "Weeks 13 – 24",
                price: "₱15,000.00",
                period: "/ week",
                discount: "40% discount",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 text-center border-2 ${
                  tier.popular
                    ? "border-teal-500 bg-white shadow-lg relative"
                    : "border-gray-200 bg-white"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-teal-600 text-white text-[10px] rounded-full font-semibold">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {tier.weeks}
                </p>
                <p className="text-2xl font-bold text-gray-800 mb-1">
                  {tier.price}
                </p>
                <p className="text-gray-500 text-xs">{tier.period}</p>
                {tier.discount && (
                  <p className="mt-2 text-teal-600 font-semibold text-xs">
                    {tier.discount}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-600 text-lg">🎉</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  The "Half-Year" Bonus
                </p>
                <p className="text-gray-600 text-xs">
                  Stay for 24 weeks, and your final four weeks are completely
                  free.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-xl bg-teal-50 border border-teal-200">
              <span className="text-teal-600 text-lg">⭐</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  Returning Heroes
                </p>
                <p className="text-gray-600 text-xs">
                  All former volunteers receive an automatic 20% discount on
                  their return stay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Unique */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              What Makes This Unique
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Real conservation, not just experience tourism",
                "Focus on maintenance and monitoring, not one-day activities",
                "Opportunity to work in Sogod Bay's diverse reef systems",
                "Learn from active, evolving restoration methods",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 p-3 rounded-xl bg-teal-50 border border-teal-100"
                >
                  <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 text-xs">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="font-bold text-sm text-gray-800 mb-2">
                General Notes
              </h4>
              <ul className="space-y-1.5">
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="text-teal-600">•</span> Programs are designed
                  to be hands-on and field-based
                </li>
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="text-teal-600">•</span> Majority of
                  activities involve actual diving and site work
                </li>
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="text-teal-600">•</span> Flexibility depending
                  on weather and sea conditions
                </li>
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="text-teal-600">•</span> Volunteers contribute
                  directly to ongoing conservation efforts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Accommodation */}
      <section className="py-12 bg-teal-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                Scuba Training & Certifications
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional instruction is included, but please note that PADI
                materials, manuals, and certification fees are paid separately.
                Further training is entirely optional unless you arrive as a
                non-diver.
              </p>
              <a
                href="https://divesupply.com.ph/assets/Documents/2025%20PADI%20price%20list%20ODS-AUG.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-teal-600 font-semibold text-sm hover:text-teal-700"
              >
                View PADI Price List{" "}
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </a>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                Accommodation Upgrades
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you prefer more privacy, we can arrange for private occupancy
                in nearby guest houses or small bungalows. These are subject to
                availability and provided at cost. Contact us directly and we
                will do our best to accommodate your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
      <VolunteerApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        programTitle="Scientific Data Collection"
      />
    </div>
  );
};

export default DataCollection;
