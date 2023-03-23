import React from 'react'
import { Link } from 'react-router-dom'
import "./GameCard.scss"
import { UserAuth } from '../../context/AuthContext'
function GameCard({ gameData }) {
  const { logGameClicks } = UserAuth();
  return (
    <Link to={`/game/${gameData.gameId}`} className="gameCard" onClick={() => logGameClicks(gameData.gameName)} >
      <div className="gameCard__img-container">
        <div className="gameCard__top-fill"></div>
        <img src={gameData.image} alt="" className='gameCard__img' />
      </div>
      <div className="gameCard__text">
        <div className="gameCard__left">
          <div className='gameCard__gameName'>{gameData.gameName}</div>
          <div className='gameCard__gameInfo'>{gameData.gameMinPlayers} to {gameData.gameMaxPlayers} Players</div>
          <div className='gameCard__gameInfo'>{gameData.gameDuration} minutes</div>
        </div>
      </div>
    </Link>

  )
}

export default GameCard