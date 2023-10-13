import React from "react";
import { Link } from 'react-router-dom';
import "./Navigation.css"

function Navigation() {
  return (
        <div className="navDiv">
        <nav>
          <ul>
            <li>
              <Link to="/">{'>'} Front Page</Link>
            </li>
            <li>
              <Link to="/MyProfilePage">{'>'} Profile Page</Link>
            </li>
            <li>
              <Link to="/MarketReport">{'>'} Market Report</Link>
            </li>
            <li>
              <Link to="/FindMyRealtor">{'>'} Find ejendomsmægler</Link>
            </li>
            <li>
              <Link to="/BaseReport">{'>'} Base Report</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">{'>'} FakePage4</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">{'>'} FakePage5</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">{'>'} FakePage6</Link>
            </li>
          </ul>
        </nav>
        </div>

  );
}

export default Navigation;
