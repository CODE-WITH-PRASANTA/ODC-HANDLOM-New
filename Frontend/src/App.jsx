import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";
import Contact from "./Pages/Contact/Contact";
import Faq from "./Pages/Faq/Faq";
import Blog from "./Pages/Blog/Blog";
import Collections from "./Pages/Collections/Collections";
import About from "./Pages/About/About";
import Wishlist from "./Components/Wishlist/Wishlist";



const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
       
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About/>} />

       <Route path="/collections/mens-wear" element={<Collections/>} />
       <Route path="/blog" element={<Blog/>} />
       <Route path="/faq" element={<Faq/>} />
       <Route path="/contact" element={<Contact/>} />
       <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
      <Footer />
      <FloatingIcons/>
    </BrowserRouter>
  );
};

export default App;