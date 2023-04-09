import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import List from "./List";
import '../../../routers/Card/Comment/CommentMore.css' ;

const CommentList = ({commentData}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [plusComment, setPlusComment] = useState([]) ; 

    const getCommentList = () => {
        let CardDocID = commentData.Data.CardDocID ;
        let CommentDocID = commentData.DocID ; 
        const FeedCollection = query(
            collection(db, 
                "Post", `${CardDocID}`, 
                "Comment", `${CommentDocID}`, 
                "PlusComment"), 
            orderBy("date"), limit(2));
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
        <div style={{backgroundColor:"skyblue"}}>
            {plusComment.map((p, i) => (
                <List key={i} plusComment={p} commentData={commentData}/>
            ))}
        </div>
    )
}

export default CommentList ; 