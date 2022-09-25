import React from 'react'
import './GameComment.scss'
function GameComment({gameReview}) {
  console.log(gameReview.commentDate)
  return (
    <>
      <div>{gameReview.commentName}</div>
      <div>{gameReview.commentText}</div>
    </>
  )
}

export default GameComment