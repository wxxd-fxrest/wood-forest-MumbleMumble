import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../routers/Post/Post.css' ;
import { AuthContext } from '../../Context/AuthContext';
import '../../routers/Empty/Random.css'; 
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
import Random from './Random';

const RandomData = () => {
    const [random, setRandom] = useState([]) ;
    const [aa, setAa]  = useState([])

    const getRandom = () => {
        const CardCollection = query(
            collection(db, "Post"), 
            where("anonymous", "==", true));
        onSnapshot(CardCollection, (querySnapshot) => {
            let cardArray = []
            querySnapshot.forEach((doc) => {
                cardArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setRandom(cardArray) ;
            console.log(random) ;
        });
    } ; 

    useEffect(() => {
        getRandom()
    }, []) ; 

    return (
        <div className='RandomData'>
            <div className="RandomDataHeader">
                <h4> RANDOM </h4>
            </div>
            {random.map((r, i) => (
                <Random key={i} random={r} />
            ))}
        </div>
    )
}

export default RandomData ; 