import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import Home from "../Main/Home";
import Card from "./Card";
import '../../routers/Card/Card.css';
import Random from "../Empty/Random";
import RandomData from "../Empty/RandomData";

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
        <div className="CardPage">
            <div className="CardPageContainer">
                <div className="CardPageHome">
                    <Home />
                </div>
                <div className="CardPageList">
                    {card.map((c, i) => (
                        <Card key={i} card={c}/>
                    ))}
                </div>
                <div className="CardEmpty">
                    <RandomData />
                </div>
            </div>
        </div>
    )
}

export default CardPage ; 