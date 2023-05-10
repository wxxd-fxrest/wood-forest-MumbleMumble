import { addDoc, arrayRemove, arrayUnion, collection, 
    deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import CardComment from './Comment/CardComment';
import '../../routers/Card/Card.css';

import Music from '../../Image/Mumble_Music1.png' ;
import MusicBox from '../../Image/Mumble_Music2.png' ;
import Logo  from '../../Image/Trash-mumble.png' ; 

import Left from '../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 
// Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>

import DeleteBtn from '../../Image/delete (1).png'; 
// <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by amoghdesign - Flaticon</a> 

import BACKIMG from '../../Image/paper texture.jpg';
// <a href="https://kr.freepik.com/free-vector/crumpled-paper-texture-realisric-crease-sheet_28312862.htm#query=paper%20texture&position=45&from_view=keyword&track=ais">작가 upklyak</a> 출처 Freepik 

import OkBtn from '../../Image/delete-message.png' ;
// <a href="https://www.flaticon.com/free-icons/topics" title="topics icons">Topics icons created by Bharat Icons - Flaticon</a>

import Like from '../../Image/Like/heart.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 

import unLike from '../../Image/Like/like.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 


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
        if(comment) {
            let CardDocID = card.DocID ;
            await addDoc(collection(db, "Post", `${CardDocID}`, "Comment"), {
                Card_OwnerUID : card.Data.UID,

                CardDocID : CardDocID,
                Comment : comment, 

                Card_SendUID : currentUser.uid, 
                date: Timestamp.now(),
            })
            setComment("") ; 
        }
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

    const onSerchMusic = () => {
        window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${card.Data.Music}+${card.Data.artist}`, "_blank", )
    }

    return(
        <div className='Card'>
            <div className='CardBackGroundImg'>
                <img src={BACKIMG} className="BackgroundImg"/>
                <div>
                    {card.Data.anonymous == true ? <> 
                        {card.Data.UID == currentData.uid ? 
                        <div className='CardProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>} 
                    </> : <div className='CardProfileTrue'>
                        <img src={Logo} width="180px"/>
                        <p className="CardAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}
                </div>

                <div className='CardForm'>
                    {next == false ? 
                        <h3> {card.Data.PostText} </h3> : <>
                        {card.Data.music == false ? null : <div className='CardMusicForm'>
                            <div className='CardMusicName'>
                                <h4> {card.Data.Music} - {card.Data.artist}</h4>
                            </div>
                            <div className='CardMusic'>
                                <div className='imgCardMusicBox' onClick={onSerchMusic}>
                                    <img src={Music} className="img_Music"/>
                                    <img src={MusicBox} className="img_MusicBox" />
                                </div>
                            </div>
                        </div>}
                    </>}
                </div>

                <div className='CardTagHeart'>
                    <div className='CardTag'>
                        {card.Data.tagList != "" && <div>
                            <span> #{card.Data.tagList[0]} </span>
                            <span> #{card.Data.tagList[1]} </span>
                            <span> #{card.Data.tagList[2]} </span> 
                        </div>}
                    </div>

                    <div className='CardHeartForm'>
                        {card.Data.like.includes(currentUser.uid) ? <div>
                            <img src={unLike} onClick={onClickLikeDelete} className="Heart" />
                            <h4> {card.Data.like.length} 명이 공감합니다. </h4>
                        </div> : <div>
                            <img src={Like} onClick={onClickLikeUpdate} />
                            <h4> {card.Data.like.length} 명이 공감합니다. </h4>
                        </div>}
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
            </div> 
            
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
                <img src={OkBtn} 
                    className={comment ? "OkBtnImg" : "OkBtnImgValue"}
                    onClick={onSaveComment} />
                </div>
            </div> : null}
            
            <div className={more == false ? 'Cardcomment' :  'CardcommentTrue'} >
                <CardComment card={card} setMore={setMore}/>
            </div>
        </div>
    )
}

export default Card ; 

