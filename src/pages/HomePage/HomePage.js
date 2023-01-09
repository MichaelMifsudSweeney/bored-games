import axios from 'axios'
import React, { useState, useEffect } from 'react'
import GameCardList from '../../components/GameCardList/GameCardList'
import './HomePage.scss'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
const API_URL = process.env.REACT_APP_API_URL;
function HomePage() {
    let [gameCardData, setGameCardData] = useState([])

    //get game list data from server and set it to gameCardData state
    let getAndSetGameData = async () => {
        const querySnapshot = await getDocs(collection(db, "games"));
        let importedGameDataArray = []
        querySnapshot.forEach((doc) => {
            importedGameDataArray.push(doc.data())   
        });
        setGameCardData(importedGameDataArray)
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