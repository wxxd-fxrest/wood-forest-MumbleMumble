import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import CardEmoticon from './CardEmoticon';
import CardComment from './Comment/CardComment';
import '../../routers/Card/Card.css';
import Music from '../../Image/Mumble_Music.png' ;


const Card = ({card}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [comment, setComment] = useState("") ; 
    const [currentData, setCurrentData] = useState([]) ;
    const [next, setNext] = useState(false) ; 

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
        <div className='Card'>
        {card.Data.cardImgUrl ? 
            <div className='CardBackGroundImg'>
                <img src={card.Data.cardImgUrl} />
                <div className='CardProfile'  
                    onClick={onProfilePage}>
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid ? <div className='CardProfileTrue'>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={None} width="180px"/>} </> }
                    <div className='CardEmotion'>
                        <CardEmoticon card={card}/>
                    </div>
                </div>

                <div className='CardForm'>
                    {next == false ? 
                        <h3> {card.Data.PostText} </h3> : <>
                        {card.Data.music == false ? null :
                            <div className='CardMusicForm'>
                                <div className='CardMusicName'>
                                    <h4> {card.Data.Music} - {card.Data.artist}</h4>
                                </div>
                                <div className='CardMusic'>
                                    <img src={Music} />
                                    <div className='CardMusicBox'></div>
                                </div>
                            </div>}
                    </>}
                </div>
                
                {card.Data.music == false ? null : <>
                    {next == false ? 
                    <button className='CardNextButton1'
                        type='button'
                        onClick={() => {setNext(!next)}}> 다음 </button> :
                    <button className='CardNextButton2'
                        type='button'
                        onClick={() => {setNext(!next)}}> 이전 </button> }
                </> }
                {card.Data.UID == currentUser.uid && 
                        <button type='button' 
                            className='CardDeleteButton'
                            onClick={onDelete}> 삭제 </button>}
            </div> : <div className='CardBackGroundImg'>
                <div className='CardProfile'   
                    onClick={onProfilePage}>
                    {card.Data.anonymous == true && <> 
                        {card.Data.UID == currentData.uid ? <div className='CardProfileTrue'>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={None} width="180px"/>} </> }
                    <div className='CardEmotion'>
                        <CardEmoticon card={card}/>
                    </div>
                </div>

                <div className='CardForm'>
                    {next == false ? 
                        <h3> {card.Data.PostText} </h3> : <>
                        {card.Data.music == false ? null :
                            <div className='CardMusicForm'>
                                <div className='CardMusicName'>
                                    <h4> {card.Data.Music} - {card.Data.artist}</h4>
                                </div>
                                <div className='CardMusic'>
                                    <img src={Music} />
                                    <div className='CardMusicBox'></div>
                                </div>
                            </div>}
                    </>}
                </div>
                
                {card.Data.music == false ? null : <>
                    {next == false ? 
                    <button className='CardNextButton1'
                        type='button'
                        onClick={() => {setNext(!next)}}> 다음 </button> :
                    <button className='CardNextButton2'
                        type='button'
                        onClick={() => {setNext(!next)}}> 이전 </button> }
                </> }
                {card.Data.UID == currentUser.uid && 
                        <button type='button' 
                            className='CardDeleteButton'
                            onClick={onDelete}> 삭제 </button>}
            </div>}

            <div className='CardCommentInput'>
                <div className='CardInputBox'>
                    <textarea type="textarea"
                        name="comment"
                        placeholder="댓글" 
                        value={comment}
                        onChange={(e) => {
                            const {target : {value}} = e ; 
                            setComment(value) ; 
                        }}/>
                </div>
                <button type='submit' onClick={onSaveComment}> OK </button>
            </div>
            
            <div className='Cardcomment'>
                <CardComment card={card} />
            </div>
        </div>
    )
}

export default Card ; 

