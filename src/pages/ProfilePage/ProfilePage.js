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

function isEmpty(obj) {
  if (obj === undefined || obj === null || Object.keys(obj).length === 0) {
    console.log(obj)
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
      console.log("just logged out", user)
      
      console.log("22")
      setUserName("")
      setGamesOwned([])
      setGamesRented([])
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }
  let param = useParams()

  let [gamesOwned, setGamesOwned] = useState([])
  let [gamesRented, setGamesRented] = useState([])
  let [selectedGame, setSelectedGame] = useState({})
  let [userName, setUserName] = useState("")
  let [showModal, setShowModal] = useState(false)

  //loads the profile data based on param
  let loadProfileData = async () => {
    console.log("user at the top of loadProfileData", user)
    const gamesCollectionRef = collection(db, "games");

    if (user && user.uid) {
      console.log("detected there's user", user)
      const gamesOwnedQuery = query(gamesCollectionRef, where("ownerId", "==", user.uid));
      const gamesRentedQuery = query(gamesCollectionRef, where("renterId", "==", user.uid));
      const userNameRef = doc(db, "users", user.uid);

      const ownedQuerySnapshot = await getDocs(gamesOwnedQuery);
      const rentedQuerySnapshot = await getDocs(gamesRentedQuery);
      const userNameQuerySnapshot = await getDoc(userNameRef);

      if (userNameQuerySnapshot.exists()) {
        // console.log("Document data:", userNameQuerySnapshot.data());
        let documentData = userNameQuerySnapshot.data()
        setUserName(documentData.userName)
      }

      let ownedGamesForState = []
      let rentedGamesForState = []
      ownedQuerySnapshot.forEach((doc) => {
        ownedGamesForState.push(doc.data())
      });
      rentedQuerySnapshot.forEach((doc) => {
        rentedGamesForState.push(doc.data())
      })
      console.log("65")
      setGamesOwned(ownedGamesForState)
      setGamesRented(rentedGamesForState)
    } 
    // else {
    //   console.log("no user or user.id", user)
    //   setGamesOwned([], console.log("setGamesOwned", gamesOwned))
    //   setGamesRented([])
    // }

    
    
    // if (isEmpty(user)) {
    //   setGamesOwned([])
    //   setGamesRented([])

    // }
    console.log("user at the bottom of loadProfileData", user)
  }
  useEffect(() => {
    console.log("user has changed!", user)
    let doesUserExistInDatabase = async () => {
      //if a users id exists


      if (user && user.uid) {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        //if a document for them exists
        if (docSnap.exists()) {

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
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

  useEffect(() => {
    console.log("useEffect from gamesOwned", gamesOwned)
  },[gamesOwned])



  let accountUpdateHandler = async (e) => {
    e.preventDefault()
    const userRef = doc(db, "users", user.uid);
    // Set the "capital" field of the city 'DC'
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
            <button className='profile__userName-submit'>UPDATE USERNAME</button>
          </form>
          </div>}
          
          
          {gamesRented.length > 0 && <ReservedGameList
            gamesRented={gamesRented}
            setSelectedGame={setSelectedGame}
            setShowModal={setShowModal}
          />}

          {!isEmpty(user) && <PostedGames gamesOwned={gamesOwned} loadProfileData={loadProfileData} />}
          {!isEmpty(user) ? <button className='profile__sign-out-button' onClick={handleSignOut}> SIGN OUT</button> : <Link to='/signin' onClick={() => console.log("selected")}> Sign In</Link>}
        </div>
        
      </div>
    </>
  )
}

export default ProfilePage