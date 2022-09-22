import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import './AddBoardGamePage.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function AddBoardGamePage() {
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

  }

  let selectBoardGameHandler = (e) => {
    console.log("onSubmit", e.target.innerText)
    console.log("onSubmit", typeof (e.target.innerHTML))
    let selectedGameOption = options.find((option) => option.label === e.target.innerHTML)
    if (e.target.innerText !== undefined) {
      console.log("this is fired")
      axios.get(`https://api.boardgameatlas.com/api/search?ids=${selectedGameOption.id}&client_id=JLBr5npPhV`)
        .then((res) => {
          console.log("returnedData is:", res.data.games[0])
          setGameDataFromServer(res.data.games[0])
        })
    }

    // console.log("selectedGameId",selectedGameId)

  }
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
          renderInput={(params) => <TextField {...params} label="Movie" />}
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
        {/* <input type="text" name="itemSelected" className="item-details__item-name-input" value={inventoryName} placeholder='Item Name' onChange={onNameChange} /> */}
        <button>Submit!</button>
        <p>{gameDataFromServer.id}</p>
        <p>{gameDataFromServer.name}</p>
        <p>{gameDataFromServer.description}</p>
        <p>{gameDataFromServer.max_players}</p>
        <p>{gameDataFromServer.max_playtime}</p>
        <p>{gameDataFromServer.min_players}</p>
        <p>{gameDataFromServer.min_playtime}</p>
      </form>
    </div>
  </>
  )
}

export default AddBoardGamePage