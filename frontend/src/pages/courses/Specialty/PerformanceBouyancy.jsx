import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../layouts/Navbar";
import Footer from "../../../layouts/Footer";
// import ApplyNowModalWithCert from "../diver_certification/ApplyNowModalWithCert";

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

const PerformanceBuoyancy = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Peak Performance Buoyancy Course | GREEN Inc.";
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
      "The PADI Peak Performance Buoyancy Specialty course is the single most valuable course any diver can take. Mastering precise buoyancy control transforms your entire diving experience—you'll use less air, move more efficiently, get closer to marine life without disturbing it, and feel completely at ease in the water. This course teaches you to find your perfect weight, achieve ideal trim, and hover effortlessly using breath control. Whether you're a new diver looking to build confidence or an experienced diver wanting to refine technique, better buoyancy means better dives. Sogod Bay's coral reefs provide the ideal classroom for perfecting your skills over diverse bottom compositions.";

    return {
      skills: {
        leftTitle: "Peak Performance Buoyancy Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 1-2 days and consists of:",
          mandatory: [
            "Precise weight assessment and distribution",
            "Horizontal trim mastery and body positioning",
            "Breath control for micro-adjustments in buoyancy",
            "Streamlining equipment for reduced drag",
          ],
          electiveIntro: "You'll complete",
          electives: [
            "2 open water buoyancy training dives",
            "Weight check and optimization session",
            "Buoyancy obstacle course (hoops, platforms, hover stations)",
            "Hovering at various depths using breath control",
            "Trim adjustments with different tank positions",
            "Backward finning and precision maneuvering",
            "Air consumption tracking and efficiency analysis",
            "Environmental awareness and reef-safe approaches",
          ],
          knowledge:
            "Classroom session on physics of buoyancy and equipment configuration",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Precise weight calculation and trim weight positioning",
          "Perfect horizontal trim for reduced drag and air consumption",
          "Breath control for buoyancy micro-adjustments",
          "Equipment streamlining and optimal configuration",
          "Hovering motionless at any depth",
          "Precision movement (forward, backward, turning, pirouettes)",
          "Visualization techniques for body position awareness",
          "Air consumption optimization through efficiency",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "You must be a certified Open Water Diver (or equivalent). This course is suitable for all experience levels—from newly certified divers wanting to build solid foundations, to experienced divers looking to take their skills to the next level. Comfort in the water and willingness to receive feedback on your technique will help you get the most from this course.",
        rightTitle: "Prerequisites",
        rightItems: [
          "PADI Open Water Diver certification (or equivalent)",
          "Minimum age: 10 years old",
          "Comfortable in open water conditions",
          "Willingness to adjust equipment configuration",
          "Open to feedback and technique refinement",
          "Desire to improve diving efficiency and air consumption",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide comprehensive buoyancy training with personalized attention to your equipment configuration and technique. Our instructors use video feedback and in-water demonstrations to help you visualize and achieve perfect buoyancy. You'll practice with buoyancy obstacle courses and precision exercises that make learning both effective and enjoyable.",
        rightTitle: "Included",
        rightItems: [
          "PADI Peak Performance Buoyancy manual",
          "Personalized weight assessment and optimization",
          "2 open water buoyancy training dives",
          "Buoyancy obstacle course practice sessions",
          "Equipment configuration consultation",
          "Air consumption analysis and tracking",
          "Video feedback sessions (weather permitting)",
          "PADI Specialty certification card processing",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Course fees include personalized buoyancy training and all learning materials. This course often pays for itself through improved air consumption—many divers report 15-25% longer dive times after completing the course. Group rates available for buddy teams who want to improve together.",
        rightTitle: "Tuition Fees",
        rightItems: [
          "Course Package (own gear): ₱10,500.00",
          "Course Package (with rental gear): ₱12,500.00",
          "Private Course (1-on-1): ₱15,000.00",
          "Buddy Package (2 divers): ₱19,500.00 total",
        ],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Personal dive equipment and transportation are typically excluded. We recommend using your own equipment during this course since you'll be fine-tuning your personal configuration for optimal performance.",
        rightTitle: "Not Included",
        rightItems: [
          "Personal dive equipment (available for rent)",
          "Trim weight pockets and accessories (available for purchase)",
          "Transportation to/from dive sites",
          "Meals and personal expenses",
          "Dive insurance (recommended)",
          "Marine park fees (varies by dive site)",
          "Dive computer (available for rent)",
        ],
      },
      certificate: {
        leftTitle: "Certification",
        leftText:
          "After completing the knowledge development, two open water buoyancy training dives, and demonstrating mastery of hovering, trim, and precision buoyancy techniques, you'll earn the PADI Peak Performance Buoyancy Specialty certification. This certification counts toward the prestigious Master Scuba Diver rating. More importantly, the skills you gain will translate to better air consumption, longer dives, and significantly more enjoyable underwater experiences for the rest of your diving life.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
          alt: "PADI Peak Performance Buoyancy certification preview",
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
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771396227/pexels-leonardo-lamas-32247393-7001658_jez7o0.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold">
              Specialty Course
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Peak Performance Buoyancy
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Float effortlessly, use less air, and move like an aquatic
              creature. Master the most valuable skill in diving—perfect
              buoyancy control.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#details"
                className="px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
              >
                View details
              </a>
              <a
                href="#techniques"
                className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
              >
                Buoyancy techniques
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

                <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600">
                  {active?.leftText}
                </p>

                {active?.leftHighlight && (
                  <div className="mt-6 space-y-6">
                    <p className="text-sm md:text-base text-gray-700 font-medium">
                      {active.leftHighlight.title}
                    </p>

                    <div>
                      <p className="text-sm md:text-sm text-teal-700 font-semibold mb-2">
                        Core buoyancy techniques:
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

                    <div>
                      <p className="text-sm md:text-sm text-teal-700 font-semibold mb-2">
                        {active.leftHighlight.electiveIntro}:
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
      <section id="dates" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Upcoming Peak Performance Buoyancy specialty course schedules.
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
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-teal-50 to-emerald-50 hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-gray-500">Date Range</div>
                <div className="mt-1 text-lg font-extrabold text-gray-900">
                  {d.from} – {d.to}
                </div>

                <div className="mt-3 text-sm text-gray-600">{d.time}</div>
                <div className="mt-2 text-sm text-gray-600">{d.slots}</div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1 text-xs text-teal-700 font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Buoyancy Course
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUE YOUR JOURNEY */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
                Continue Your Journey
              </h2>
              <p className="text-gray-600 text-base">
                Excellent buoyancy is the foundation for every advanced diving
                activity. Combine this course with these specialties for the
                ultimate skill set.
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
                title: "Marine Photography",
                description:
                  "Apply your perfect buoyancy control to capture stunning images. Hover motionless while framing the perfect shot without stirring sediment.",
                href: "/courses/special/marine-photography",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384141/small2_wmdmjz.jpg",
                level: "Perfect Application",
              },
              {
                title: "Deep Diver",
                description:
                  "Excellent buoyancy is critical at depth where pressure changes amplify buoyancy shifts. Control your position precisely during deep dives.",
                href: "/courses/special/deep-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549361/pexels-cannontaler-20481590_yck89a.jpg",
                level: "Essential For",
              },
              {
                title: "Underwater Navigator",
                description:
                  "Combine precise buoyancy with navigation skills. Maintain depth and position accuracy while executing complex navigation patterns.",
                href: "/courses/special/dive-navigation",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775547474/pexels-aydenzaki-8029908_gdieio.jpg",
                level: "Skill Combo",
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
        courseKey="peak-performance-buoyancy"
        courseTitle="PADI Peak Performance Buoyancy Specialty"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default PerformanceBuoyancy;
