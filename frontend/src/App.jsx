import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
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
