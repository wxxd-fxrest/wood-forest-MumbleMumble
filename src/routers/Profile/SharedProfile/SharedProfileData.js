import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import Home from "../../Main/Home";
import SharedProfile from "./SharedProfile";
import '../../../routers/Profile/SharedProfile/SharedProfile.css';
import Random from "../../Empty/Random";
import SharedProfileMusic from "./SharedProfileMusic";
import RandomData from "../../Empty/RandomData";

const SharedProfileData = () => {
    const [pofilePost, setProfilePost] = useState([]) ; 
    // const [pofileMusic, setProfileMusic] = useState([]) ;
    const [profileInfo, setProfileInfo] = useState([]) ; 
    const [tab, setTab] = useState(1) ; 

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

    // const getProfileMusic = async () => {
    //     const FeedCollection = query(
    //         collection(db, "Post"), 
    //         where("UID", "==", `${pathUID}`),
    //         where("music", "==", true),
    //     );
    //     onSnapshot(FeedCollection, (querySnapshot) => {
    //         let feedArray = []
    //         querySnapshot.forEach((doc) => {
    //             feedArray.push({
    //                 DocID: doc.id, 
    //                 Data: doc.data(),
    //             })
    //         });
    //         setProfileMusic(feedArray) ;
    //         console.log(pofileMusic) ;
    //     });
    // } ; 

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
        // getProfileMusic() ;
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

                    {/* <ul className="SharedProfileTabForm">
                        <li onClick={() => setTab(1)}
                            className={tab === 1 ? "tab_on" : "tab"}> all </li>
                        <li onClick={() => setTab(2)}
                            className={tab === 2 ? "tab_on" : "tab"}> music </li>
                    </ul> */}

                    <div className={tab === 1 ? "SharedProfileMap" : "SharedProfileMapHidden"}>
                        {pofilePost.map((p, i) => (
                            <SharedProfile key={i} pofilePost={p} profileInfo={profileInfo}/>
                        ))}
                    </div>

                    {/* <div className={tab === 2 ? "SharedProfileMap" : "SharedProfileMapHidden"}>
                        {pofileMusic.map((m, i) => (
                            <SharedProfileMusic key={i} pofileMusic={m} profileInfo={profileInfo}/>
                        ))}
                    </div> */}

                </div>
                <div className="SharedProfileEmpty">
                    <RandomData />
                </div>
            </div>
        </div>
    )
}

export default SharedProfileData ; 