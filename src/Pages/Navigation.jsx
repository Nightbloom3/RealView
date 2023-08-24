import React from "react";
// import { Routes, Route, Link } from 'react-router-dom';
// import { MyProfilePage } from './MyProfilePage';
// import { Home } from './Home';
// import FrontPage from './FrontPage/FrontPage';
// import "../App.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    // <div className="ParentDiv">
    //   <div>
    //     <FrontPage/>
    //   </div>
    
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/"> Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/MyProfilePage">MyProfilePage</Link>
    //         </li>
    //         <li>
    //           <Link to="/FrontPage">FrontPage</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>

    //   <Routes>
    //     <Route path="/" element={<Home/>} />
    //     <Route path="/MyProfilePage" element={<MyProfilePage/>} />
    //   </Routes>

    // </div>
  );
}

export default Navigation;
