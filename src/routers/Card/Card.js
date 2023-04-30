import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
import CardEmoticon from './CardEmoticon';
import CardComment from './Comment/CardComment';
import '../../routers/Card/Card.css';
import Music from '../../Image/Mumble_Music1.png' ;
import MusicBox from '../../Image/Mumble_Music2.png' ;

import Left from '../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 
import DeleteBtn from '../../Image/Mumble_Delete_Icon.png'; 
import ImageBtn from '../../Image/expression_Icon/Mumble_image_icon.png' ;

import Like from '../../Image/Like/heart.png' ; 
import unLike from '../../Image/Like/like.png' ; 

const Card = ({card}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [comment, setComment] = useState("") ; 
    const [currentData, setCurrentData] = useState([]) ;
    const [next, setNext] = useState(false) ; 
    const [more, setMore] = useState(false) ; 
    const [imgOpen, setImgOpen] = useState(false) ; 

    const CurrentUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${card.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
        }); 
    } ; 

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 
    
    const onSaveComment = async () => {
        let CardDocID = card.DocID ;
        await addDoc(collection(db, "Post", `${CardDocID}`, "Comment"), {
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

    const likeUserUID = doc(db, "Post", `${card.DocID}`);
    
    const onClickLikeUpdate = async () => {
        if(card.Data.like != currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayUnion(currentUser.uid)
            });
        }
    }

    const onClickLikeDelete = async () => {
        if(card.Data.like = currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayRemove(currentUser.uid)
            });
        }
    }

    return(
        <div className='Card'>
        {card.Data.cardImgUrl ? 
            <div className='CardBackGroundImg'>
                <img src={ImageBtn} 
                    className={card.Data.selected ? 'CardImgOpenBtn' : 'CardImgOpenBtn2'} 
                    onClick={() => setImgOpen(!imgOpen)} />
                <div className='PostCardImgUrlForm'>
                    {imgOpen && <div className='PostCardImgUrl'>
                        <img src={card.Data.cardImgUrl} />
                        <button className='ImgOpenBtn_x'
                            onClick={() => setImgOpen(!imgOpen)}> x </button>
                    </div>}
                </div>
                
                <div className='CardProfile'>
                    {card.Data.anonymous == true ? <> 
                        {card.Data.UID == currentData.uid ? 
                        <div className='CardProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>} 
                    </> : <div className='CardProfileTrue'>
                        <img src={Logo} width="180px"/>
                        <p className="ProfileAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}
                    
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
                                    <div className='imgPostMusicBox'>
                                        <img src={Music} className="img_Music"/>
                                        <img src={MusicBox} className="img_MusicBox" />
                                    </div>
                                </div>
                            </div>}
                    </>}

                    <div className='CardHeartForm'>
                        {card.Data.like.includes(currentUser.uid) ? <>
                            <img src={unLike} onClick={onClickLikeDelete} />
                            <h4> {card.Data.like.length} </h4>
                        </> : <>
                            <img src={Like} onClick={onClickLikeUpdate} />
                            <h4> {card.Data.like.length} </h4>
                        </>}
                    </div>
                </div>
                
                {card.Data.music == false ? null : <div>
                    {next == false ? 
                    <img className='CardNextButton1'
                        type='button'
                        src={Right}
                        onClick={() => {setNext(!next)}} /> :
                    <img className='CardNextButton2'
                        type='button'
                        src={Left}
                        onClick={() => {setNext(!next)}} /> }

                </div> }
                {card.Data.UID == currentUser.uid && 
                    <div className='DeleteBox'>
                        <img type='button'
                            src={DeleteBtn} 
                            className='CardDeleteButton'
                            onClick={onDelete} />
                    </div>}
            </div> : <div className='CardBackGroundImg'>
                <div className='CardProfile'>
                    {card.Data.anonymous == true ? <> 
                        {card.Data.UID == currentData.uid ? 
                        <div className='CardProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>} 
                    </> : <div className='CardProfileTrue'>
                        <img src={Logo} width="180px"/>
                        <p className="ProfileAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}

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
                                    <div className='imgCardMusicBox'>
                                        <img src={Music} className="img_Music"/>
                                        <img src={MusicBox} className="img_MusicBox" />
                                    </div>
                                </div>
                            </div>}
                    </>}

                    <div className='CardHeartForm'>
                        {card.Data.like.includes(currentUser.uid) ? <>
                            <img src={unLike} onClick={onClickLikeDelete} />
                            <h4> {card.Data.like.length} </h4>
                        </> : <>
                            <img src={Like} onClick={onClickLikeUpdate} />
                            <h4> {card.Data.like.length} </h4>
                        </>}
                    </div>
                </div>
                
                {card.Data.music == false ? null : <div>
                    {next == false ? 
                    <img className='CardNextButton1'
                        type='button'
                        src={Right}
                        onClick={() => {setNext(!next)}} /> :
                    <img className='CardNextButton2'
                        type='button'
                        src={Left}
                        onClick={() => {setNext(!next)}} /> }
                </div> }
                {card.Data.UID == currentUser.uid && 
                    <div className='DeleteBox'>
                        <img type='button'
                            src={DeleteBtn} 
                            className='CardDeleteButton'
                            onClick={onDelete} />
                    </div>}
            </div>}
            
            {more == false ? 
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
            </div> : null}
            
            <div className={more == false ? 'Cardcomment' :  'CardcommentTrue'} >
                <CardComment card={card} setMore={setMore}/>
            </div>
        </div>
    )
}

export default Card ; 

