import React from 'react'

function PostedGames({gamesRented}) {
  return (<>
    <h2>Posted</h2>
    {/* <h2>{gamesOwned}</h2> */}
    {gamesRented.map(gameRented => {
      console.log(gameRented)
        return <p>{gameRented.gameId}</p>
    })}
  </>
    
  )
}

export default PostedGames