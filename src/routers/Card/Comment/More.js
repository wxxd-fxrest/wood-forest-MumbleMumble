import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import '../../../routers/Card/Comment/CommentMore.css' ;

import None  from '../../../Image/Trash-mumble.png' ; 

import DeleteBtn from '../../../Image/delete (1).png'; 
// <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by amoghdesign - Flaticon</a> 

const More = ({plusComment, commentData}) => {
    const [sendUserInfo, setSendUserInfo] = useState([]) ; 
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();

    const getSendUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${plusComment.Data.Comment_SendUID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setSendUserInfo(doc.data()) ;
        }); 
    } ; 

    const onDelete = async() => {
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, 
                    "Post", `${commentData.Data.CardDocID}`, 
                    "Comment", `${commentData.DocID}`, 
                    "PlusComment", `${plusComment.DocID}`)); 
        }
    } ;

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${plusComment.Data.Comment_SendUID}`) ; 
    } ; 


    useEffect(() => {
        getSendUserInfo() ; 
    }, []) ; 
    
    return(
        <div>
            {commentData.DocID == plusComment.Data.CommentDocID ? 
            <div className="More">
                <div className="MoreProfile">
                    <div onClick={onProfilePage}>
                        {sendUserInfo.attachmentUrl ? <>
                            <h4> ➥ </h4>
                            <img src={sendUserInfo.attachmentUrl} width="30px"/> 
                        </> : <>
                            <h4> ➥ </h4>
                            <img src={None} width="30px"/>
                        </>}
                        <p>{sendUserInfo.displayName}</p>
                    </div>
                    {plusComment.Data.Comment_SendUID == currentUser.uid ? 
                        <img type='button'
                        src={DeleteBtn} 
                        className='commentDeleteButton'
                        onClick={onDelete} />  : null} 
                </div>
                <div className="MoreComment">
                    <h3> {plusComment.Data.Comment} </h3> 
                </div>
            </div> : null}
    </div>
    )
}

export default More ; 