import axios from 'axios';
import React from 'react'
import GameCommentsList from '../GameCommentsList/GameCommentsList';
import './GameDetailsInfo.scss'

function GameDetailsInfo({ gameDetailsFromServer }) {
  console.log(gameDetailsFromServer.gameDescription)
  
  function createMarkup() {
    return {__html: gameDetailsFromServer.gameDescription};
  }

  const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

  let reserveHandler = () => {
    let objToSend = {
      "gameId": gameDetailsFromServer.gameId,
      "currentUser": CURRENT_USER_ID
    }
    axios.post(`${process.env.REACT_APP_API_URL}/games/reserve`, objToSend).then(() => {
      alert("successfully reserved!")
      return
    })

  }

  return (<>
    <div className="gameDetailsInfo">
      <div className="gameDetailsInfo__left">
        <div className="gameDetailsInfo__img-wrapper">
          <div className="gameCard__img-container">
            <div className="gameCard__top-fill"></div>
            <img src={gameDetailsFromServer.image} alt='' className='gameDetailsInfo__gamePhoto' />
          </div>
        </div>
        <div className="gameDetailsInfo__button-and-instructions">
          <button onClick={reserveHandler} className='gameDetailsInfo__reserve-button'>RESERVE</button>
          <div className="gameDetailsInfo__instructions">
            You’ll be emailed with pickup instructions

          </div>
        </div>
      </div>
      <div className="gameDetailsInfo__right">

        <div className='gameDetailsInfo__title'>{gameDetailsFromServer.gameName}</div>
        <div className="gameDetailsInfo__overview">
          <div className='gameDetailsInfo__players-and-playtime'>{gameDetailsFromServer.gameMinPlayers}-{gameDetailsFromServer.gameMaxPlayers} players • {gameDetailsFromServer.gameDuration} minutes</div>
          <div className='gameDetailsInfo__owner'> Posted by: {gameDetailsFromServer.ownerName}</div>
        </div>
        <div>{gameDetailsFromServer.gameCondition}</div>
        {/* <div className='gameDetailsInfo__description'>{testtest}</div> */}
        <div className='gameDetailsInfo__description' dangerouslySetInnerHTML={createMarkup()} />

        <div></div>

        <GameCommentsList gameReviews={gameDetailsFromServer.gameReviews} />
      </div>


    </div>
  </>
  )
}

export default GameDetailsInfo