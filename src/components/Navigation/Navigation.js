import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

function Navigation() {
  return (
    <>
      <div className='boop'>Navigation</div>
      <NavLink to={`profile/${CURRENT_USER_ID}`} >
      Profile
      </NavLink>
      <NavLink to="/home">
      Home
      </NavLink>
      <NavLink to="/add">
      Add a board game
      </NavLink>
    </>

  )
}

export default Navigation