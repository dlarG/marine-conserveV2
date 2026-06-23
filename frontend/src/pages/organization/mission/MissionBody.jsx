import { useState, useEffect, useRef } from "react";
import MissionVisionHome from "./MissionVisionHome";

const MissionBody = () => {
  const [, setIsLoaded] = useState(false);
  const [, setScrollY] = useState(0);
  const [animatedSections, setAnimatedSections] = useState({});
  const sectionRefs = useRef({});

  const missionRef = useRef(null);
  const locationRef = useRef(null);
  const projectsRef = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check section visibility
      Object.keys(sectionRefs.current).forEach((key) => {
        if (sectionRefs.current[key]) {
          const rect = sectionRefs.current[key].getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

          if (isVisible) {
            setAnimatedSections((prev) => {
              if (!prev[key]) {
                return { ...prev, [key]: true };
              }
              return prev;
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const missionData = {
    mission: {
      title: "Our Mission",
      subtitle: "Reef Restoration & Community Support",
      content: `This project started with the love for the reefs around Southern Leyte, which is still the very foundation of our project.

Our mission is to support our local reefs and the surrounding communities. 

We rehabilitate the more resistant coral colonies and introduce them to the local reefs. Here they grow and construct reefs capable of withstanding the current climatic challenges. In assisting the reefs, we also help surrounding communities by sustaining their livelihood in fishery and tourism.`,
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384129/PH_jtmoag.png",
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "5000+", label: "Coral Fragments Restored" },
        { value: "3", label: "Local Communities" },
        { value: "95%", label: "Survival Rate" },
      ],
    },
    location: {
      title: "Project Location",
      subtitle: "Sogod Bay, Malitbog, Southern Leyte",
      description: `The project currently consists of a coral nursery with an associated coral garden. The success of a specific restoration method is dependent on the location and its conditions. In the past ten years, we have had the opportunity to test different types of nurseries at numerous sites and adapt our methods to best suit our criteria.
Our nurseries are located in Sogod Bay, Malitbog, in Southern Leyte, Philippines. We mainly use rope and steel structures as our coral nursery units (CNU), at depths between 5 - 20 m. The correct depth is a balancing act between providing enough solar light penetration for photosynthesis to occur and limiting wave action to prevent damage.`,
      mapImage:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384145/sogodbay_vupcfy.jpg",
      features: [
        "Optimal depth: 5-20 meters",
        "Protected bay location",
        "Ideal water temperature",
        "Minimal wave action",
        "Rich marine biodiversity",
      ],
    },
    projects: [
      {
        id: "steel-nursery",
        title: "Steel Nursery",
        subtitle: "3m x 9m Steel Coral Nursery Unit",
        description: `Damaged coral fragments are collected and brought to the 3x9m steel coral nursery unit (CNU). The units are placed at different depths throughout the restoration site and function as donors for the rope nurseries. A fabricated steel coral nursery unit will be used measuring 3m x 9m.`,
        features: [
          "Steel structure for durability",
          "Multiple depth placement",
          "Donor site for rope nurseries",
          "Stable foundation for growth",
        ],
        images: [
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384149/steel2_a9rpgt.jpg",
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384148/steel1_abv4vn.jpg",
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384146/steel_zm2pf2.jpg",
        ],
        color: "from-blue-500 to-teal-500",
      },
      {
        id: "rope-nursery",
        title: "Rope Nursery",
        subtitle: "Midwater Suspension System",
        description: `Coral fragments are harvested and transported from our steel nursery to our rope nursery, where they remain for two months before being transplanted onto the reefs. In the rope nursery, our fragments are kept midwater attached to ropes floating due to suspended plastic bottles.

This method prevents the sandy seafloor from smothering the fragments and possibly causing bleaching. According to previous studies, this method reduces stress, encourages growth and produces coral colonies more resilient to the challenges on the reefs.`,
        features: [
          "Two-month preparation period",
          "Prevents seafloor smothering",
          "Reduces coral stress",
          "Increases resilience",
          "Sustainable design",
        ],
        images: [
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775628346/PB220004_vuyuex.jpg",
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775628381/PB160004_q9sslx.jpg",
          "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1775628383/P8140017_hgdhlw.jpg",
        ],
        color: "from-emerald-500 to-green-500",
      },
    ],
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageError = (e, fallbackSrc = "/images/placeholder.jpg") => {
    e.target.src = fallbackSrc;
    e.target.onerror = null;
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        id="mission"
        ref={(el) => {
          missionRef.current = el;
          sectionRefs.current["mission"] = el;
        }}
        className="relative mb-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#eaf7ef] to-white overflow-hidden"
      >
        <MissionVisionHome />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Text content */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full blur-xl opacity-70 animate-float-slow"></div>

              <div className="relative">
                <div
                  className={`transform transition-all duration-700 delay-100 ${
                    animatedSections["mission"]
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }`}
                ></div>

                <h2
                  className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight transform transition-all duration-800 delay-200 ${
                    animatedSections["mission"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  Protecting Our
                  <span className="block text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text">
                    Marine Heritage
                  </span>
                </h2>

                <div className="space-y-4">
                  {missionData.mission.content.split("\n").map(
                    (paragraph, index) =>
                      paragraph.trim() && (
                        <p
                          key={index}
                          className={`text-sm md:text-base text-gray-700 leading-relaxed transform transition-all duration-700 delay-${
                            300 + index * 100
                          } ${
                            animatedSections["mission"]
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                          }`}
                        >
                          {paragraph}
                        </p>
                      )
                  )}
                </div>

                <div
                  className={`mt-8 grid grid-cols-2 gap-4 transform transition-all duration-800 delay-600 ${
                    animatedSections["mission"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {missionData.mission.stats.slice(0, 2).map((stat, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-white p-4 border border-teal-100 transition-all duration-300"
                    >
                      <div className="text-xl md:text-2xl font-bold text-teal-600 mb-1 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-gray-700 font-medium text-sm">
                        {stat.label}
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-teal-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-6 transform transition-all duration-800 delay-800 ${
                    animatedSections["mission"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  <button
                    onClick={() => scrollToSection("location")}
                    className="cursor-pointer group inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Explore Our Location</span>
                    <svg
                      className="cursor-pointer w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Image with animation */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-xl opacity-60 animate-float-medium delay-500"></div>
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-700 ${
                  animatedSections["mission"]
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-8 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="aspect-[3/3] overflow-hidden">
                  <img
                    src={missionData.mission.image}
                    alt="Philippines Map"
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e)}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section
        id="location"
        ref={(el) => {
          locationRef.current = el;
          sectionRefs.current["location"] = el;
        }}
        className="relative py-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`text-center max-w-3xl mx-auto mb-10 md:mb-12 transform transition-all duration-700 ${
              animatedSections["location"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block text-xs font-medium text-teal-600 uppercase tracking-wider mb-3 bg-teal-50 px-3 py-1.5 rounded-full">
              Project Location
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-transparent bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text">
                Sogod Bay
              </span>
              , Southern Leyte
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              The ideal location for coral restoration with optimal conditions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center mb-12">
            {/* Map with animation */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full blur-xl opacity-70 animate-float-slow"></div>
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-700 transform ${
                  animatedSections["location"]
                    ? "translate-x-0 opacity-100 scale-100"
                    : "-translate-x-8 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={missionData.location.mapImage}
                    alt="Map of Sogod Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => handleImageError(e)}
                  />
                </div>
                {/* Animated location marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-red-500 rounded-full animate-ping opacity-20" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg animate-bounce-slow" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-medium text-gray-700">
                      Restoration Site
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description with staggered animations */}
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full blur-xl opacity-50 animate-float-medium delay-300"></div>

              <div className="relative">
                <h3
                  className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 transform transition-all duration-700 delay-300 ${
                    animatedSections["location"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  Strategic Location Advantages
                </h3>

                <div className="space-y-4 mb-6">
                  {missionData.location.description.split("\n").map(
                    (paragraph, index) =>
                      paragraph.trim() && (
                        <p
                          key={index}
                          className={`text-sm md:text-base text-gray-700 leading-relaxed transform transition-all duration-700 delay-${
                            400 + index * 100
                          } ${
                            animatedSections["location"]
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                          }`}
                        >
                          {paragraph}
                        </p>
                      )
                  )}
                </div>

                {/* Features grid with staggered animations */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {missionData.location.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 group transform transition-all duration-500 delay-${
                        600 + index * 100
                      } ${
                        animatedSections["location"]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-teal-600 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => {
          sectionRefs.current["projects"] = el;
        }}
        className="relative py-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/10 to-white"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div
            className={`text-center max-w-3xl mx-auto mb-8 transform transition-all duration-700 ${
              animatedSections["projects"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block text-xs font-medium text-emerald-600 uppercase tracking-wider mb-3 bg-emerald-50 px-3 py-1.5 rounded-full">
              Restoration Projects
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Our{" "}
              <span className="text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                Restoration Methods
              </span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Innovative approaches to coral rehabilitation and reef restoration
            </p>
          </div>

          {missionData.projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              ref={(el) => {
                projectsRef.current[project.id] = el;
                sectionRefs.current[project.id] = el;
              }}
              className={`mb-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                {/* Project images gallery with animation */}
                <div
                  className={`relative transform transition-all duration-700 delay-300 ${
                    animatedSections[project.id]
                      ? index % 2 === 0
                        ? "translate-x-0 opacity-100"
                        : "translate-x-0 opacity-100"
                      : index % 2 === 0
                      ? "-translate-x-8 opacity-0"
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {project.images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`relative rounded-2xl overflow-hidden shadow-lg group ${
                          imgIndex === 0 ? "col-span-2" : ""
                        } transform transition-all duration-500 delay-${
                          400 + imgIndex * 100
                        } ${
                          animatedSections[project.id]
                            ? "translate-y-0 opacity-100 scale-100"
                            : "translate-y-8 opacity-0 scale-95"
                        }`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={img}
                            alt={`${project.title} - Image ${imgIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => handleImageError(e)}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project details with staggered animations */}
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full blur-xl opacity-70 animate-float-slow"></div>

                  <div className="relative">
                    <h3
                      className={`text-xl md:text-2xl font-bold text-gray-900 mb-3 transform transition-all duration-700 delay-300 ${
                        animatedSections[project.id]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm text-emerald-600 font-medium mb-4 transform transition-all duration-700 delay-400 ${
                        animatedSections[project.id]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {project.subtitle}
                    </p>

                    <div className="space-y-3 mb-6">
                      {project.description
                        .split("\n")
                        .map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className={`text-sm md:text-base text-gray-700 leading-relaxed transform transition-all duration-700 delay-${
                              500 + pIndex * 100
                            } ${
                              animatedSections[project.id]
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                            }`}
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>

                    {/* Features with animation */}
                    <div
                      className={`transform transition-all duration-700 delay-700 ${
                        animatedSections[project.id]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Key Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className={`flex items-start gap-2 group transform transition-all duration-500 delay-${
                              800 + fIndex * 100
                            } ${
                              animatedSections[project.id]
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                            }`}
                          >
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                              <svg
                                className="w-2.5 h-2.5 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MissionBody;
