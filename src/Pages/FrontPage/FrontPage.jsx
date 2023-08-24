import React from "react";
import Header from "../Header";
import Navigation from "../Navigation";
import FrontPageContent from "./FrontPageContent";
import Footer from "../Footer";
import "./FrontPage.css";

// function FrontPage() {
//   return (
//     <div className="FrontPage">
//       <Header />
//       <Navigation />
//       <div className="ContentWrapper">
//         <div className="ButtonWrapper">
//           <button className="Button">Click Me</button>
//         </div>
//         <div className="ChartsContainer">
//           <FrontPageContent />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

function FrontPage() {
  return (
    <div className="FrontPage">
      <Header />
      <Navigation />
      <FrontPageContent />
      <Footer />
    </div>
  );
}

export default FrontPage;