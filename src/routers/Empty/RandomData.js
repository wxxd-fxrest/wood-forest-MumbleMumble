import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../routers/Post/Post.css' ;
import '../../routers/Empty/Random.css'; 
import Random from './Random';

const RandomData = () => {
    const [random, setRandom] = useState([]) ;

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