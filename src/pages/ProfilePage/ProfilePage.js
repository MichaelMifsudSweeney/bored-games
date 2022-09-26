import React from 'react'
import PostedGames from '../../components/PostedGames/PostedGames'
import ReservedGame from '../../components/ReservedGame/ReservedGame'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import ReservedGameList from '../../components/ReservedGameList/ReservedGameList';
import ReturnModal from '../../components/ReturnModal/ReturnModal';
import './ProfilePage.scss'
function ProfilePage() {
  let param = useParams()
  const API_URL = process.env.REACT_APP_API_URL;
  let [gamesOwned, setGamesOwned] = useState([])
  let [gamesRented, setGamesRented] = useState([])
  let [selectedGame, setSelectedGame] = useState({})
  let [showModal, setShowModal] = useState(false)

  let loadProfileData = () => {
    if (Object.keys(param).length !== 0) {

      axios.get(`${API_URL}/user/${param.userId}`).then((response) => {
        setGamesOwned(response.data.gamesOwned)
        setGamesRented(response.data.gamesRented)
      })
    }
  }
  useEffect(() => {
    loadProfileData()
  }, [])
  //http://localhost:8080/user/aae16546-dacb-497f-af58-1474af620c93

  return (<>

    {showModal ? <ReturnModal selectedGame={selectedGame} setShowModal={setShowModal} loadProfileData={loadProfileData} /> : <div></div>}
    <div className="profile">
      <div className="profile__container">

        <ReservedGameList
          gamesRented={gamesRented}
          setSelectedGame={setSelectedGame}
          setShowModal={setShowModal}
        />

        <PostedGames gamesOwned={gamesOwned} loadProfileData={loadProfileData} />
      </div>
    </div>
  </>
  )
}

export default ProfilePage