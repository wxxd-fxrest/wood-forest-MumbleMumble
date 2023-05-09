import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import CommentList from "./CommentList";
import CommentMore from "./CommentMore";
import '../../../routers/Card/Comment/Comment.css';

import None  from '../../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
// <a href="https://www.flaticon.com/kr/free-icons/" title="공고 아이콘">공고 아이콘  제작자: Slidicon - Flaticon</a>

import DeleteBtn from '../../../Image/delete (1).png'; 
// <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by amoghdesign - Flaticon</a> 

const Comment = ({commentData, setMore}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [sendUserInfo, setSendUserInfo] = useState([]) ; 
    const [comment, setComment] = useState("") ; 
    const [open, setOpen] = useState(false) ; 

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
    } ; 

    useEffect(() => {
        getSendUserInfo() ; 
    }, []) ; 

    return(
        <div className="Comment">
            <div className="CommentFrom">
                <div>
                    <div className="CommentProfile">
                        {sendUserInfo.attachmentUrl ? 
                            <img src={sendUserInfo.attachmentUrl} className="commentPfofileImg"
                                onClick={onProfilePage}/> : 
                            <img src={None} width="100px"
                                onClick={onProfilePage}/>}
                        <h4 onClick={onProfilePage}> {sendUserInfo.displayName} </h4>
                        {commentData.Data.Card_SendUID == currentUser.uid && 
                                <img type='button'
                                    src={DeleteBtn} 
                                    className='commentDeleteButton'
                                    onClick={onDelete} /> } 
                    </div>
                    <div className="CommentText">
                        <span> {commentData.Data.Comment} </span>
                    </div>
                </div>
            </div>

            {open == true ? <div className="CommentMoreProps">
                    <div className="CommentMoreModal">
                        <CommentMore commentData={commentData}/>    
                        <div>
                            <textarea type="textarea"
                                name="comment"
                                placeholder="댓글" 
                                value={comment}
                                onChange={(e) => {
                                    const {target : {value}} = e ; 
                                    setComment(value) ; 
                            }}/>
                            <button type='submit' 
                                    className="CommentOKbtn"
                                    onClick={onPlusComment}> OK </button>
                            <button type='button' 
                                    className="CommentBackbtn"
                                    onClick={() => 
                                        {setOpen(!open)
                                        setMore(false)}}> 이전 </button>
                        </div>
                </div>
                
            </div> : <div className="CommentListProps">
                <CommentList commentData={commentData}/>    
                {open == false && <div className="CommentRE">
                    {commentData.Data.Card_OwnerUID == currentUser.uid || 
                    commentData.Data.Card_SendUID == currentUser.uid ? 
                        <button type="button" 
                                onClick={() => {
                                    setOpen(!open)
                                    setMore(true)}}> 더보기 </button> : null}
                </div>}
            </div>}
        </div>
    )
}

export default Comment ; 