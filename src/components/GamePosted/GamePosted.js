import axios from 'axios'
import React from 'react'
import './GamePosted.scss'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
const API_URL = process.env.REACT_APP_API_URL;

function GamePosted({ gameRented, loadProfileData }) {

    let removeHandler = () => {
        //get the gameId and remove the object from the games array (probably using a filter and then feeding the filtered array back in)
        axios.delete((`${API_URL}/games/${gameRented.gameId}`))
        .then(() => {
            loadProfileData()
        })
    }

    return (<>
        <div className="gamePosted">
            <img src={gameRented.image} alt="" />
            <p>{gameRented.gameName}</p>
            <button onClick={removeHandler}>Remove</button>
        </div>
    </>
    )
}

export default GamePosted