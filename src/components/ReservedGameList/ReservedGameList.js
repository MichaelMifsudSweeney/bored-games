import React from 'react'
import ReservedGame from '../ReservedGame/ReservedGame'

function ReservedGameList({gamesRented}) {
    return (
        <>
            <h2>Reserved</h2>
            {gamesRented.map(gameRented => {
        return <ReservedGame gameRented={gameRented} key={gameRented.gameId}/>
    })}
            
        </>
    )
}

export default ReservedGameList