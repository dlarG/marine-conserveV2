// Review.jsx
import { Star } from "lucide-react";
import useScrollAnimation from "../../utilities/useScrollAnimation";

const ReviewCard = ({ review, index }) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${
          index * 0.12
        }s, transform 0.6s ease-out ${index * 0.12}s`,
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">{renderStars(review.rating)}</div>

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed flex-grow mb-6 italic">
        "{review.review}"
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400 mb-6 font-medium tracking-wide uppercase">
        {review.date}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-6">
        {/* Reviewer Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={review.image}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Name & Role */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {review.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">{review.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Review = () => {
  const [headerRef, headerIsVisible] = useScrollAnimation({
    threshold: 0.2,
  });

  const [ctaRef, ctaIsVisible] = useScrollAnimation({
    threshold: 0.3,
  });

  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Marine Biology Student",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "An incredible experience that changed my perspective on marine conservation. The team's dedication to coral restoration is truly inspiring. I learned so much during my volunteer program.",
      date: "March 2024",
    },
    {
      id: 2,
      name: "David Chen",
      role: "PADI Divemaster",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "As a diving professional, I've seen many conservation projects, but GREEN Inc. stands out. Their scientific approach and community involvement create real, measurable results.",
      date: "February 2024",
    },
    {
      id: 3,
      name: "Maria Santos",
      role: "Local Community Leader",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "GREEN Inc. has transformed our community's relationship with the ocean. They've created jobs, educated our youth, and our reefs are showing signs of recovery after years of decline.",
      date: "January 2024",
    },
    {
      id: 4,
      name: "James Walker",
      role: "Environmental Photographer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "Documenting GREEN Inc.'s work has been one of the most rewarding projects of my career. The before-and-after transformation of their restoration sites is nothing short of miraculous.",
      date: "December 2023",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
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
            What Our
            <br />
            <span className="text-teal-600 text-4xl font-semibold uppercase tracking-wide">
              Community Says
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear from volunteers, partners, and community members about their
            experience with GREEN Inc.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="mt-16 text-center"
          style={{
            opacity: ctaIsVisible ? 1 : 0,
            transform: ctaIsVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <p className="text-gray-600 mb-6">
            Join hundreds of satisfied volunteers and partners
          </p>
          <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-teal-500/25">
            Share Your Experience
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
