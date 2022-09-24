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
        <div className="gamePosted">
            <img src={gameOwned.image} alt="" />
            <p>{gameOwned.gameName}</p>
            <button onClick={removeHandler}>Remove</button>
        </div>
    </>
    )
}

export default GamePosted