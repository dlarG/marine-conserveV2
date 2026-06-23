import { useState, useEffect, useRef } from "react";

function About2() {
  const sectionRefs = useRef({});
  const [isVisible, setIsVisible] = useState({
    timeline: false,
  });
  const [visibleItems, setVisibleItems] = useState({});

  const timeline = [
    {
      year: "2013",
      event: "GREEN Inc. founded in Sogod Bay, Southern Leyte",
      description:
        "Establishment of coral nursery in Malitbog and reef monitoring",
    },
    {
      year: "2014",
      event: "Coral Nursery & Transplant Trials",
      description:
        "Tested different types of coral nursery and transplant methods, assisted scientific surveys in Silago, Southern Leyte",
    },
    {
      year: "2015",
      event: "Community Engagement Programs Launched",
      description:
        "Crown of thorns seastar research initiative begun its population monitoring program",
    },
    {
      year: "2017",
      event: "Published Flora & Fauna of Tagbak Marine Park",
      description:
        "Published the first comprehensive guidebook of the area's marine life",
    },
    {
      year: "2020",
      event: "Crown of Thorns Outbreak Reported",
      description:
        "Made a comprehensive report about the crown of thorns outbreak in Sogod Bay and presented it to the governor for a scientifically based intervention.",
    },
    {
      year: "2022",
      event: "Hinundayan Marine Survey",
      description:
        "Conducted surveys on coral reef and reef fishes on selected Marine Protected Areas in Southern Leyte funded by SPIADFI and USAID assisted Provincial Tourism office in exploring Hinundayan for possible dive sites",
    },
    {
      year: "2023",
      event: "Coral Restoration Initiatives Launched",
      description:
        "Started Dive Against Debris, Crown of Thorns Monitoring, Coral Restoration",
    },
  ];

  useEffect(() => {
    const observers = [];

    // Observer for the main timeline section
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => ({
          ...prev,
          timeline: entry.isIntersecting,
        }));
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRefs.current["timeline"]) {
      sectionObserver.observe(sectionRefs.current["timeline"]);
      observers.push(sectionObserver);
    }

    // Observers for individual timeline items
    Object.keys(sectionRefs.current).forEach((key) => {
      if (key.startsWith("timeline-item-") && sectionRefs.current[key]) {
        const itemObserver = new IntersectionObserver(
          ([entry]) => {
            setVisibleItems((prev) => ({
              ...prev,
              [key]: entry.isIntersecting,
            }));
          },
          { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        itemObserver.observe(sectionRefs.current[key]);
        observers.push(itemObserver);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="mb-20 mt-20 px-4 sm:px-6 lg:px-8">
      <div
        ref={(el) => (sectionRefs.current["timeline"] = el)}
        className="bg-white p-8"
      >
        <h3
          className={`text-3xl font-bold text-center text-gray-900 mb-12 transform transition-all duration-1000 ${
            isVisible.timeline
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          Our <span className="text-teal-600">Journey</span> Through the Years
        </h3>

        <div className="relative">
          {/* Timeline line with animation */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-400 to-emerald-500 hidden md:block transition-all duration-1000 ${
              isVisible.timeline
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
            style={{ transformOrigin: "top" }}
          ></div>

          <div className="space-y-12 relative">
            {timeline.map((item, index) => {
              const itemKey = `timeline-item-${index}`;
              const isItemVisible = visibleItems[itemKey] || false;

              return (
                <div
                  key={index}
                  ref={(el) => (sectionRefs.current[itemKey] = el)}
                  className={`flex flex-col md:flex-row items-center gap-8 transform transition-all duration-1000 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } ${
                    isItemVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {/* Year badge */}
                  <div className="w-32 flex-shrink-0">
                    <div
                      className={`bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full px-6 py-2 text-center hover:scale-110 transition-all duration-500 shadow-lg ${
                        isItemVisible
                          ? "scale-100 opacity-100"
                          : "scale-75 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-xl font-bold text-white">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r from-teal-50 to-white rounded-2xl p-6 shadow-lg border border-teal-100 max-w-lg mx-auto hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                        isItemVisible
                          ? "translate-x-0 opacity-100"
                          : index % 2 === 0
                          ? "-translate-x-16 opacity-0"
                          : "translate-x-16 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.event}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About2;
