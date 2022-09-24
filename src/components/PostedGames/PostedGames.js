import React from 'react'
import GamePosted from '../GamePosted/GamePosted'

function PostedGames({gamesOwned, loadProfileData}) {
  return (<>
    <h2>Posted</h2>
    {gamesOwned.map(gameOwned => {
        return <GamePosted gameOwned={gameOwned} loadProfileData={loadProfileData } key={gameOwned.gameId}/>
    })}
  </>
    
  )
}

export default PostedGames