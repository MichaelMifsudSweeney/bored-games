

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Navigation from "./components/Navigation/Navigation";
import AddBoardGamePage from "./pages/AddBoardGamePage/AddBoardGamePage";
import GameDetails from "./pages/GameDetailsPage/GameDetailsPage";
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <div className="App">
      {/* //NAV BAR COMPONENT
      //Filter bar component
      //Card List Component */}
      
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/add" element={<AddBoardGamePage />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
