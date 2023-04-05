import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Comment from "./Comment";

const CardComment = ({card}) => {
    const [commentData, setCommentData] = useState([]) ; 

    const getCommentData = () => {
        const FeedCollection = query(
            collection(db, "Post", `${card.DocID}`, "Comment"), 
            orderBy("date"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setCommentData(feedArray) ;
        });
    } ; 
    // console.log(commentData)

    useEffect(() => {
        getCommentData() ;
    }, []) ; 
    
    return(
        <div>
            {commentData.map((c, i) => (
                <Comment key={i} commentData={c}/>
            ))}
        </div>
    )
}

export default CardComment ; 