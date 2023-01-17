import React, { useState } from 'react'
import './ReturnModal.scss'
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext'
import uuid4 from 'uuid4';
import { db } from '../../firebase'
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
function ReturnModal({ selectedGame, setShowModal, loadProfileData }) {
    const [commentText, setCommentText] = useState('');
    const CURRENT_USER_ID = process.env.REACT_APP_CURRENT_USER_ID;
    const { user } = UserAuth()

    const onCommentChange = (e) => setCommentText(e.target.value);

    let returnGameHandler = async () => {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        // console.log(docSnap.data())
        if (user && user.uid) {
            let objectToSend = {
                "currentUser": user.uid,
                "commentName": userSnap.data().userName,
                    "commentText": commentText,
                "datePosted": Date.now(),
                "commentId": uuid4()
            }


            // console.log(selectedGame.gameId)
            const serverRef = doc(db, "games", selectedGame.gameId);

            await updateDoc(serverRef, {
                gameReviews: arrayUnion(objectToSend)
            });

            await updateDoc(serverRef, {
                "gameAvailability": "AVAILABLE",
                "renterId": ""
            });

            setShowModal(false)

        }


        // const API_URL = process.env.REACT_APP_API_URL;
        // let UrlToPostTo = `${API_URL}/games/comment/${selectedGame.gameId}`



        //add a comment to to the game.
        //add an object to the comment array
        //the object will contain the commentors user id, the comment text, a uid. a time of comment
        //it will also reset the renter's id to nothing and the status to available




        // axios.post(UrlToPostTo, objectToSend).then(() => {
        //     loadProfileData()
        //     setShowModal(false)
        // })
    }

    return (
        <>
            <div className="returnModal">
                <div className="returnModal__container">
                    <h3 className='returnModal__header'>{`Please submit a review of ${selectedGame.gameName} before returning it`}</h3>
                    <textarea
                        className="returnModal__reviewInput"
                        label="Multiline Placeholder"
                        value={commentText}
                        placeholder="Submit a review"
                        onChange={onCommentChange}
                        multiline="true"
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