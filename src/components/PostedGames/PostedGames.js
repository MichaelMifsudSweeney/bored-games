import React from 'react'
import { Link } from 'react-router-dom'
import GamePosted from '../GamePosted/GamePosted'
import './PostedGames.scss'
import logo from '../../assets/icons/add_FILL0_wght700_GRAD0_opsz48.svg';

function PostedGames({ gamesOwned, loadProfileData }) {


  return (
    <>
      <div className="postedGameList">
        <h2 className='postedGameList__title'>Posted</h2>
        <Link to='/add'>
          <div className="add-game-cell">
            <div className="add-game-cell__img">
              <img src={logo} alt='' className='add-game-cell__icon' />
            </div>
            <div className="add-game-cell__CTA">
              ADD GAME
            </div>
          </div>
        </Link>
        {gamesOwned.length > 0 && <div className="postedGameList__list">
          {gamesOwned.map(gameOwned => {
            return <GamePosted gameOwned={gameOwned} loadProfileData={loadProfileData} key={gameOwned.gameId} />
          })}
        </div>}
        
      </div>
    </>

  )
}

export default PostedGames