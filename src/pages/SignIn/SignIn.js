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
    if (user != null) {
        navigate('/profile')
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