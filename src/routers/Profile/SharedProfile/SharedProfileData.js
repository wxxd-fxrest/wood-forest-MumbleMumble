import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebase";
import Home from "../../Main/Home";
import SharedProfile from "./SharedProfile";
import '../../../routers/Profile/SharedProfile/SharedProfile.css';
import RandomData from "../../Empty/RandomData";

const SharedProfileData = () => {
    const [pofilePost, setProfilePost] = useState([]) ; 
    const [profileInfo, setProfileInfo] = useState([]) ; 

    const location = useLocation() ;

    const pathname = location.pathname ; 
    const pathUID = (pathname.split('/')[2]);

    const getProfile = async () => {
        const FeedCollection = query(
            collection(db, "Post"), 
            where("UID", "==", `${pathUID}`),
            orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setProfilePost(feedArray) ;
        });
    } ; 

    const ProfileUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${pathUID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setProfileInfo(doc.data()) ;
        }); 
    } ; 

    useEffect(() => {
        getProfile() ; 
        ProfileUserInfo() ;
    }, []) ; 

    return(
        <div className="SharedProfileMain">
            <div className="SharedProfileContainer">

                <div className="SharedProfileHome">
                    <Home />        
                </div>
                       
                <div className="SharedProfile">
                    <div className="SharedProfileBox">
                        <img src={profileInfo.attachmentUrl} />
                        <div>
                            <p> {profileInfo.displayName} </p>
                        </div>
                    </div>
                    
                    <div>
                        {pofilePost.map((p, i) => (
                            <SharedProfile key={i} pofilePost={p} profileInfo={profileInfo}/>
                        ))}
                    </div>
                </div>
                
                <div className="SharedProfileEmpty">
                    <RandomData />
                </div>
            </div>
        </div>
    )
}

export default SharedProfileData ; 