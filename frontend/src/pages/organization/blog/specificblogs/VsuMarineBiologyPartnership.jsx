import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VsuMarineBiologyPartnership = () => {
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
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384122/partner_nx0qjo.jpg"
            alt="VSU Marine Biology students conducting research in Malitbog"
            className="w-full h-[110%] object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop&q=80";
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
              VSU Marine Biology Students Conduct Research:
              <br />
              <span className="text-teal-300">
                Corals and Fish Studies in Malitbog
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
                March 25, 2024
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
                7 min read
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
              As someone deeply passionate about environmental stewardship, I'm
              honored to have the opportunity to support students in their
              research endeavors. Whether it's assisting with data collection,
              offering guidance, or providing logistical support, I'm committed
              to empowering the next generation of environmental leaders.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-12">
              The partnership with Visayas State University represents a
              significant milestone in our mission to bridge academic research
              with grassroots conservation efforts. By providing students with
              hands-on field experience in Malitbog's rich marine ecosystems, we
              are investing in the future of marine science and environmental
              protection in the Philippines.
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
              src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384122/partner_nx0qjo.jpg"
              alt="VSU Marine Biology students conducting field research in Malitbog waters"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/vsu-students-research.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              VSU Marine Biology students prepare their equipment for coral and
              fish surveys in Malitbog, Southern Leyte
            </figcaption>
          </figure>
        </div>

        {/* Research Program Overview */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering the Next Generation of Marine Scientists
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-light mb-6">
              The collaboration between our organization and VSU's Marine
              Biology program has created invaluable opportunities for students
              to apply their classroom knowledge in real-world settings. The
              waters of Malitbog serve as an exceptional living laboratory,
              offering diverse marine habitats ranging from coral reefs to
              seagrass beds.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h3 className="text-2xl font-bold text-teal-600 mb-2">25+</h3>
                <p className="text-gray-700 font-medium">
                  Students Participated
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">4</h3>
                <p className="text-gray-700 font-medium">
                  Research Projects Conducted
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">10</h3>
                <p className="text-gray-700 font-medium">
                  Survey Sites Established
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 font-light">
              Throughout the program, students gained practical experience in
              underwater survey techniques, species identification, data
              collection protocols, and scientific analysis. These skills are
              essential for their future careers in marine conservation and
              research.
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
              alt="Students observing fish populations in Malitbog's reefs"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/fish-research.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Students document fish species diversity along established survey
              transects in Malitbog's thriving reef systems
            </figcaption>
          </figure>
        </div>

        {/* Coral & Fish Studies Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprehensive Coral and Fish Surveys
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The student research teams focused on two primary areas: coral
              reef health assessment and fish population dynamics. Using
              standardized survey methodologies, they collected valuable data
              that will contribute to both their academic requirements and our
              long-term monitoring database.
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-6 my-8 bg-teal-50 p-6 rounded-r-xl">
              <p className="text-lg italic text-gray-700 mb-4">
                "This field experience has been transformative for our students.
                Working alongside conservation practitioners in Malitbog has
                given them insights that no classroom lecture could ever
                provide. The partnership between academia and community-based
                conservation is exactly what marine science education needs."
              </p>
              <cite className="text-gray-600 font-semibold">
                Dr. Elena Rodriguez, VSU Marine Biology Faculty
              </cite>
            </blockquote>

            <p className="text-lg leading-relaxed text-gray-700">
              The coral surveys documented over 40 species of hard corals, with
              particular attention to indicators of reef health such as coral
              cover percentage, species diversity indices, and the presence of
              reef-building species. Fish surveys recorded more than 80 species
              across multiple trophic levels, providing insights into the
              ecosystem's food web dynamics.
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
              alt="VSU students receiving guidance from experienced researchers during field work"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/mentorship-field.jpg";
              }}
            />
            <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
              Experienced researchers provide mentorship and guidance to
              students during field data collection activities
            </figcaption>
          </figure>
        </div>

        {/* Mentorship & Support Section */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Mentorship and Logistical Support
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Beyond academic supervision, our team provided comprehensive
              logistical support to ensure the success of the research
              expedition. This included boat transportation to survey sites,
              diving equipment, safety briefings, and local knowledge about
              optimal research locations within the Malitbog marine area.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              We also facilitated meaningful interactions between students and
              local fishing communities, helping future scientists understand
              the human dimensions of marine conservation. These exchanges
              proved invaluable in demonstrating how scientific research can
              directly benefit community-based resource management.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              The partnership exemplifies our commitment to nurturing
              environmental leadership through education and hands-on
              experience. By investing in students today, we are cultivating the
              scientists, policymakers, and advocates who will protect our
              marine ecosystems tomorrow.
            </p>
          </div>
        </div>

        {/* Looking Forward Section */}
        <div
          className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Continuing the Partnership
            </h2>

            <p className="text-lg leading-relaxed text-gray-700">
              Building on the success of this collaboration, we are exploring
              opportunities to establish a formal internship program with VSU
              and other academic institutions. This would create sustainable
              pathways for students to engage in meaningful research while
              contributing to the conservation of Southern Leyte's marine
              heritage. The data collected will also be integrated into our
              management plans, ensuring that academic research directly informs
              conservation action.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Education", "Marine Research", "Collaboration"].map(
            (tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100"
              >
                {tag}
              </span>
            )
          )}
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

export default VsuMarineBiologyPartnership;
