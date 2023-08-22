import React from "react";
import Header from "./Pages/Header";
import Navigation from "./Pages/Navigation";
import MainContent from "./Pages/MainContent";
import Footer from "./Pages/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Layout;
