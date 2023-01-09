

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Navigation from "./components/Navigation/Navigation";
import AddBoardGamePage from "./pages/AddBoardGamePage/AddBoardGamePage";
import GameDetails from "./pages/GameDetailsPage/GameDetailsPage";
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import Signin from "./pages/SignIn/SignIn";

function App() {
  const notify = () => toast("Game Reserved!");
  return (
    <div className="App">
    <AuthContextProvider>
      <BrowserRouter>
      
      <Navigation />
        <Routes>
          
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game/:gameId" element={<GameDetails notify={notify}/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add" element={<AddBoardGamePage />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
        
      </BrowserRouter>
      <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
