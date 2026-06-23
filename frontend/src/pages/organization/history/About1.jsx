import { useState, useEffect, useRef, useCallback } from "react";

function About1() {
  const sectionRefs = useRef({});
  const [isVisible, setIsVisible] = useState({
    mainContainer: false,
  });

  useEffect(() => {
    document.title = "About GREEN Inc. | History";
  }, []);

  const [counters, setCounters] = useState({
    year: 1900,
    yearsActive: 0,
    studies: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hasAnimatedRef = useRef(false);

  const animateCounter = useCallback((key, start, end, duration) => {
    const startTime = Date.now();
    const range = end - start;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutCubic for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + range * easeOutCubic);

      setCounters((prev) => ({ ...prev, [key]: currentValue }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, []);

  const startCounterAnimations = useCallback(() => {
    // Year animation (1900 to 2013)
    animateCounter("year", 1900, 2013, 5000);

    // Years Active animation (0 to 10+)
    animateCounter("yearsActive", 0, 10, 1500);

    // Studies animation (0 to 35+)
    animateCounter("studies", 0, 35, 1800);
  }, [animateCounter]);

  useEffect(() => {
    const observers = [];
    const currentRefs = { ...sectionRefs.current };

    Object.keys(currentRefs).forEach((key) => {
      if (currentRefs[key]) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
              // Start animations when the section becomes visible
              if (key === "mainContainer" && !hasAnimatedRef.current) {
                startCounterAnimations();
                hasAnimatedRef.current = true;
              }
            }
          },
          { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(currentRefs[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [startCounterAnimations]); // Removed hasAnimated from dependencies

  return (
    <section id="about-content">
      <div>
        <div
          ref={(el) => (sectionRefs.current["mainContainer"] = el)}
          className={`bg-white max-h-screen w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden transform transition-all duration-1000 ${
            isVisible.mainContainer
              ? "translate-x-0 opacity-100 scale-100"
              : "-translate-x-12 opacity-0 scale-95"
          }`}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-8 xl:p-10 relative z-10">
              <h3
                className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 transform transition-all duration-1000 delay-300 ${
                  isVisible.mainContainer
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                About <span className="text-teal-600">GREEN Inc.</span>
              </h3>
              <div
                className={`space-y-4 text-gray-700 transform transition-all duration-1000 delay-500 ${
                  isVisible.mainContainer
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  Grassroots Responsiveness thru Education on Environmental
                  Needs, Incorporated <strong>(GREEN, Inc.)</strong> was
                  formally established in <strong>2013</strong> by{" "}
                  <strong>Jerome Jack Napala</strong>, alongside like-minded
                  individuals passionate about marine conservation.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Before founding GREEN, Inc., Mr. Napala was a simple
                  government employee with a deep appreciation for the marine
                  environment. His life and professional path took a major turn
                  when he was awarded a{" "}
                  <strong>
                    marine conservation scholarship with Coral Cay Conservation
                  </strong>
                  , where he earned his early dive certification and gained a
                  firsthand understanding of the critical importance of healthy
                  marine ecosystems.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  This experience profoundly influenced his decision to pursue a
                  career in <strong>marine biology</strong> and eventually
                  become a <strong>PADI Open Water Scuba Instructor, </strong>
                  combining his scientific knowledge with hands-on diving
                  expertise. Through GREEN, Inc., Jerome and his team channel
                  their passion into{" "}
                  <strong>
                    marine conservation, community engagement, and science-based
                    initiatives{" "}
                  </strong>
                  to protect and restore the reefs and coastal resources of
                  Southern Leyte.
                </p>
              </div>{" "}
              <div
                className={`grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 transform transition-all duration-1000 delay-700 ${
                  isVisible.mainContainer
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl font-bold text-blue-600 group-hover:animate-bounce">
                    {counters.year}
                  </div>
                  <div className="text-gray-600 text-xs mt-1">Year Founded</div>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl font-bold text-teal-600 group-hover:animate-bounce">
                    {counters.yearsActive}+
                  </div>
                  <div className="text-gray-600 text-xs mt-1">Years Active</div>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl font-bold text-green-600 group-hover:animate-bounce">
                    {counters.studies}+
                  </div>
                  <div className="text-gray-600 text-xs mt-1">Studies</div>
                </div>
              </div>
            </div>
            <div
              className={`relative h-[400px] lg:h-auto transform transition-all duration-1000 delay-400 ${
                isVisible.mainContainer
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384066/aboutus1_skah4r.jpg"
                  alt="GREEN Inc. team conducting underwater research"
                  className="w-full h-full object-cover transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "/images/placeholder-marine.jpg";
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="absolute max-w-80 inset-0 bg-gradient-to-r from-white via-white/80 via-white/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About1;
