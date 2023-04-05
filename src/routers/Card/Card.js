import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import CardComment from './Comment/CardComment';

const Card = ({card}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [comment, setComment] = useState("") ; 

    // console.log(card)
    
    const onSaveComment = async () => {
        let CardDocID = card.DocID ;
        await addDoc(collection(db, "Post", `${CardDocID}`, "Comment"), {
            // ReceiveName : feed.displayName,
            Card_OwnerUID : card.Data.UID,

            CardDocID : CardDocID,
            Comment : comment, 

            Card_SendUID : currentUser.uid, 
            date: Timestamp.now(),
        })
        setComment("") ; 
    }
    
    return(
        <div>
        {card.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${card.Data.cardImgUrl})`, height:"300px"}}>
                {card.Data.anonymous == true && <h5 style={{backgroundColor:"red"}}> {card.Data.displayName} </h5>}
                {card.Data.anonymous == true ?
                    <img src={card.Data.attachmentUrl} width="80px"/>: 
                    <img src={None} width="80px"/>}
                <h3> {card.Data.PostText} </h3>
                <h4> {card.Data.Music} </h4>
                <h4> {card.Data.artist} </h4>
                {card.Data.selected == "좋아" && <p>🤗</p>}
                {card.Data.selected == "화나" && <p>🤬</p>}
                {card.Data.selected == "슬퍼" && <p>😢</p>}
            </div> : <div style={{backgroundColor:"skyblue"}}>
                {card.Data.anonymous == true && 
                    <h5 style={{backgroundColor:"red"}}> {card.Data.displayName} </h5>}
                <h3> {card.Data.PostText} </h3>
                <h4> {card.Data.Music} </h4>
                <h4> {card.Data.artist} </h4>
                {card.Data.selected == "좋아" && <p>🤗</p>}
                {card.Data.selected == "화나" && <p>🤬</p>}
                {card.Data.selected == "슬퍼" && <p>😢</p>}
            </div>}

            <input type="textarea"
                    name="comment"
                    placeholder="댓글" 
                    value={comment}
                    onChange={(e) => {
                        const {target : {value}} = e ; 
                        setComment(value) ; 
                    }}/>
            <button type='submit' onClick={onSaveComment}> OK </button>

            <CardComment card={card}/>
        </div>
    )
}

export default Card ; 