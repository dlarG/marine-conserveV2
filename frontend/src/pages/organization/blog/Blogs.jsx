import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Featured blog posts
  const featuredPosts = [
    {
      id: 1,
      title: "Flora & Fauna of Tagbak Marine Park: A Comprehensive Guide",
      excerpt:
        "The first comprehensive guide documenting the rich marine biodiversity of Tagbak Marine Park, featuring over 200 species of corals, fish, and invertebrates.",
      category: "Research",
      date: "October 15, 2017",
      readTime: "25 min read",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1777005357/Tagbak_Marine_Park_Cover_diggxh.jpg",
      tags: ["Biodiversity", "Marine Research", "Conservation"],
      featured: true,
    },
    {
      id: 2,
      title:
        "Coral Restoration Success: A Big Step Forward for Malitbog's Ocean Reefs",
      excerpt:
        "A detailed report on our coral restoration project in Malitbog, showcasing significant reef recovery and community involvement over the past year.",
      category: "Monitoring",
      date: "July 18, 2025",
      readTime: "15 min read",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384083/coral-restoration_lqr4ot.jpg",
      tags: ["Coral Restoration", "Monitoring", "Success Stories"],
      featured: true,
    },
  ];

  // Latest blog posts
  const latestPosts = [
    {
      id: 4,
      title: "COTs Monitoring & Culling Update - Abgao, Malitbog ",
      excerpt:
        "Great news from the reef! Yesterday we completed a follow up dive in Abgao to assess the Crown of Thorns starfish (COTs) situation almost one month after our first culling effort. The results are encouraging:",
      category: "Cleanup",
      date: "May 24, 2025",
      readTime: "6 min read",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384090/cotss_gdjxco.jpg",
      tags: ["Community", "Education", "Sustainability"],
    },
    {
      id: 5,
      title:
        "(VSU) Marine Biology students conducted their corals and fish studies in Malitbog, Southern Leyte! ",
      excerpt:
        "As someone deeply passionate about environmental stewardship, I'm honored to have the opportunity to support students in their research endeavors. Whether it's assisting with data collection, offering guidance, or providing logistical support, I'm committed to empowering the next generation of environmental leaders.",
      category: "Partnership",
      date: "March 25, 2024",
      readTime: "7 min read",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384122/partner_nx0qjo.jpg",
      tags: ["Education", "Marine Research", "Collaboration"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleReadMore = (postId) => {
    navigate(`/organization/blog/${postId}`);
  };

  const handleViewAllPosts = () => {
    navigate("/organization/all-blogs");
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-teal-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-teal-900/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-emerald-900/5 to-transparent" />

        {/* Water wave pattern */}
        <div className="absolute -top-10 left-0 right-0 h-20">
          <svg
            className="w-full h-full text-teal-100"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
              opacity=".25"
            ></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Conservation{" "}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Latest research, success stories, and insights from our marine
            conservation work in Southern Leyte
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <div
            className={`mb-8 transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1.5 flex items-center gap-3">
              <span className="w-5 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-600"></span>
              Featured Stories
            </h3>
            <p className="text-sm text-gray-500">
              In-depth articles highlighting our major projects and achievements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`transform transition-all duration-700 delay-${
                  (index + 1) * 100
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
              >
                <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-4 left-4 text-white text-xs">
                      {post.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-medium rounded-full border border-teal-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta and Read Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                          {post.readTime}
                        </span>
                      </div>

                      <button
                        onClick={() => handleReadMore(post.id)}
                        className="cursor-pointer group inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 font-semibold text-xs"
                      >
                        Read Full Story
                        <svg
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Posts */}
        <div className="mb-12">
          <div
            className={`mb-8 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1.5 flex items-center gap-3">
              <span className="w-5 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-600"></span>
              Latest Updates
            </h3>
            <p className="text-sm text-gray-500">
              Recent stories and news from our conservation work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {latestPosts.map((post, index) => (
              <div
                key={post.id}
                className={`transform transition-all duration-700 delay-${
                  (index + 3) * 100
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
              >
                <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-2/5 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-${
                            index === 0
                              ? "1536922246285-5df38ea5d93b"
                              : "1551632436-cbf8dd35adfa"
                          }?w=400&h=300&fit=crop&q=80`;
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-teal-700 text-[10px] font-semibold rounded">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/5 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-gray-500">
                          {post.date}
                        </span>
                        <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                        <span className="text-[10px] text-gray-500">
                          {post.readTime}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-teal-50 text-teal-700 text-[10px] rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleReadMore(post.id)}
                          className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium text-xs flex items-center gap-1"
                        >
                          Read
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 md:p-10 border border-teal-100">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Updated with Our Conservation Journey
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Subscribe to our newsletter for regular updates on marine
                conservation projects, research findings, and community
                initiatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleViewAllPosts}
                  className="cursor-pointer group relative bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    <span>View All Blog Posts</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>

                <a
                  href="https://www.facebook.com/GREENIncorporatedSogodBay"
                  target="_blank"
                  className="cursor-pointer group border-2 border-teal-500 text-teal-600 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-50 transition-all duration-500 transform hover:scale-105"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    Subscribe to Newsletter
                    <svg
                      className="w-4 h-4 group-hover:rotate-12 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 transform rotate-180">
        <svg
          className="w-full h-full text-teal-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Blogs;
