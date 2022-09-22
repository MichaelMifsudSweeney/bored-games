import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
function AddBoardGamePage() {

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

    console.log(updatedOptions)
    return updatedOptions
  }
  
  let onSearchInputChange = (input) => {
    //query the api
    axios.get(`https://api.boardgameatlas.com/api/search?name=${input}&client_id=JLBr5npPhV`).then((res) => {
        
      
      setOptions(createOptions(res.data.games))

  })
    //with the results update the options
    
  }

  return (<>
    <div>AddBoardGamePage</div>
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        console.log(`https://api.boardgameatlas.com/api/search?name=${newInputValue}&client_id=JLBr5npPhV`)
        onSearchInputChange(newInputValue)
      }}
  id="combo-box-demo"
  options={options}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/>
</>
  )
}

export default AddBoardGamePage