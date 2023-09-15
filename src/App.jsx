import { Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage/FrontPage";
import MyProfilePage from "./Pages/MyProfilePage/MyProfilePage";
import MarketReport from "./Pages/MarketReport/MarketReport";
import Header from "./Pages/Header";
import Navigation from "./Pages/Navigation";
import Footer from "./Pages/Footer";
import './App.css';
import FindMyRealtor from "./Pages/FindMyRealtor/FindMyRealtor";
import TestPage from "./Pages/MapTest/TestPage";

function App() {
  return (
    <div className='App'>

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
          <Route path="/FindMyRealtor" element={<FindMyRealtor />} />
          <Route path="/MarketReport" element={<MarketReport />}/>
          <Route path="/TestPage" element={<TestPage />}/>
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