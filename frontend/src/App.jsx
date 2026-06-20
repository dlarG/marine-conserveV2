import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Footer from "./layouts/Footer";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen min-w-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
