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

const MarinePhotography = () => {
  // const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PADI Marine Photography Course | GREEN Inc.";
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

  // Sample photography images
  const samplePhotos = useMemo(
    () => [
      {
        src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384074/close1_nwadrw.jpg",
        alt: "Macro coral detail shot showcasing texture and color",
        title: "Macro Marine Life",
        description:
          "Close-up photography of coral polyps and small reef creatures",
      },
      {
        src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775627247/Punta_MPA_San_Francisco_Southern_Leyte_csk4rx.jpg",
        alt: "Wide-angle reef scene with diver and coral formations",
        title: "Reef Scenics",
        description:
          "Wide-angle composition capturing the majesty of coral ecosystems",
      },
      {
        src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384143/small3_j2rhed.jpg",
        alt: "Underwater marine life behavior photography",
        title: "Wildlife Behavior",
        description: "Capturing natural behaviors of fish and marine creatures",
      },
    ],
    []
  );

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
      "The PADI Digital Underwater Photographer Specialty course teaches you to capture stunning underwater images with your camera system. You'll learn composition techniques, lighting principles, and post-processing workflows specific to the underwater environment. Whether you're using a compact camera, mirrorless system, or DSLR setup, our instructors will help you master the skills needed to document marine life and seascapes like a professional. Sogod Bay's rich biodiversity provides the perfect classroom for developing your underwater photography portfolio.";

    return {
      skills: {
        leftTitle: "Marine Photography Course Overview",
        leftText: baseDescription,
        leftHighlight: {
          title: "This course is 2 days and consists of:",
          mandatory: [
            "Camera setup and underwater housing preparation",
            "Composition techniques for underwater environments",
            "Available light vs. artificial lighting (strobes/video lights)",
            "Post-processing and image editing workflow",
          ],
          electiveIntro: "You'll complete",
          electives: [
            "2 open water photography dives",
            "Macro photography techniques for small subjects",
            "Wide-angle reef and large subject photography",
            "Lighting angles and strobe positioning",
            "White balance and color correction underwater",
            "Focusing techniques in low visibility",
            "Marine life behavior and subject approach",
            "Portfolio review and image critique session",
          ],
          knowledge: "Classroom sessions and photo editing workshops",
        },
        rightTitle: "Skills You'll Learn",
        rightItems: [
          "Underwater camera handling and maintenance",
          "Composition rules (rule of thirds, leading lines, framing)",
          "Strobe positioning and lighting techniques",
          "White balance adjustment and color correction",
          "Macro and wide-angle photography approaches",
          "Marine life behavior anticipation for perfect shots",
          "Adobe Lightroom/Photoshop editing workflow",
          "Building a professional underwater photography portfolio",
        ],
      },
      prereq: {
        leftTitle: "Requirements",
        leftText:
          "You must be a certified Open Water Diver (or equivalent) to enroll. No prior photography experience is required—we'll teach you everything from camera basics to advanced techniques. Bring your own underwater camera system if you have one, or rent from us. A basic understanding of computer operations is helpful for the editing sessions.",
        rightTitle: "Prerequisites",
        rightItems: [
          "PADI Open Water Diver certification (or equivalent)",
          "Minimum age: 10 years old",
          "Comfortable in open water conditions",
          "Basic computer literacy (for editing sessions)",
          "No prior photography experience needed",
          "Camera available for rent if you don't own one",
        ],
      },
      inclusion: {
        leftTitle: "What's Included",
        leftText:
          "We provide comprehensive instruction covering both technical camera skills and artistic composition. Our course includes hands-on dive sessions where you'll practice techniques immediately, followed by constructive feedback on your captured images.",
        rightTitle: "Included",
        rightItems: [
          "PADI Digital Underwater Photographer manual",
          "Classroom sessions with multimedia presentations",
          "2 open water photography dives with instructor guidance",
          "Underwater camera and housing (if renting)",
          "Basic strobe/light system for training dives",
          "Post-processing software tutorials",
          "Image critique and portfolio development sessions",
          "PADI Specialty certification card processing",
        ],
      },
      fees: {
        leftTitle: "Pricing",
        leftText:
          "Course investment varies based on whether you bring your own camera system or rent ours. Contact us for package details and group rates. Combine with other specialties for discounted pricing.",
        rightTitle: "Tuition Fees",
        rightItems: [
          "Course with your own camera: ₱12,500.00",
          "Course with camera rental: ₱15,500.00",
          "Private Course (1-on-1): ₱18,000.00",
          "Add video techniques module: ₱4,500.00 extra",
        ],
      },
      not_included: {
        leftTitle: "What's Not Included",
        leftText:
          "Personal items and equipment may not be included unless specified. We recommend bringing your own memory cards and backup storage for your images.",
        rightTitle: "Not Included",
        rightItems: [
          "Personal camera system (available for rent)",
          "Memory cards and storage devices",
          "Transportation to/from dive sites",
          "Meals and personal expenses",
          "Dive insurance (recommended)",
          "Marine park fees (varies by dive site)",
          "Printed portfolio or photo book (available as add-on)",
        ],
      },
      certificate: {
        leftTitle: "Certification",
        leftText:
          "After completing the knowledge development, two open water photography dives, and submitting your portfolio for review, you'll earn the PADI Digital Underwater Photographer Specialty certification. This certification counts toward the prestigious Master Scuba Diver rating and demonstrates your competence in capturing professional-quality underwater images.",
        rightTitle: "Certificate Preview",
        rightImage: {
          src: "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775615829/Blue_and_Gold_Elegant_Certificate_Workshop_Participation_4_s9cnuz.png",
          alt: "PADI Marine Photography certification preview",
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
              "url(https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384141/small2_wmdmjz.jpg)",
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
              Marine Photography
            </h1>

            <p className="mt-4 text-base md:text-base text-white/85 leading-relaxed">
              Capture the breathtaking beauty of Sogod Bay's underwater world.
              Master composition, lighting, and editing techniques to create
              stunning marine life images.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#details"
                className="px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
              >
                View details
              </a>
              <a
                href="#gallery"
                className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
              >
                Sample photos
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
                        Core photography techniques:
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

      {/* SAMPLE PHOTOGRAPHY GALLERY */}
      <section
        id="gallery"
        className="bg-gradient-to-b from-teal-50/60 to-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-teal-600 uppercase tracking-wider mb-4">
              Student Portfolio Examples
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What You'll Create
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              These are examples of the types of images you'll learn to capture
              during the course. From macro details to sweeping reef landscapes,
              master every aspect of underwater photography.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {samplePhotos.map((photo, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Camera info overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-medium rounded-full shadow-sm">
                      {index === 0
                        ? "Macro"
                        : index === 1
                        ? "Wide-Angle"
                        : "Action"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {photo.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
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
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Technique covered in course</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATES */}
      <section id="dates" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-2xl font-bold text-teal-600">
            Course Dates
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
            Upcoming Marine Photography specialty course schedules.
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
                className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-purple-50 to-pink-50 hover:shadow-md transition-shadow"
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
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Photography Course
                  </span>
                </div>
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
                Other Courses Offered
              </h2>
              <p className="text-gray-600 text-base">
                Explore our full range of scuba diving courses and specialties
                to enhance your underwater skills and experiences. From beginner
                certifications to advanced specialties, we have something for
                every diver.
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
                title: "PADI Deep Diver",
                description:
                  "Take your diving to new depths with our Deep Diver specialty. Learn techniques for diving beyond 18 meters, managing nitrogen narcosis, and safely exploring deeper wrecks and reefs.",
                href: "/courses/special/deep-diver",
                image:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775549211/pexels-domingo-dias-260502921-12678039_uygdph.jpg",
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
        courseKey="marine-photography"
        courseTitle="PADI Marine Photography Specialty"
        dateOptions={dateOptions}
        apiBaseUrl="http://localhost:5000"
        certLabel="Open Water Certificate Photo *"
      /> */}
    </div>
  );
};

export default MarinePhotography;
