import { Routes, Route, Link } from 'react-router-dom';
import FrontPage from './Pages/FrontPage/FrontPage';
import MyProfilePage from './Pages/MyProfilePage';


function App() {
  return (    
    <div>

      <div className="App">
        <FrontPage />
      </div>

{/* Element - hvilken page den navigere til --- > path det man kan skrive i URL */}
        <Routes>
            <Route path="/MyProfilePage" element={<MyProfilePage />} />
        </Routes>
    </div>
  );
}

export default App;