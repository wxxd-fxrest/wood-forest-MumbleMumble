import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../Context/AuthContext';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import '../../routers/Profile/ProfileEdit.css'; 

import None  from '../../Image/Trash-mumble.png' ; 

const ProfileEdit = ({setEditOpen, editOpen}) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext) ; 
    const [displayName, setDisplayName] = useState("") ; 
    const [attachment, setAttachment] = useState("") ; 
    const [currentInfo, setCurrentInfo] = useState([]) ; 

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ; 
        } 
    } ;

    const CurrentInfo = async() => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentInfo(doc.data())
        }); 
    } ;

    useEffect(() => {
        CurrentInfo() ; 
    }, []) ;

    const onFileChange = (event) => {
        setAttachment(null) ;
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setAttachment(result) ; 
        } ;
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile) ; 
        }
    } ; 

    const onClick = async(event) => {
        event.preventDefault();
        try {
            let attachmentUrl = "" ; 
            let uploadTask ; 
            if(attachment !== "") {
                const attachmentRef = ref(storage, `images/${currentUser.uid + uuidv4()}`)
                uploadTask = uploadBytes(attachmentRef, attachment)
                uploadString(attachmentRef, attachment, 'data_url')
                uploadTask.then(async (snapshot) => {
                    attachmentUrl = await getDownloadURL(snapshot.ref) ;

                    if(displayName !== "") {
                        await updateDoc(doc(db, "UserInfo", `${currentUser.uid}`), {
                            attachmentUrl,
                            displayName,
                        })
                    } else {
                        await updateDoc(doc(db, "UserInfo", `${currentUser.uid}`), {
                            attachmentUrl,
                        }) 
                    }
                })
            } else if (displayName !== "") {
                await updateDoc(doc(db, "UserInfo", `${currentUser.uid}`), {
                    displayName,
                })
            }
            navigate("/");
        } catch(error) {
            console.log(error) ;
        }
    } ;

    return (
        <div className='ProfileEdit'>
            <form className='ProfileEditContainer' 
                onSubmit={(event) => {event.preventDefault()}}>
                <div className='EditHeader'>
                    <button className='EditBackBtn'
                            onClick={() => setEditOpen(!editOpen)}> 이전 </button>
                    <h4 className='ProfileEditTitle'> Profile Edit </h4>
                    <button className='EditOkkBtn'
                            onClick={onClick}> ok </button>
                </div>
                {attachment ? <>
                    <input type="file"
                        style={{display:"none"}}
                        id="inputFile"
                        onChange={onFileChange}
                        required />
                    <label htmlFor="inputFile">
                        {attachment ? 
                            <img src={attachment} className='EditImg'/> 
                            : 
                            <img src={None} alt="" className='EditImg'/>}
                    </label>
                </> : <>
                    {currentInfo.attachmentUrl ? <>
                        <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                        <label htmlFor="inputFile">
                            <img src={currentInfo.attachmentUrl} alt="" className='EditImg'/>
                        </label>
                    </> : <> 
                        <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                        <label htmlFor="inputFile">
                            <img src={None} alt="" width="50px"/>
                        </label>
                    </>}
                </>}

                {!currentInfo.displayName ? <>
                    <input type="text"
                            name="displayName"
                            placeholder="당신은 누구인가요?"
                            required 
                            maxLength="6"
                            value={displayName}
                            className="EditInput"
                            onChange={onChange}/> 
                </> : <>
                    {displayName ? <>
                        <input type="text"
                            name="displayName"
                            placeholder={displayName}
                            required 
                            maxLength="6"
                            value={displayName}
                            className="EditInput"
                            onChange={onChange} /> 
                    </> : <>                             
                        <input type="text"
                            name="displayName"
                            placeholder={currentInfo.displayName}
                            required 
                            maxLength="6"
                            value={displayName}
                            className="EditInput"
                            onChange={onChange} /> 
                    </>}
                </> }
            </form>
        </div>
    )
}

export default ProfileEdit ; 