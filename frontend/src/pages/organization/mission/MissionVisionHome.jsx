const MissionVisionHome = () => {
  const missionItems = [
    "Implement science-based coral reef restoration and habitat rehabilitation programs",
    "Conduct systematic marine data collection and monitoring to inform adaptive management strategies",
    "Lead marine conservation initiatives such as dive-against-debris, crown-of-thorns monitoring, and reef protection efforts",
    "Promote environmental education and capacity building, especially among students, volunteers, and local communities",
    "Develop sustainable diving and ecotourism programs that directly support conservation efforts",
    "Foster partnerships with local government units, academic institutions, and stakeholders to strengthen marine conservation outcomes",
  ];

  return (
    <section
      id="mission-content"
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-3 md:mb-4 tracking-wide">
            Our Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Mission & Vision
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Driving positive change through dedicated conservation efforts and
            community empowerment
          </p>
        </div>

        {/* Vision Card - Full Width */}
        <div className="mb-6 lg:mb-8">
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-6">
                <div className="lg:w-40 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Vision
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Vision Content */}
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    GREEN, Inc. envisions a future where the marine ecosystems
                    of Sogod Bay and beyond are resilient, thriving, and
                    sustainably managed, supported by empowered coastal
                    communities and guided by science-based conservation. We
                    aspire to be a leading grassroots organization that bridges
                    people, science, and stewardship, ensuring that healthy
                    oceans continue to sustain biodiversity and livelihoods for
                    generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Card - Full Width */}
        <div className="mb-12 md:mb-16">
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-emerald-50/30 to-green-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-6">
                {/* Mission Label */}
                <div className="lg:w-40 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Mission
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Mission Content */}
                <div className="flex-1 space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    GREEN, Inc. is committed to the protection, restoration, and
                    sustainable management of marine ecosystems, particularly
                    coral reefs, through an integrated approach that combines
                    scientific research, community engagement, and responsible
                    diving practices.
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-semibold text-gray-800 mb-3">
                      Specifically, GREEN, Inc. aims to:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {missionItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 group/item"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                          <span className="text-gray-600 text-xs leading-relaxed group-hover/item:text-gray-800 transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="relative">
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Our Core Values
            </h3>
            <p className="text-gray-600 text-sm">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              {
                name: "Sustainability",
                desc: "Long-term environmental stewardship for future generations",
                gradient: "from-emerald-600 to-teal-600",
                bgImage:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775627254/Punta_MPA_San_Francisco_Southern_Leyte_kuwds1.jpg",
              },
              {
                name: "Community First",
                desc: "Empowering and uplifting local coastal communities",
                gradient: "from-emerald-600 to-teal-600",
                bgImage:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771383953/coral1_ixn9sr.jpg",
              },
              {
                name: "Science-Based",
                desc: "Data-driven decisions and evidence-based conservation",
                gradient: "from-emerald-600 to-teal-600",
                bgImage:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775628644/P9020064_fa92ae.jpg",
              },
              {
                name: "Education",
                desc: "Knowledge sharing as a catalyst for lasting change",
                gradient: "from-emerald-600 to-teal-600",
                bgImage:
                  "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775628691/PB070017-2_ofotnn.jpg",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden bg-white bg-center bg-cover"
                style={{ backgroundImage: `url(${value.bgImage})` }}
              >
                {/* Optional dark/soft overlay for readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90 opacity-90 group-hover:opacity-80 transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative">
                  {/* Gradient indicator with number */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${value.gradient} mb-3 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white text-base font-bold">
                      {idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {value.name}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {value.desc}
                  </p>
                </div>

                {/* Subtle bottom border animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Through these efforts section */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block max-w-4xl bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-emerald-100">
            <p className="text-gray-700 text-sm leading-relaxed italic">
              Through these efforts, GREEN, Inc. strives to cultivate a culture
              of shared responsibility, environmental awareness, and long-term
              stewardship of our oceans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionHome;
