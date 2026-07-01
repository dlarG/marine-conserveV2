import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CotMonitoringAbgao = () => {
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
      <section className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <img
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384090/cotss_gdjxco.jpg"
            alt="Crown of Thorns starfish monitoring in Abgao reef"
            className="w-full h-[110%] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80";
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
              COTs Monitoring & Culling Update:
              <br />
              <span className="text-teal-300">Abgao, Malitbog</span>
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
                May 24, 2025
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
                6 min read
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
              Great news from the reef! Yesterday we completed a follow-up dive
              in Abgao to assess the Crown of Thorns starfish (COTs) situation
              almost one month after our first culling effort. The results are
              encouraging and demonstrate the effectiveness of our ongoing
              marine conservation initiatives.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-12">
              Crown of Thorns starfish outbreaks pose one of the most
              significant threats to coral reef ecosystems in the Philippines.
              These voracious predators can decimate vast areas of coral if left
              unchecked, making our monitoring and culling programs essential
              for maintaining the health of our marine protected areas.
            </p>
          </div>
        </div>

        {/* First Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384090/cotss_gdjxco.jpg"
              alt="Crown of Thorns starfish being removed from the reef during culling operations"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/cots-monitoring.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Our team carefully removes Crown of Thorns starfish during the
              culling operation in Abgao, Malitbog
            </figcaption>
          </figure>
        </div>

        {/* Monitoring Results Section */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Monitoring Results: Positive Signs of Recovery
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-6">
              The follow-up assessment revealed a significant reduction in COTs
              populations across all surveyed transects. Our initial culling
              effort, conducted nearly one month ago, successfully removed the
              majority of adult specimens from critical reef areas, and the
              subsequent monitoring confirms that recolonization has been
              minimal.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h3 className="text-2xl font-bold text-teal-600 mb-2">85%</h3>
                <p className="text-gray-700 font-medium">
                  Reduction in COTs Population
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">12</h3>
                <p className="text-gray-700 font-medium">
                  Survey Transects Completed
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">3</h3>
                <p className="text-gray-700 font-medium">
                  Juvenile COTs Found & Removed
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 font-light">
              The few remaining individuals discovered during our survey were
              primarily juveniles, indicating that our initial intervention
              successfully targeted the breeding adult population. This is
              particularly important as it breaks the reproductive cycle that
              could lead to future outbreaks.
            </p>
          </div>
        </div>

        {/* Second Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384137/school-fish_j7yyxm.webp"
              alt="Healthy coral reef showing signs of recovery after COTs removal"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/healthy-reef.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Healthy coral formations are beginning to show signs of recovery
              following the successful culling operation
            </figcaption>
          </figure>
        </div>

        {/* Community Impact Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Community Involvement & Education
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              A key component of our success has been the active participation
              of local community members. Fisherfolk and residents of Abgao have
              been trained in COTs identification and safe removal techniques,
              transforming them into frontline stewards of their marine
              resources.
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-6 my-8 bg-teal-50 p-6 rounded-r-xl">
              <p className="text-lg italic text-gray-700 mb-4">
                "Seeing the community take ownership of this conservation effort
                has been truly inspiring. When local people understand the
                threat and are equipped to address it, the impact is immediate
                and lasting."
              </p>
              <cite className="text-gray-600 font-semibold">
                Juan Dela Cruz, Project Coordinator
              </cite>
            </blockquote>

            <p className="text-lg leading-relaxed text-gray-700">
              Educational workshops conducted alongside the culling activities
              have raised awareness about the importance of coral reef
              conservation. Participants learn not only about COTs management
              but also about broader marine ecosystem health and sustainable
              fishing practices.
            </p>
          </div>
        </div>

        {/* Third Image Section */}
        <div
          className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <figure className="mb-12">
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771390101/pexels-belle-co-99483-847393_gmmazx.jpg"
              alt="Community volunteers participating in reef monitoring activities"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/community-monitoring.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Community volunteers learn monitoring techniques to help protect
              their local reef ecosystems
            </figcaption>
          </figure>
        </div>

        {/* Future Plans Section */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Next Steps & Ongoing Monitoring
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              While the results are promising, we recognize that sustained
              vigilance is essential. Our team has established a quarterly
              monitoring schedule for the Abgao site, with the next assessment
              planned for August 2025. This regular surveillance will allow us
              to detect and respond to any resurgence of COTs populations before
              they reach outbreak levels.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              We are also expanding this successful model to neighboring
              communities, sharing best practices and lessons learned from the
              Abgao experience. By building a network of trained community
              monitors across Southern Leyte, we aim to create a comprehensive
              early warning system for COTs outbreaks throughout the region.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Community", "Education", "Sustainability"].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Share & Navigation */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate("/organization/all-blogs")}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-lg font-semibold transition-colors duration-300"
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
            <span className="text-gray-500 text-sm">Share this article:</span>
            <div className="flex gap-2">
              <button className="cursor-pointer p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                <svg
                  fill="currentColor"
                  width="25px"
                  height="25px"
                  viewBox="-2 -4 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                  className="jam jam-twitter"
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

export default CotMonitoringAbgao;
