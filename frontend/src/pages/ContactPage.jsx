import { useState, useEffect } from "react";
import { Send, MapPin, Mail, Phone, Loader2 } from "lucide-react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

// Map component with maximize/minimize controls
const MapWithControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Lock body scroll when maximized
  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMaximized]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMaximized(false);
    };
    if (isMaximized) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMaximized]);

  // Google Maps embed URL - using place mode to avoid "place info couldn't load"
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3924.5!2d124.997157!3d10.167441!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDEwJzAyLjgiTiAxMjTCsDU5JzQ5LjgiRQ!5e0!3m2!1sen!2sph!4v1234567890";

  return (
    <>
      {/* Normal Map */}
      <div
        className={`rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-200 transition-all duration-300 ${
          isMaximized ? "hidden" : "block"
        }`}
        style={{ height: isMaximized ? "0" : "24rem" }}
      >
        <div className="relative h-full">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GREEN Inc. Location - Casa Florida, Malitbog, Southern Leyte"
          />
          {/* Maximize button */}
          <button
            onClick={() => setIsMaximized(true)}
            className="absolute top-3 right-3 bg-white rounded-lg shadow-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200 z-10"
            title="Maximize map"
          >
            ⛶ Maximize
          </button>
        </div>
      </div>

      {/* Maximized Map Overlay */}
      {isMaximized && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-4 sm:inset-8 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GREEN Inc. Location - Casa Florida, Malitbog, Southern Leyte"
              className="rounded-2xl"
            />
            {/* Controls bar */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => setIsMaximized(false)}
                className="bg-white rounded-lg shadow-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                title="Minimize map"
              >
                ✕ Minimize
              </button>
            </div>
            {/* Close overlay by clicking outside */}
            <button
              onClick={() => setIsMaximized(false)}
              className="absolute inset-0 -z-10"
              aria-label="Close map"
            />
          </div>
        </div>
      )}
    </>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | GREEN Inc.";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:10000"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for reaching out! We'll get back to you within 1-2 business days.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-700 to-teal-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-10">
            Get in Touch
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Have questions about our programs, courses, or conservation work?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reach out to us through any of these channels. We're here to
                  help you start your journey in marine conservation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Location
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Sogod Bay, Southern Leyte
                      <br />
                      Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Email
                    </h3>
                    <a
                      href="mailto:greensouthernleyte@gmail.com"
                      className="text-teal-700 text-sm mt-1 hover:underline"
                    >
                      greensouthernleyte@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Phone
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      +63 912 345 6789
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3">
                  Follow Our Work
                </h3>
                <a
                  href="https://www.facebook.com/GREENIncorporatedSogodBay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-200 text-teal-700 text-sm hover:bg-teal-50 transition-colors"
                >
                  Facebook Page →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Fill out the form below and we'll respond as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Juan Dela Cruz"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-4 rounded-lg text-sm ${
                        submitStatus.type === "success"
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section id="location" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Find Us in Sogod Bay
            </h2>
            <p className="text-gray-600 text-sm">
              We're located in one of the most biodiverse marine areas in the
              Philippines.
            </p>
          </div>

          <MapWithControls />

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">
                📍 Casa Florida
              </span>
              <br />
              Malitbog Street, Malitbog, 6603 Eastern Visayas, Philippines
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=10.167441,124.997157"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-teal-700 text-sm font-medium hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
