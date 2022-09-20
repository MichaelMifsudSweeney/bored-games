import React from 'react'
import PostedGames from '../../components/PostedGames/PostedGames'
import ReservedGame from '../../components/ReservedGame/ReservedGame'

function ProfilePage() {
  return ( <>
    <div>ProfilePage</div>
    <h2>Reserved</h2>
    <ReservedGame />
    
    <h2>Posted</h2>
    <PostedGames />
    </>
  )
}

export default ProfilePage