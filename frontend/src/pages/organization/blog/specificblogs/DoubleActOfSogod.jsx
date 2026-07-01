import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoubleActOfSogod = () => {
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
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384386/P5250160_qmlygb.jpg"
            alt="Crown of thorns sea stars (COTS) in Sogod Bay"
            className="w-full h-[110%] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&h=800&fit=crop&q=80";
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
              Possible Double Act in{" "}
              <span className="text-green-300">Sogod Bay?</span>
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
                December 5, 2024
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
                12 min read
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
              Some intriguing news from our recent reef monitoring dives: an
              overseas echinoderm expert, after reviewing photo submissions,
              believes we may be looking at two different species of crown of
              thorns sea stars (COTS) in Sogod Bay - our usual{" "}
              <em>Acanthaster solaris</em> and the less commonly encountered{" "}
              <em>Acanthaster brevispinus</em>, known for its shorter spines and
              flatter profile.
            </p>

            <p className="text-lg leading-relaxed text-gray-600 mb-12">
              This discovery, while still preliminary, could significantly
              impact our understanding of marine biodiversity in Sogod Bay and
              influence our approach to COTS monitoring and control strategies.
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
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384371/P5250116_lbticc.jpg"
              alt="Crown of thorns starfish on coral reef"
              className="w-full mb-5 h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <img
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384376/P5250118_ul6ohd.jpg"
              alt="Crown of thorns starfish on coral reef"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Crown of thorns sea star specimen observed during reef monitoring
              dive in Sogod Bay
            </figcaption>
          </figure>
        </div>

        {/* Expert Identification Section */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Expert Identification Analysis
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The photos shown here, taken during one of our COTS monitoring
              dives, caught the expert's attention. The specimen displayed
              several traits more typical of <em>A. brevispinus</em>:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">
                  Short, Blunt Spines
                </h3>
                <p className="text-gray-700 text-sm">
                  Distinctive shorter spines compared to typical A. solaris
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-indigo-600 mb-2">
                  Flatter Profile
                </h3>
                <p className="text-gray-700 text-sm">
                  Less inflated body disc than A. solaris
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-emerald-600 mb-2">
                  Fewer Arms
                </h3>
                <p className="text-gray-700 text-sm">
                  Less arms than expected from typical A. solaris
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              These morphological differences suggest we might be observing a
              second species of crown of thorns in our waters, which would have
              significant implications for our understanding of local marine
              ecosystem dynamics.
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
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop&q=80"
              alt="Underwater reef monitoring research"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Our research team conducting COTS monitoring dives in Sogod Bay
            </figcaption>
          </figure>
        </div>

        {/* Important Notes Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Important Considerations
            </h2>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
              <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Preliminary Findings
              </h3>
              <ul className="text-amber-700 space-y-2">
                <li>
                  <strong>Visual assessment only:</strong> No physical samples
                  or genetic work has been done yet
                </li>
                <li>
                  <strong>Habitat preferences:</strong> A. brevispinus is known
                  to prefer sandy or soft-bottom habitats
                </li>
                <li>
                  <strong>Ecological impact:</strong> Unlike A. solaris, A.
                  brevispinus is not a major coral predator
                </li>
                <li>
                  <strong>Management implications:</strong> Having both species
                  may influence our monitoring and control approaches
                </li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              The potential presence of both species in Sogod Bay, if confirmed,
              could mean different ecological roles for each species. This
              discovery highlights the complexity of marine ecosystems and the
              importance of detailed species identification in conservation
              efforts.
            </p>
          </div>
        </div>

        {/* Call for Photos Section */}
        <div
          className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-8 h-8 text-teal-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Call for Photos & Observations
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              If you're diving in the Sogod Bay area, we need your help to
              gather more evidence:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-teal-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Capture Photos</h3>
                <p className="text-gray-600 text-sm">
                  Clear, close-up shots of any COTS you encounter - whole body
                  and spine detail
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Record Data</h3>
                <p className="text-gray-600 text-sm">
                  Note depth, substrate type, and exact location of the
                  observation
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Share & Tag</h3>
                <p className="text-gray-600 text-sm">
                  Share photos with us or tag our page - we'll forward them to
                  expert contacts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              This discovery, while still preliminary and requiring further
              investigation, opens exciting questions about Sogod Bay's marine
              biodiversity. The potential presence of two distinct COTS species
              could reshape our understanding of local ecosystem dynamics and
              inform more targeted conservation strategies.
            </p>

            <blockquote className="border-l-4 border-purple-500 pl-6 my-8 bg-purple-50 p-6 rounded-r-xl">
              <p className="text-lg italic text-gray-700 mb-4">
                "Let's keep observing, learning, and protecting our reefs. Every
                observation contributes to our growing understanding of these
                complex marine ecosystems."
              </p>
              <cite className="text-gray-600 font-semibold">
                Captain Roberto Cruz, Marine Researcher
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "COTS Monitoring",
            "Species Identification",
            "Marine Research",
            "Sogod Bay",
            "Crown of Thorns",
            "Biodiversity",
          ].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Share & Navigation */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate("/blogs")}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold transition-colors duration-300"
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

export default DoubleActOfSogod;
