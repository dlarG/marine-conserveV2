import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

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

import HistoryHero from "./pages/organization/history/HistoryHero";
import About1 from "./pages/organization/history/About1";
import About2 from "./pages/organization/history/About2";
import MissionHero from "./pages/organization/mission/MissionHero";
import MissionBody from "./pages/organization/mission/MissionBody";
import CoralRestoration from "./pages/courses/volunteer/CoralRestoration";
import DiveAgainstDebris from "./pages/courses/volunteer/DiveAgainstDebris";
import COTSMonitoring from "./pages/courses/volunteer/COTSMonitoring";
import DataCollection from "./pages/courses/volunteer/DataCollection";
import ApplyPage from "./pages/ApplyPage";
import DonatePage from "./pages/DonatePage";

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

const TeamPageSkeletonBody = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title area */}
        <div className="text-center mb-16">
          <div className="h-9 w-52 bg-gray-100 rounded-full mx-auto mb-6" />
          <div className="h-10 w-72 bg-gray-200 rounded mx-auto mb-4" />
          <div className="h-4 w-[min(46rem,90%)] bg-gray-100 rounded mx-auto" />
          <div className="h-4 w-[min(42rem,85%)] bg-gray-100 rounded mx-auto mt-3" />
        </div>

        {/* Carousel cards skeleton (3 columns desktop) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
            >
              <div className="h-96 bg-gray-100" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-2/3 bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
                <div className="h-4 w-4/6 bg-gray-100 rounded" />
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-20 bg-gray-100 rounded-full" />
                  <div className="h-6 w-24 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile list skeleton */}
        <div className="md:hidden space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
            >
              <div className="p-6 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-3/5 bg-gray-100 rounded" />
                  <div className="h-4 w-4/5 bg-gray-100 rounded" />
                  <div className="h-4 w-3/5 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA skeleton */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gray-50 border border-gray-100 w-full max-w-2xl">
            <div className="h-8 w-52 bg-gray-200 rounded mx-auto" />
            <div className="mt-5 h-4 w-4/5 bg-gray-100 rounded mx-auto" />
            <div className="mt-3 h-4 w-3/5 bg-gray-100 rounded mx-auto" />
            <div className="mt-7 h-11 w-36 bg-gray-200 rounded-lg mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [teamHeroReady, setTeamHeroReady] = useState(false);
  return (
    <div>
      <Navbar />
      <TeamHero onReady={() => setTeamHeroReady(true)} />
      {teamHeroReady ? (
        <>
          <TeamBody />
          <Footer />
        </>
      ) : (
        <TeamPageSkeletonBody />
      )}
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

const HistoryPageSkeleton = () => {
  return (
    <div className="bg-white">
      {/* Section block 1 */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="h-8 w-72 bg-gray-200 rounded" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-11/12 bg-gray-100 rounded" />
          <div className="h-4 w-10/12 bg-gray-100 rounded" />
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
        </div>
      </div>

      {/* Big image-like blocks to match About2/About3 */}
      <div className="w-full h-[60vh] bg-gray-100" />
      <div className="w-full h-[60vh] bg-gray-100" />

      {/* Pillars-ish placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-14 space-y-6">
        <div className="h-8 w-80 bg-gray-200 rounded mx-auto" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const [aboutHeroReady, setAboutHeroReady] = useState(false);

  return (
    <div>
      <Navbar />
      <section className="relative overflow-hidden">
        <HistoryHero onReady={() => setAboutHeroReady(true)} />
        {aboutHeroReady ? (
          <>
            <About1 />
            <About2 />
            <Footer />
          </>
        ) : (
          <HistoryPageSkeleton />
        )}
      </section>
    </div>
  );
};

const MissionPageSkeleton = () => {
  return (
    <div className="bg-white">
      {/* Mission Vision skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="h-6 w-36 bg-gray-100 rounded-full mx-auto mb-4" />
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-4 w-72 bg-gray-100 rounded mx-auto" />
        </div>

        {/* Vision card skeleton */}
        <div className="mb-6">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-11/12 bg-gray-100 rounded" />
                <div className="h-4 w-10/12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Mission card skeleton */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-4/5 bg-gray-100 rounded" />
              </div>
            </div>
            {/* Mission items skeleton */}
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-1.5 flex-shrink-0" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core values skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 shadow-md border border-gray-100 bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 mb-3" />
              <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-4/5 bg-gray-100 rounded mt-1" />
            </div>
          ))}
        </div>

        {/* Bottom quote skeleton */}
        <div className="mt-12 text-center">
          <div className="inline-block max-w-4xl rounded-2xl p-6 bg-gray-50 border border-gray-100 w-full">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded mt-2" />
          </div>
        </div>
      </div>

      {/* Mission Body skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Mission section skeleton */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded" />
            <div className="h-4 w-10/12 bg-gray-100 rounded" />
            <div className="h-4 w-9/12 bg-gray-100 rounded" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="h-20 bg-gray-100 rounded-2xl" />
              <div className="h-20 bg-gray-100 rounded-2xl" />
            </div>
            <div className="h-11 w-44 bg-gray-200 rounded-xl mt-4" />
          </div>
          <div className="h-96 bg-gray-100 rounded-3xl" />
        </div>

        {/* Location section skeleton */}
        <div className="text-center mb-8">
          <div className="h-6 w-36 bg-gray-100 rounded-full mx-auto mb-4" />
          <div className="h-8 w-72 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-4 w-80 bg-gray-100 rounded mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="h-80 bg-gray-100 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded" />
            <div className="h-4 w-10/12 bg-gray-100 rounded" />
            <div className="grid grid-cols-2 gap-3 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects section skeleton */}
        <div className="text-center mb-8">
          <div className="h-6 w-36 bg-gray-100 rounded-full mx-auto mb-4" />
          <div className="h-8 w-72 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-4 w-80 bg-gray-100 rounded mx-auto" />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="grid lg:grid-cols-2 gap-10 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-48 bg-gray-100 rounded-2xl col-span-2" />
              <div className="h-32 bg-gray-100 rounded-2xl" />
              <div className="h-32 bg-gray-100 rounded-2xl" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-36 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-11/12 bg-gray-100 rounded" />
              <div className="h-4 w-10/12 bg-gray-100 rounded" />
              <div className="h-5 w-32 bg-gray-200 rounded mt-4" />
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-100 flex-shrink-0" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MissionPage = () => {
  const [missionHeroReady, setMissionHeroReady] = useState(false);

  return (
    <div>
      <Navbar />
      <MissionHero onReady={() => setMissionHeroReady(true)} />
      {missionHeroReady ? (
        <>
          <MissionBody />
          <Footer />
        </>
      ) : (
        <MissionPageSkeleton />
      )}
    </div>
  );
};

const CoralRestorationPage = () => {
  return (
    <>
      <Navbar />
      <CoralRestoration />
      <Footer />
    </>
  );
};

const DiveAgainstDebrisPage = () => {
  return (
    <>
      <Navbar />
      <DiveAgainstDebris />
      <Footer />
    </>
  );
};

const COTSMOnitoringPage = () => {
  return (
    <>
      <Navbar />
      <COTSMonitoring />
      <Footer />
    </>
  );
};

const DataCollectionPage = () => {
  return (
    <>
      <Navbar />
      <DataCollection />
      <Footer />
    </>
  );
};

const ApplyHomePage = () => {
  return (
    <>
      <ApplyPage />
    </>
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
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/mission-vision" element={<MissionPage />} />
          <Route
            path="/volunteer/coral-restoration"
            element={<CoralRestorationPage />}
          />
          <Route
            path="/volunteer/dive-against-debris"
            element={<DiveAgainstDebrisPage />}
          />
          <Route
            path="/volunteer/cots-monitoring"
            element={<COTSMOnitoringPage />}
          />
          <Route
            path="/volunteer/scientific-data-collection"
            element={<DataCollectionPage />}
          />
          <Route path="/apply" element={<ApplyHomePage />} />
          <Route path="/donate" element={<DonatePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
