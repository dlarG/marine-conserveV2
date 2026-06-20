import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
