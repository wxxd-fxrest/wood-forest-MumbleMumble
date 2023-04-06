import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import Home from "../../Main/Home";
import SharedProfile from "./SharedProfile";
import { v4 as uuidv4 } from 'uuid';

const SharedProfileData = () => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
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
        // console.log(profileInfo) 
    } ; 

    useEffect(() => {
        getProfile() ; 
        ProfileUserInfo() ;
    }, []) ; 

    return(
        <div>
            <div style={{backgroundColor:"skyblue"}}>
                <Home />                
                <img src={profileInfo.attachmentUrl} width="100px" />
                <p> {profileInfo.displayName} </p>
            </div>
            {pofilePost.map((p, i) => (
                <SharedProfile key={i} pofilePost={p} profileInfo={profileInfo}/>
            ))}
        </div>
    )
}

export default SharedProfileData ; 