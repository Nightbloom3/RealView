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
              <Link to="/MyProfilePage">MyProfilePage</Link>
            </li>
          </ul>
        </nav>

  );
}

export default Navigation;
