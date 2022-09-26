import axios from 'axios'
import React from 'react'
import './GamePosted.scss'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
const API_URL = process.env.REACT_APP_API_URL;

function GamePosted({ gameOwned, loadProfileData }) {

    let removeHandler = () => {
        axios.delete((`${API_URL}/games/${gameOwned.gameId}`))
        .then(() => {
            loadProfileData()
        })
    }

    return (<>
        <div className="ownedGame">
      <div className="ownedGame__left">
      <div className="ownedGame__img-wrapper">
          <div className="ownedGame__img-container">
            <div className="gameCard__top-fill"></div>
            <img src={gameOwned.image} alt='' className='ownedGame__gamePhoto' />
          </div>
        </div>
        
        <div className="ownedGame__text">
          <h3 className='ownedGame__title'>{gameOwned.gameName}</h3>
          <div className="ownedGame__players">{`${gameOwned.gameMinPlayers}-${gameOwned.gameMaxPlayers} Players`}</div>
          <div className="ownedGame__duration">{gameOwned.gameDuration} minutes</div>
        </div>

      </div>

      <button className='ownedGame__return-button' onClick={removeHandler}>REMOVE</button>
    </div>
    </>
    )
}

export default GamePosted