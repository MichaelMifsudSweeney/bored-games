import axios from 'axios'
import React, { useState, useEffect } from 'react'
import GameCardList from '../../components/GameCardList/GameCardList'
import './HomePage.scss'
const API_URL = process.env.REACT_APP_API_URL;
function HomePage() {
    let [gameCardData, setGameCardData] = useState([])
    
    //get game list data from server and set it to gameCardData state
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
            <div className="homepage">
                <div className="homepage__content">
                    <div className="homepage__header">Browse Games</div>
                    <GameCardList
                        gameCardData={gameCardData}
                    />
                </div>
            </div>
        </>
    )
}

export default HomePage