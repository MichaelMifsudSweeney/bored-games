import {useContext, createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'
import mixpanel from 'mixpanel-browser';
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    mixpanel.init('15eda91cba3b7b85aa6cd14ff9c69595', {debug: true}); 

    const logGameClicks = (gameVisit) => {
        console.log(user)
        mixpanel.identify(user.uid);
        let objToSend = { 
            "Plan": "Premium", 
            "$name": user.displayName,
        }
        objToSend[gameVisit] = "✅";
        mixpanel.people.set(objToSend);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider)
        signInWithRedirect(auth, provider)
    }

    const logOut = async () => {
        await signOut(auth)
        setUser({}, console.log("just finished the logout function in authcontext", user))
        
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // console.log("user:", currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, logGameClicks }}>
            {children}
        </AuthContext.Provider>
    )
};



export const UserAuth = () => {
    return useContext(AuthContext)
}