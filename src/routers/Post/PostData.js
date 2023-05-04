import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "./Post";
import '../../routers/Post/Post.css' ;

const PostData = () => {
    const [postData, setPostData] = useState([]) ; 

    const getPostData = () => {
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
    } ; 

    useEffect(() => {
        getPostData() ;
    }, []) ; 

    return (
        <div className="PostData">
            <div className="PostDataHeader">
                <h4> Home </h4>
            </div>
            <div className="PostList">
                {postData.map((p, i) => (
                    <Post key={i} postData={p} />
                ))}
            </div>
        </div>
    )
}

export default PostData ; 
