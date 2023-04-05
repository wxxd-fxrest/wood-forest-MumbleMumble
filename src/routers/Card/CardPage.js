import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../firebase";
import Card from "./Card";

const CardPage = () => {
    const location = useLocation() ;
    const [card, setCard] = useState([]) ; 

    const pathname = location.pathname ; 
    const pathUUID = (pathname.split('/')[2]);

    const getDoc = () => {
        const CardCollection = query(
            collection(db, "Post"), 
            where("UUID", "==", `${pathUUID}`));
        onSnapshot(CardCollection, (querySnapshot) => {
            let cardArray = []
            querySnapshot.forEach((doc) => {
                cardArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setCard(cardArray) ;
        });
    } ; 

    useEffect(() => {
        getDoc()
    }, []) ; 

    return(
        <div>
            {card.map((c, i) => (
                <Card key={i} card={c}/>
            ))}
        </div>
    )
}

export default CardPage ; 