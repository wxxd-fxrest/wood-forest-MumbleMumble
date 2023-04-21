import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import PostEmoticon from './PostEmoticon';
import '../../routers/Post/Post.css' ;
import Music from '../../Image/Mumble_Music.png' ;

const Post = ({postData}) => {
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

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 

    return (
        <div className='Post'>
            {postData.Data.cardImgUrl ? 
            <div className='PostBackGroundImg'>
                <img src={postData.Data.cardImgUrl} />
                <div className='PostProfile'>
                    {postData.Data.anonymous == true ? <> 
                        {postData.Data.UID == currentData.uid ? 
                        <div className='PostProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={None} width="180px"/>} 
                    </> : <div className='PostProfileTrue'>
                        <img src={None} width="180px"/>
                        <p className="ProfileAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}

                    <div className='PostEmotion'>
                        <PostEmoticon postData={postData}/>
                    </div>
                </div>
                        
                <div className='PostForm' 
                    onClick={onCardPage}>
                    {next == false ? 
                        <h3> {postData.Data.PostText} </h3> : <>
                        {postData.Data.music == false ? null :
                            <div className='PostMusicForm'>
                                <div className='PostMusicName'>
                                    <h4> {postData.Data.Music} - {postData.Data.artist}</h4>
                                </div>
                                <div className='PostMusic'>
                                    <img src={Music} />
                                    <div className='PostMusicBox'></div>
                                </div>
                            </div>}
                    </>}
                </div>
                
                {postData.Data.music == false ? null : <>
                    {next == false ? 
                    <button className='PostNextButton1'
                        type='button'
                        onClick={() => {setNext(!next)}}> 다음 </button> :
                    <button className='PostNextButton2'
                        type='button'
                        onClick={() => {setNext(!next)}}> 이전 </button> }
                </> }

            </div> : <div className="PostBackGroundImg">
                <div>
                    {postData.Data.anonymous == true ? <> 
                        {postData.Data.UID == currentData.uid ? 
                        <div className='PostProfileTrue'  onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={None} width="180px"/>}
                    </> : <div className='PostProfileTrue'>
                        <img src={None} width="180px"/>
                        <p className="ProfileAnonymous"> 익명으로 올라온 카드입니다. </p> 
                    </div>}
                    <div className='PostEmotion'>
                        <PostEmoticon postData={postData}/>
                    </div>
                </div>

                <div className='PostForm' 
                    onClick={onCardPage}>
                    {next == false ? 
                        <h3> {postData.Data.PostText} </h3> : <>
                        {postData.Data.music == false ? null :
                        <div className='PostMusicForm'>
                            <div className='PostMusicName'>
                                <h4> {postData.Data.Music} - {postData.Data.artist}</h4>
                            </div>
                            <div className='PostMusic'>
                                <img src={Music} />
                                <div className='PostMusicBox'></div>
                            </div>
                        </div>}
                    </>}
                </div>
                {postData.Data.music == false ? null : <>
                    {next == false ? 
                    <button className='PostNextButton1'
                        type='button'
                        onClick={() => {setNext(!next)}}> 다음 </button> :
                    <button className='PostNextButton2'
                        type='button'
                        onClick={() => {setNext(!next)}}> 이전 </button> }
                </>}
            </div>}
        </div>
    )
}

export default Post ; 