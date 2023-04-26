import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import PostEmoticon from './PostEmoticon';
import '../../routers/Post/Post.css' ;
import Music from '../../Image/Mumble_Music1.png' ;
import MusicBox from '../../Image/Mumble_Music2.png' ;
import Left from '../../Image/Icons/Mumble_Icon_angle-circle-left.png'; 
import Right from '../../Image/Icons/Mumble_Icon_angle-circle-right.png'; 

const Post = ({postData}) => {
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]) ; 
    const [next, setNext] = useState(false) ; 
    const [imgOpen, setImgOpen] = useState(false) ; 

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
                <button className={postData.Data.selected ? 'ImgOpenBtn' : 'ImgOpenBtn2'}
                    onClick={() => setImgOpen(!imgOpen)}> img </button>
                <div className='PostCardImgUrlForm'>
                    {imgOpen && <div className='PostCardImgUrl'>
                        <img src={postData.Data.cardImgUrl} />
                        <button className='ImgOpenBtn_x'
                            onClick={() => setImgOpen(!imgOpen)}> x </button>
                    </div>}
                </div>
                <div className='PostProfile'>
                    {postData.Data.anonymous == true ? <> 
                        {postData.Data.UID == currentData.uid ? 
                        <div className='PostProfileTrue' onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>} 
                    </> : <div className='PostProfileTrue'>
                        <img src={Logo} width="180px"/>
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
                                    <div className='imgPostMusicBox'>
                                        <img src={Music} className="img_Music"/>
                                        <img src={MusicBox} className="img_MusicBox" />
                                    </div>
                                </div>
                            </div>}
                    </>}
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
                </div> }

            </div> : <div className="PostBackGroundImg">
                <div>
                    {postData.Data.anonymous == true ? <> 
                        {postData.Data.UID == currentData.uid ? 
                        <div className='PostProfileTrue'  onClick={onProfilePage}>
                            <img src={currentData.attachmentUrl} />
                            <h5> {currentData.displayName} </h5>
                        </div> : <img src={Logo} width="180px"/>}
                    </> : <div className='PostProfileTrue'>
                        <img src={Logo} width="180px"/>
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
                                <div className='imgPostMusicBox'>
                                    <img src={Music} className="img_Music"/>
                                    <img src={MusicBox} className="img_MusicBox" />
                                </div>
                            </div>
                        </div>}
                    </>}
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
            </div>}
        </div>
    )
}

export default Post ; 