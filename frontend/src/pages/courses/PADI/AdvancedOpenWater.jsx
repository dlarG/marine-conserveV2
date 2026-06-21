import { useEffect, useMemo, useState } from "react";
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

const AdvancedOpenWater = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Advanced Open Water Diver Course | GREEN Inc.";
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
      "The PADI Advanced Open Water Diver course helps you build confidence and expand your dive skills through a series of Adventure Dives. You'll improve your navigation, get deeper-dive experience, and spend more time diving under instructor guidance. We will of course help you decide what the best dives for you are based on what you are interested in.";

    return {
      skills: {
        leftTitle: "Advanced Open Water Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 2-3 days and consists of:",
          mandatory: [
            "Deep dive – taking you to a depth of 30mts/100ft",
            "Navigation dive – learn how to find that boat!",
          ],
          electiveIntro: "3 elective specialty dives",
          electives: [
            "AWARE fish identification dive",
            "Boat dive",
            "Digital underwater photography",
            "Drift dive",
            "Enriched air dive",
            "Multilevel and computer dive",
            "Night dive",
            "Peak performance buoyancy dive",
            "Search and recovery dive",
            "Underwater naturalist dive",
            "Wreck dive",
          ],
          knowledge: "5 knowledge development sessions",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Advanced buoyancy and trim refinement",
          "Underwater navigation (compass + natural navigation)",
          "Deep diving procedures and safety planning",
          "Dive planning with depth/time awareness",
          "Situational awareness and buddy teamwork",
          "Exposure to specialty-style adventure dives (varies by schedule)",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "To enroll, you should already be a certified Open Water Diver (or equivalent). If you have any medical concerns, we recommend a clearance prior to participation.",
        rightTitle: "Prerequisites",
        rightItems: [
          "Open Water Diver certification (or equivalent)",
          "Minimum age requirement (10 years old and above)",
          "Completed medical certificate / clearance if required",
          "Comfortable diving in open water conditions",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide instructor guidance and training structure. Package inclusions can vary depending on logistics and dive site requirements.",
        rightTitle: "Included",
        rightItems: [
          "Certified instructor-led training",
          "Knowledge development & briefings",
          "Adventure dive sessions (number depends on your program)",
          "Assessment and skill coaching",
          "Logbook guidance and performance feedback",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Pricing still depends on group size, schedule, and gear/rental needs. Contact us for a personalized quote based on your preferences and requirements.",
        rightTitle: "Tuition Fees",
        rightItems: ["Course Package: ₱15,950.00"],
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
          "After successful completion, you'll receive your Advanced Open Water Diver certification or certificate of participation from us.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
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
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549270/pexels-diego-sandoval-3158170-4767068_ccrfv9.jpg)",
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
              PADI Advanced Open Water Diver
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Are you already open water certified? Would you like to gain more
              knowledge and experience in diving? Have you wondered what it is
              like down deep or how different things look at night; amazed at
              how your dive leader always manages to find the boat and knows so
              many different fish species? The answer to all these questions and
              more is in the PADI Advanced Open Water Course.
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
              className="cursor-pointer text-base w-full md:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-lg transition-all whitespace-nowrap"
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

                {/* Structured dive breakdown - only show for skills tab */}
                {active?.leftHighlight && (
                  <div className="mt-6 space-y-6">
                    <p className="text-sm md:text-base text-gray-700 font-medium">
                      {active.leftHighlight.title}
                    </p>

                    {/* Mandatory dives */}
                    <div>
                      <p className="text-sm md:text-sm text-teal-700 font-semibold mb-2">
                        2 mandatory dives:
                      </p>
                      <ul className="space-y-2">
                        {active.leftHighlight.mandatory.map((item, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                            <span className="text-sm md:text-sm text-gray-600">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Elective dives */}
                    <div>
                      <p className="text-sm md:text-sm text-teal-700 font-semibold mb-2">
                        {active.leftHighlight.electiveIntro} (choose from):
                      </p>
                      <ul className="space-y-2">
                        {active.leftHighlight.electives.map((item, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                            <span className="text-sm md:text-sm text-gray-600">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Knowledge sessions */}
                    <div className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                      <span className="text-sm md:text-sm text-gray-600">
                        {active.leftHighlight.knowledge}
                      </span>
                    </div>
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
            Upcoming Advanced Open Water schedules.
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
                title: "Rescue Diver",
                description:
                  "Learn to prevent and manage problems in the water and become a stronger buddy.",
                href: "/courses/rescue-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549361/pexels-cannontaler-20481590_yck89a.jpg",
                level: "Next Course",
              },
              {
                title: "Divemaster",
                description:
                  "Take the plunge into leadership and dive theory. Become a dive professional.",
                href: "/courses/divemaster",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771396227/pexels-leonardo-lamas-32247393-7001658_jez7o0.jpg",
                level: "Advanced",
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
        courseKey="advanced-open-water"
        courseTitle="PADI Advanced Open Water Diver"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default AdvancedOpenWater;
