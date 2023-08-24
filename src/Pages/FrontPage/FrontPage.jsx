import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Header from "../Header";
import Navigation from "../Navigation";
import FrontPageContent from "../FrontPageContent";
import MyProfilePage from "../MyProfilePage";
import Footer from "../Footer";


function FrontPage() {
  return (
    <div>
      <div className="FrontPage">
        <Header />
        <Navigation />
        <FrontPageContent />
        <Footer />
      </div>


      {/* <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/MyProfilePage" element={<MyProfilePage/>} />
      </Routes> */}

    </div>   
  );
}

export default FrontPage;