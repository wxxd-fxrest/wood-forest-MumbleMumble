import { useNavigate } from 'react-router-dom';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import ANGER from '../../Image/Mumble_anger.png' ; 
import CONFUSION from '../../Image/Mumble_confusion.png' ; 
import DAZED from '../../Image/Mumble_dazed.png' ; 
import HAPPY from '../../Image/Mumble_happy.png' ; 
import SADNESS from '../../Image/Mumble_sadness.png' ; 
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';


const Profile = ({currentPost}) => {
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]) ; 


    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${currentPost.Data.UUID}`) ; 
    } ;

    const CurrentUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${currentPost.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
        }); 
        console.log(currentData) ;
    } ; 

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 

    console.log(currentPost)


    return(
        <div onClick={onCardPage}>
        {currentPost.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${currentPost.Data.cardImgUrl})`, height:"300px"}}>
                {currentPost.Data.anonymous == true && <> 
                    {currentPost.Data.UID == currentData.uid && 
                        <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                    </> }
                {currentPost.Data.anonymous == true && <> 
                    {currentPost.Data.UID == currentData.uid ?
                        <img src={currentData.attachmentUrl} width="180px"/> : 
                        <img src={None} width="180px"/>}
                </>}
                <h3> {currentPost.Data.PostText} </h3>
                <h4> {currentPost.Data.Music} </h4>
                <h4> {currentPost.Data.artist} </h4>
                {currentPost.Data.selected == "좋아" && <img src={HAPPY} width="50px"/>}
                {currentPost.Data.selected == "화나" && <img src={ANGER} width="50px"/>}
                {currentPost.Data.selected == "슬퍼" && <img src={SADNESS} width="50px"/>}
                {currentPost.Data.selected == "멍..." && <img src={DAZED} width="50px"/>}
                {currentPost.Data.selected == "혼란" && <img src={CONFUSION} width="50px"/>}
            </div> : <div style={{backgroundColor:"yellow"}}>
                {currentPost.Data.anonymous == true && <> 
                    {currentPost.Data.UID == currentData.uid && 
                        <h5 style={{backgroundColor:"red"}}> {currentData.displayName} </h5>} 
                    </> }
                {currentPost.Data.anonymous == true && <> 
                    {currentPost.Data.UID == currentData.uid ?
                        <img src={currentData.attachmentUrl} width="180px"/> : 
                        <img src={None} width="180px"/>}
                </>}
                <h3> {currentPost.Data.PostText} </h3>
                <h4> {currentPost.Data.Music} </h4>
                <h4> {currentPost.Data.artist} </h4>
                {currentPost.Data.selected == "좋아" && <img src={HAPPY} width="50px"/>}
                {currentPost.Data.selected == "화나" && <img src={ANGER} width="50px"/>}
                {currentPost.Data.selected == "슬퍼" && <img src={SADNESS} width="50px"/>}
                {currentPost.Data.selected == "멍..." && <img src={DAZED} width="50px"/>}
                {currentPost.Data.selected == "혼란" && <img src={CONFUSION} width="50px"/>}
            </div>}
        </div>
    )
}

export default Profile ; 