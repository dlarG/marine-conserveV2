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
import DeepDiver from "./pages/courses/Specialty/DeepDiver";
import DiveNavigation from "./pages/courses/Specialty/DiveNavigation";
import NightDiver from "./pages/courses/Specialty/NightDiver";
import PerformanceBuoyancy from "./pages/courses/Specialty/PerformanceBouyancy";

import TeamHero from "./pages/organization/team/TeamHero";
import TeamBody from "./pages/organization/team/TeamBody";

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

const TeamPage = () => {
  return (
    <div>
      <Navbar />
      <TeamHero />
      <TeamBody />
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

const DeepDiverPage = () => {
  return <DeepDiver />;
};

const DiveNavigationPage = () => {
  return <DiveNavigation />;
};

const NightDiverPage = () => {
  return <NightDiver />;
};

const PerformanceBuoyancyPage = () => {
  return <PerformanceBuoyancy />;
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
            path="/courses/special/marine-photography"
            element={<MarinePhotographyPage />}
          />
          <Route
            path="/courses/special/deep-diver"
            element={<DeepDiverPage />}
          />
          <Route
            path="/courses/special/dive-navigation"
            element={<DiveNavigationPage />}
          />
          <Route
            path="/courses/special/night-diver"
            element={<NightDiverPage />}
          />
          <Route
            path="/courses/special/peak-performance-buoyancy"
            element={<PerformanceBuoyancyPage />}
          />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
