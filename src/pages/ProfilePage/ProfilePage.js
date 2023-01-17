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
function ProfilePage() {
  const { logOut, user } = UserAuth()
  let param = useParams()
  
  let [gamesOwned, setGamesOwned] = useState([])
  let [gamesRented, setGamesRented] = useState([])
  let [selectedGame, setSelectedGame] = useState({})
  let [userName, setUserName] = useState("")
  let [showModal, setShowModal] = useState(false)

  //loads the profile data based on param
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
        console.log("Document data:", userNameQuerySnapshot.data());
        let documentData = userNameQuerySnapshot.data()
        setUserName(documentData.userName)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
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



    if (Object.keys(param).length !== 0) {
      // axios.get(`${API_URL}/user/${param.userId}`).then((response) => {
      //   setGamesOwned(response.data.gamesOwned)
      //   setGamesRented(response.data.gamesRented)
      // })

    }
  }
  useEffect(() => {

    let doesUserExistInDatabase = async () => {
      //if a users id exists
      if (user.uid !== undefined) {
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
          <h2 className='reservedGameList__title'>Account</h2>
          <form onSubmit={(e) => accountUpdateHandler(e)}>
            <label>
              Username
              <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
            </label>
            <button>Update Username</button>
          </form>
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