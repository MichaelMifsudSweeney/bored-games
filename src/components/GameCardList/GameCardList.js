import React from 'react'
import GameCard from '../GameCard/GameCard'

function GameCardList({ gameCardData }) {
    console.log(gameCardData)
    return (
    <>
        <div>GameCardList</div>
        {gameCardData.map((gameData) => {
            return <GameCard 
            gameData={gameData}
            key={gameData.gameId}    
            />
        })}
    </>
    )
}

export default GameCardList