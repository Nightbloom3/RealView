import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (

        <nav>
          <ul>
            <li>
              <Link to="/"> Front Page</Link>
            </li>
            <li>
              <Link to="/MyProfilePage">Profile Page</Link>
            </li>
            <li>
              <Link to="/MarketReport">Market Report</Link>
            </li>
            <li>
              <Link to="/MyProfilePage">FakePage2</Link>
            </li>
            <li>
              <Link to="/MyProfilePage">FakePage3</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">FakePage4</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">FakePage5</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/MyProfilePage">FakePage6</Link>
            </li>
          </ul>
        </nav>

  );
}

export default Navigation;
