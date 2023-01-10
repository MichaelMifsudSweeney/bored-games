import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss'
import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;



function Navigation() {
  const {user, logOut} = UserAuth()
  const handleSignOut = async () => {
    try {
       await logOut()
    } catch (error) {
       console.log(error)
    }
}
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
            <NavLink to={`profile`} className='navBar__link'>
              Profile
            </NavLink>
            {user?.displayName ? <button onClick={handleSignOut}> Logout</button> : <Link to='/signin'> Sign In</Link>}
          </div>
        </div>
      </section>
    </>

  )
}

export default Navigation