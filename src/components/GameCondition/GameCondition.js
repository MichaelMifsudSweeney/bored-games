import React from 'react'
import './GameCondition.scss'
function GameCondition({ gameDetailsFromServer }) {
    console.log(gameDetailsFromServer.gameCondition)
    return (
        <div className={
            `gameCondition__condition 
            ${gameDetailsFromServer.gameCondition === "GREAT" && "gameCondition__condition--positive"}
            ${gameDetailsFromServer.gameCondition === "EXCELLENT" && "gameCondition__condition--positive"}
            ${gameDetailsFromServer.gameCondition === "HONESTLY BAD" && "gameCondition__condition--negative"}
            ${gameDetailsFromServer.gameCondition === "OK" && "gameCondition__condition--negative"}`
            }>
            
            <div>{gameDetailsFromServer.gameCondition} CONDITION</div>
        </div>
    )
}

export default GameCondition