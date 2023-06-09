import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../../routers/Post/Post.css' ;
import { db } from "../../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
    
import Music from '../../../Image/Mumble_Music1.png' ;
import MusicBox from '../../../Image/Mumble_Music2.png' ;

import Left from '../../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 
// Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>

import BACKIMG from '../../../Image/paper texture.jpg'; 
// <a href="https://kr.freepik.com/free-vector/crumpled-paper-texture-realisric-crease-sheet_28312862.htm#query=paper%20texture&position=45&from_view=keyword&track=ais">작가 upklyak</a> 출처 Freepik 

import Like from '../../../Image/Like/heart.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 
import unLike from '../../../Image/Like/like.png' ; 
// <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Freepik - Flaticon</a> 


const SharedProfile = ({pofilePost, profileInfo}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [next, setNext] = useState(false) ; 

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${pofilePost.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${pofilePost.Data.UID}`) ; 
    } ; 

    const likeUserUID = doc(db, "Post", `${pofilePost.DocID}`);
    
    const onClickLikeUpdate = async () => {
        if(pofilePost.Data.like != currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayUnion(currentUser.uid)
            });
        }
    } ;

    const onClickLikeDelete = async () => {
        if(pofilePost.Data.like = currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayRemove(currentUser.uid)
            });
        }
    } ;

    const onSerchMusic = () => {
        window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${pofilePost.Data.Music}+${pofilePost.Data.artist}`, "_blank", )
    } ;
    
    return(
        <div className="Post">
            {currentUser.uid == profileInfo.uid ?
            <div className="PostBackGroundImg">
                <img src={BACKIMG} className="BackgroundImg"/>
                <div>
                    {pofilePost.Data.UID == profileInfo.uid && 
                        <div className='ProfileTrue' onClick={onProfilePage}>
                            <img src={profileInfo.attachmentUrl} />
                            <h5> {profileInfo.displayName} </h5>
                            {pofilePost.Data.anonymous == false && <p className="ProfileAnonymous"> 익명으로 올라간 카드입니다. </p>}
                        </div> } 
                </div>

                <div className='PostForm'  
                    onClick={onCardPage}>
                    {next == false ? 
                    <h3> {pofilePost.Data.PostText} </h3> : <>
                        {pofilePost.Data.music == false ? null :
                        <div className='PostMusicForm'>
                            <div className='PostMusicName'>
                                <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
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

                <div className='ProfileTagHeart'>
                    <div className='ProfileTag'>
                        {pofilePost.Data.tagList != "" && <div>
                            <span> #{pofilePost.Data.tagList[0]} </span>
                            <span> #{pofilePost.Data.tagList[1]} </span>
                            <span> #{pofilePost.Data.tagList[2]} </span>
                        </div>}
                    </div>

                    <div className='ProfileHeartForm'>
                        {pofilePost.Data.like.includes(currentUser.uid) ? <div>
                            <img src={unLike} onClick={onClickLikeDelete} className="Heart"/>
                            <h4> {pofilePost.Data.like.length} 명이 공감합니다. </h4>
                        </div> : <div>
                            <img src={Like} onClick={onClickLikeUpdate} />
                            <h4> {pofilePost.Data.like.length} 명이 공감합니다. </h4>
                        </div>}
                    </div>
                </div>

                {pofilePost.Data.music == false ? null : <div>
                    {next == false ? 
                    <img className='PostNextButton1'
                        type='button'
                        src={Right}
                        onClick={() => {setNext(!next)}} /> :
                    <img className='PostNextButton2'
                        type='button'
                        src={Left}
                        onClick={() => {setNext(!next)}} /> }
                </div> }
            </div> : <div>
                {pofilePost.Data.anonymous == false ? 
                <div className="PostBackGroundImg">     
                    <img src={BACKIMG} className="BackgroundImg"/>
                    <div>
                        {pofilePost.Data.UID == profileInfo.uid &&
                            <div className='ProfileTrue' onClick={onProfilePage}>
                                <img src={profileInfo.attachmentUrl} />
                                <h5> {profileInfo.displayName} </h5>
                                {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                            </div> } 
                    </div>
                </div> : <div className="PostBackGroundImg">     
                        <img src={BACKIMG} className="BackgroundImg"/>
                        <div>
                            {pofilePost.Data.UID == profileInfo.uid &&
                                <div className='ProfileTrue' onClick={onProfilePage}>
                                    <img src={profileInfo.attachmentUrl} />
                                    <h5> {profileInfo.displayName} </h5>
                                    {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                </div> } 
                        </div>

                        <div className='PostForm'  
                            onClick={onCardPage}>
                            {next == false ? 
                            <h3> {pofilePost.Data.PostText} </h3> : <>
                                {pofilePost.Data.music == false ? null :
                                <div className='PostMusicForm'>
                                    <div className='PostMusicName'>
                                        <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
                                    </div>
                                    <div className='PostMusic'>
                                        <div className='imgPostMusicBox'>
                                            <img src={Music} className="img_Music"/>
                                            <img src={MusicBox} className="img_MusicBox" />
                                        </div>
                                    </div>
                                </div>}
                            </>}
                        </div>

                        <div className='ProfileTagHeart'>
                            <div className='ProfileTag'>
                                {pofilePost.Data.tagList != "" && <div>
                                    <span> #{pofilePost.Data.tagList[0]} </span>
                                    <span> #{pofilePost.Data.tagList[1]} </span>
                                    <span> #{pofilePost.Data.tagList[2]} </span>
                                </div>}
                            </div>

                            <div className='ProfileHeartForm'>
                                {pofilePost.Data.like.includes(currentUser.uid) ? <div>
                                    <img src={unLike} onClick={onClickLikeDelete} className="Heart"/>
                                    <h4> {pofilePost.Data.like.length} 명이 공감합니다. </h4>
                                </div> : <div>
                                    <img src={Like} onClick={onClickLikeUpdate} />
                                    <h4> {pofilePost.Data.like.length} 명이 공감합니다. </h4>
                                </div>}
                            </div>
                        </div>

                        {pofilePost.Data.music == false ? null : <div>
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
                </div>}
            </div>}
        </div>
    )
}

export default SharedProfile ; 

