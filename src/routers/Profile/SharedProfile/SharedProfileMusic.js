import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Music from '../../../Image/Mumble_Music1.png' ;
import MusicBox from '../../../Image/Mumble_Music2.png' ;
import '../../../routers/Post/Post.css' ;

import Left from '../../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 
import ImageBtn from '../../../Image/expression_Icon/Mumble_image_icon.png' ;
import MusicScreenEmoticon from "./MusicScreenEmoticon";
import Like from '../../../Image/Like/heart.png' ; 
import unLike from '../../../Image/Like/like.png' ; 
import { db } from "../../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
    

const SharedProfileMusic = ({pofileMusic, profileInfo}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [next, setNext] = useState(false) ; 
    const [imgOpen, setImgOpen] = useState(false) ; 

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${pofileMusic.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${pofileMusic.Data.UID}`) ; 
    } ; 

    const likeUserUID = doc(db, "Post", `${pofileMusic.DocID}`);
    
    const onClickLikeUpdate = async () => {
        if(pofileMusic.Data.like != currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayUnion(currentUser.uid)
            });
        }
    }

    const onClickLikeDelete = async () => {
        if(pofileMusic.Data.like = currentUser.uid) {
            await updateDoc(likeUserUID, {
                like: arrayRemove(currentUser.uid)
            });
        }
    }

    return (
        <div className="Post">
            {currentUser.uid == profileInfo.uid ?
            <div className="PostBackGroundImg">
                {pofileMusic.Data.cardImgUrl &&
                <img src={ImageBtn} 
                    className={pofileMusic.Data.selected ? 'ProfileImgOpenBtn' : 'ProfileImgOpenBtn2'}
                    onClick={() => setImgOpen(!imgOpen)} />}
                <div className='PostCardImgUrlForm'>
                    {imgOpen && <div className='PostCardImgUrl'>
                    <img src={pofileMusic.Data.cardImgUrl} />
                        <button className='ImgOpenBtn_x'
                            onClick={() => setImgOpen(!imgOpen)}> x </button>
                    </div>}
                </div>
    
                <div className='PostProfile'>
                    {pofileMusic.Data.UID == profileInfo.uid && 
                        <div className='PostProfileTrue' onClick={onProfilePage}>
                            <img src={profileInfo.attachmentUrl} />
                            <h5> {profileInfo.displayName} </h5>
                            {pofileMusic.Data.anonymous == false && <p className="ProfileAnonymous"> 익명으로 올라간 카드입니다. </p>}
                        </div> } 
                    <div className='PostEmotion'>
                        <MusicScreenEmoticon pofileMusic={pofileMusic}/>
                    </div>
                </div>

                <div className='PostForm'  
                    onClick={onCardPage}>
                    {next == false ? 
                    <h3> {pofileMusic.Data.PostText} </h3> : <>
                        {pofileMusic.Data.music == false ? null :
                        <div className='PostMusicForm'>
                            <div className='PostMusicName'>
                                <h4> {pofileMusic.Data.Music} - {pofileMusic.Data.artist}</h4>
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

                <div className='ProfileHeartForm'>
                    {pofileMusic.Data.like.includes(currentUser.uid) ? <div>
                        <img src={unLike} onClick={onClickLikeDelete} className="Heart"/>
                        <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                    </div> : <div>
                        <img src={Like} onClick={onClickLikeUpdate} />
                        <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                    </div>}
                </div>

                {pofileMusic.Data.music == false ? null : <div>
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
                {pofileMusic.Data.anonymous == false ? null : <div>
                    {pofileMusic.Data.cardImgUrl ? <div>
                        <div className="PostBackGroundImg">      
                            <img src={ImageBtn}
                                className={pofileMusic.Data.selected ? 'ProfileImgOpenBtn' : 'ProfileImgOpenBtn2'} 
                                onClick={() => setImgOpen(!imgOpen)} />
                            <div className='PostCardImgUrlForm'>
                                {imgOpen && <div className='PostCardImgUrl'>
                                <img src={pofileMusic.Data.cardImgUrl} />
                                    <button className='ImgOpenBtn_x'
                                        onClick={() => setImgOpen(!imgOpen)}> x </button>
                                </div>}
                            </div>          
                            <div className='PostProfile'>
                                {pofileMusic.Data.UID == profileInfo.uid &&
                                    <div className='PostProfileTrue' onClick={onProfilePage}>
                                        <img src={profileInfo.attachmentUrl} />
                                        <h5> {profileInfo.displayName} </h5>
                                        {pofileMusic.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                    </div> } 

                                <div className='PostEmotion'>
                                    <MusicScreenEmoticon pofileMusic={pofileMusic}/>
                                </div>
                            </div>

                            <div className='PostForm'  
                                onClick={onCardPage}>
                                {next == false ? 
                                <h3> {pofileMusic.Data.PostText} </h3> : <>
                                    {pofileMusic.Data.music == false ? null :
                                    <div className='PostMusicForm'>
                                        <div className='PostMusicName'>
                                            <h4> {pofileMusic.Data.Music} - {pofileMusic.Data.artist}</h4>
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

                            <div className='ProfileHeartForm'>
                                {pofileMusic.Data.like.includes(currentUser.uid) ? <div>
                                    <img src={unLike} onClick={onClickLikeDelete} className="Heart"/>
                                    <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                                </div> : <div>
                                    <img src={Like} onClick={onClickLikeUpdate} />
                                    <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                                </div>}
                            </div>

                            {pofileMusic.Data.music == false ? null : <div>
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
                        </div>
                    </div> : <div className="PostBackGroundImg">
                        <div className='PostProfile'>
                            {pofileMusic.Data.UID == profileInfo.uid &&
                                <div className='PostProfileTrue' onClick={onProfilePage}>
                                    <img src={profileInfo.attachmentUrl} />
                                    <h5> {profileInfo.displayName} </h5>
                                    {pofileMusic.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                </div> } 

                            <div className='PostEmotion'>
                                <MusicScreenEmoticon pofileMusic={pofileMusic}/>
                            </div>
                        </div>

                        <div className='PostForm'  
                            onClick={onCardPage}>
                            {next == false ? 
                            <h3> {pofileMusic.Data.PostText} </h3> : <>
                                {pofileMusic.Data.music == false ? null :
                                <div className='PostMusicForm'>
                                    <div className='PostMusicName'>
                                        <h4> {pofileMusic.Data.Music} - {pofileMusic.Data.artist}</h4>
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

                        <div className='ProfileHeartForm'>
                            {pofileMusic.Data.like.includes(currentUser.uid) ? <div>
                                <img src={unLike} onClick={onClickLikeDelete} className="Heart"/>
                                <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                            </div> : <div>
                                <img src={Like} onClick={onClickLikeUpdate} />
                                <h4> {pofileMusic.Data.like.length} 명이 공감합니다. </h4>
                            </div>}
                        </div>

                        {pofileMusic.Data.music == false ? null : <div>
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
                    </div>}
                </div>}
            </div>}
        </div>
    )
}

export default SharedProfileMusic ; 