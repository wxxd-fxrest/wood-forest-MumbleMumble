import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SharedEmoticon from "./SharedEmoticon";
import { useNavigate } from "react-router-dom";
import Music from '../../../Image/Mumble_Music1.png' ;
import MusicBox from '../../../Image/Mumble_Music2.png' ;
import '../../../routers/Post/Post.css' ;

import Left from '../../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 
import ImageBtn from '../../../Image/expression_Icon/Mumble_image_icon.png' ;

const SharedProfile = ({pofilePost, profileInfo}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [next, setNext] = useState(false) ; 
    const [imgOpen, setImgOpen] = useState(false) ; 

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${pofilePost.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${pofilePost.Data.UID}`) ; 
    } ; 
    
    return(
        <div className="Post">
            {currentUser.uid == profileInfo.uid ?
            <div className="PostBackGroundImg">
                {pofilePost.Data.cardImgUrl &&
                <img src={ImageBtn} 
                    className={pofilePost.Data.selected ? 'ProfileImgOpenBtn' : 'ProfileImgOpenBtn2'}
                    onClick={() => setImgOpen(!imgOpen)} />}
                <div className='PostCardImgUrlForm'>
                    {imgOpen && <div className='PostCardImgUrl'>
                    <img src={pofilePost.Data.cardImgUrl} />
                        <button className='ImgOpenBtn_x'
                            onClick={() => setImgOpen(!imgOpen)}> x </button>
                    </div>}
                </div>
    
                <div className='PostProfile'>
                    {pofilePost.Data.UID == profileInfo.uid && 
                        <div className='PostProfileTrue' onClick={onProfilePage}>
                            <img src={profileInfo.attachmentUrl} />
                            <h5> {profileInfo.displayName} </h5>
                            {pofilePost.Data.anonymous == false && <p className="ProfileAnonymous"> 익명으로 올라간 카드입니다. </p>}
                        </div> } 
                    <div className='PostEmotion'>
                        <SharedEmoticon pofilePost={pofilePost}/>
                    </div>
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

                <div className='ProfileHeartForm'>
                    <input type="checkbox" />
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
                {pofilePost.Data.anonymous == false ? null : <div>
                    {pofilePost.Data.cardImgUrl ? <div>
                        <div className="PostBackGroundImg">      
                            <img src={ImageBtn}
                                className={pofilePost.Data.selected ? 'ProfileImgOpenBtn' : 'ProfileImgOpenBtn2'} 
                                onClick={() => setImgOpen(!imgOpen)} />
                            <div className='PostCardImgUrlForm'>
                                {imgOpen && <div className='PostCardImgUrl'>
                                <img src={pofilePost.Data.cardImgUrl} />
                                    <button className='ImgOpenBtn_x'
                                        onClick={() => setImgOpen(!imgOpen)}> x </button>
                                </div>}
                            </div>          
                            <div className='PostProfile'>
                                {pofilePost.Data.UID == profileInfo.uid &&
                                    <div className='PostProfileTrue' onClick={onProfilePage}>
                                        <img src={profileInfo.attachmentUrl} />
                                        <h5> {profileInfo.displayName} </h5>
                                        {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                    </div> } 

                                <div className='PostEmotion'>
                                    <SharedEmoticon pofilePost={pofilePost}/>
                                </div>
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

                            <div className='ProfileHeartForm'>
                                <input type="checkbox" />
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
                        </div>
                    </div> : <div className="PostBackGroundImg">
                        <div className='PostProfile'>
                            {pofilePost.Data.UID == profileInfo.uid &&
                                <div className='PostProfileTrue' onClick={onProfilePage}>
                                    <img src={profileInfo.attachmentUrl} />
                                    <h5> {profileInfo.displayName} </h5>
                                    {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                </div> } 

                            <div className='PostEmotion'>
                                <SharedEmoticon pofilePost={pofilePost}/>
                            </div>
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

                        <div className='ProfileHeartForm'>
                            <input type="checkbox" />
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
                    </div>}
                </div>}
            </div>}
        </div>
    )
}

export default SharedProfile ; 


    