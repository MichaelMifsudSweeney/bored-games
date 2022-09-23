import axios from 'axios'
import React, { useState, useEffect } from 'react'
import GameCardList from '../../components/GameCardList/GameCardList'
import AddBoardGamePage from '../AddBoardGamePage/AddBoardGamePage';
import './HomePage.scss'
const API_URL = process.env.REACT_APP_API_URL;
function HomePage() {
    let [gameCardData, setGameCardData] = useState([])
    

    let getAndSetGameData = () => {
        axios.get(`${API_URL}/games`).then((res) => {
            
            setGameCardData(res.data.results)
        })
        
    }

    useEffect(() => {
        getAndSetGameData()
    }, [])


    return (
        <>
            <div className="flexboxrow">
            
            <GameCardList 
                gameCardData={gameCardData}
            />
            </div>
        </>
    )
}

export default HomePage