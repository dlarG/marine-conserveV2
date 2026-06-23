import { useState, useEffect, useRef } from "react";
import { ChevronDown, Heart, Menu, X, FileText } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Inline social SVGs (lucide-react doesn't include these) ─────────────────
const FacebookIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// ─── Nav data ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Organization",
    items: [
      { name: "History", path: "/organization/history" },
      { name: "Mission & Vision", path: "/organization/mission-vision" },
      { name: "The Team", path: "/team" },
      { name: "Our Partners", path: "/organization/our-partners" },
      { name: "Blogs", path: "/organization/blogs" },
      { name: "News", path: "/organization/news" },
    ],
  },
  {
    label: "Our Courses",
    // Two-column layout for courses
    columns: [
      {
        title: "PADI Diver Courses",
        items: [
          {
            name: "Discover Scuba Diving",
            path: "/courses/padi/discover-scuba-diving",
          },
          { name: "Open Water Diver", path: "/courses/padi/open-water-diver" },
          {
            name: "Advanced Open Water Diver",
            path: "/courses/padi/advanced-open-water-diver",
          },
          { name: "EFR", path: "/courses/padi/efr" },
          { name: "Rescue Diver", path: "/courses/padi/rescue-diver" },
          { name: "Divemaster", path: "/courses/padi/divemaster" },
        ],
      },
      {
        title: "Specialty Courses",
        items: [
          {
            name: "Marine Photography",
            path: "/courses/special/marine-photography",
          },
          { name: "Deep Diver", path: "/courses/special/deep-diver" },
          { name: "Navigation", path: "/courses/special/dive-navigation" },
          { name: "Night Diver", path: "/courses/special/night-diver" },
          {
            name: "Peak Performance Buoyancy",
            path: "/courses/special/peak-performance-buoyancy",
          },
        ],
      },
    ],
  },
  {
    label: "Volunteer",
    items: [
      { name: "Coral Conservation", path: "/volunteer/coral-conservation" },
      {
        name: "Marine Debris Removal",
        path: "/volunteer/marine-debris-removal",
      },
      { name: "COTS Monitoring", path: "/volunteer/cots-monitoring" },
      {
        name: "Scientific Data Collection",
        path: "/volunteer/scientific-data-collection",
      },
    ],
  },
  {
    label: "Contact Us",
    items: [
      { name: "Get in Touch", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
      { name: "Location", path: "/contact/location" },
      { name: "Support", path: "/contact/support" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    Icon: FacebookIcon,
    href: "https://www.facebook.com/GREENIncorporatedSogodBay",
    label: "Facebook",
  },
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
];

// ─── Desktop dropdown (single column) ────────────────────────────────────────
function Dropdown({ label, items, scrolled }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const show = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 80);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const textColor = scrolled ? "#0f4c5c" : "rgba(255,255,255,0.93)";
  const hoverUnder = scrolled ? "#0d9488" : "rgba(255,255,255,0.6)";

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        style={{ color: textColor }}
        className="cursor-pointer uppercase relative flex items-center text-sm font-light tracking-wide py-2 px-4 rounded-md transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <span
          style={{ backgroundColor: hoverUnder }}
          className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"
        />
      </button>

      {/* Panel */}
      <div
        style={{
          display: open ? "block" : "none",
        }}
        className="absolute uppercase top-12 left-0 mt-1 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50"
      >
        <ul className="py-2">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-5 py-2.5 text-xs font-normal text-gray-600 hover:text-teal-700 hover:bg-teal-50 transition-colors duration-150"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Desktop dropdown (two columns for Courses) ──────────────────────────────
function CoursesDropdown({ label, columns, scrolled }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const show = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(false), 80);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const textColor = scrolled ? "#0f4c5c" : "rgba(255,255,255,0.93)";
  const hoverUnder = scrolled ? "#0d9488" : "rgba(255,255,255,0.6)";

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        style={{ color: textColor }}
        className="cursor-pointer uppercase relative flex items-center text-sm font-light tracking-wide py-2 px-4 rounded-md transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <span
          style={{ backgroundColor: hoverUnder }}
          className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"
        />
      </button>

      {/* Two-Column Panel */}
      <div
        style={{
          display: open ? "flex" : "none",
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50"
      >
        {columns.map((column, colIndex) => (
          <div
            key={column.title}
            className={`flex-1 min-w-[260px] ${
              colIndex === 0 ? "border-r border-gray-100" : ""
            }`}
          >
            {/* Column Title */}
            <div className="px-5 pt-4 pb-2">
              <h4 className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                {column.title}
              </h4>
            </div>

            {/* Column Items */}
            <ul className="pb-3">
              {column.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-5 py-2.5 text-xs font-normal text-gray-600 hover:text-teal-700 hover:bg-teal-50 transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile accordion (single column) ────────────────────────────────────────
function MobileAccordion({ label, items, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-[15px] font-medium text-gray-700 hover:text-teal-700 transition-colors"
      >
        {label}
        <ChevronDown
          size={16}
          className="text-teal-500 transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? `${items.length * 48}px` : "0",
          overflow: "hidden",
          transition: "max-height 0.26s ease",
        }}
      >
        <ul className="pb-3">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-3 px-8 py-2.5 text-sm text-gray-500 hover:text-teal-600 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Mobile accordion (two columns for Courses) ──────────────────────────────
function MobileCoursesAccordion({ label, columns, onClose }) {
  const [open, setOpen] = useState(false);

  // Calculate total items for max-height
  const totalItems = columns.reduce((sum, col) => sum + col.items.length, 0);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-[15px] font-medium text-gray-700 hover:text-teal-700 transition-colors"
      >
        {label}
        <ChevronDown
          size={16}
          className="text-teal-500 transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? `${totalItems * 48 + 80}px` : "0",
          overflow: "hidden",
          transition: "max-height 0.26s ease",
        }}
      >
        <div className="pb-3">
          {columns.map((column) => (
            <div key={column.title} className="mb-2">
              {/* Mobile Column Title */}
              <h4 className="px-8 py-2 text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                {column.title}
              </h4>
              <ul>
                {column.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-500 hover:text-teal-600 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const socialColor = scrolled ? "#134e4a" : "rgba(255,255,255,0.85)";

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(13,148,136,0.1)"
            : "1px solid transparent",
          transition:
            "background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
        }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[100px]">
            {/* ── Logo ── */}
            <a href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <img
                src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384195/GREEN_stouub.jpg"
                alt="GREEN Inc."
                className="h-12 w-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-110"
              />
              <div className="leading-tight">
                <div
                  style={{
                    color: scrolled ? "#0f4c5c" : "#fff",
                    transition: "color 0.4s ease",
                  }}
                  className="text-[18px] font-bold tracking-tight"
                >
                  GREEN Inc.
                </div>
                <div
                  style={{
                    color: scrolled ? "#0d9488" : "rgba(255,255,255,0.65)",
                    transition: "color 0.4s ease",
                  }}
                  className="text-[9px] tracking-[0.2em] ml-0.5 uppercase font-medium"
                >
                  Sogod Bay
                </div>
              </div>
            </a>

            {/* ── Desktop nav — centered with all items including Contact ── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((nav) => {
                // Check if it's the Courses item with columns
                if (nav.columns) {
                  return (
                    <CoursesDropdown
                      key={nav.label}
                      label={nav.label}
                      columns={nav.columns}
                      scrolled={scrolled}
                    />
                  );
                }
                // Regular single-column dropdown
                return (
                  <Dropdown
                    key={nav.label}
                    label={nav.label}
                    items={nav.items}
                    scrolled={scrolled}
                  />
                );
              })}
            </div>

            {/* ── Right: Apply + Donate + Social ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      color: socialColor,
                      transition: "color 0.4s ease",
                    }}
                    className="hover:!text-teal-400 transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  backgroundColor: scrolled
                    ? "rgba(13,148,136,0.2)"
                    : "rgba(255,255,255,0.25)",
                }}
                className="w-px h-5"
              />

              {/* Apply */}
              <Link
                to="/apply"
                style={{
                  color: scrolled ? "#0d9488" : "#fff",
                  borderColor: scrolled ? "#0d9488" : "rgba(255,255,255,0.7)",
                  transition: "all 0.4s ease",
                }}
                className="uppercase flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold border-2 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200"
              >
                <FileText size={14} className="flex-shrink-0" />
                Apply
              </Link>

              {/* Donate */}
              <Link
                to="/donate"
                className="uppercase flex items-center gap-2 px-5 py-2.5 bg-teal-600 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  boxShadow: scrolled
                    ? "0 2px 14px rgba(13,148,136,0.4)"
                    : "0 2px 14px rgba(0,0,0,0.25)",
                }}
              >
                Donate
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="lg:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              style={{ color: scrolled ? "#0f4c5c" : "#fff" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          style={{
            maxHeight: mobileOpen ? "100svh" : "0",
            opacity: mobileOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.32s ease, opacity 0.24s ease",
            backgroundColor: "rgba(255,255,255,0.99)",
            backdropFilter: "blur(18px)",
            borderTop: mobileOpen ? "1px solid rgba(13,148,136,0.1)" : "none",
          }}
          className="lg:hidden"
        >
          <div className="max-w-7xl mx-auto">
            {NAV_ITEMS.map((nav) => {
              // Check if it's the Courses item with columns for mobile
              if (nav.columns) {
                return (
                  <MobileCoursesAccordion
                    key={nav.label}
                    label={nav.label}
                    columns={nav.columns}
                    onClose={() => setMobileOpen(false)}
                  />
                );
              }
              // Regular single-column accordion
              return (
                <MobileAccordion
                  key={nav.label}
                  label={nav.label}
                  items={nav.items}
                  onClose={() => setMobileOpen(false)}
                />
              );
            })}

            {/* Mobile bottom strip */}
            <div className="px-5 py-4 space-y-3">
              {/* Apply button */}
              <Link
                to="/apply"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
              >
                <FileText size={16} />
                Apply Now
              </Link>

              {/* Donate + Social */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #0891b2)",
                  }}
                >
                  <Heart size={14} strokeWidth={2.5} />
                  Donate
                </Link>
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      <Icon size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
