import React from 'react'

function ReservedGame({ gameRented, setSelectedGame, setShowModal }) {

  let returnGameHandler = () => {
    //pass the currentGameToThe Modal
    setSelectedGame(gameRented)
    setShowModal(true)
  }

  return (<>
    <div className="gamePosted">
      <img src={gameRented.image} alt="" />
      <h3>{gameRented.gameName}</h3>
      
      <button onClick={returnGameHandler}>RETURN</button>
    </div>
  </>
  )
}

export default ReservedGame