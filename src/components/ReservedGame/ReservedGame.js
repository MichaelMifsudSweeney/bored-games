import React from 'react'
import './ReservedGame.scss'
function ReservedGame({ gameRented, setSelectedGame, setShowModal }) {
  console.log(gameRented)
  let returnGameHandler = () => {
    //pass the currentGameToThe Modal
    setSelectedGame(gameRented)
    setShowModal(true)
  }

  return (<>
    <div className="reservedGame">
      <div className="reservedGame__left">
      <div className="reservedGame__img-wrapper">
          <div className="reservedGame__img-container">
            <div className="gameCard__top-fill"></div>
            <img src={gameRented.image} alt='' className='reservedGame__gamePhoto' />
          </div>
        </div>
        
        <div className="reservedGame__text">
          <h3 className='reservedGame__title'>{gameRented.gameName}</h3>
          <div className="reservedGame__players">{`${gameRented.gameMinPlayers}-${gameRented.gameMaxPlayers} Players`}</div>
          <div className="reservedGame__duration">{gameRented.gameDuration} minutes</div>
        </div>

      </div>

      <button className='reservedGame__return-button' onClick={returnGameHandler}>RETURN</button>
    </div>
  </>
  )
}

export default ReservedGame