// FAQ.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useScrollAnimation from "../../utilities/useScrollAnimation";

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px",
  });

  return (
    <div
      ref={ref}
      className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-teal-200"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.5s ease-out ${
          index * 0.08
        }s, transform 0.5s ease-out ${index * 0.08}s`,
      }}
    >
      <button
        onClick={onToggle}
        className="cursor-pointer w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-8">
          {faq.question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-teal-600" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headerRef, headerIsVisible] = useScrollAnimation({
    threshold: 0.2,
  });
  const [contactRef, contactIsVisible] = useScrollAnimation({
    threshold: 0.3,
  });

  const faqs = [
    {
      question: "How does GREEN Inc. restore damaged coral reefs?",
      answer:
        "We employ multiple science-based restoration techniques including coral fragmentation, micro-fragmentation, and larval propagation. Our team carefully selects resilient coral species and attaches them to degraded reef areas using environmentally safe materials. We monitor growth rates and survival quarterly to ensure long-term success.",
    },
    {
      question: "Do I need diving experience to volunteer?",
      answer:
        "Not at all! While some programs require certification, we offer opportunities for all skill levels. Non-divers can participate in beach cleanups, data entry, community education, and surface support. For those interested in underwater work, we provide PADI certification courses from beginner to professional levels.",
    },
    {
      question: "Where exactly is your conservation site located?",
      answer:
        "Our main operation is based in Malitbog, Southern Leyte, Philippines. We work across multiple sites in Sogod Bay, which is recognized as one of the most biodiverse marine ecosystems in the Coral Triangle. The area features over 400 species of coral and 900 species of reef fish.",
    },
    {
      question: "How is my donation used by the organization?",
      answer:
        "Transparency is core to our values. 78% of donations go directly to field operations including coral planting materials, equipment maintenance, and local staff salaries. 15% supports research and monitoring, and 7% covers administrative costs. We publish detailed annual financial reports available on our website.",
    },
    {
      question: "Can I participate in multiple programs during my stay?",
      answer:
        "Absolutely! Many volunteers combine programs for a comprehensive experience. You might do coral restoration in the morning, marine debris removal in the afternoon, and COTS monitoring on night dives. We customize schedules based on your interests, skills, and duration of stay.",
    },
    {
      question: "What makes GREEN Inc. different from other marine NGOs?",
      answer:
        "We focus on long-term, science-driven impact rather than short-term projects. Our team includes marine biologists, local community leaders, and professional divers who work together year-round. We're deeply integrated with the Malitbog community, creating sustainable conservation that benefits both ecosystems and local livelihoods.",
    },
    {
      question: "Do you offer internship or research opportunities?",
      answer:
        "Yes! We partner with universities worldwide to host marine biology students and researchers. Our site provides excellent conditions for thesis research, with topics ranging from coral physiology to socio-economic impacts of conservation. We also offer structured internship programs lasting 2-6 months.",
    },
    {
      question: "What is the best time of year to volunteer?",
      answer:
        "The dry season from November to May offers the best conditions for underwater work with excellent visibility and calm seas. However, we operate year-round and the wet season (June-October) can be rewarding for those interested in nursery maintenance and community programs. Water temperatures remain warm (26-29°C) throughout the year.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Frequently Asked
            <br />
            <span className="text-teal-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our conservation programs,
            volunteering, and how you can make a difference.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Still Have Questions */}
        <div
          ref={contactRef}
          className="mt-16 text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 lg:p-12 border border-teal-100"
          style={{
            opacity: contactIsVisible ? 1 : 0,
            transform: contactIsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Can't find the answer you're looking for? Reach out to our team and
            we'll get back to you within 24 hours.
          </p>
          <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5">
            Contact Our Team
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
