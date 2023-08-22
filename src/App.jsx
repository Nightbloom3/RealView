import { Routes, Route, Link } from 'react-router-dom';
import { OtherPage } from './Pages/OtherPage';
import { Home } from './Pages/Home';

function App() {
  return (
      <>
      <nav>
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/OtherPage"> OtherPage</Link>
          </li>
        </ul>
      </nav>


{/* Element - hvilken page den navigere til --- > path det man kan skrive i URL */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OtherPage" element={<OtherPage />} />
      </Routes>
      </>
  );
}

export default App;

