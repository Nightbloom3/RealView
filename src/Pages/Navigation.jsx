import React from "react";
import { Link } from 'react-router-dom';
import FrontPage from './FrontPage/FrontPage';
import MyProfilePage from "../Pages/MyProfilePage";

function Navigation() {
  return (
    // <nav className="NavBar">
    //   <ul>
    //     <li><a href="#">Home</a></li>
    //     <li><a href="#">About</a></li>
    //     <li><a href="#">Services</a></li>
    //     <li><a href="#">Contact</a></li>
    //   </ul>
    // </nav>

 
    
        <nav>
          <ul>
            <li>
              <Link to="/FrontPage"> FrontPage</Link>
            </li>
            <li>
              <Link to="/MyProfilePage">MyProfilePage</Link>
            </li>
          </ul>
        </nav>

  );
}

export default Navigation;
