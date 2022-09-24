import React from 'react'
import GamePosted from '../GamePosted/GamePosted'

function PostedGames({gamesRented, loadProfileData}) {
  return (<>
    <h2>Posted</h2>
    {gamesRented.map(gameRented => {
        return <GamePosted gameRented={gameRented} loadProfileData={loadProfileData}/>
    })}
  </>
    
  )
}

export default PostedGames