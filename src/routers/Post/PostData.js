import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "./Post";

const PostData = () => {
    const [postData, setPostData] = useState([]) ; 

    const PostData = () => {
        const FeedCollection = query(
            collection(db, "Post"), 
            orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setPostData(feedArray) ;
        });
        console.log(postData)
    } ; 

    useEffect(() => {
        PostData() ;
    }, []) ; 

    return (
        <div>
            {/* <span>PostData</span> */}
            {postData.map((p, i) => (
                <Post key={i} postData={p}/>
            ))}
        </div>
    )
}

export default PostData ; 