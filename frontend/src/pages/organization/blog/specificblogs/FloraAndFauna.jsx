import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FloraAndFauna = () => {
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
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384151/tagbak1_t27wnl.jpg"
            alt="Tagbak Marine Park underwater biodiversity"
            className="w-full h-[110%] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80";
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
              Flora & Fauna of Tagbak Marine Park:
              <br />
              <span className="text-teal-300">A Comprehensive Guide</span>
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
                October 15, 2017
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
                25 min read
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
              Tagbak Marine Park stands as one of the Philippines' most
              biodiverse marine sanctuaries, harboring an extraordinary array of
              marine life that represents the crown jewel of Southern Leyte's
              coastal ecosystem. This comprehensive guide documents over 200
              species of corals, fish, and invertebrates discovered during our
              extensive research expeditions.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-12">
              Our research team has spent countless hours underwater,
              meticulously cataloging the incredible biodiversity that thrives
              within these protected waters. From vibrant coral gardens to
              schools of tropical fish, Tagbak Marine Park offers a window into
              the pristine marine ecosystems of the past.
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
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777005357/Tagbak_Marine_Park_Cover_diggxh.jpg"
              alt="Vibrant coral garden at Tagbak Marine Park"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/tagbak12.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              The spectacular coral gardens of Tagbak Marine Park are home to a
              dazzling array of marine life
            </figcaption>
          </figure>
        </div>

        {/* Marine Biodiversity Section */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Marine Biodiversity Overview
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-6">
              The marine park encompasses 15.69 hectares of pristine coral reef
              ecosystem, featuring an remarkable diversity of marine species.
              Our comprehensive surveys have identified distinct habitat zones,
              each supporting unique assemblages of marine organisms.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h3 className="text-2xl font-bold text-teal-600 mb-2">50+</h3>
                <p className="text-gray-700 font-medium">Hard Coral Species</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">120+</h3>
                <p className="text-gray-700 font-medium">Fish Species</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">
                  30+
                </h3>
                <p className="text-gray-700 font-medium">
                  Invertebrate Species
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 font-light">
              The coral formations range from massive brain corals to delicate
              branching species, creating complex three-dimensional structures
              that provide shelter and feeding grounds for countless marine
              organisms. The fish communities include both resident species and
              seasonal visitors, creating a dynamic ecosystem that changes
              throughout the year.
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
              alt="Diverse fish species swimming among corals"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/230918_4180.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Schools of tropical fish create living rainbows above the coral
              formations
            </figcaption>
          </figure>
        </div>

        {/* Species Highlights Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notable Species Discoveries
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Among our most significant findings are several species of
              conservation concern, including juvenile green sea turtles,
              Napoleon wrasse, and various species of grouper that use the park
              as a nursery ground. The presence of these indicator species
              confirms the exceptional health of the marine ecosystem.
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-6 my-8 bg-teal-50 p-6 rounded-r-xl">
              <p className="text-lg italic text-gray-700 mb-4">
                "The biodiversity we've documented at Tagbak Marine Park rivals
                that of world-renowned marine sanctuaries. This ecosystem
                represents a living library of marine species that must be
                preserved for future generations."
              </p>
              <cite className="text-gray-600 font-semibold">
                Dr. Maria Santos, Marine Biologist
              </cite>
            </blockquote>

            <p className="text-lg leading-relaxed text-gray-700">
              The invertebrate communities are equally impressive, with colorful
              sea stars, giant clams, and intricate coral polyps creating a
              vibrant underwater tapestry. Many of these species serve critical
              ecological roles, from filtering water to providing calcium
              carbonate for reef structure.
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
              alt="Green sea turtle gliding over coral reef"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/close1.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              A juvenile green sea turtle, one of the park's most cherished
              residents
            </figcaption>
          </figure>
        </div>

        {/* Conservation Implications */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conservation Implications
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              This comprehensive biodiversity assessment provides crucial
              baseline data for conservation planning and management decisions.
              The remarkable species richness documented here underscores the
              critical importance of maintaining strict protection measures
              within the marine park boundaries.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              Our findings will inform adaptive management strategies, helping
              ensure that Tagbak Marine Park continues to serve as a refuge for
              marine biodiversity in an era of increasing environmental
              pressures. The data collected forms the foundation for long-term
              monitoring programs that will track ecosystem health and species
              population trends over time.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "Biodiversity",
            "Marine Research",
            "Conservation",
            "Tagbak Marine Park",
            "Species Documentation",
          ].map((tag, index) => (
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

export default FloraAndFauna;
