import React from 'react'
import PostedGames from '../../components/PostedGames/PostedGames'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import ReservedGameList from '../../components/ReservedGameList/ReservedGameList';
import ReturnModal from '../../components/ReturnModal/ReturnModal';
import './ProfilePage.scss'
import { UserAuth } from '../../context/AuthContext'
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { generateUsername } from 'friendly-username-generator';
import { Link } from 'react-router-dom'
import Signin from '../SignIn/SignIn';

function isEmpty(obj) {
  if (obj === undefined || obj === null || Object.keys(obj).length === 0) {
    return true
  } else {
    return false
  }

}

function ProfilePage() {
  const { logOut, user, setUser } = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
      setUserName("")
      setGamesOwned([])
      setGamesRented([])
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  let [gamesOwned, setGamesOwned] = useState([])
  let [gamesRented, setGamesRented] = useState([])
  let [selectedGame, setSelectedGame] = useState({})
  let [userName, setUserName] = useState("")
  let [userNameFromServer, setUserNameFromServer] = useState("")
  let [showModal, setShowModal] = useState(false)

  let loadProfileData = async () => {
    const gamesCollectionRef = collection(db, "games");

    if (user && user.uid) {
      const gamesOwnedQuery = query(gamesCollectionRef, where("ownerId", "==", user.uid));
      const gamesRentedQuery = query(gamesCollectionRef, where("renterId", "==", user.uid));
      const userNameRef = doc(db, "users", user.uid);

      const ownedQuerySnapshot = await getDocs(gamesOwnedQuery);
      const rentedQuerySnapshot = await getDocs(gamesRentedQuery);
      const userNameQuerySnapshot = await getDoc(userNameRef);

      if (userNameQuerySnapshot.exists()) {
        
        let documentData = userNameQuerySnapshot.data()
        setUserName(documentData.userName)
        setUserNameFromServer(documentData.userName)
      }

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
 
  }
  useEffect(() => {
    let doesUserExistInDatabase = async () => {

      if (user && user.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          
        } else {
          await setDoc(doc(db, "users", user.uid), {
            userId: user.uid,
            userName: generateUsername()
          });
        }
      }
    }

    doesUserExistInDatabase()
    loadProfileData()

  }, [user])

  let accountUpdateHandler = async (e) => {
    e.preventDefault()
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      userName: userName
    });
    loadProfileData()
  }

  return (
    <>
      {showModal ? <ReturnModal selectedGame={selectedGame} setShowModal={setShowModal} loadProfileData={loadProfileData} /> : <div></div>}
      <div className="profile">
        <div className="profile__container">
          {!isEmpty(user) && <div className="account__section">
            <h2 className='reservedGameList__title'>Account</h2>
            <form className='profile__userName-group' onSubmit={(e) => accountUpdateHandler(e)}>
              <label className='profile__userName-label'>
                Username
                <input type="text" className='profile__userName' onChange={(e) => setUserName(e.target.value)} value={userName} />
              </label>
              <button className={`profile__userName-submit ${userNameFromServer !== userName && "profile__userName-submit--enabled"}`} >UPDATE USERNAME</button>
            </form>
          </div>}
          {gamesRented.length > 0 && <ReservedGameList
            gamesRented={gamesRented}
            setSelectedGame={setSelectedGame}
            setShowModal={setShowModal}
          />}
          {!isEmpty(user) && <PostedGames gamesOwned={gamesOwned} loadProfileData={loadProfileData} />}
          {!isEmpty(user) ? <button className='profile__sign-out-button' onClick={handleSignOut}> SIGN OUT</button> : <Signin />}
        </div>
      </div>
    </>
  )
}

export default ProfilePage