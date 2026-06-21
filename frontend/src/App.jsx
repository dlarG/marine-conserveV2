import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

import Hero from "./pages/home/Hero";
import WhyUs from "./pages/home/WhyUs";
import Review from "./pages/home/Review";
import FAQ from "./pages/home/Faq";
import CTA from "./pages/home/CTA";

import DiscoverScubaDive from "./pages/courses/PADI/DSD";
import OpenWater from "./pages/courses/PADI/OpenWater";
import AdvancedOpenWater from "./pages/courses/PADI/AdvancedOpenWater";
import RescueDiver from "./pages/courses/PADI/RescueDiver";
import Divemaster from "./pages/courses/PADI/Divemaster";

import MarinePhotography from "./pages/courses/Specialty/MarinePhotography";

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

const AdvancedOpenWaterPage = () => {
  return <AdvancedOpenWater />;
};

const DiscoverScubaDivingPage = () => {
  return (
    <div>
      <DiscoverScubaDive />
    </div>
  );
};

const OpenWaterPage = () => {
  return <OpenWater />;
};

const RescueDiverPage = () => {
  return <RescueDiver />;
};

const DivemasterPage = () => {
  return <Divemaster />;
};

const MarinePhotographyPage = () => {
  return <MarinePhotography />;
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
          <Route
            path="/courses/padi/open-water-diver"
            element={<OpenWaterPage />}
          />
          <Route
            path="/courses/padi/advanced-open-water-diver"
            element={<AdvancedOpenWaterPage />}
          />
          <Route
            path="/courses/padi/rescue-diver"
            element={<RescueDiverPage />}
          />
          <Route path="/courses/padi/divemaster" element={<DivemasterPage />} />
          <Route
            path="/courses/specialty/marine-photography"
            element={<MarinePhotographyPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
