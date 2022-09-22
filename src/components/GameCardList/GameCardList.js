import React from 'react'
import GameCard from '../GameCard/GameCard'
import './GameCardList.scss'
function GameCardList({ gameCardData }) {
    
    return (
    <>
        <div className="GameCardList">
        <div>GameCardList</div>
        {gameCardData.map((gameData) => {
            return <GameCard 
            gameData={gameData}
            key={gameData.gameId}    
            />
        })}
        </div>
    </>
    )
}

export default GameCardList