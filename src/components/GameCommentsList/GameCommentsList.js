import React from 'react'
import GameComment from '../GameComment/GameComment'

function GameCommentsList({gameReviews}) {
  console.log(gameReviews)
  return ( <>
    <div>GameCommentsList</div>
    {gameReviews?.map((gameReview) => {
      return <GameComment gameReview={gameReview}/>
    })}
    </>
  )
}

export default GameCommentsList