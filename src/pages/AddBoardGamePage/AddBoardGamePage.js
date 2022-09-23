import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import './AddBoardGamePage.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import uuid4 from "uuid4";

const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
function AddBoardGamePage() {
  //ok so I've got the server calling when you submit
  //now I just need to:
  //get all the forms to be filled
  //add any forms I need personally
  //generate the final object to send
  //rewire the api to just post whatever it gets
  //axios post it
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
    { label: 'Pulp Fiction', id: 2 },
  ]);

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
    console.log("submitFiring")
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

    console.log(newGame)
  }

  let selectBoardGameHandler = (e) => {
    console.log("onSubmit", e.target.innerText)
    console.log("onSubmit", typeof (e.target.innerHTML))
    let selectedGameOption = options.find((option) => option.label === e.target.innerHTML)
    if (e.target.innerText !== undefined) {
      // console.log("this is fired")
      axios.get(`https://api.boardgameatlas.com/api/search?ids=${selectedGameOption.id}&client_id=JLBr5npPhV`)
        .then((res) => {
          // console.log("returnedData is:", res.data.games[0])
          setGameDataFromServer(res.data.games[0])
          setbgName(res.data.games[0].name)
          setbgDescription(res.data.games[0].description)
          setbgMinDuration(res.data.games[0].min_playtime)
          setbgMaxDuration(res.data.games[0].max_playtime)
          setbgMinPlayers(res.data.games[0].min_players)
          setbgMaxPlayers(res.data.games[0].max_players)
          setbgImage(res.data.games[0].image_url)
      
          // console.log()
         
          
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
    <div className="addBoardGameContainer">
      <form onSubmit={(e) => submitNewBoardGameHandler(e)}>
        <div>AddBoardGamePage</div>
        <Autocomplete
          onChange={(e) => selectBoardGameHandler(e)}
          onInputChange={(event, newInputValue) => {
            // console.log(`https://api.boardgameatlas.com/api/search?name=${newInputValue}&client_id=JLBr5npPhV`)
            console.log(event.target.value)
            onSearchInputChange(newInputValue)
          }}
          id="combo-box-demo"
          options={options}
          renderInput={(params) => <TextField {...params} label="Board Game" />}
        />
        <FormControl fullWidth>
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
        </FormControl>

        <TextField id="outlined-name" label="bgName" value={bgName} onChange={onbgNameChange} />
        <TextField id="outlined-name" label="bgDescription" multiline value={bgDescription} onChange={onbgDescription} />
        <TextField id="outlined-name" label="bgMinDuration" value={bgMinDuration} onChange={onbgMinDuration} />
        <TextField id="outlined-name" label="bgMaxDuration" value={bgMaxDuration} onChange={onbgMaxDuration} />
        <TextField id="outlined-name" label="bgMinPlayers" value={bgMinPlayers} onChange={onbgMinPlayersChange} />
        <TextField id="outlined-name" label="bgMaxPlayers" value={bgMaxPlayers} onChange={onbgMaxPlayersChange} />
        <TextField id="outlined-name" label="bgImage" value={bgImage} onChange={onbgImageChange} />
        <TextField id="outlined-name" label="bgCategory" value={bgCategory} onChange={onbgCategoryChange} />
        
        {/* <input type="text" name="itemSelected" className="item-details__item-name-input" value={inventoryName} placeholder='Item Name' onChange={onNameChange} /> */}
        <button>Submit!</button>
      </form>
    </div>
  </>
  )
}

export default AddBoardGamePage