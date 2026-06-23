import { Mail, MapPin, Phone } from "lucide-react";

const Facebook = ({ className }) => (
  <svg
    className={className}
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

const Twitter = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = ({ className }) => (
  <svg
    className={className}
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

const Linkedin = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dfsxmtyxk/image/upload/v1771384195/GREEN_stouub.jpg"
                  alt="GREEN Inc. Logo"
                  className="rounded-full"
                />
              </div>
              <span className="text-white font-semibold">GREEN Inc.</span>
            </div>
            <p className="text-gray-400 text-sm">
              Research and conservation efforts to protect coral reefs and
              marine ecosystems in Southern Leyte and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  className="hover:text-white transition-colors text-sm"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-white transition-colors text-sm"
                >
                  Impact
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="hover:text-white transition-colors text-sm"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#donate"
                  className="hover:text-white transition-colors text-sm"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 text-base">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                >
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                >
                  News & Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                >
                  Annual Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 text-base">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  GREEN Inc.
                  <br />
                  Malitbog 6603, Southern Leyte, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2 flex-wrap">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  +63 (910) 976-0288
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  info@sogodbaycoralrestoration.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GREEN Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/GREENIncorporatedSogodBay"
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
