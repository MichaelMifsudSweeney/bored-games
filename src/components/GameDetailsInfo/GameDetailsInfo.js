import axios from 'axios';
import React from 'react'

function GameDetailsInfo({gameDetailsFromServer}) {

  const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

  let reserveHandler = () => {
      let objToSend = {
        "gameId":gameDetailsFromServer.gameId,
        "currentUser": CURRENT_USER_ID
      }
      axios.post(`${process.env.REACT_APP_API_URL}/games/reserve`, objToSend).then(() => {
        alert("successfully reserved!")
        return
      })
      
  }

  return (<>
    <img src={gameDetailsFromServer.image} alt='' />
    <div>{gameDetailsFromServer.gameName}</div>
    <div>{gameDetailsFromServer.gameAvailability}</div>
    <div>{gameDetailsFromServer.gameCondition}</div>
    <div>{gameDetailsFromServer.gameDescription}</div>
    <div>{gameDetailsFromServer.gameDuration}</div>
    <div>{gameDetailsFromServer.gameMaxPlayers}</div>
    <div>{gameDetailsFromServer.gameMinPlayers}</div>
    <div>{gameDetailsFromServer.ownerName}</div>
    <button onClick={reserveHandler}>RESERVE</button>
    </>
  )
}

export default GameDetailsInfo