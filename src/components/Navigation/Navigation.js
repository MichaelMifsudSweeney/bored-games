import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'
function Navigation() {
  return (
    <>
      <div className='boop'>Navigation</div>
      <NavLink to="/profile" activeClassName="selected">
      Profile
      </NavLink>
      <NavLink to="/home" activeClassName="selected">
      Home
      </NavLink>
    </>

  )
}

export default Navigation