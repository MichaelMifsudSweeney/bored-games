import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

function Navigation() {
  return (
    <>
      <div className='boop'>Navigation</div>
      <NavLink to={`profile/${CURRENT_USER_ID}`} activeClassName="selected">
      Profile
      </NavLink>
      <NavLink to="/home" activeClassName="selected">
      Home
      </NavLink>
      <NavLink to="/add" activeClassName="selected">
      Add a board game
      </NavLink>
    </>

  )
}

export default Navigation