import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../routers/Post/Post.css' ;
import { AuthContext } from '../../Context/AuthContext';

import Music from '../../Image/Mumble_Music1.png' ;
import MusicBox from '../../Image/Mumble_Music2.png' ;
import Logo  from '../../Image/Trash-mumble.png' ; 

import Left from '../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../Image/Icons/Mumble_Icon_angle-circle-right.png';
// Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>

import Like from '../../Image/Like/heart.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 

import unLike from '../../Image/Like/like.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 

import BACKIMG from '../../Image/paper texture.jpg'; 
// <a href="https://kr.freepik.com/free-vector/crumpled-paper-texture-realisric-crease-sheet_28312862.htm#query=paper%20texture&position=45&from_view=keyword&track=ais">작가 upklyak</a> 출처 Freepik 

const Post = ({postData}) => {
    const {currentUser} = useContext(AuthContext) ;
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]) ; 
    const [next, setNext] = useState(false) ; 

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${postData.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${postData.Data.UID}`) ; 
    } ; 

    const CurrentUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${postData.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
        }); 
    } ; 

    const likeUserUID = doc(db, "Post", `${postData.DocID}`);

    const onClickLikeUpdate = async () => {
        if(postData.Data.like != currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayUnion(currentUser.uid)
            });
        }
    } ;

    const onClickLikeDelete = async () => {
        if(postData.Data.like = currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayRemove(currentUser.uid)
            });
        }
    } ;

    const onSerchMusic = () => {
        window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${postData.Data.Music}+${postData.Data.artist}`, "_blank", )
    } ;

    useEffect(() => {
        CurrentUserInfo() ;
        console.log(postData.Data.tagList[0])
    }, []) ; 

    return (
        <div className='Post'>
             <div className="PostBackGroundImg">
                <img src={BACKIMG} className="BackgroundImg"/>
                <div>
                    {postData.Data.anonymous == true ? <> 
                        {postData.Data.UID == currentData.uid ? 
                        <div className='ProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>}
                    </> : <div className='ProfileTrue'>
                        <img src={Logo} width="180px"/>
                        <p className="PostAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}
                </div>

                <div className='PostForm' 
                    onClick={onCardPage}>
                    {next == false ? <h3> {postData.Data.PostText} </h3> : <>
                        {postData.Data.music == false ? null :
                        <div className='PostMusicForm'>
                            <div className='PostMusicName'>
                                <h4> {postData.Data.Music} - {postData.Data.artist}</h4>
                            </div>
                            <div className='PostMusic'>
                                <div className='imgPostMusicBox' onClick={onSerchMusic}>
                                    <img src={Music} className="img_Music"/>
                                    <img src={MusicBox} className="img_MusicBox" />
                                </div>
                            </div>
                        </div>}
                    </>}
                </div>

                <div className='PostTagHeart'>
                    <div className='PostTag'>
                        {postData.Data.tagList != "" && <div>
                            <span> #{postData.Data.tagList[0]} </span>
                            <span> #{postData.Data.tagList[1]} </span>
                            <span> #{postData.Data.tagList[2]} </span> 
                        </div>}
                    </div>

                    <div className='PostHeartForm'>
                        {postData.Data.like.includes(currentUser.uid) ? <div>
                            <img src={unLike} onClick={onClickLikeDelete} className="Heart" />
                            <h4> {postData.Data.like.length} 명이 공감합니다. </h4>
                        </div> : <div>
                            <img src={Like} onClick={onClickLikeUpdate} />
                            <h4> {postData.Data.like.length} 명이 공감합니다. </h4>
                        </div>}
                    </div>
                </div>

                {postData.Data.music == false ? null : <div>
                    {next == false ? 
                    <img className='PostNextButton1'
                        type='button'
                        src={Right}
                        onClick={() => {setNext(!next)}} /> :
                    <img className='PostNextButton2'
                        type='button'
                        src={Left}
                        onClick={() => {setNext(!next)}} /> }
                </div>}
            </div>
        </div>
    )
}

export default Post ; 