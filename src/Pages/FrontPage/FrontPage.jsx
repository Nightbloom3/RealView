import React from "react";
import Header from "../Header";
import Navigation from "../Navigation";
import FrontPageContent from "./FrontPageContent";
import Footer from "../Footer";
import "./FrontPage.css";

function FrontPage() {
  return (
    <div className="FrontPageContainer">
      <div class="Header"><Header/></div>
      <div class="Navigation"><Navigation/></div>
      <div class="FrontPageContent"><FrontPageContent/></div>
      <div class="Footer"><Footer/></div>
    </div>
  );
}

export default FrontPage;