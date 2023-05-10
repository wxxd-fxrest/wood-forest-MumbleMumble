import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import '../../../routers/Card/Comment/CommentMore.css' ;

import None  from '../../../Image/Trash-mumble.png' ; 

const List = ({plusComment, commentData}) => {
    const [sendUserInfo, setSendUserInfo] = useState([]) ;
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
                    </div>

                    <div className="MoreComment">
                        <h3> {plusComment.Data.Comment} </h3> 
                    </div>
                </div> : null}
        </div>
    )
}

export default List ;