import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
// import ANGER from '../../Image/Mumble_anger.png' ; 
// import CONFUSION from '../../Image/Mumble_confusion.png' ; 
// import DAZED from '../../Image/Mumble_dazed.png' ; 
// import HAPPY from '../../Image/Mumble_happy.png' ; 
// import SADNESS from '../../Image/Mumble_sadness.png' ; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import PostEmoticon from './PostEmoticon';

const Post = ({postData}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]) ; 
    const [my, setMy] = useState(false) ; 

    // /profile/:uid

    // console.log(postData)

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
        // console.log(currentData) ;
    } ; 

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 

    return (
        <div>
        {postData.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${postData.Data.cardImgUrl})`, height:"300px"}}>
                <div onClick={onProfilePage}>
                    {postData.Data.anonymous == true && <> 
                        {postData.Data.UID == currentData.uid && 
                            <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                        </> }
                    {postData.Data.anonymous == true && <> 
                        {postData.Data.UID == currentData.uid ?
                            <img src={currentData.attachmentUrl} width="180px"/>: 
                            <img src={None} width="180px"/>}
                    </>}
                </div>
                <div onClick={onCardPage}>
                    <h3> {postData.Data.PostText} </h3>
                    <h4> {postData.Data.Music} </h4>
                    <h4> {postData.Data.artist} </h4>
                    <PostEmoticon postData={postData}/>
                </div>
            </div> : <div style={{backgroundColor:"skyblue"}}>
                <div onClick={onProfilePage}>
                    {postData.Data.anonymous == true && <> 
                        {postData.Data.UID == currentData.uid && 
                            <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                        </> }
                    {postData.Data.anonymous == true && <> 
                        {postData.Data.UID == currentData.uid ?
                            <img src={currentData.attachmentUrl} width="180px"/>: 
                            <img src={None} width="180px"/>}
                    </>}
                </div>
                <div onClick={onCardPage}>
                    <h3> {postData.Data.PostText} </h3>
                    <h4> {postData.Data.Music} </h4>
                    <h4> {postData.Data.artist} </h4>
                    <PostEmoticon postData={postData}/>
                </div>
            </div>}
        </div>
    )
}

export default Post ; 