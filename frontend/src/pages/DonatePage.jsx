import { useState, useEffect, useRef } from "react";
import DonateModal from "./DonateModal";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const DonatePage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [, setIsLoaded] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  // Define refs
  const heroRef = useRef(null);
  const threatsRef = useRef(null);
  const solutionsRef = useRef(null);
  const impactRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  // Define donation amounts

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const refs = {
      hero: heroRef,
      threats: threatsRef,
      solutions: solutionsRef,
      impact: impactRef,
      cta: ctaRef,
    };

    const observers = {};

    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.2, rootMargin: "50px" }
        );
        observers[key].observe(ref.current);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleDonateClick = (amount = null) => {
    setSelectedAmount(amount);
    setIsDonateModalOpen(true);
  };

  const threats = [
    {
      title: "Crown-of-Thorns Starfish",
      description:
        "These coral-eating predators are devastating our reefs. A single COTS can consume up to 10 square meters of coral per year.",
      stat: "40% coral loss",
      statLabel: "in affected areas",
      color: "from-red-500 to-orange-500",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384386/P5250160_qmlygb.jpg",
    },
    {
      title: "Marine Debris",
      description:
        "Ghost nets, plastics, and debris entangle marine life and destroy habitats. Over 800 species are affected by marine debris globally.",
      stat: "1,200+ kg",
      statLabel: "removed in 2024",
      color: "from-blue-500 to-cyan-500",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384298/P1070103_jfjakj.jpg",
    },
    {
      title: "Climate Change",
      description:
        "Rising sea temperatures cause coral bleaching, threatening the entire ecosystem of Sogod Bay.",
      stat: "+1.5°C",
      statLabel: "temperature rise since 1900",
      color: "from-yellow-500 to-amber-500",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771401397/pexels-ron-lach-9034661_fevxi9.jpg",
    },
  ];

  const solutions = [
    {
      title: "COTS Monitoring & Removal",
      link: "/volunteer/cots-monitoring",
      impact: "Protects 10,000+ coral colonies annually",
      description:
        "Our dive teams conduct systematic COTS removal dives, manually extracting these predators to give our reefs a fighting chance.",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384371/cots-monitoring_v9osqs.jpg",
      stats: [
        { value: "5,000+", label: "COTS removed" },
        { value: "50+", label: "active volunteers" },
        { value: "15 sites", label: "monitored weekly" },
      ],
    },
    {
      title: "Debris Removal Operations",
      link: "/volunteer/dive-against-debris",
      impact: "Cleaner, safer habitats for marine life",
      description:
        "Regular underwater cleanup operations remove ghost nets, plastics, and other debris that threaten marine life.",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384300/P9160010_qt0fkc.jpg",
      stats: [
        { value: "1,200kg", label: "debris removed" },
        { value: "200+", label: "dives completed" },
        { value: "8 sites", label: "cleaned monthly" },
      ],
    },
    {
      title: "Coral Restoration",
      link: "/volunteer/coral-restoration",
      impact: "Actively rebuilding damaged reefs",
      description:
        "Using innovative techniques like coral nurseries and transplantation, we're bringing life back to degraded areas.",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384415/P7240105_mfhcbi.jpg",
      stats: [
        { value: "2,500+", label: "corals transplanted" },
        { value: "3", label: "active nurseries" },
        { value: "70%", label: "survival rate" },
      ],
    },
    {
      title: "Scientific Data Collection",
      link: "/volunteer/scientific-data-collection",
      impact: "Informed decisions through research",
      description:
        "Our data drives conservation strategies and helps us measure the true impact of our efforts.",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384415/P3290154_g7mysv.jpg",
      stats: [
        { value: "50+", label: "research dives/month" },
        { value: "15", label: "monitoring sites" },
        { value: "5 years", label: "of continuous data" },
      ],
    },
  ];

  const impactStories = [
    {
      quote:
        "Before GREEN Inc. started their work, I watched our reefs die. Now, I see baby corals growing where there was only rubble. Every donation makes this possible.",
      author: "Juan Dela Cruz",
      role: "Local Fisherman, Malitbog",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1774851532/pexels-hao-peng-2148478861-30975982_xggp1z.jpg",
    },
    {
      quote:
        "The data we collect shows real recovery. In just two years, we've seen fish populations increase by 40% in our protected areas.",
      author: "Dr. Maria Santos",
      role: "Marine Biologist",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1774851591/pexels-batitay-japheth-43379766-16333664_qzlac8.jpg",
    },
  ];

  const backgroundVideoUrl =
    "https://res.cloudinary.com/dfsxmtyxk/video/upload/v1774838153/17454115-uhd_3840_2160_25fps_tkhd3n.mp4";
  const title = "Your Donation Saves Lives";
  const subtitle =
    "Every peso brings us closer to saving Sogod Bay's coral reefs. Your support funds actual dives, removes threats, and restores hope for thousands of marine species and coastal communities.";

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section id="hero" ref={heroRef}>
        <header className="relative w-full h-[45vh] overflow-hidden">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex mt-30">
            <div className="max-w-2xl">
              <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
                {title}
              </h1>

              <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
                {subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  onClick={() => handleDonateClick()}
                  className="cursor-pointer px-4 py-2 text-sm rounded-full bg-teal-600 text-white font-normal hover:bg-teal-700 transition-colors"
                >
                  Make Contribution
                </a>
                <a
                  onClick={() => {
                    "/about";
                  }}
                  className="px-4 py-2 text-sm rounded-full bg-white/10 text-white font-normal border border-white/20 hover:bg-white/15 transition-colors"
                >
                  Explore Our Impact
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Scroll Indicator - with subtle parallax */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{
            transform: `translate(-50%, ${scrollY * 0.2}px)`,
          }}
        >
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* The Threats Section */}
      <section
        id="threats"
        ref={threatsRef}
        className="relative py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible.threats
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold mb-3">
              THE URGENT THREATS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What's Killing Our <span className="text-red-500">Reefs</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Sogod Bay faces multiple threats. Without immediate action, we
              could lose decades of marine biodiversity in just a few years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threats.map((threat, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-1000 delay-${
                  index * 200
                } ${
                  isVisible.threats
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={threat.image}
                    alt={threat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${threat.color} opacity-90 mix-blend-multiply`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                    <div className="mb-2 text-white/90">{threat.icon}</div>
                    <h3 className="text-xl font-bold mb-1.5">{threat.title}</h3>
                    <p className="text-xs text-white/90 mb-2.5">
                      {threat.description}
                    </p>

                    {/* Stat Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <span className="text-lg font-bold mr-1.5">
                        {threat.stat}
                      </span>
                      <span className="text-[10px] text-white/80">
                        {threat.statLabel}
                      </span>
                    </div>

                    {/* Hover Effect - Urgency Message */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-base font-bold mb-1.5">
                          This is Happening NOW
                        </p>
                        <p className="text-xs text-white/90">
                          Every day we wait, more corals die.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Message */}
          <div
            className={`mt-8 text-center transform transition-all duration-1000 delay-600 ${
              isVisible.threats
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-2">
              <span className="text-red-600 font-semibold text-xs mr-1.5">
                Time is critical:
              </span>
              <span className="text-gray-700 text-xs">
                Without intervention, Sogod Bay could lose 50% of its coral
                cover by 2030
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section
        id="solutions"
        ref={solutionsRef}
        className="relative py-16 bg-gradient-to-b from-teal-900 to-green-900 text-white overflow-hidden"
      >
        {/* Ocean Wave Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible.solutions
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3">
              YOUR DONATION IN ACTION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              How We're <span className="text-green-300">Fighting Back</span>
            </h2>
            <p className="text-base text-teal-100 max-w-3xl mx-auto">
              Every peso you donate goes directly to these conservation
              programs, actively protecting and restoring Sogod Bay's marine
              ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 ${
                  isVisible.solutions
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">
                      {solution.title}
                    </h3>
                    <p className="text-xs text-teal-200">{solution.impact}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-white/80 mb-3">
                    {solution.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {solution.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base font-bold text-green-300">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-white/60">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDonateClick()}
                      className="cursor-pointer w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs font-semibold"
                    >
                      Support This Program →
                    </button>

                    <button
                      onClick={() => navigate(solution.link)}
                      className="cursor-pointer w-full py-2.5 bg-transparent border border-white/30 hover:bg-white/10 rounded-lg transition-colors text-xs font-semibold"
                    >
                      Volunteer →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section
        id="impact"
        ref={impactRef}
        className="relative py-12 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100 rounded-full filter blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible.impact
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block px-3 py-1.5 rounded-full bg-teal-100 text-teal-600 text-xs font-semibold mb-3">
              REAL IMPACT, REAL STORIES
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Lives <span className="text-teal-600">Changed</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactStories.map((story, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-xl ${
                  isVisible.impact
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start mb-3">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white text-lg">
                      <img
                        src={story.image}
                        alt={story.author}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 italic text-sm mb-1.5">
                      "{story.quote}"
                    </p>
                    <p className="font-semibold text-teal-700 text-sm">
                      {story.author}
                    </p>
                    <p className="text-xs text-gray-500">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mb-8 text-center">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 max-w-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full translate-y-16 -translate-x-16 blur-2xl" />

          <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
            Make a Lasting Impact with Your Donation
          </h3>
          <p className="text-gray-600 text-sm mb-4 relative z-10">
            100% of your donation goes directly to conservation programs. We're
            run by volunteers, so every peso counts.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <button
              style={{ cursor: "pointer" }}
              onClick={() => handleDonateClick()}
              className="relative px-6 py-2.5 text-sm bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                Donate Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        preselectedAmount={selectedAmount}
      />
      <Footer />
    </>
  );
};

export default DonatePage;
