import React from 'react'
import { Link } from 'react-router-dom'
import "./GameCard.scss"
function GameCard({ gameData }) {
  return (
    
      <Link to={`/game/${gameData.gameId}`} >
      <div className="gameCard">
      <img src={gameData.image} alt="" className='gameCard__img' />
      <h1>{gameData.gameName}</h1>
      <p>{gameData.gameCondition}</p>
      <p>{gameData.gameDescription}</p>
      <p>{gameData.gameMinPlayers} to {gameData.gameMaxPlayers} Players</p>
      <p>{gameData.gameDuration}</p>
      </div>
      </Link>
    
  )
}

export default GameCard