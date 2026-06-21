import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

import Hero from "./pages/home/Hero";
import WhyUs from "./pages/home/WhyUs";
import Review from "./pages/home/Review";
import FAQ from "./pages/home/Faq";
import CTA from "./pages/home/CTA";

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

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
