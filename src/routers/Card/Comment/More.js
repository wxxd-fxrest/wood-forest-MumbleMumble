import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import None  from '../../../Image/Mumble_Profile_None.PNG' ; 

const More = ({plusComment, commentData}) => {
    const [sendUserInfo, setSendUserInfo] = useState([]) ; 
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
        console.log(sendUserInfo) 
    } ; 

    useEffect(() => {
        getSendUserInfo() ; 
    }, []) ; 
    
    return(
        <div>
            {commentData.DocID == plusComment.Data.CommentDocID ? 
            <div>
                {sendUserInfo.attachmentUrl ? 
                    <img src={sendUserInfo.attachmentUrl} width="30px"/> : 
                    <img src={None} width="30px"/>}
                <h3> {plusComment.Data.Comment} </h3> 
                <p>{sendUserInfo.displayName}</p>
            </div> : null}
    </div>
    )
}

export default More ; 