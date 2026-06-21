import { useMemo, useState, useEffect } from "react";
import Navbar from "../../../layouts/Navbar";
import Footer from "../../../layouts/Footer";
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

// const CourseTile = ({ title, description, href }) => {
//   return (
//     <a
//       href={href}
//       className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6"
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h4 className="text-lg font-extrabold text-gray-900 group-hover:text-teal-700 transition-colors">
//             {title}
//           </h4>
//           <p className="mt-2 text-sm text-gray-600">{description}</p>
//         </div>
//         <span className="text-teal-700 font-semibold">→</span>
//       </div>
//     </a>
//   );
// };

const Divemaster = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Divemaster Course | GREEN Inc.";
  }, []);

  // const [isApplyOpen, setIsApplyOpen] = useState(false);

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

  // NEW: content model for the two-column layout
  const tabModel = useMemo(() => {
    const baseDescription =
      "The PADI Divemaster course is the first professional level in the PADI system, designed for those who want to take their passion for diving to the next level. As a Divemaster, you'll gain advanced knowledge and skills that allow you to lead certified divers, assist instructors, and even start your own diving business. This course typically takes 4-6 weeks to complete and includes both theoretical learning and practical experience in various diving environments.";

    return {
      skills: {
        leftTitle: "PADI Divemaster Skills Overview",
        leftText: baseDescription,
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Equipment Setup: Learning to assemble and check your scuba unit.",
          "Underwater Navigation: Basic use of a compass and natural landmarks.",
          "Safety Procedures: Practice for emergency scenarios, like using an alternate air source or performing a controlled emergency swimming ascent (CESA).",
          "Buoyancy Control: Understanding and managing your buoyancy underwater.",
          "Equalization Techniques: Learning how to equalize pressure in your ears during descent.",
          "Mask Skills: Practicing clearing and recovering your mask underwater.",
          "Communication: Using hand signals and other methods to communicate underwater.",
          "Entry and Exit Techniques: Safe ways to enter and exit the water.",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "Before joining, make sure you're comfortable in the water and meet the minimum requirements. If you have any medical concerns, we recommend a clearance prior to participation.",
        rightTitle: "Prerequisites",
        rightItems: [
          "Discover Scuba Diving experience or equivalent comfort in the water",
          "Discover Scuba Diving Certificate (if applicable)",
          "Minimum age requirement (10 years old, or 8 with parental consent)",
          "Completed medical questionnaire / clearance if required",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide the instruction and equipment needed for your session so you can focus on learning and enjoying the experience.",
        rightTitle: "Included",
        rightItems: [
          "Professional instruction by a certified PADI instructor",
          "PADI divemaster crew pack and digital instructor manual",
          "FREE PADI AWARE Dive Against Debris",
          "Unlimited diving (terms & conditions apply)",
          "FREE Wi-Fi",
          "FREE GREEN, Inc. t-shirt and log book",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Pricing still depends on group size, schedule, and any add-ons.",
        rightTitle: "Tuition Fees",
        rightItems: ["Full Price: ₱65,000.00"],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "To avoid surprises, these common items are usually not covered unless you specify otherwise.",
        rightTitle: "Not Included",
        rightItems: [
          "Transportation to/from the dive site",
          "Meals and personal expenses",
          "Personal swimwear, towels, and sun protection",
          "Medical clearance fees (if applicable)",
        ],
      },
      certificate: {
        leftTitle: "Certificate of Participation Preview",
        leftText:
          "Uplon completing this course you will receive a certificate of participation that recognizes your achievement and experience. While this certificate is not a scuba diving certification for independent diving, it serves as a great memento of your experience and can be shared with friends and family. And a certificate of recognition for your accomplishment in completing the PADI Divemaster course from PADI, which is a significant milestone in your diving journey. This certificate can be a great keepsake to commemorate your experience and dedication to diving, and it can also be shared with friends and family to celebrate your achievement.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775616064/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_5_kqw3pj.png",
          alt: "Certificate preview",
        },
        rightItems: [
          "Official certificate of participation",
          "Includes your name and date of the experience",
          "Not a scuba diving certification (not valid for independent diving)",
          "Great for sharing with friends and family or as a memento",
        ],
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
              Diver Certification Path
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
              PADI Divemaster
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              The PADI Divemaster is the first professional-level rating in the
              PADI system, serving as the essential prerequisite for becoming a
              PADI Instructor. It transforms qualified recreational divers into
              dive leaders capable of supervising dive activities, assisting
              instructors with student training, and guiding certified divers.
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
          {/* Top tabs bar + Apply button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Scrollable tabs on mobile */}
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
          {/* CHANGED: Certificate tab becomes full-width image preview */}
          {activeTab === "certificate" && active?.rightImage?.src ? (
            <div className="mt-10">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-3xl font-light text-gray-700">
                    {active?.leftTitle || "Certificate of Participation"}
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
            <>
              <div className="mt-10 grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
                <div className="text-gray-700 leading-relaxed">
                  <h3 className="text-xl md:text-2xl font-light text-gray-700">
                    {active?.leftTitle}
                  </h3>
                  <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600">
                    {active?.leftText}
                  </p>

                  <a
                    href="#dates"
                    className="inline-flex mt-8 md:mt-10 px-6 py-3 rounded-xl border-2 border-teal-600 text-teal-700 font-bold hover:bg-teal-600 hover:text-white transition-colors text-sm md:text-sm"
                  >
                    VIEW COURSE DATES
                  </a>
                </div>

                {/* Right bullets */}
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-gray-700">
                    {active?.rightTitle}
                  </h3>

                  <div className="mt-4 md:mt-6">
                    <BulletList items={active?.rightItems || []} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section id="dates" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Available course dates for the PADI Divemaster certification. Each
            session includes both classroom and in-water training, with flexible
            scheduling to accommodate your needs.
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
                from: "March 10th",
                to: "April 10th",
                time: "Opens Daily ",
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

      {/* ADDITIONAL COURSES */}
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
                title: "Rescue Diver",
                description:
                  "Learn to prevent and manage problems in the water and become a stronger buddy.",
                href: "/courses/rescue-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549361/pexels-cannontaler-20481590_yck89a.jpg",
                level: "Previous Course",
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
        courseKey="divemaster"
        courseTitle="PADI Divemaster"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Rescue Diver Certificate *"
      /> */}
    </div>
  );
};

export default Divemaster;
