import React, { useState } from 'react'
import './ReturnModal.scss'
import TextField from '@mui/material/TextField';
import axios from 'axios';
function ReturnModal({ selectedGame, setShowModal, loadProfileData }) {
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
            "currentUser": CURRENT_USER_ID,
            "commentText": commentText
        }

        axios.post(UrlToPostTo, objectToSend).then(() => {
            loadProfileData()
            setShowModal(false)
        })
    }

    return (<>
        <div className="returnModal">
            <div className="returnModal__container">
                <h3 className='returnModal__header'>{`Please submit a review of ${selectedGame.gameName} before returning it`}</h3>
                <textarea
                    className="returnModal__reviewInput"
                    label="Multiline Placeholder"
                    value={commentText}
                    placeholder="Submit a review"
                    onChange={onCommentChange}
                    multiline
                />
                <div className="returnModal__button-bar">
                    <button className='returnModal__cancel-button' onClick={() => setShowModal(false)}>Cancel</button>

                    <button className='returnModal__confirm-button' onClick={returnGameHandler}>Return Game</button >
                </div>
            </div>
        </div>
    </>
    )
}

export default ReturnModal