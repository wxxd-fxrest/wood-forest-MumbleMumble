import More from "./More";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import '../../../routers/Card/Comment/CommentMore.css' ;

const CommentMore = ({commentData}) => {
    const [plusComment, setPlusComment] = useState([]) ; 

    const getCommentList = () => {
        let CardDocID = commentData.Data.CardDocID ;
        let CommentDocID = commentData.DocID ; 
        const FeedCollection = query(
            collection(db, 
                "Post", `${CardDocID}`, 
                "Comment", `${CommentDocID}`, 
                "PlusComment"), 
            orderBy("date"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setPlusComment(feedArray) ;
        });
    } ; 

    useEffect(() => {
        getCommentList() ;
    }, []) ; 
    return(
        <div className="CommentMore">
            {plusComment.map((p, i) => (
                <More key={i} plusComment={p} commentData={commentData}/>
            ))}
        </div>
    )
}

export default CommentMore ; 