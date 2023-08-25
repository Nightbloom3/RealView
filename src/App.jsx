import { Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage/FrontPage";
import MyProfilePage from "./Pages/MyProfilePage";
import Header from "./Pages/Header";
import Navigation from "./Pages/Navigation";
import Footer from "./Pages/Footer";
import './App.css';

function App() {
  return (
    <div classname='App'>
      <div className="header">
        <Header/>
      </div>

      <div className="row">
        <div className="topnav">
          <div className="column nav-bar">
            <Navigation />
          </div>
        </div>


      <div className="column middle">
        {/* This is where your content will appear based on the route */}
        {/* Element - hvilken page den navigere til --- > path det man kan skrive i URL */}
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/MyProfilePage" element={<MyProfilePage />} />
        </Routes>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;