import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;

function Navigation() {
  return (
    <>
      <section className='navBar'>
        <div className="navBar__container">
          <div className="navBar__title">
            <NavLink to={`home`} >
              Bored Games
            </NavLink>
          </div>
          <div className="navBar__links">
            <NavLink to={`profile/${CURRENT_USER_ID}`} className='navBar__link'>
              Profile
            </NavLink>
            <div className="navBar__link">
              Sign Out
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Navigation