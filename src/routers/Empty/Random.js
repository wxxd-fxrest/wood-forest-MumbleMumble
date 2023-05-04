import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../routers/Post/Post.css' ;
import { AuthContext } from '../../Context/AuthContext';
import '../../routers/Empty/Random.css'; 
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 

const Random = ({random}) => {
    const [currentData, setCurrentData] = useState([]) ; 
    const navigate = useNavigate();

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${random.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${random.Data.UID}`) ; 
    } ; 

    const CurrentUserInfo = async () => {
        const getUserData = query(
            collection(db, "UserInfo"), 
            where("uid", "==", `${random.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
        }); 
    } ; 

    useEffect(() => {
        CurrentUserInfo() ;
    }, []) ; 


    return (
        <div className='Random'>
            <div className='RandomProfile'> 
                <img src={currentData.attachmentUrl} 
                    onClick={onProfilePage}/>
                <h5 onClick={onProfilePage}> {currentData.displayName} </h5>
            </div>
            <div className='RandomText' onClick={onCardPage}>
                <h3> {random.Data.PostText} </h3> 
            </div>
        </div>
    )
}

export default Random ; 