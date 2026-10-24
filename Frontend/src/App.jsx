import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";



const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;