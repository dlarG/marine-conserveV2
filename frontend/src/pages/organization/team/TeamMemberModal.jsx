import { useState, useEffect } from "react";

const TeamMemberModal = ({ isOpen, onClose, member }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 50);
    } else {
      document.body.style.overflow = "unset";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !member) return null;

  const memberStories = {
    "Jerome Jack Napala": {
      story: [
        "Growing up in the coastal communities of Southern Leyte, Jerome Jack Napala developed an intimate connection with the ocean from an early age. As a child, he spent countless hours exploring the vibrant coral reefs that would later become his life's work. The underwater world wasn't just a playground—it was his classroom, teacher, and eventually, his calling.",
        "After completing his formal education in Marine Biology, Jerome noticed disturbing changes in the reefs he had known since childhood. The once-thriving coral ecosystems were showing signs of bleaching, damage from destructive fishing practices, and the impacts of climate change. Rather than simply documenting the decline, Jerome decided to take action.",
        "With little more than determination, plastic bottles, and ropes, he established the first coral nursery nearly two decades ago. What started as a small experiment has grown into one of the most successful community-based coral restoration programs in the Philippines. His innovative techniques, combining traditional knowledge with scientific methodology, have restored hectares of damaged reef systems.",
        "Today, as CEO of Green Inc., Jerome leads a team of dedicated marine conservationists while continuing to dive regularly in the waters he has worked so hard to protect. His vision extends beyond coral restoration—he's building a movement that empowers local communities to become stewards of their marine resources for generations to come.",
      ],
    },
    "Christian Polo": {
      story: [
        "Christian Polo's journey into marine conservation began in the most organic way possible—through his love for diving. As a young fisherman's son in Sogod Bay, Christian learned to navigate the waters before he could ride a bicycle. The sea provided for his family, and in return, he developed a profound respect for its delicate balance.",
        "His natural affinity for the underwater world led him to pursue PADI Divemaster certification, where he discovered his true passion: coral gardening. Christian possesses an almost intuitive understanding of coral health. He can spot signs of stress or disease long before they become visible to the untrained eye, a skill that has proven invaluable to the nursery's success.",
        "As Green Inc.'s senior Coral Jardinero, Christian spends more hours underwater than on land. His daily routine involves carefully monitoring coral fragments, transplanting healthy specimens to restoration sites, and training new team members in the meticulous art of coral propagation. His hands have literally touched thousands of corals, each one receiving the same careful attention as the first.",
        "Christian's dedication extends beyond the physical work. He's become a mentor to younger divers and an ambassador for marine conservation in his community. His story demonstrates that formal education isn't the only path to becoming a marine scientist—sometimes, the greatest expertise comes from a lifetime of direct experience and genuine love for the ocean.",
      ],
    },
    "Jollibee Looc": {
      story: [
        "Jollibee 'Jobs' Looc represents the new generation of Filipino marine biologists who combine academic excellence with field expertise. From her university days, she distinguished herself through her meticulous research methodology and her ability to communicate complex scientific concepts to community audiences.",
        "After earning her degree in Marine Biology and her PADI Advanced Open Water certification, Jobs faced a challenge common to many young scientists: the gap between academic training and real-world conservation work. Green Inc. provided the bridge she needed. Under the mentorship of experienced conservationists, she developed practical skills that no classroom could teach.",
        "Her work at Green Inc. has encompassed everything from coral health assessments to fish population surveys and community education programs. Jobs has a particular talent for data analysis, helping the organization track the long-term success of restoration efforts and identify areas needing additional attention. Her research has contributed to improving nursery techniques and increasing coral survival rates.",
        "Jobs believes that science should serve communities, not just journals. She regularly leads workshops for local fisherfolk, translating scientific findings into actionable knowledge they can use in their daily lives. Her career trajectory shows how targeted mentorship and hands-on experience can transform passionate students into effective conservation leaders.",
      ],
    },
    "Nova Almine": {
      story: [
        "Nova Almine's connection to the ocean is deeply personal. Growing up in Southern Leyte, she witnessed firsthand how healthy marine ecosystems sustain coastal communities—and how quickly things can deteriorate when those ecosystems are threatened. These early observations planted the seeds for her future career in marine conservation.",
        "As an undergraduate marine biology student, Nova sought opportunities to apply her learning beyond the laboratory. She discovered Green Inc. during her search for meaningful field experience, and the match proved transformative for both her and the organization. Her fresh perspective and academic knowledge complemented the team's practical expertise perfectly.",
        "During her time with Green Inc., Nova has developed specialties in marine ecosystem assessment and restoration monitoring. She's particularly skilled at identifying subtle changes in reef health indicators, a talent that makes her invaluable during long-term monitoring projects. Her careful documentation has helped build a comprehensive database tracking the recovery of restoration sites over multiple years.",
        "Now a certified PADI Advanced Open Water diver, Nova combines her scientific training with deep personal commitment. She's become an advocate for getting more young people, especially women, involved in marine science and conservation. Nova's journey from concerned local student to skilled marine biologist exemplifies the talent and dedication present in coastal communities across the Philippines.",
      ],
    },
    "Charlotte Henriksen": {
      story: [
        "Charlotte Henriksen's story is one of the ocean's magnetic pull on those who grow up near its shores. Spending her childhood in and on the water, she never considered the sea as separate from her identity—it was simply home. This profound connection shaped her worldview and eventually her career path.",
        "As a marine biologist with PADI Rescue Diver certification, Charlotte brings a unique combination of scientific knowledge and safety expertise to the Green Inc. team. Her rescue training ensures that field operations prioritize team safety without compromising research objectives—a balance that's crucial when conducting challenging underwater work in remote locations.",
        "Beyond her field responsibilities, Charlotte has become known as the team's 'Office Runner'—the person who keeps everything organized and running smoothly behind the scenes. From coordinating logistics for research expeditions to managing data and communications, she handles the administrative work that makes field conservation possible.",
        "Charlotte's versatility reflects the reality of conservation work: success depends not only on scientific expertise but also on organizational skills, safety consciousness, and the ability to wear many hats. Her dedication to protecting marine environments, combined with her practical approach to getting things done, makes her an indispensable member of the Green Inc. family.",
      ],
    },
    "Jesse Lou Tinapay": {
      story: [
        "Jesse Lou Tinapay brings a level of experience and expertise that few in the conservation field can match. With over 3,000 completed dives and a background as a PADI Open Water Scuba Instructor, he has spent more time underwater than most people spend on land in a given year.",
        "Before joining Green Inc., Jesse served as the Liaison Officer for Coral Cay Conservation, an international organization dedicated to protecting coral reefs. This experience gave him a global perspective on marine conservation while deepening his commitment to protecting the reefs of his home country. His transition to Green Inc. represented a homecoming—a chance to apply world-class expertise to local challenges.",
        "As Liaison Officer, Jesse serves as the vital bridge between Green Inc. and the communities, government agencies, and partner organizations that make their work possible. His diplomatic skills, combined with his technical diving expertise, allow him to communicate effectively with everyone from village elders to international scientists.",
        "Jesse's teaching background continues to serve the organization well. He leads training programs for new team members and community volunteers, sharing techniques refined over thousands of dives. His patient, encouraging approach helps novice divers develop confidence while maintaining the rigorous safety standards essential for conservation diving operations.",
      ],
    },
  };

  const stories = memberStories[member.name]?.story || [
    "A dedicated member of the Green Inc. team.",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-500 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            style={{ cursor: "pointer" }}
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Sticky Hero Image Section */}
          <div className="relative h-72 md:h-80 flex-shrink-0 overflow-hidden rounded-t-3xl">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

            {/* Name and Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {member.name}
              </h2>

              {/* Role Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {member.role.split(", ").map((role, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-medium rounded-full border border-white/30"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Specialty Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  {member.specialty}
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <span className="text-sm text-gray-500 font-medium">
                Connect:
              </span>
              <div className="flex gap-2">
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Twitter/X */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title="Email"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Life Story Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Life Story
              </h3>

              {stories.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))}

              {/* Quote Block */}
              <blockquote className="border-l-4 border-teal-500 pl-6 my-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-r-xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "The ocean has given me everything—my livelihood, my purpose,
                  and my home. Every coral I plant is a small thank you."
                </p>
                <cite className="text-gray-600 font-semibold">
                  — {member.name}
                </cite>
              </blockquote>
            </div>

            {/* Close Button Bottom */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberModal;
