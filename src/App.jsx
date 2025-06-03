import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS stylesheet
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000,
      delay: 200,
      offset: 120,
      once: true, // Only animate once
    });
    
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
