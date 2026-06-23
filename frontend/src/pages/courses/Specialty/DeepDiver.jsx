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

const DeepDiver = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Deep Diver Course | GREEN Inc.";
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
      "The PADI Deep Diver Specialty course teaches you to manage the risks and challenges of diving deeper. You'll learn to plan and execute dives to depths between 18-40 meters (60-130 feet), understand nitrogen narcosis, manage gas supply, and properly handle deep-diving equipment. Under the guidance of your instructor, you'll complete four deep dives, progressively building your confidence and competence in deeper environments.";

    return {
      skills: {
        leftTitle: "Deep Diver Course Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 2-3 days and consists of:",
          mandatory: [
            "Deep dive planning and gas management",
            "Managing nitrogen narcosis and physiological effects",
            "Proper descent and ascent techniques for deep dives",
            "Use of redundant air sources and deep-diving equipment",
          ],
          electiveIntro: "You'll complete",
          electives: [
            "4 open water deep dives (18-40m / 60-130ft)",
            "Practice with dive computers and backup instruments",
            "Underwater navigation at depth",
            "Emergency decompression procedures",
            "Buoyancy control in deeper water",
            "Gas consumption monitoring and turn-pressure calculations",
            "Safety stop and deep stop procedures",
            "Buddy team coordination at depth",
          ],
          knowledge: "Knowledge development sessions (self-study or classroom)",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Deep dive planning and risk assessment",
          "Managing nitrogen narcosis awareness",
          "Gas supply planning and management",
          "Specialized deep-diving equipment use",
          "Emergency decompression procedures",
          "Proper descent/ascent rates and safety stops",
          "Dive computer operation for multi-level deep dives",
          "Buddy system protocols at greater depths",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "To enroll in the Deep Diver course, you must be a certified Adventure Diver or Advanced Open Water Diver (or equivalent). You should be comfortable in open water and have at least some deep diving experience from your advanced training. A medical clearance is recommended if you have any health concerns.",
        rightTitle: "Prerequisites",
        rightItems: [
          "PADI Adventure Diver certification (or qualifying certification from another organization)",
          "Minimum age: 15 years old",
          "Completed medical statement within the last 12 months",
          "Comfortable with open water diving conditions",
          "Minimum of 10 logged dives recommended",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "Our Deep Diver course includes comprehensive training with experienced instructors who specialize in deep diving techniques. All training materials and required specialty equipment for the course duration are provided.",
        rightTitle: "Included",
        rightItems: [
          "PADI Deep Diver eLearning or manual",
          "4 open water deep dives with instructor",
          "Deep-diving equipment (redundant air source, dive computer, etc.)",
          "Knowledge development sessions and briefings",
          "Dive planning workshops and gas calculations",
          "Logbook sign-off and performance feedback",
          "PADI Deep Diver certification card processing",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Investment varies based on whether you need equipment rental and the dive site locations. Contact us for a personalized quote. Group rates available for buddy teams of 2 or more divers.",
        rightTitle: "Tuition Fees",
        rightItems: [
          "Course Package: ₱18,500.00",
          "Private Course (1-on-1): ₱25,000.00",
          "Group Rate (2+ divers): ₱16,500.00 per person",
        ],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Personal items and transportation are typically excluded unless arranged in advance. Ask about our all-inclusive packages for visiting divers.",
        rightTitle: "Not Included",
        rightItems: [
          "Transportation to/from dive sites",
          "Meals and personal expenses",
          "Personal dive insurance (recommended)",
          "Mask, snorkel, and fins (available for rent)",
          "Accommodation (can be arranged upon request)",
          "Marine park fees (varies by dive site)",
        ],
      },
      certificate: {
        leftTitle: "Certification",
        leftText:
          "Upon successful completion of all knowledge development and open water dives, you'll earn the PADI Deep Diver Specialty certification. This allows you to dive to a maximum depth of 40 meters (130 feet) and counts toward the Master Scuba Diver rating. Your certification is recognized worldwide at PADI dive centers and resorts.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
          alt: "PADI Deep Diver certification preview",
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
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549211/pexels-domingo-dias-260502921-12678039_uygdph.jpg)",
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
              PADI Deep Diver
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Push your limits and explore deeper underwater environments with
              our PADI Deep Diver course. Learn to safely plan and execute dives
              to depths of up to 40 meters (130 feet).
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
                        Core skills covered:
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
      <section id="dates" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Upcoming Deep Diver specialty course schedules.
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
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-blue-50 to-indigo-50"
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
                Explore more specialty courses to enhance your diving expertise.
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
                  "Capture the beauty of the underwater world with our Marine Photography specialty. Learn techniques for composition, lighting, and equipment use to take stunning photos on your dives.",
                href: "/courses/special/marine-photography",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384141/small2_wmdmjz.jpg",
              },
              {
                title: "Dive Navigation",
                description:
                  "Master underwater navigation skills to confidently explore dive sites. Learn to use a compass, natural navigation techniques, and plan routes for safe and efficient dives.",
                href: "/courses/special/dive-navigation",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775547474/pexels-aydenzaki-8029908_gdieio.jpg",
              },
              {
                title: "Night Diver",
                description:
                  "Experience the underwater world in a whole new light. Our Night Diver specialty course teaches you how to navigate and explore the ocean after dark, using specialized techniques and equipment.",
                href: "/courses/special/night-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777348997/5152_uruygm.jpg",
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
        courseKey="deep-diver"
        courseTitle="PADI Deep Diver"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Advanced Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default DeepDiver;
