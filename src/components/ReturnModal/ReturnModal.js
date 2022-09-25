import React, { useState } from 'react'
import './ReturnModal.scss'
import TextField from '@mui/material/TextField';
import axios from 'axios';
function ReturnModal({selectedGame, setShowModal, loadProfileData}) {
    const [commentText, setCommentText] = useState('');
    const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
    const onCommentChange = (e) => setCommentText(e.target.value);

    let returnGameHandler = () => {
        //to post a comment I'll need:
        // the userId for whoever is posting it,
        // and the gameId to add the comment
        //and the comment to add
        const API_URL = process.env.REACT_APP_API_URL;
        let UrlToPostTo = `${API_URL}/games/comment/${selectedGame.gameId}`
        
        let objectToSend = {
            "currentUser":CURRENT_USER_ID,
            "commentText":commentText
        }

        axios.post(UrlToPostTo, objectToSend).then(() => {
            loadProfileData()
            setShowModal(false)
        })
    }

    return (<>
        <div className="returnModal">
            <div className="returnModal__container">
            <div>ReturnModal</div>
            <h3>{selectedGame.gameId}</h3>
            <p>Before returning, please submit a review:</p>
            <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          value={commentText}
          placeholder="Placeholder"
          onChange={onCommentChange}
          multiline
        />
            <button>Cancel</button>

            <button  onClick={returnGameHandler}>Return Item</button >
            </div>
        </div>
    </>
    )
}

export default ReturnModal