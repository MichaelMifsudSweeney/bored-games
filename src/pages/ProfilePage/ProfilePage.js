import React from 'react'
import PostedGames from '../../components/PostedGames/PostedGames'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import ReservedGameList from '../../components/ReservedGameList/ReservedGameList';
import ReturnModal from '../../components/ReturnModal/ReturnModal';
import './ProfilePage.scss'
import { UserAuth } from '../../context/AuthContext'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
function ProfilePage() {
  const { logOut, user } = UserAuth()
  let param = useParams()
  const API_URL = process.env.REACT_APP_API_URL;
  let [gamesOwned, setGamesOwned] = useState([])
  let [gamesRented, setGamesRented] = useState([])
  let [selectedGame, setSelectedGame] = useState({})
  let [showModal, setShowModal] = useState(false)

  //loads the profile data based on param
  let loadProfileData = async () => {
    const gamesCollectionRef = collection(db, "games");
    if (user && user.uid) {
      const gamesOwnedQuery = query(gamesCollectionRef, where("ownerId", "==", user.uid));
      const gamesRentedQuery = query(gamesCollectionRef, where("renterId", "==", user.uid));
      const ownedQuerySnapshot = await getDocs(gamesOwnedQuery);
      const rentedQuerySnapshot = await getDocs(gamesRentedQuery);
      let ownedGamesForState = []
      let rentedGamesForState = []
      ownedQuerySnapshot.forEach((doc) => {
        ownedGamesForState.push(doc.data())
      });
      rentedQuerySnapshot.forEach((doc) => {
        rentedGamesForState.push(doc.data())
      })
      setGamesOwned(ownedGamesForState)
      setGamesRented(rentedGamesForState)
    }



    if (Object.keys(param).length !== 0) {
      // axios.get(`${API_URL}/user/${param.userId}`).then((response) => {
      //   setGamesOwned(response.data.gamesOwned)
      //   setGamesRented(response.data.gamesRented)
      // })

    }
  }
  useEffect(() => {
    loadProfileData()
  }, [user])





  return (
    <>
      {showModal ? <ReturnModal selectedGame={selectedGame} setShowModal={setShowModal} loadProfileData={loadProfileData} /> : <div></div>}
      <div className="profile">
        <div className="profile__container">
          <p>Welcome, {user?.displayName}</p>
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