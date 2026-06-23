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

const DiveNavigation = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Underwater Navigator Course | GREEN Inc.";
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
      "The PADI Underwater Navigator Specialty course teaches you to navigate confidently underwater using both instruments and natural references. You'll master compass navigation, distance estimation, and search patterns that will transform your diving experience. No more relying on your guide or buddy—become a self-sufficient diver who can find the boat every time. Sogod Bay's varied underwater terrain provides the perfect training ground with its coral formations, sandy patches, and reef slopes ideal for practicing navigation techniques.";

    return {
      skills: {
        leftTitle: "Underwater Navigator Course Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 2 days and consists of:",
          mandatory: [
            "Compass navigation and reciprocal headings",
            "Natural navigation using landmarks and depth",
            "Distance estimation and kick-cycle counting",
            "Search patterns for locating objects underwater",
          ],
          electiveIntro: "You'll complete",
          electives: [
            "3 open water navigation dives",
            "Straight-line compass runs with precision returns",
            "Square and triangle pattern navigation",
            "Reciprocal heading exercises",
            "Natural navigation using reef features and bottom contours",
            "Distance estimation using kick cycles and time measurement",
            "Underwater mapping and site orientation sketches",
            "Search and recovery pattern techniques",
          ],
          knowledge: "Classroom navigation theory and dive planning sessions",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Compass operation and maintenance underwater",
          "Reciprocal heading calculation and execution",
          "Natural navigation using environmental references",
          "Distance estimation techniques (kick cycles, time, air consumption)",
          "Square, triangle, and circular search patterns",
          "Underwater mapping and site orientation",
          "Navigation without visual references (low visibility)",
          "Dive planning with navigation waypoints",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "You must be a certified Open Water Diver (or equivalent) who has completed at least one navigation dive during your training. This course is perfect for divers who want to build independence and confidence in their underwater orientation skills. You should be comfortable with basic dive planning and buddy procedures.",
        rightTitle: "Prerequisites",
        rightItems: [
          "PADI Open Water Diver certification (or equivalent)",
          "Minimum age: 10 years old",
          "Completed the Navigation Adventure Dive (recommended)",
          "Comfortable with basic dive planning",
          "Good buoyancy control for precise navigation exercises",
          "Familiarity with dive tables or computer",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide comprehensive navigation training with practical underwater exercises. You'll use professional-grade compasses and navigation slates during your dives. Our instructors will guide you through progressively challenging navigation scenarios to build real-world competence.",
        rightTitle: "Included",
        rightItems: [
          "PADI Underwater Navigator manual and slate",
          "Underwater compass for training sessions",
          "Navigation exercise slates and mapping materials",
          "3 open water navigation dives with instructor",
          "Classroom sessions with navigation theory",
          "Underwater mapping and site orientation exercises",
          "Search pattern training and practice",
          "PADI Specialty certification card processing",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Course fees include all training materials and certification processing. Equipment rental is available if needed. Group rates available for buddy teams of 2 or more divers wanting to improve their navigation together.",
        rightTitle: "Tuition Fees",
        rightItems: [
          "Course Package (own gear): ₱11,500.00",
          "Course Package (with rental gear): ₱13,500.00",
          "Private Course (1-on-1): ₱16,000.00",
          "Buddy Package (2 divers): ₱21,000.00 total",
        ],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Personal diving equipment and transportation are typically excluded. We recommend bringing your own compass if you plan to continue using navigation skills regularly after the course.",
        rightTitle: "Not Included",
        rightItems: [
          "Personal dive equipment (available for rent)",
          "Personal underwater compass (available for purchase)",
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
          "After completing the knowledge development sessions, three open water navigation dives, and demonstrating proficiency in compass and natural navigation techniques, you'll earn the PADI Underwater Navigator Specialty certification. This certification counts toward the Master Scuba Diver rating and will significantly enhance your diving independence and confidence on every future dive.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
          alt: "PADI Underwater Navigator certification preview",
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
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775547474/pexels-aydenzaki-8029908_gdieio.jpg)",
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
              Underwater Navigator
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Never get lost underwater again. Master compass navigation,
              natural orientation, and search patterns to become a confident,
              self-sufficient diver who always finds the way back.
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
                Navigation techniques
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

                {/* Structured course breakdown - only show for skills tab */}
                {active?.leftHighlight && (
                  <div className="mt-6 space-y-6">
                    <p className="text-sm md:text-base text-gray-700 font-medium">
                      {active.leftHighlight.title}
                    </p>

                    {/* Core techniques */}
                    <div>
                      <p className="text-sm md:text-sm text-teal-700 font-semibold mb-2">
                        Core navigation techniques:
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

                    {/* Course activities */}
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
      <section id="dates" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Upcoming Underwater Navigator specialty course schedules.
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
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-blue-50 to-cyan-50 hover:shadow-md transition-shadow"
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
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    Navigation Course
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
                Navigation skills complement every other diving activity.
                Explore these courses to further enhance your underwater
                expertise.
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
                title: "Deep Diver",
                description:
                  "Take your diving to new depths with our Deep Diver specialty. Learn techniques for diving beyond 18 meters, managing nitrogen narcosis, and safely exploring deeper wrecks and reefs.",
                href: "/courses/special/deep-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549211/pexels-domingo-dias-260502921-12678039_uygdph.jpg",
                level: "Related Specialty",
              },
              {
                title: "Night Diver",
                description:
                  "Test your navigation abilities in the ultimate challenge—complete darkness. Learn to navigate using only your compass and dive light.",
                href: "/courses/special/night-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777348997/5152_uruygm.jpg",
                level: "Perfect Next Step",
              },
              {
                title: "Peak Performance Buoyancy",
                description:
                  "Refine your buoyancy control skills for improved comfort and efficiency underwater.",
                href: "/courses/special/peak-performance-buoyancy",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771396227/pexels-leonardo-lamas-32247393-7001658_jez7o0.jpg",
                level: "Recommended Combo",
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
        courseKey="underwater-navigator"
        courseTitle="PADI Underwater Navigator Specialty"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default DiveNavigation;
