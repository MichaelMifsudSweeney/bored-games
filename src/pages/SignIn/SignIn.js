import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import {UserAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


function Signin() {
    const {googleSignIn, user} = UserAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn();
        } catch(error){
            console.log(error)
        }
    }

useEffect(() => {
    console.log("useEffect started")
    if (user !== null) {
        //if there is a user
        //query to see if there's a user with that id
       

        navigate('/profile')
        //query the database and if no user exists with that id, create one and give them a username.
    }
}, [user])

  return (
    <>
    <div>Signin</div>
    <GoogleButton onClick={handleGoogleSignIn}/>
    </>
  )
}

export default Signin