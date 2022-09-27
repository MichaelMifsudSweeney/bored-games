

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Navigation from "./components/Navigation/Navigation";
import AddBoardGamePage from "./pages/AddBoardGamePage/AddBoardGamePage";
import GameDetails from "./pages/GameDetailsPage/GameDetailsPage";
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("Reserved!");
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
          <Route path="/game/:gameId" element={<GameDetails notify={notify}/>} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/add" element={<AddBoardGamePage />} />
        </Routes>
        
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
