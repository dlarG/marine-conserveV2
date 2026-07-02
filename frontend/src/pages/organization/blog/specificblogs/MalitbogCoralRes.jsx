import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MalitbogCoralRes = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Use setTimeout to avoid synchronous state update in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <img
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384084/coral-restoration1_h0tw83.jpg"
            alt="Malitbog coral restoration project in progress"
            className="w-full h-[100%] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=800&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
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
              Back to Homepage
            </button>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Coral Restoration Success:
              <br />
              <span className="text-emerald-300">
                A Big Step Forward for Malitbog's Ocean Reefs
              </span>
            </h1>

            <div className="flex items-center justify-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                July 18, 2025
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                15 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Article Introduction */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-gray-700 font-light mb-8">
              After 18 months of dedicated restoration efforts, the coral reefs
              of Malitbog are showing remarkable signs of recovery. Our
              comprehensive monitoring program has documented significant
              improvements in coral coverage, biodiversity, and overall reef
              health, marking a major milestone in Southern Leyte's marine
              conservation efforts.
            </p>

            <p className="text-lg leading-relaxed text-gray-600 mb-12">
              This success story represents the collective efforts of marine
              biologists, local communities, and conservation organizations
              working together to restore one of the region's most important
              coral reef ecosystems. The data we've collected provides hope and
              valuable insights for coral restoration projects throughout the
              Philippines.
            </p>
          </div>
        </div>

        {/* Success Metrics */}
        <div
          className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-12 border border-emerald-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Restoration Success Metrics
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  85%
                </div>
                <p className="text-gray-700 font-medium">Coral Survival Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  3.2 ha
                </div>
                <p className="text-gray-700 font-medium">Area Restored</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  2,500+
                </div>
                <p className="text-gray-700 font-medium">
                  Coral Fragments Planted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* First Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384417/PB080058_jzitbw.jpg"
              alt="Before and after comparison of restored coral reef"
              className="w-full mb-5 h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=1200&h=500&fit=crop&q=80";
              }}
            />
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384067/backg_gcss6b.jpg"
              alt="Before and after comparison of restored coral reef"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=1200&h=500&fit=crop&q=80";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Dramatic transformation: The same reef area showing remarkable
              recovery after 18 months of restoration
            </figcaption>
          </figure>
        </div>

        {/* Project Overview */}
        <div
          className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Journey to Recovery
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              When we began the Malitbog coral restoration project in early
              2024, the reef showed significant signs of degradation with only
              15% live coral coverage. Bleaching events, sedimentation, and
              human impacts had severely damaged this once-thriving ecosystem.
              However, the presence of resilient coral colonies gave us hope
              that restoration was possible.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Our approach combined cutting-edge restoration techniques with
              community-based conservation strategies. We established underwater
              coral nurseries, implemented fragment transplantation programs,
              and worked closely with local fishing communities to develop
              sustainable management practices.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 bg-emerald-50 p-6 rounded-r-xl">
              <p className="text-lg italic text-gray-700 mb-4">
                "The transformation we've witnessed at Malitbog exceeds our most
                optimistic projections. This success demonstrates that with
                proper techniques and community support, severely degraded reefs
                can recover within remarkably short timeframes."
              </p>
              <cite className="text-gray-600 font-semibold">
                Dr. Elena Rodriguez, Project Lead
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Second Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384081/community_solution_jlkhtq.jpg"
              alt="Community volunteers participating in coral transplantation"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=500&fit=crop&q=80";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Local community members actively participating in coral fragment
              transplantation activities
            </figcaption>
          </figure>
        </div>

        {/* Restoration Methods */}
        <div
          className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Innovative Restoration Techniques
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Our success at Malitbog stems from implementing multiple
              restoration techniques tailored to local conditions. We utilized
              three primary methods: the wedging technique for natural substrate
              integration, concrete nail systems for enhanced structural
              support, and biodegradable terracotta tiles as artificial reef
              platforms.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-emerald-600 mb-3">
                  Wedging Method
                </h3>
                <p className="text-gray-600">
                  Utilizing natural cracks and crevices for fragment placement,
                  ensuring 92% survival rates
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-teal-600 mb-3">
                  Concrete Nail System
                </h3>
                <p className="text-gray-600">
                  Modified DOST technique providing stable foundations with 88%
                  success rate
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Each method was carefully selected based on substrate type, water
              conditions, and coral species requirements. This adaptive approach
              allowed us to maximize survival rates while minimizing
              environmental impact during the restoration process.
            </p>
          </div>
        </div>

        {/* Third Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384063/230918_4180_npngvl.jpg"
              alt="Thriving coral colonies showing new growth and fish activity"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&h=500&fit=crop&q=80";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Flourishing coral colonies attracting diverse marine life back to
              the restored reef area
            </figcaption>
          </figure>
        </div>

        {/* Future Outlook */}
        <div
          className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Looking Forward
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The success at Malitbog provides a blueprint for coral restoration
              throughout Sogod Bay and beyond. We're now expanding our efforts
              to adjacent reef areas while continuing long-term monitoring to
              ensure the sustainability of our achievements. The restored reef
              already shows increased fish populations and improved ecological
              connectivity.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Community involvement remains central to our approach. Local
              stakeholders have become active stewards of the restored reef,
              implementing protection measures and participating in ongoing
              maintenance activities. This community ownership ensures the
              long-term success of our restoration investments.
            </p>

            <div className="bg-teal-50 rounded-xl p-6 border border-teal-100 my-8">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                What's Next?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                  Expand restoration to 5 additional sites in Sogod Bay
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                  Establish permanent monitoring stations for long-term tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                  Train additional community members in restoration techniques
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                  Share methodologies with other conservation organizations
                </li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              The Malitbog coral restoration success story demonstrates that
              with scientific expertise, community engagement, and persistent
              effort, we can reverse decades of reef degradation. This
              achievement fuels our commitment to expanding coral restoration
              throughout Southern Leyte's coastal waters.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "Coral Restoration",
            "Monitoring",
            "Success Stories",
            "Community Conservation",
            "Malitbog",
          ].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Share & Navigation */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate("/blogs")}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg font-semibold transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
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
            Back to All Blogs
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              Share this success stories:
            </span>
            <div className="flex gap-2">
              <button className="cursor-pointer p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                <svg
                  fill="currentColor"
                  width="25px"
                  height="25px"
                  viewBox="-2 -4 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                  class="jam jam-twitter"
                >
                  <path d="M20 1.907a8.292 8.292 0 0 1-2.356.637A4.07 4.07 0 0 0 19.448.31a8.349 8.349 0 0 1-2.607.98A4.12 4.12 0 0 0 13.846.015c-2.266 0-4.103 1.81-4.103 4.04 0 .316.036.625.106.92A11.708 11.708 0 0 1 1.393.754a3.964 3.964 0 0 0-.554 2.03c0 1.403.724 2.64 1.824 3.363A4.151 4.151 0 0 1 .805 5.64v.05c0 1.958 1.415 3.591 3.29 3.963a4.216 4.216 0 0 1-1.08.141c-.265 0-.522-.025-.773-.075a4.098 4.098 0 0 0 3.832 2.807 8.312 8.312 0 0 1-5.095 1.727c-.332 0-.658-.02-.979-.056a11.727 11.727 0 0 0 6.289 1.818c7.547 0 11.673-6.157 11.673-11.496l-.014-.523A8.126 8.126 0 0 0 20 1.907z" />
                </svg>
              </button>
              <button className="cursor-pointer p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <title>Facebook icon</title>
                  <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MalitbogCoralRes;
