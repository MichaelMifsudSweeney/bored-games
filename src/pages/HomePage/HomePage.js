import React, { useState, useEffect } from 'react'
import GameCardList from '../../components/GameCardList/GameCardList'
import './HomePage.scss'
import { db } from '../../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
function HomePage() {
    let [gameCardData, setGameCardData] = useState([])

    //get game list data from server and set it to gameCardData state
    let getAndSetGameData = async () => {
        const gamesRef = collection(db, "games");
        const rentableGameQuery = query(gamesRef, where("gameAvailability", "==", "AVAILABLE"));
        const querySnapshot = await getDocs(rentableGameQuery);
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