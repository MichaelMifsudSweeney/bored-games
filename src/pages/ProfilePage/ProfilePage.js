import React from 'react'
import PostedGames from '../../components/PostedGames/PostedGames'
import ReservedGame from '../../components/ReservedGame/ReservedGame'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';

function ProfilePage() {
  let param = useParams()
  const API_URL = process.env.REACT_APP_API_URL;
  let [gamesOwned, setGamesOwned] = useState([]) 
  let [gamesRented, setGamesRented] = useState([]) 
  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      
      axios.get(`${API_URL}/user/${param.userId}`).then((response) => {
        // console.log(response)
        setGamesOwned(response.data.gamesOwned)
        setGamesRented(response.data.gamesRented)
      })
    }
  }, [])
  //http://localhost:8080/user/aae16546-dacb-497f-af58-1474af620c93
  
  return (<>
    <div>ProfilePage</div>
    
    {gamesOwned.map(gameOwned => {
      console.log(gameOwned)
        return <p>{gameOwned.gameId}</p>
    })}
    <ReservedGame />

    <h2>Posted</h2>
    {/* <h2>{gamesOwned}</h2> */}
    {gamesRented.map(gameRented => {
      console.log(gameRented)
        return <p>{gameRented.gameId}</p>
    })}
    <PostedGames />
  </>
  )
}

export default ProfilePage