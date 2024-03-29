import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './SignIn.scss'

function Signin() {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user && user.uid) {
            navigate('/profile')
        }
    }, [user])

    return (
        <>
            <div className="sign-in__container">
            <h2 className='sign-in__title'>Sign In to Rent Games, Post Games, and more!</h2>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </>
    )
}

export default Signin