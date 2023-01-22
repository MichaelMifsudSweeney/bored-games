
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameDetailsInfo from '../../components/GameDetailsInfo/GameDetailsInfo'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'
import './GameDetailsPage.scss'
function GameDetails({ notify }) {
  let [gameDetailsFromServer, setGameDetailsFromServer] = useState(null)
  let param = useParams()

  //function to get the game details from the server using the params
  let getGameDetailsDataFromServer = async () => {
    // axios.get(`${API_URL}/games/${param.gameId}`).then((res) => {
    //   setGameDetailsFromServer(res.data.results)
    // })
    const docRef = doc(db, "games", param.gameId);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data())
    setGameDetailsFromServer(docSnap.data())
    
  }

  useEffect(() => {
    getGameDetailsDataFromServer()
  }, [])

  return (
    <>
      <div className="gameDetails">
        <div className="gameDetails__content">
          <GameDetailsInfo gameDetailsFromServer={gameDetailsFromServer} notify={notify} />
        </div>
      </div>
    </>
  )
}

export default GameDetails