import React from 'react'
import ReservedGame from '../ReservedGame/ReservedGame'
import './ReservedGameList.scss'

function ReservedGameList({ gamesRented, setSelectedGame, setShowModal }) {
    return (
        <>
            <h2 className='reservedGameList__title'>Reserved</h2>
            <div className="reservedGameList__list">
                {gamesRented.map(gameRented => {
                    return <ReservedGame gameRented={gameRented} key={gameRented.gameId} setSelectedGame={setSelectedGame} setShowModal={setShowModal} />
                })}
            </div>
        </>
    )
}

export default ReservedGameList