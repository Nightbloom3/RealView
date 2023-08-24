import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Header from "../Header";
import Navigation from "../Navigation";
import FrontPageContent from "./FrontPageContent";
import Footer from "../Footer";
import "./FrontPage.css";

function FrontPage() {
  return (
    <div>
      <div className="FrontPage">
        <Header />
        <Navigation />
        <FrontPageContent />
        <Footer />
      </div>
    </div>   
  );
}

export default FrontPage;