/* eslint-disable react-hooks/purity */
// CTA.jsx
import { ArrowRight } from "lucide-react";
import useScrollAnimation from "../../utilities/useScrollAnimation";

const CTA = () => {
  const [contentRef, isVisible] = useScrollAnimation({
    threshold: 0.2,
  });

  const [urgencyRef, urgencyVisible] = useScrollAnimation({
    threshold: 0.5,
  });

  return (
    <section className="relative py-20 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Bubble decorations */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          {/* Main Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to Make
            <br />
            <span className="text-teal-200">Waves of Change?</span>
          </h2>

          <p className="text-lg lg:text-xl text-teal-50/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every coral planted, every reef cleaned, and every volunteer trained
            brings us closer to thriving oceans. Your support today creates
            impact that lasts for generations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <button
              className="cursor-pointer group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-teal-700 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:-translate-y-0.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
              }}
            >
              Donate Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="cursor-pointer inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s",
              }}
            >
              Become a Volunteer
            </button>
          </div>
        </div>

        <div
          ref={urgencyRef}
          className="text-center"
          style={{
            opacity: urgencyVisible ? 1 : 0,
            transform: urgencyVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.6s ease-out 0.7s, transform 0.6s ease-out 0.7s",
          }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm">
              <strong className="text-white">Urgent:</strong> 200 coral
              fragments need planting this month
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default CTA;
