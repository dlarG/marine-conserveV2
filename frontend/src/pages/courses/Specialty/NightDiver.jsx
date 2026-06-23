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

const NightDiver = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Night Diver Course | GREEN Inc.";
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
      "The PADI Night Diver Specialty course introduces you to the thrill of diving after dark. As the sun sets, a completely different underwater world comes alive—nocturnal creatures emerge, daytime species retreat, and familiar dive sites transform into mysterious new environments. You'll learn specialized techniques for night diving including dive light handling, communication methods, navigation in darkness, and managing the unique challenges of limited visibility. Sogod Bay offers spectacular night diving opportunities with its rich biodiversity and calm, protected waters perfect for developing your night diving confidence.";

    return {
      skills: {
        leftTitle: "Night Diver Course Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 2 days and consists of:",
          mandatory: [
            "Dive light selection, handling, and backup systems",
            "Night-specific communication using light signals",
            "Navigation techniques in darkness and low visibility",
            "Nocturnal marine life identification and behavior",
          ],
          electiveIntro: "You'll complete",
          electives: [
            "3 open water night dives",
            "Entry and exit techniques for night conditions",
            "Primary and backup light management",
            "Light communication signals with buddy and group",
            "Compass navigation with limited visual references",
            "Nocturnal creature observation and identification",
            "Buoyancy control in reduced visibility",
            "Emergency procedures specific to night diving",
          ],
          knowledge:
            "Classroom sessions covering night diving theory and planning",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Dive light selection, maintenance, and backup systems",
          "Light-based communication and signaling techniques",
          "Night navigation using compass and instruments",
          "Entry and exit procedures in darkness",
          "Nocturnal marine life identification",
          "Managing disorientation and spatial awareness",
          "Buddy system protocols for night conditions",
          "Emergency procedures for low-visibility scenarios",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "You must be a certified Open Water Diver (or equivalent). Night diving is an exciting challenge that builds on your existing skills. You should be comfortable with basic navigation and buoyancy control during daytime dives before attempting night conditions. A sense of adventure and willingness to experience the underwater world from a completely new perspective is essential!",
        rightTitle: "Prerequisites",
        rightItems: [
          "PADI Open Water Diver certification (or equivalent)",
          "Minimum age: 12 years old",
          "Comfortable with basic navigation skills",
          "Good buoyancy control in daytime conditions",
          "Comfortable in open water environments",
          "Adventurous spirit and curiosity about marine life",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide comprehensive night diving training with all necessary specialized equipment. Our experienced instructors will guide you through progressively challenging night dives, starting at sunset and working into full darkness. You'll learn to appreciate the unique beauty and tranquility of the underwater world after dark.",
        rightTitle: "Included",
        rightItems: [
          "PADI Night Diver manual and training materials",
          "Primary dive light for training sessions",
          "Backup light system for redundancy",
          "Tank marker lights and strobe attachments",
          "3 open water night dives with instructor",
          "Classroom sessions on nocturnal marine life",
          "Light communication practice sessions",
          "PADI Specialty certification card processing",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Course fees include all training materials, specialty lighting equipment for the duration of the course, and certification processing. Group rates available for buddy teams who want to share the night diving experience together.",
        rightTitle: "Tuition Fees",
        rightItems: [
          "Course Package (own gear): ₱12,500.00",
          "Course Package (with rental gear): ₱14,500.00",
          "Private Course (1-on-1): ₱17,000.00",
          "Buddy Package (2 divers): ₱23,000.00 total",
        ],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Personal dive equipment and transportation are typically excluded. We recommend investing in your own quality dive light if you plan to continue night diving regularly—ask us for recommendations.",
        rightTitle: "Not Included",
        rightItems: [
          "Personal dive equipment (available for rent)",
          "Personal dive light (available for purchase)",
          "Transportation to/from dive sites",
          "Evening meals and personal expenses",
          "Dive insurance (recommended)",
          "Marine park fees (varies by dive site)",
          "Chemical light sticks (available for purchase)",
        ],
      },
      certificate: {
        leftTitle: "Certification",
        leftText:
          "After completing the knowledge development sessions, three open water night dives, and demonstrating proficiency in night diving techniques, you'll earn the PADI Night Diver Specialty certification. This certification counts toward the Master Scuba Diver rating and opens up a whole new world of diving opportunities—many of the ocean's most fascinating creatures are only active after dark.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
          alt: "PADI Night Diver certification preview",
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777348997/5152_uruygm.jpg)",
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
              Night Diver
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Experience the ocean in a whole new light—or darkness. Discover
              nocturnal marine life, master light communication, and explore
              familiar dive sites transformed by night.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#details"
                className="px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
              >
                View details
              </a>
              <a
                href="#experiences"
                className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
              >
                Night experiences
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
                        Core night diving techniques:
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
            Upcoming Night Diver specialty course schedules. All night dives
            begin at sunset.
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
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-indigo-50 to-purple-50 hover:shadow-md transition-shadow"
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    Night Course
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
                Night diving opens the door to more advanced specialties.
                Explore these courses to expand your underwater adventures.
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
                title: "Underwater Navigator",
                description:
                  "Master navigation skills essential for night diving. Learn to trust your compass when visual references disappear in the darkness.",
                href: "/courses/special/dive-navigation",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775547474/pexels-aydenzaki-8029908_gdieio.jpg",
                level: "Essential Companion",
              },
              {
                title: "Peak Performance Buoyancy",
                description:
                  "Perfect your buoyancy for night conditions where precise control prevents accidental reef contact and keeps you safe in low visibility.",
                href: "/courses/special/peak-performance-buoyancy",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549211/pexels-domingo-dias-260502921-12678039_uygdph.jpg",
                level: "Highly Recommended",
              },
              {
                title: "Marine Photography",
                description:
                  "Capture the magic of nocturnal marine life with specialized underwater photography techniques for low-light conditions.",
                href: "/courses/special/marine-photography",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384141/small2_wmdmjz.jpg",
                level: "Creative Combo",
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
        courseKey="night-diver"
        courseTitle="PADI Night Diver Specialty"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default NightDiver;
