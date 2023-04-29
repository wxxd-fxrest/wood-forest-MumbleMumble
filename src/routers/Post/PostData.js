import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "./Post";
import '../../routers/Post/Post.css' ;
import { AuthContext } from "../../Context/AuthContext";

const PostData = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [postData, setPostData] = useState([]) ; 
    const [likeList, setLikeList] = useState([]) ; 

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

    const getLike = async () => {
        const FeedCollection = query(
            collection(db, "Post"), 
            where("like", "array-contains", `${currentUser.uid}`));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setLikeList(feedArray) ;
            console.log(likeList)
        });
    } ; 

    useEffect(() => {
        getPostData() ;
        getLike() ;
    }, []) ; 

    return (
        <div className="PostData">
            <div className="PostDataHeader">
                <h4> Home </h4>
            </div>
            <div className="PostList">
                {postData.map((p, i) => (
                    <Post key={i} postData={p} likeList={likeList}/>
                ))}
            </div>
        </div>
    )
}

export default PostData ; 

//like data 가져오는 것까지, 출력 해야 함. 
// 중첩 map 알아봐야 함. 