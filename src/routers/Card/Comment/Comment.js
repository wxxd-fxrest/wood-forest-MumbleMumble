import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import None  from '../../../Image/Mumble_Profile_None.PNG' ; 
import CommentList from "./CommentList";
import CommentMore from "./CommentMore";

const Comment = ({commentData}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [sendUserInfo, setSendUserInfo] = useState([]) ; 
    const [comment, setComment] = useState("") ; 
    const [open, setOpen] = useState(false) ; 
    // console.log(commentData); 

    const onPlusComment = async () => {
        let CardDocID = commentData.Data.CardDocID ;
        let CommentDocID = commentData.DocID ;
        await addDoc(collection(db, 
            "Post", `${CardDocID}`, 
            "Comment", `${CommentDocID}`, 
            "PlusComment"), {
            CommentDocID: CommentDocID,
            Comment_SendUID : currentUser.uid, 
            date: Timestamp.now(),
            Comment : comment, 
        })
        setComment("") ; 
    }


    const onDelete = async() => {
        const ok = window.confirm("이 댓글을 삭제하면 하위 모든 댓글이 함께 삭제됩니다. 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, 
                    "Post", `${commentData.Data.CardDocID}`, 
                    "Comment", `${commentData.DocID}`)); 
            // navigate("/") ;
        }
    } ;

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${commentData.Data.Card_SendUID}`) ; 
    } ; 

    const getSendUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${commentData.Data.Card_SendUID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setSendUserInfo(doc.data()) ;
        }); 
        // console.log(sendUserInfo) ; 
    } ; 

    useEffect(() => {
        getSendUserInfo() ; 
    }, []) ; 

    return(
        <div>
            {commentData.Data.Card_SendUID == currentUser.uid && 
                <button type='button' onClick={onDelete}> 삭제 </button>} 
            <div onClick={onProfilePage}>
                {sendUserInfo.attachmentUrl ? 
                    <img src={sendUserInfo.attachmentUrl} width="100px"/> : 
                    <img src={None} width="100px"/>}
                <h4> {sendUserInfo.displayName} </h4>
                <span> {commentData.Data.Comment} </span>
            </div>


            {commentData.Data.Card_OwnerUID == currentUser.uid || 
            commentData.Data.Card_SendUID == currentUser.uid ? 
                <button type="button" onClick={() => setOpen(!open)}> 대댓글 </button> : null}

            {open == true ? <>
                <CommentMore commentData={commentData}/>
                <input type="textarea"
                    name="comment"
                    placeholder="댓글" 
                    value={comment}
                    onChange={(e) => {
                        const {target : {value}} = e ; 
                        setComment(value) ; 
                    }}/>
                <button type='submit' onClick={onPlusComment}> OK </button>
            </> : <CommentList commentData={commentData}/>}
        </div>
    )
}

export default Comment ; 