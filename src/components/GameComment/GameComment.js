import React from 'react'

function GameComment({gameReview}) {
  return (
    <>
      <div>{gameReview.commentName}</div>
      <div>{gameReview.commentText}</div>
      <div>{gameReview.commentDate}</div>
    </>
  )
}

export default GameComment