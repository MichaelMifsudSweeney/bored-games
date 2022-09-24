import React from 'react'

function ReservedGame({ gameRented }) {
  console.log("gameRented", gameRented)
  return (<>
    <div className="gamePosted">
      <img src={gameRented.image} alt="" />
      <h3>{gameRented.gameName}</h3>
      <button>RETURN</button>
    </div>
  </>
  )
}

export default ReservedGame