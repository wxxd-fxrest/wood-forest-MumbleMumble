import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../firebase";
import Profile from "./Profile";

const ProfileData = () => {
    const {currentUser} = useContext(AuthContext) ; 
    const [currentPost, setCurrentPost] = useState([]) ; 

    const CurrentPost = async () => {
        const FeedCollection = query(
            collection(db, "Post"), 
            where("UID", "==", `${currentUser.uid}`),
            orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setCurrentPost(feedArray) ;
        });
    } ; 

    useEffect(() => {
        CurrentPost() ; 
    }, []) ; 

    return (
        <div>
            {currentPost.map((p, i) => (
                <Profile key={i} currentPost={p} />
            ))}
        </div>
    )
}

export default ProfileData ; 