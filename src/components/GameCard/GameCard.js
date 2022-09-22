import React from 'react'
import "./GameCard.scss"
function GameCard({ gameData }) {
  return (
    <>
      <div className="gameCard">
      <img src={gameData.image} alt="" className='gameCard__img' />
      <h1>{gameData.gameName}</h1>
      <p>{gameData.gameCondition}</p>
      <p>{gameData.gameDescription}</p>
      <p>{gameData.gameMinPlayers} to {gameData.gameMaxPlayers} Players</p>
      <p>{gameData.gameDuration}</p>
      </div>
    </>
  )
}

export default GameCard