import React from 'react'

function ReservedGame({gamesOwned}) {
  return (<>
    <div>ReservedGame</div>
    <h2>Owned</h2>
    {gamesOwned.map(gameOwned => {
      console.log(gameOwned)
        return <p>{gameOwned.gameId}</p>
    })}
    </>
  )
}

export default ReservedGame