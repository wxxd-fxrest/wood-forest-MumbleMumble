import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import CardEmoticon from './CardEmoticon';
import CardComment from './Comment/CardComment';

const Card = ({card}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [comment, setComment] = useState("") ; 
    const [currentData, setCurrentData] = useState([]) ; 

    const CurrentUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${card.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
        }); 
        // console.log(currentData) 
    } ; 

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 

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
    } ; 


    const onDelete = async() => {
        let CardDocID = card.DocID ;
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, "Post", `${CardDocID}`)); 
            navigate("/") ;
        }
    } ;

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${currentData.uid}`) ; 
    } ; 
    
    return(
        <div>
        {card.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${card.Data.cardImgUrl})`, height:"300px"}}>
                <div onClick={onProfilePage}>
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid && 
                            <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                        </> }
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid ?
                            <img src={currentData.attachmentUrl} width="50px"/>: 
                            <img src={None} width="50px"/>}
                    </>}
                </div>
                {card.Data.UID == currentUser.uid && 
                    <button type='button' onClick={onDelete}> 삭제 </button>}
                <h3> {card.Data.PostText} </h3>
                <h4> {card.Data.Music} </h4>
                <h4> {card.Data.artist} </h4>
                <CardEmoticon card={card} />
            </div> : <div style={{backgroundColor:"skyblue"}}>

                <div onClick={onProfilePage}>
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid && 
                            <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                        </> }
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid ?
                            <img src={currentData.attachmentUrl} width="50px"/>: 
                            <img src={None} width="50px"/>}
                    </>}
                </div>
                {card.Data.UID == currentUser.uid && 
                    <button type='button' onClick={onDelete}> 삭제 </button>}
                <h3> {card.Data.PostText} </h3>
                <h4> {card.Data.Music} </h4>
                <h4> {card.Data.artist} </h4>
                <CardEmoticon card={card} />
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

            <CardComment card={card} />
        </div>
    )
}

export default Card ; 

