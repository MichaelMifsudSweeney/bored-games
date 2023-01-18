import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import './AddBoardGamePage.scss'
import uuid4 from "uuid4";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase'
import { UserAuth } from '../../context/AuthContext'


function AddBoardGamePage() {
  const {user} = UserAuth()
  console.log(user.uid)
  let navigate = useNavigate();
  let [bgName, setbgName] = useState("")
  let [submitHasBeenClicked, setSubmitHasBeenClicked] = useState(false)
  let [bgDescription, setbgDescription] = useState("")
  let [bgMinDuration, setbgMinDuration] = useState("")
  let [bgMaxDuration, setbgMaxDuration] = useState("")
  let [bgMinPlayers, setbgMinPlayers] = useState("")
  let [bgMaxPlayers, setbgMaxPlayers] = useState("")
  let [bgImage, setbgImage] = useState("")
  let [bgCategory, setbgCategory] = useState("")
  let [bgCondition, setbgCondition] = useState("")
  let [gameDataFromServer, setGameDataFromServer] = useState({})

  const [options, setOptions] = useState([
    { label: 'Type to search', id: 2 },
  ]);

  useEffect(() => {
  }, [bgCondition])

  //function to updateOptions in the autocomplete
  let createOptions = (passedArray) => {
    let updatedOptions = []
    passedArray.forEach(element => {

      updatedOptions.push({
        label: element.name,
        id: element.id
      }
      )
    });
    return updatedOptions
  }

  //function to query the database and set the options
  let onSearchInputChange = (input) => {
    axios.get(`https://api.boardgameatlas.com/api/search?name=${input}&client_id=JLBr5npPhV`).then((res) => {
      setOptions(createOptions(res.data.games))
    })
  }

  //function to set the board game condition state
  const handleChange =   (e) => {
    setbgCondition(e.target.value);
  };

  //function that validates all fields have been filled and then sends a game object to the server
  let submitNewBoardGameHandler = async (e) => {
    e.preventDefault()
    setSubmitHasBeenClicked(true)

    if (bgName.length === 0 || bgDescription.length === 0 || bgMinDuration.toString().length === 0 || bgMaxDuration.toString().length === 0 || bgMaxPlayers.toString().length === 0 || bgMinPlayers.toString().length === 0 || bgCondition.length === 0) {
      return
    }
    let newGameId = uuid4()
    let newGame = {
      "gameId": newGameId,
      "gameName": bgName,
      "gameDescription": bgDescription,
      "gameDuration": `${bgMinDuration}-${bgMaxDuration}`,
      "renterId": "",
      "gameMinPlayers": bgMinPlayers,
      "gameMaxPlayers": bgMaxPlayers,
      "image": bgImage,
      "gameCategory": "mavSOM8vjH",
      "ownerId": user.uid,
      "gameAvailability": "AVAILABLE",
      "gameCondition": bgCondition,
      "gameReviews": []
    }
    await setDoc(doc(db, "games", newGameId), newGame);
    navigate("/profile")
  }

  //function to set all the fields after a board game has been selected
  let selectBoardGameHandler = (e) => {
    let selectedGameOption = options.find((option) => option.label === e.target.innerHTML)
    if (e.target.innerText !== undefined) {
      axios.get(`https://api.boardgameatlas.com/api/search?ids=${selectedGameOption.id}&client_id=JLBr5npPhV`)
        .then((res) => {
          setGameDataFromServer(res.data.games[0])
          setbgName(res.data.games[0].name)
          setbgDescription(res.data.games[0].description)
          setbgMinDuration(res.data.games[0].min_playtime)
          setbgMaxDuration(res.data.games[0].max_playtime)
          setbgMinPlayers(res.data.games[0].min_players)
          setbgMaxPlayers(res.data.games[0].max_players)
          setbgImage(res.data.games[0].image_url)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const onbgNameChange = (e) => setbgName(e.target.value);
  const onbgDescription = (e) => setbgDescription(e.target.value);
  const onbgMinDuration = (e) => setbgMinDuration(e.target.value);
  const onbgMaxDuration = (e) => setbgMaxDuration(e.target.value);
  const onbgMinPlayersChange = (e) => setbgMinPlayers(e.target.value);
  const onbgMaxPlayersChange = (e) => setbgMaxPlayers(e.target.value);

  return (
    <>
      <section className='add-board-game'>
        <div className="add-board-game__container">
          <form onSubmit={(e) => submitNewBoardGameHandler(e)}>
            <h2 className='add-board-game__title'>Add a Board Game</h2>
            
            <Autocomplete
              sx={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "rgba(0,0,0, 0.05)",
                marginBottom: "10px",
                ".MuiOutlinedInput-notchedOutline": { border: "none", backgroundColor: "grey", height: "24px", }
              }}
              onChange={(e) => selectBoardGameHandler(e)}
              onInputChange={(event, newInputValue) => {
                onSearchInputChange(newInputValue)
              }}
              id="combo-box-demo"
              options={options}
              renderInput={(params) => <TextField {...params} placeholder="Search Database" />}
            />

            <div className="add-board-game__listOfInputs">
              <input className={`add-board-game__bgName ${bgName.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgName" value={bgName} onChange={onbgNameChange} placeholder="Name" />
              <select name="pets" className={`add-board-game__bgCondition ${bgCondition.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} value={bgCondition} onChange={handleChange}>
                <option className='test' value="" disabled >Condition</option>
                <option value="EXCELLENT">Excellent</option>
                <option value="GREAT">Great</option>
                <option value="OK">Ok</option>
                <option value="HONESTLY BAD">Honestly Bad</option>
              </select>
              <input className={`add-board-game__bgMinDuration ${bgMinDuration.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgMinDuration" value={bgMinDuration} onChange={onbgMinDuration} placeholder="Minimum Duration" />
              <input className={`add-board-game__bgMaxDuration ${bgMaxDuration.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgMaxDuration" value={bgMaxDuration} onChange={onbgMaxDuration} placeholder="Maximum Duration" />
              <input className={`add-board-game__bgMinPlayers ${bgMinPlayers.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgMinPlayers" value={bgMinPlayers} onChange={onbgMinPlayersChange} placeholder="Minimum Players" />
              <input className={`add-board-game__bgMaxPlayers ${bgMaxPlayers.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgMaxPlayers" value={bgMaxPlayers} onChange={onbgMaxPlayersChange} placeholder="Maximum Players" />
              <textarea className={`add-board-game__bgDescription ${bgDescription.length === 0 && !submitHasBeenClicked === false ? "error" : ""}`} label="bgDescription" value={bgDescription} onChange={onbgDescription} placeholder="Game Description" />
            </div>
            <div className="add-board-game__button-bar">
              <button className='add-board-game__button'>Submit!</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddBoardGamePage