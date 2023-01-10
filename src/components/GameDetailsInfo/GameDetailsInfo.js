import axios from 'axios';
import React from 'react'
import GameCommentsList from '../GameCommentsList/GameCommentsList';
import GameCondition from '../GameCondition/GameCondition';
import './GameDetailsInfo.scss'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from '../../context/AuthContext'
function GameDetailsInfo({ gameDetailsFromServer, notify }) {
  const { user } = UserAuth()
  const navigate = useNavigate();
  const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

  function createMarkup() {
    return { __html: gameDetailsFromServer.gameDescription };
  }
  console.log(gameDetailsFromServer)
  let reserveHandler = async () => {

    let objToSend = {
      "gameId": gameDetailsFromServer.gameId,
      "currentUser": user
    }

    //update renterId to the current user
    const reserveDocRef = doc(db, "games", gameDetailsFromServer.gameId);
    // To update age and favorite color:

    await updateDoc(reserveDocRef, {
      "renterId": user.uid,
      "gameAvailability": "UNAVAILABLE"
    });
    navigate("/profile")
    //update game availability



    // axios.post(`${process.env.REACT_APP_API_URL}/games/reserve`, objToSend).then(() => {
    //   navigate('/home');
    //   notify()
    //   return
    // })
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
        <GameCondition gameDetailsFromServer={gameDetailsFromServer} />
        <div className='gameDetailsInfo__description' dangerouslySetInnerHTML={createMarkup()} />
        {gameDetailsFromServer.gameReviews !== undefined && gameDetailsFromServer.gameReviews.length !== 0 && <GameCommentsList gameReviews={gameDetailsFromServer.gameReviews} />}
      </div>
    </div>
  </>
  )
}

export default GameDetailsInfo