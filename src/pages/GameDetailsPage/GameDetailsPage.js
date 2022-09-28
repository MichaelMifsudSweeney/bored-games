import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameDetailsInfo from '../../components/GameDetailsInfo/GameDetailsInfo'

import './GameDetailsPage.scss'
function GameDetails({ notify }) {
  let [gameDetailsFromServer, setGameDetailsFromServer] = useState({})
  let param = useParams()
  const API_URL = process.env.REACT_APP_API_URL;

  //function to get the game details from the server using the params
  let getGameDetailsDataFromServer = () => {
    axios.get(`${API_URL}/games/${param.gameId}`).then((res) => {
      setGameDetailsFromServer(res.data.results)
    })
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