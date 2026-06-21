import { useMemo, useState, useEffect } from "react";
import Navbar from "../../../layouts/Navbar";
import Footer from "../../../layouts/Footer";
// import ApplyNowModal from "./ApplyNowModal";
// import ApplyNowModalWithCert from "./ApplyNowModalWithCert";

const TabLink = ({ active, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer relative px-1 pb-4 text-sm font-medium transition-colors ${
        active ? "text-teal-700" : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-[1px] h-[3px] rounded-full transition-all duration-300 ${
          active ? "w-full bg-teal-600" : "w-0 bg-transparent"
        }`}
      />
    </button>
  );
};

const BulletList = ({ items }) => {
  return (
    <ul className="space-y-3 text-gray-700">
      {items.map((it, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
};

const RescueDiver = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Rescue Diver Course | GREEN Inc.";
  }, []);

  // const dateRanges = useMemo(
  //   () => [
  //     {
  //       from: "January 1st",
  //       to: "February 1st",
  //       time: "Opens Daily",
  //       slots: "8 slots",
  //     },
  //     {
  //       from: "February 1st",
  //       to: "March 1st",
  //       time: "Opens Daily",
  //       slots: "8 slots",
  //     },
  //     {
  //       from: "March 10th",
  //       to: "April 10th",
  //       time: "Opens Daily",
  //       slots: "6 slots",
  //     },
  //     {
  //       from: "April 20th",
  //       to: "May 20th",
  //       time: "Opens Daily",
  //       slots: "10 slots",
  //     },
  //     {
  //       from: "June 20th",
  //       to: "July 20th",
  //       time: "Opens Daily",
  //       slots: "10 slots",
  //     },
  //     {
  //       from: "August 20th",
  //       to: "September 20th",
  //       time: "Opens Daily",
  //       slots: "10 slots",
  //     },
  //     {
  //       from: "October 1st",
  //       to: "November 1st",
  //       time: "Opens Daily",
  //       slots: "8 slots",
  //     },
  //     {
  //       from: "November 10th",
  //       to: "December 10th",
  //       time: "Opens Daily",
  //       slots: "6 slots",
  //     },
  //   ],
  //   []
  // );

  // const dateOptions = useMemo(
  //   () =>
  //     dateRanges.map((d) => ({
  //       value: `${d.from} - ${d.to}`,
  //       label: `${d.from} - ${d.to} (${d.time})`,
  //     })),
  //   [dateRanges]
  // );

  const tabs = useMemo(
    () => [
      { key: "skills", label: "Description" },
      { key: "prereq", label: "Prerequisites" },
      { key: "inclusion", label: "What's Included" },
      { key: "not_included", label: "What's Not Included" },
      { key: "fees", label: "Tuition Fees" },
      { key: "certificate", label: "Certificate" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState("skills");

  const tabModel = useMemo(() => {
    const baseDescription =
      "The Rescue Diver course develops your ability to prevent problems, manage stress, and respond to dive emergencies. You'll practice realistic scenarios and improve your confidence as a buddy and a leader underwater.";

    return {
      skills: {
        leftTitle: "Rescue Diver Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 4-5 days and consists of:",
          sections: [
            {
              label: "5 engaging classroom sessions",
              description:
                "Will expand your rescue knowledge through reviews and a final exam",
              isBullet: true,
            },
            {
              label: "10 exciting skill exercises",
              description: "Will help you master in-water rescue skills",
              isBullet: true,
            },
            {
              label: "2 final in-water emergency scenarios",
              description: "Will then test your newfound knowledge",
              isBullet: true,
            },
          ],
          note: "You should always be prepared during this course as you never know when a diver will need your help.",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Risk awareness and accident prevention",
          "Self-rescue skills and stress management",
          "Assisting tired or panicked divers",
          "Search patterns and missing diver procedures",
          "Bringing an unresponsive diver to the surface",
          "In-water rescue breathing and exits",
          "Emergency action planning and coordination",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "Rescue training is challenging and rewarding. Make sure you meet the prerequisites and are comfortable in open water conditions.",
        rightTitle: "Prerequisites",
        rightItems: [
          "This course is available to anyone who has an advanced diving certificate.",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We guide you through scenario-based training with structured assessments and coaching.",
        rightTitle: "Included",
        rightItems: [
          "Instructor-led rescue scenario training",
          "Briefings and debriefings",
          "In-water practice sessions",
          "Performance feedback and coaching",
          "Course completion guidance (processing may vary)",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText: "Pricing depends on group size, schedule, and any add-ons.",
        rightTitle: "Tuition Fees",
        rightItems: ["Course Package: ₱19,950.00"],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Common items that may not be included unless specified in your package.",
        rightTitle: "Not Included",
        rightItems: [
          "Transportation to/from the dive site",
          "Meals and personal expenses",
          "Personal swimwear, towels, and sun protection",
          "Medical clearance fees (if applicable)",
        ],
      },
      certificate: {
        leftTitle: "Certification Preview",
        leftText:
          "Upon completion you will receive a PADI Project AWARE Rescue Diver Certificate that is a lifelong diving cert accepted worldwide and also takes you one step closer to beginning your PADI Divemaster Course, the first professional rating in PADI.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80",
          alt: "Certificate preview (placeholder image)",
        },
      },
    };
  }, []);

  const active = tabModel[activeTab];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-white" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549361/pexels-cannontaler-20481590_yck89a.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold">
              Diver Certification Path
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
              PADI Rescue Diver
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Could you recognize and help a diver in distress? Could you calm a
              panicked diver down? What would you do if you came across an
              unconscious diver? Do you have the confidence to take charge? This
              fun filled and challenging course will teach you how to help
              yourself and others who may be in need.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#details"
                className="px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
              >
                View details
              </a>
              <a
                href="#dates"
                className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
              >
                Course dates
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* DETAILS WITH TABS */}
      <section
        id="details"
        className="bg-gradient-to-b from-white to-teal-50/60"
      >
        <div className="max-w-7xl mx-auto px-2 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-4 md:gap-8 border-b border-gray-200 min-w-max">
                {tabs.map((t) => (
                  <TabLink
                    key={t.key}
                    active={activeTab === t.key}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label}
                  </TabLink>
                ))}
              </div>
            </div>

            <button
              type="button"
              // onClick={() => setIsApplyOpen(true)}
              className="cursor-pointer text-base w-full md:w-auto px-3 py-2 rounded-xl bg-teal-600 text-white hover:shadow-lg transition-all whitespace-nowrap"
            >
              APPLY NOW
            </button>
          </div>

          {activeTab === "certificate" && active?.rightImage?.src ? (
            <div className="mt-10">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-3xl font-light text-gray-700">
                    {active?.leftTitle || "Certificate Preview"}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl">
                    {active?.leftText}
                  </p>
                </div>
              </div>

              <img
                src={active.rightImage.src}
                alt={active.rightImage.alt || "Certificate image"}
                className="mt-4 w-[71vh] h-auto max-h-[71vh] object-contain bg-white select-none border border-gray-200 rounded-lg shadow-sm mx-auto"
                loading="lazy"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ) : (
            <div className="mt-10 grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
              <div className="text-gray-700 leading-relaxed">
                <h3 className="text-xl md:text-2xl font-light text-gray-700">
                  {active?.leftTitle}
                </h3>

                {/* Course overview text */}
                <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600">
                  {active?.leftText}
                </p>

                {/* Structured course breakdown - shows for any tab that has leftHighlight */}
                {active?.leftHighlight && (
                  <div className="mt-6 space-y-5">
                    <p className="text-sm md:text-base text-gray-700 font-medium">
                      {active.leftHighlight.title}
                    </p>

                    {/* Sections with bullet points */}
                    <ul className="space-y-3">
                      {active.leftHighlight.sections.map((section, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                          <div>
                            <span className="text-sm md:text-sm text-gray-800 font-semibold">
                              {section.label}
                            </span>
                            <span className="text-sm md:text-sm text-gray-600">
                              {" "}
                              — {section.description}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Important note */}
                    {active.leftHighlight.note && (
                      <div className="bg-teal-50 border-l-4 border-teal-600 rounded-r-lg p-4">
                        <p className="text-sm md:text-sm text-teal-800 font-medium">
                          {active.leftHighlight.note}
                        </p>
                      </div>
                    )}

                    {/* Prerequisite info */}
                    {active.leftHighlight.prerequisite && (
                      <div className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                        <p className="text-sm md:text-sm text-gray-600">
                          {active.leftHighlight.prerequisite}
                        </p>
                      </div>
                    )}

                    {/* Certification info */}
                    {active.leftHighlight.certification && (
                      <div className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                        <p className="text-sm md:text-sm text-gray-600">
                          {active.leftHighlight.certification}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href="#dates"
                  className="inline-flex mt-8 md:mt-10 px-6 py-3 rounded-xl border-2 border-teal-600 text-teal-700 font-bold hover:bg-teal-600 hover:text-white transition-colors text-sm md:text-sm"
                >
                  VIEW COURSE DATES
                </a>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-light text-gray-700">
                  {active?.rightTitle}
                </h3>
                <div className="mt-4 md:mt-6">
                  <BulletList items={active?.rightItems || []} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DATES */}
      <section id="dates" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Available course dates for the PADI Rescue Diver certification. Each
            date range represents a separate course session with limited slots,
            so be sure to book early!
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                from: "January 1st",
                to: "February 1st",
                time: "Opens Daily",
                slots: "8 slots",
              },
              {
                from: "February 1st",
                to: "March 1st",
                time: "Opens Daily",
                slots: "8 slots",
              },
              {
                from: "March 10th",
                to: "April 10th",
                time: "Opens Daily",
                slots: "6 slots",
              },
              {
                from: "April 20th",
                to: "May 20th",
                time: "Opens Daily",
                slots: "10 slots",
              },
              {
                from: "June 20th",
                to: "July 20th",
                time: "Opens Daily",
                slots: "10 slots",
              },
              {
                from: "August 20th",
                to: "September 20th",
                time: "Opens Daily",
                slots: "10 slots",
              },
              {
                from: "October 1st",
                to: "November 1st",
                time: "Opens Daily",
                slots: "8 slots",
              },
              {
                from: "November 10th",
                to: "December 10th",
                time: "Opens Daily",
                slots: "6 slots",
              },
            ].map((d, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-green-50 to-green-50"
              >
                <div className="text-sm text-gray-500">Date Range</div>
                <div className="mt-1 text-lg font-extrabold text-gray-900">
                  {d.from} – {d.to}
                </div>

                <div className="mt-3 text-sm text-gray-600">{d.time}</div>
                <div className="mt-2 text-sm text-gray-600">{d.slots}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
                Continue Your Journey
              </h2>
              <p className="text-gray-600 text-base">
                Ready for more? Take the next step with our certification
                courses.
              </p>
            </div>
            <a
              href="/courses"
              className="text-base text-teal-700 font-semibold hover:text-teal-800 inline-flex items-center gap-2 group"
            >
              View All Courses
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Open Water Diver",
                description:
                  "Your first step into the underwater world. Learn the basics and get certified to dive anywhere in the world.",
                href: "/courses/open-water",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549211/pexels-domingo-dias-260502921-12678039_uygdph.jpg",
                level: "Previous Course",
              },
              {
                title: "Advanced Open Water",
                description:
                  "Build confidence, refine skills, and try different adventure dives.",
                href: "/courses/advanced-open-water",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549270/pexels-diego-sandoval-3158170-4767068_ccrfv9.jpg",
                level: "Previous Course",
              },
              {
                title: "Divemaster",
                description:
                  "Take the plunge into leadership and dive theory. Become a dive professional.",
                href: "/courses/divemaster",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771396227/pexels-leonardo-lamas-32247393-7001658_jez7o0.jpg",
                level: "Next Course",
              },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="group relative h-[400px] rounded-3xl overflow-hidden"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                    {c.level}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {c.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">{c.description}</p>
                  <span className="inline-flex items-center text-white font-semibold group-hover:gap-3 transition-all text-sm">
                    Learn More
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* <ApplyNowModalWithCert
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        courseKey="rescue"
        courseTitle="PADI Rescue Diver"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Advanced Open Water Certificate *"
      /> */}
    </div>
  );
};

export default RescueDiver;
