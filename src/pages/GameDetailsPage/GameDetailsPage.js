import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameCommentsList from '../../components/GameCommentsList/GameCommentsList'
import GameDetailsInfo from '../../components/GameDetailsInfo/GameDetailsInfo'

import './GameDetailsPage.scss'
function GameDetails({notify}) {
  let [gameDetailsFromServer, setGameDetailsFromServer] = useState({})
  let param = useParams()
  
  const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
  const API_URL = process.env.REACT_APP_API_URL;
  let getGameDetailsDataFromServer = () => {
    axios.get(`${API_URL}/games/${param.gameId}`).then((res) => {
      setGameDetailsFromServer(res.data.results)
    })
  }



  useEffect(() => {
    getGameDetailsDataFromServer()
  }, [])
  return (<>
  
    <div className="gameDetails">
      <div className="gameDetails__content">
      <GameDetailsInfo gameDetailsFromServer={gameDetailsFromServer} notify={notify}/>
      
      </div>
    </div>
  </>
  )
}

export default GameDetails