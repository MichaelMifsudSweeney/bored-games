import React from 'react'
import './GameComment.scss'
function GameComment({ gameReview }) {
  return (
    <>
      <div className="gameComment">
        <div className='gameComment__name'>{gameReview.commentName}</div>
        <div className='gameComment__comment-text'>{gameReview.commentText}</div>
      </div>
    </>
  )
}

export default GameComment