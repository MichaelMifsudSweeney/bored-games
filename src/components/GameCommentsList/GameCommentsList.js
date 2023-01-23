import React from 'react'
import GameComment from '../GameComment/GameComment'
import './GameCommentsList.scss'

function GameCommentsList({ gameReviews }) {
  
    return (<>
      <div className="gameCommentsList__title">Comments</div>
      <div className="gameCommentsList">
        {gameReviews?.map((gameReview) => {
          return <GameComment gameReview={gameReview} key={gameReview.commentId} />
        })}
      </div>
    </>
    )
  
}

export default GameCommentsList