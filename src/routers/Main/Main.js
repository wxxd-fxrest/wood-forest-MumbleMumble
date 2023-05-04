import PostData from "../Post/PostData";
import Home from "./Home";
import '../../routers/Main/Main.css';
import Random from "../Empty/Random";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import RandomData from "../Empty/RandomData";

const Main = () => {
    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHome">
                    <Home />
                </div>
                <div className="MainPost">
                    <PostData />
                </div>
                <div className="MainEmpty">
                    <RandomData />
                </div>
            </div>
        </div>
    )
}

export default Main ; 