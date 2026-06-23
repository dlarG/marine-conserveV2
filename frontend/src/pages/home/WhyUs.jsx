// WhyUs.jsx
import { useEffect, useState, useRef } from "react";
import useScrollAnimation from "../../utilities/useScrollAnimation";

const FeatureCard = ({ feature, index }) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -30px 0px",
  });

  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${
          index * 0.15
        }s, transform 0.6s ease-out ${index * 0.15}s`,
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Gradient Line on Hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

// ─── Animated Counter Component ──────────────────────────────────────────────
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.5,
    once: true,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime = null;
      const startValue = 0;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function for smooth deceleration
        const easeOutExpo = 1 - Math.pow(1 - progress, 3);

        setCount(Math.floor(easeOutExpo * (end - startValue) + startValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const StatItem = ({ stat, index }) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.5,
  });

  // Parse the stat number for the counter
  const parseStatNumber = (numberStr) => {
    const match = numberStr.match(/^(\d+)(\+?)$/);
    if (match) {
      return {
        value: parseInt(match[1]),
        suffix: match[2],
      };
    }
    return { value: parseInt(numberStr) || 0, suffix: "" };
  };

  const { value, suffix } = parseStatNumber(stat.number);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${
          index * 0.1
        }s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
        <AnimatedCounter end={value} suffix={suffix} duration={2000} />
      </div>
      <div className="text-gray-600 text-sm">{stat.label}</div>
    </div>
  );
};

const WhyUs = () => {
  const [headerRef, headerIsVisible] = useScrollAnimation({
    threshold: 0.2,
  });

  const features = [
    {
      image: "/asset/track.jpg", // Scuba diver on healthy reef
      title: "Proven Track Record",
      description:
        "Over a decade of successful marine conservation with measurable impact on reef restoration and marine biodiversity.",
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      image: "/asset/community.jpg", // Community working together
      title: "Community-Driven",
      description:
        "Working hand-in-hand with local communities in Southern Leyte to create sustainable, long-lasting environmental change.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      image: "/asset/science.jpg", // Marine biologist researching
      title: "Science-Based Methods",
      description:
        "Every initiative is backed by marine biology research and data collection to ensure maximum ecological impact.",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      image: "/asset/global.jpg", // Global recognition/award
      title: "Global Recognition",
      description:
        "Partnered with international organizations and recognized for excellence in coral conservation and marine protection.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const stats = [
    { number: "10+", label: "Years of Impact" },
    { number: "50K+", label: "Corals Planted" },
    { number: "200+", label: "Volunteers Trained" },
    { number: "15", label: "Partner Organizations" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: headerIsVisible ? 1 : 0,
            transform: headerIsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <h2 className="text-3xl lg:text-3xl font-light text-gray-900 mb-6 tracking-tight">
            Making Real Impact in
            <br />
            <span className="text-teal-600 text-4xl font-semibold uppercase tracking-wide">
              Marine Conservation
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We combine passion with expertise to protect and restore coral reefs
            through innovative, community-focused approaches.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
