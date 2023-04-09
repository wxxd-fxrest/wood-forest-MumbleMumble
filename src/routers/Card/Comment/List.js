import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import None  from '../../../Image/Mumble_Profile_None.PNG' ;
import '../../../routers/Card/Comment/CommentMore.css' ;

const List = ({plusComment, commentData}) => {
    const [sendUserInfo, setSendUserInfo] = useState([]) ;
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();

    // console.log("plusComment =>", plusComment)
    // console.log("commentData =>", commentData)

    const getSendUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${plusComment.Data.Comment_SendUID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setSendUserInfo(doc.data()) ;
        }); 
        // console.log(sendUserInfo) 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${plusComment.Data.Comment_SendUID}`) ; 
    } ; 


    useEffect(() => {
        getSendUserInfo() ; 
    }, []) ; 
    
    return(

    //     <div>
    //         {commentData.DocID == plusComment.Data.CommentDocID ? 
    //         <div className="More">
    //             <div className="MoreProfile">
    //                 <div onClick={onProfilePage}>
    //                     {sendUserInfo.attachmentUrl ? <>
    //                         <h4> ➥ </h4>
    //                         <img src={sendUserInfo.attachmentUrl} width="30px"/> 
    //                     </> : <>
    //                         <h4> ➥ </h4>
    //                         <img src={None} width="30px"/>
    //                     </>}
    //                     <p>{sendUserInfo.displayName}</p>
    //                 </div>
    //                 {plusComment.Data.Comment_SendUID == currentUser.uid ? 
    //                     <button type='button' onClick={onDelete}> 삭제 </button> : null} 
    //             </div>
    //             <div className="MoreComment">
    //                 <h3> {plusComment.Data.Comment} </h3> 
    //             </div>
    //         </div> : null}
    // </div>


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
                    </div>

                    <div className="MoreComment">
                        <h3> {plusComment.Data.Comment} </h3> 
                    </div>
                </div> : null}
        </div>
    )
}

export default List ;