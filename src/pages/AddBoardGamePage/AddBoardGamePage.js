import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import './AddBoardGamePage.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import uuid4 from "uuid4";
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
const API_URL = process.env.REACT_APP_API_URL;
function AddBoardGamePage() {
  let navigate = useNavigate();
  let [bgName, setbgName] = useState("")
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
    console.log(bgCondition)
  }, [bgCondition])

  //create the optionsArray

  let createOptions = (passedArray) => {
    let updatedOptions = []
    passedArray.forEach(element => {
      updatedOptions.push({
        label: element.handle,
        id: element.id
      }

      )
    });

    // console.log(updatedOptions)
    return updatedOptions
  }

  let onSearchInputChange = (input) => {
    //query the api
    axios.get(`https://api.boardgameatlas.com/api/search?name=${input}&client_id=JLBr5npPhV`).then((res) => {


      setOptions(createOptions(res.data.games))

    })
    //with the results update the options

  }

  const handleChange = (e) => {
    setbgCondition(e.target.value);
  };


  let submitNewBoardGameHandler = (e) => {
    e.preventDefault()
    // console.log("submitFiring")
    let newGame = {
      "gameId": uuid4(),
      "gameName": bgName,
      "gameDescription": bgDescription,
      "gameDuration": `${bgMinDuration}-${bgMaxDuration}`,
      "renterId": "",
      "gameMinPlayers": bgMinPlayers,
      "gameMaxPlayers": bgMaxPlayers,
      "image": bgImage,
      "gameCategory": "mavSOM8vjH",
      "ownerId": CURRENT_USER_ID,
      "gameAvailability": "AVAILABLE",
      "gameCondition": bgCondition,
      "gameReviews": []
    }
    axios.post(`${process.env.REACT_APP_API_URL}/games/new`, newGame).then(() => {
      navigate(-1)
      return
    })

  }

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
  const onbgImageChange = (e) => setbgImage(e.target.value);
  const onbgCategoryChange = (e) => setbgCategory(e.target.value);


  

  return (<>
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
              
              ".MuiOutlinedInput-notchedOutline": {border: "none", backgroundColor: "grey", height:"24px",}

            
             }}
             
            onChange={(e) => selectBoardGameHandler(e)}
            onInputChange={(event, newInputValue) => {
              // console.log(`https://api.boardgameatlas.com/api/search?name=${newInputValue}&client_id=JLBr5npPhV`)
              // console.log(event.target.value)
              onSearchInputChange(newInputValue)
            }}
            id="combo-box-demo"
            
            options={options}
            renderInput={(params) => <TextField {...params} placeholder="Placeholder"/>}
          />
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Condition</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bgCondition}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Great">Great</MenuItem>
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Honestly Bad">Honestly Bad</MenuItem>
            </Select>
          </FormControl> */}


          <div className="add-board-game__listOfInputs">
            <input className="add-board-game__bgName" label="bgName" value={bgName} onChange={onbgNameChange} placeholder="Name" />
            <select name="pets" class="add-board-game__bgCondition" value={bgCondition} onChange={handleChange}>
              <option value="" disabled selected>Condition</option>
              <option value="Excellent">Excellent</option>
              <option value="Great">Great</option>
              <option value="Ok">Ok</option>
              <option value="Honestly Bad">Honestly Bad</option>
            </select>
            <input className="add-board-game__bgMinDuration" label="bgMinDuration" value={bgMinDuration} onChange={onbgMinDuration} placeholder="Minimum Duration" />
            <input className="add-board-game__bgMaxDuration" label="bgMaxDuration" value={bgMaxDuration} onChange={onbgMaxDuration} placeholder="Maximum Duration" />
            <input className="add-board-game__bgMinPlayers" label="bgMinPlayers" value={bgMinPlayers} onChange={onbgMinPlayersChange} placeholder="Minimum Players" />
            <input className="add-board-game__bgMaxPlayers" label="bgMaxPlayers" value={bgMaxPlayers} onChange={onbgMaxPlayersChange} placeholder="Maximum Players" />
            {/* <input class="add-board-game__bgImage" label="bgImage" value={bgImage} onChange={onbgImageChange} /> */}
            {/* <input class="add-board-game__bgCategory" label="bgCategory" value={bgCategory} onChange={onbgCategoryChange} /> */}
            <textarea class="add-board-game__bgDescription" label="bgDescription" multiline value={bgDescription} onChange={onbgDescription} placeholder="Game Description" />
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