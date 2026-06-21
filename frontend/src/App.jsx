import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

import Hero from "./pages/home/Hero";
import WhyUs from "./pages/home/WhyUs";
import Review from "./pages/home/Review";
import FAQ from "./pages/home/Faq";
import CTA from "./pages/home/CTA";

import DiscoverScubaDive from "./pages/courses/PADI/DSD";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyUs />
      <Review />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

const DiscoverScubaDivingPage = () => {
  return (
    <div>
      <DiscoverScubaDive />
    </div>
  );
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/courses/padi/discover-scuba-diving"
            element={<DiscoverScubaDivingPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
