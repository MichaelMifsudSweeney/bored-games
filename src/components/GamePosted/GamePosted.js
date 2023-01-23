import axios from 'axios'
import React from 'react'
import './GamePosted.scss'
import { doc, deleteDoc } from "firebase/firestore";

import { db } from '../../firebase'
const API_URL = process.env.REACT_APP_API_URL;

function GamePosted({ gameOwned, loadProfileData }) {

  let removeHandler = async () => {
    await deleteDoc(doc(db, "games", gameOwned.gameId));
    loadProfileData()
    

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