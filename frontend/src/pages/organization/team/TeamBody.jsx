import { useState, useEffect } from "react";
// import ApplyModal from "./ApplyModal";

const teamMembers = [
  {
    name: "Jerome Jack Napala",
    role: "Green Inc. CEO, Marine Biologist, and PADI Divemaster",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384106/JeromaNapala_x6fqh2.jpg",
    bio: "Jerome started the nursery almost twenty years ago after witnessing how his childhood reefs had begun to show signs of stress. He started with a couple of plastic bottles, ropes, and the will to succeed.",
    specialty: "Coral Nursery Management",
  },
  {
    name: "Christian Polo",
    role: "Coral Jardinero and PADI Divemaster",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384070/ChristianPolo_kqmoeu.jpg",
    bio: "Christian has been a trusted helper and coral nurse for several years. He is a scuba divemaster and spends his days diving on the beautiful reefs in Sogod Bay.",
    specialty: "Scuba Diving & Reef Maintenance",
  },
  {
    name: "Jollibee Looc",
    role: "Marine Biologist, Coral Jardinera and PADI AOW Diver",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384109/JollibeeLooc_sin3gx.jpg",
    bio: "Jobs became a marine biologist with a PADI Advanced Open Water certificate, and her time working with GREEN, Inc. has helped her build her career.",
    specialty: "Marine Biology Research",
  },
  {
    name: "Nova Almine",
    role: "Marine Biologist, Coral Jardinera, and a PADI AOW",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384114/NovaAlmine_sfxdgv.jpg",
    bio: "Nova joined GREEN, Inc. while doing her undergrad in marine biology. Growing up in Southern Leyte, she became deeply passionate about the ocean.",
    specialty: "Marine Ecosystem Studies",
  },
  {
    name: "Charlotte Henriksen",
    role: "Marine Biologist, Office Runner, and PADI Rescuer",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384069/CharlotteHenriksen_b5mmat.jpg",
    bio: "Growing up surrounded by seas and spending most of her childhood in or on water, she always knew the ocean as her home.",
    specialty: "Marine Conservation & Administration",
  },
  {
    name: "Jesse Lou Tinapay",
    role: "Liaison Officer",
    image:
      "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384107/JesseLouTinapay_o33zap.png",
    bio: "Jesse is the former Liaison Officer of Coral Cay Conservation and an experienced PADI Open Water Scuba Instructor with more than 3000 completed dives.",
    specialty: "Dive Instruction & Community Liaison",
  },
];

const TeamBody = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Team | GREEN Inc.";
  }, []);

  //   const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  //   const HandleContactClick = () => {
  //     setIsContactModalOpen(true);
  //   };

  const itemsPerView = 3;

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("right");

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerView;
        return nextIndex >= teamMembers.length ? 0 : nextIndex;
      });
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("left");

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const prevIndexValue = prevIndex - itemsPerView;
        return prevIndexValue < 0
          ? teamMembers.length - itemsPerView
          : prevIndexValue;
      });
      setIsAnimating(false);
    }, 300);
  };

  const visibleMembers = teamMembers.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const getWrappedMembers = () => {
    if (currentIndex + itemsPerView <= teamMembers.length) {
      return visibleMembers;
    }

    const firstPart = teamMembers.slice(currentIndex);
    const secondPart = teamMembers.slice(0, itemsPerView - firstPart.length);
    return [...firstPart, ...secondPart];
  };

  return (
    <>
      <div className="max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full mb-4">
            <span className="text-teal-700 font-semibold text-xs">
              OUR DEDICATED TEAM
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Meet Our <span className="text-teal-700">Experts</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Our interdisciplinary team brings together leading scientists and
            conservation professionals from around the globe.
          </p>
        </div>

        <div className="relative">
          <button
            style={{ cursor: "pointer" }}
            onClick={handlePrev}
            disabled={isAnimating}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 items-center justify-center transition-all duration-300 group z-20"
            aria-label="Previous team members"
          >
            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
          </button>
          <button
            style={{ cursor: "pointer" }}
            onClick={handleNext}
            disabled={isAnimating}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 items-center justify-center transition-all duration-300 group z-20"
            aria-label="Next team members"
          >
            <div className="relative">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 animate-ping opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>

          <div className="md:hidden flex justify-center gap-4 mb-6">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 group"
              aria-label="Previous team members"
            >
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="text-gray-500 text-xs flex items-center">
              {currentIndex / itemsPerView + 1} /{" "}
              {Math.ceil(teamMembers.length / itemsPerView)}
            </div>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 group"
              aria-label="Next team members"
            >
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`hidden md:grid md:grid-cols-3 gap-6 transition-all duration-300 ${
              isAnimating
                ? direction === "right"
                  ? "opacity-50 translate-x-4"
                  : "opacity-50 -translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {getWrappedMembers().map((member, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(currentIndex + index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end transition-all duration-500">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-100 text-sm mb-2">
                          {member.role}
                        </p>
                      </div>
                      <div
                        className={`transform transition-all duration-500 ${
                          hoveredIndex === currentIndex + index
                            ? "translate-y-0 opacity-100 max-h-96"
                            : "translate-y-10 opacity-0 max-h-0"
                        } overflow-hidden`}
                      >
                        <div className="pt-3 border-t border-white/20">
                          <div className="mb-2">
                            <span className="text-teal-300 text-xs font-semibold">
                              Specialty:
                            </span>
                            <p className="text-white text-xs mt-1">
                              {member.specialty}
                            </p>
                          </div>
                          <p className="text-white/90 text-xs leading-relaxed mb-3">
                            {member.bio}
                          </p>
                          <div className="flex gap-4 mb-3">
                            <div className="text-center">
                              <div className="text-white font-bold text-sm">
                                5+
                              </div>
                              <div className="text-white/70 text-[10px]">
                                Years Exp
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-bold text-sm">
                                100+
                              </div>
                              <div className="text-white/70 text-[10px]">
                                Projects
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-bold text-sm">
                                PADI
                              </div>
                              <div className="text-white/70 text-[10px]">
                                Certified
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-4 right-4 transition-all duration-300 ${
                          hoveredIndex === currentIndex + index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center animate-pulse">
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-6">
            {visibleMembers.map((member, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden bg-white shadow-lg"
                onClick={() =>
                  setHoveredIndex(hoveredIndex === index ? null : index)
                }
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
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
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                      {member.name}
                    </h3>
                    <div className="text-teal-600 text-xs font-medium mb-1.5">
                      {member.role}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        hoveredIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-600 text-xs mt-2">{member.bio}</p>
                    </div>
                    <button className="mt-1.5 text-teal-600 text-xs font-medium flex items-center gap-1">
                      {hoveredIndex === index ? "Show Less" : "Read Bio"}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${
                          hoveredIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: Math.ceil(teamMembers.length / itemsPerView),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(
                    index * itemsPerView > currentIndex ? "right" : "left"
                  );
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index * itemsPerView);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? "bg-teal-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 max-w-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full translate-y-16 -translate-x-16 blur-2xl" />

            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
              Join Our Team
            </h3>
            <p className="text-gray-600 text-sm mb-5 relative z-10">
              Passionate about marine conservation? We're always looking for
              dedicated individuals to join our mission.
            </p>
            <button
              style={{ cursor: "pointer" }}
              //   onClick={HandleContactClick}
              className="relative px-6 py-2.5 text-sm bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                Apply Now
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* <ApplyModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      /> */}
    </>
  );
};

export default TeamBody;
