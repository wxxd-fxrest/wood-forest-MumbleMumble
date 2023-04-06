import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import None  from '../../../Image/Mumble_Profile_None.PNG' ; 

const More = ({plusComment, commentData}) => {
    const [sendUserInfo, setSendUserInfo] = useState([]) ; 
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();

    // console.log("plusComment =>", plusComment) ;
    // console.log("commentData =>", commentData)

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
            <div>
                <div onClick={onProfilePage}>
                    {sendUserInfo.attachmentUrl ? 
                        <img src={sendUserInfo.attachmentUrl} width="30px"/> : 
                        <img src={None} width="30px"/>}
                    <p>{sendUserInfo.displayName}</p>
                </div>
                {plusComment.Data.Comment_SendUID == currentUser.uid && 
                    <button type='button' onClick={onDelete}> 삭제 </button>} 
                <h3> {plusComment.Data.Comment} </h3> 
            </div> : null}
    </div>
    )
}

export default More ; 