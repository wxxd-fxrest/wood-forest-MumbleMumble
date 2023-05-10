import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../routers/Post/Post.css' ;
import '../../routers/Empty/Random.css'; 

const Random = ({random}) => {
    const [currentData, setCurrentData] = useState([]) ; 
    const navigate = useNavigate();

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${random.Data.UUID}`) ; 
        window.location.reload();
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${random.Data.UID}`) ; 
        window.location.reload() ;
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
                <h5 onClick={onProfilePage}> {currentData.displayName} </h5>
            </div>
            <div className='RandomText' onClick={onCardPage}>
                <h3> {random.Data.PostText} </h3> 
                <div className='RandomTag'>
                    {random.Data.tagList != "" && <div>
                        <span> #{random.Data.tagList[0]} </span>
                        <span> #{random.Data.tagList[1]} </span>
                        <span> #{random.Data.tagList[2]} </span>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Random ; 