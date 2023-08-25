import { Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage/FrontPage";
import MyProfilePage from "./Pages/MyProfilePage";
import Header from "./Pages/Header";
import Navigation from "./Pages/Navigation";
import Footer from "./Pages/Footer";
import "./Pages/FrontPage/FrontPage.css"

function App() {
  return (
    <div>
      <div className="Header">
      <Header />
      </div>


      <div className="Navigation">
      <Navigation />
      </div>

      {/* Element - hvilken page den navigere til --- > path det man kan skrive i URL */}
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/MyProfilePage" element={<MyProfilePage />} />
      </Routes>

      <div className="Footer">
      <Footer />
      </div>

    </div>
  );
}

export default App;