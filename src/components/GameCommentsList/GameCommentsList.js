import React from 'react'
import GameComment from '../GameComment/GameComment'
import './GameCommentsList.scss'

function GameCommentsList({gameReviews}) {
  return ( <>
    <div className="gameCommentsList">
    {gameReviews?.map((gameReview) => {
      return <GameComment gameReview={gameReview}/>
    })}
    </div>
    </>
  )
}

export default GameCommentsList