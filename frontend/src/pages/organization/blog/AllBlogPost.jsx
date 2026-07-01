import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/Footer";

const AllBlogPost = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Research",
    "Conservation",
    "Community",
    "Monitoring",
    "Education",
  ];

  const blogPosts = [
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
      author: "Jerome Jack Napala",
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
      author: "Dr. Elena Rodriguez",
      featured: true,
    },
    {
      id: 3,
      title: "Possible Double Act in Sogod Bay? ",
      excerpt:
        "Some intriguing news from our recent reef monitoring dives: an overseas echinoderm expert, after reviewing photo submissions, believes we may be looking at two different species of crown of thorns sea stars (COTS) in Sogod Bay our usual Acanthaster solaris and the less commonly encountered Acanthaster brevispinus, known for its shorter spines and flatter profile.",
      category: "Community",
      date: "December 5, 2024",
      readTime: "12 min read",
      image:
        "https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384388/P7240134_pbxkyt.jpg",
      tags: [
        "Community Engagement",
        "Sustainable Fishing",
        "Cultural Heritage",
      ],
      author: "Captain Roberto Cruz",
      featured: false,
    },
    {
      id: 4,
      title: "The Ghost Net Crisis: Removing Deadly Debris from Sogod Bay",
      excerpt:
        "Our ongoing efforts to locate and remove abandoned fishing nets that continue to trap marine life, with over 500kg of ghost nets recovered this year.",
      category: "Conservation",
      date: "November 22, 2024",
      readTime: "18 min read",
      image:
        "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800&h=500&fit=crop&q=80",
      tags: ["Marine Debris", "Ghost Nets", "Wildlife Rescue"],
      author: "Sarah Thompson",
      featured: false,
    },
    {
      id: 5,
      title: "Underwater Photography: Documenting Marine Life for Science",
      excerpt:
        "The critical role of underwater photography in marine research, conservation documentation, and raising public awareness about ocean preservation.",
      category: "Research",
      date: "October 8, 2024",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=500&fit=crop&q=80",
      tags: ["Photography", "Documentation", "Marine Biology"],
      author: "Marcus Chen",
      featured: false,
    },
    {
      id: 6,
      title:
        "School Outreach: Teaching the Next Generation About Ocean Conservation",
      excerpt:
        "Our educational programs reach over 1,000 students annually, inspiring young minds to become future ocean advocates and marine scientists.",
      category: "Education",
      date: "September 14, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=500&fit=crop&q=80",
      tags: ["Education", "Youth Programs", "Environmental Awareness"],
      author: "Teacher Ana Reyes",
      featured: false,
    },
    {
      id: 7,
      title: "Climate Change Impact on Philippine Coral Reefs: A 10-Year Study",
      excerpt:
        "Comprehensive analysis of temperature records, bleaching events, and coral mortality rates across Southern Leyte's marine protected areas.",
      category: "Research",
      date: "August 29, 2024",
      readTime: "22 min read",
      image:
        "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=500&fit=crop&q=80",
      tags: ["Climate Change", "Coral Bleaching", "Long-term Study"],
      author: "Dr. James Liu",
      featured: false,
    },
    {
      id: 8,
      title: "Mangrove Restoration: Rebuilding Coastal Defenses",
      excerpt:
        "Our mangrove replanting program has restored 25 hectares of coastal wetlands, providing crucial habitat for marine species and storm protection.",
      category: "Conservation",
      date: "July 3, 2024",
      readTime: "14 min read",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=500&fit=crop&q=80",
      tags: ["Mangrove Restoration", "Coastal Protection", "Habitat Creation"],
      author: "Dr. Isabella Garcia",
      featured: false,
    },
    {
      id: 9,
      title: "Marine Protected Area Monitoring: Technology Meets Conservation",
      excerpt:
        "Advanced monitoring systems including underwater cameras, sensors, and drones help us track marine life recovery in our protected areas.",
      category: "Monitoring",
      date: "June 11, 2024",
      readTime: "16 min read",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80",
      tags: ["Technology", "Monitoring", "Marine Protected Areas"],
      author: "Tech Lead David Kim",
      featured: false,
    },
  ];

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

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const handleReadMore = (postId) => {
    navigate(`/organization/blog/${postId}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Research: "bg-blue-100 text-blue-800 border-blue-200",
      Conservation: "bg-green-100 text-green-800 border-green-200",
      Community: "bg-purple-100 text-purple-800 border-purple-200",
      Monitoring: "bg-orange-100 text-orange-800 border-orange-200",
      Education: "bg-pink-100 text-pink-800 border-pink-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <img
            src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384010/hero11_zrsbc0.jpg"
            alt="Marine conservation research and documentation"
            className="w-full h-[100%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer inline-flex items-center gap-2 mb-3 text-white/80 hover:text-white transition-colors duration-300 text-sm"
            >
              <svg
                className="w-4 h-4"
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

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              GREEN Inc. <span className="text-teal-300">Blog & Stories</span>
            </h1>

            <p className="text-base leading-relaxed text-white/90 max-w-2xl mx-auto">
              Discover our latest research findings, conservation success
              stories, and educational insights from Sogod Bay and beyond.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section
            className={`mb-12 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Articles
                </h2>
                <p className="text-sm text-gray-600">
                  Our most impactful research and conservation stories
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 delay-${
                    index * 100
                  }`}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            {post.author}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {post.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleReadMore(post.id)}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-lg font-medium text-xs transition-colors duration-300"
                      >
                        Read More
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
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Filters and Search */}
        <section
          className={`mb-10 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Posts Grid */}
        <section
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All Articles
                <span className="text-teal-600 ml-1.5 text-lg">
                  ({filteredPosts.length})
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                Comprehensive collection of our research and conservation work
              </p>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 delay-${
                    index * 50
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-[10px]">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-900">
                            {post.author}
                          </p>
                          <p className="text-[9px] text-gray-500">
                            {post.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleReadMore(post.id)}
                        className="cursor-pointer inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium text-xs transition-colors duration-300"
                      >
                        Read
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

                  {/* Tags */}
                  <div className="px-5 pb-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] rounded">
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.901-6.065 2.378l-.31.31A1 1 0 004.5 19H3a1 1 0 01-1-1V9a1 1 0 011-1h1.5a1 1 0 01.894 1.447l.31.31A7.962 7.962 0 0112 12.999c2.34 0 4.467-.901 6.065-2.378l.31-.31A1 1 0 0119.5 9H21a1 1 0 011 1v9a1 1 0 01-1 1h-1.5a1 1 0 01-.894-.553l-.31-.31A7.962 7.962 0 0112 15z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                No articles found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>

        <div
          className={`mt-8 text-center transform transition-all duration-1000 delay-500 ${
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
      <Footer />
    </div>
  );
};

export default AllBlogPost;
