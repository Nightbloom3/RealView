import React from "react";
import FrontPageContent from "./FrontPageContent";
import "./FrontPage.css";

function FrontPage() {
  return (
    <div>
      <div className="FrontPageContainer">
        <div className="FrontPageContent">
        <FrontPageContent />
        </div>
      </div>
    </div>
  );
}

export default FrontPage;