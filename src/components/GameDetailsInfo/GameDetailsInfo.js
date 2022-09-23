import React from 'react'

function GameDetailsInfo({gameDetailsFromServer}) {
  return (<>
    <img src={gameDetailsFromServer.image} alt='' />
    <div>{gameDetailsFromServer.gameName}</div>
    <div>{gameDetailsFromServer.gameAvailability}</div>
    <div>{gameDetailsFromServer.gameCondition}</div>
    <div>{gameDetailsFromServer.gmaeDescription}</div>
    <div>{gameDetailsFromServer.gameDuration}</div>
    <div>{gameDetailsFromServer.gameMaxPlayers}</div>
    <div>{gameDetailsFromServer.gameMinPlayers}</div>
    <div>{gameDetailsFromServer.ownerName}</div>
    <button>RESERVE</button>
    </>
  )
}

export default GameDetailsInfo