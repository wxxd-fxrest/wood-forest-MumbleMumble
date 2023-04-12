import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Comment from "./Comment";
import '../../../routers/Card/Comment/Comment.css';

const CardComment = ({card, setMore}) => {
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

    useEffect(() => {
        getCommentData() ;
    }, []) ; 
    
    return(
        <div className="commentData">
            {commentData.map((c, i) => (
                <Comment key={i} commentData={c} setMore={setMore} />
            ))}
        </div>
    )
}

export default CardComment ; 