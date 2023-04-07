import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import PostData from "../Post/PostData";
import ProfileData from "../Profile/ProfileData";
import Home from "./Home";
import '../../routers/Main/Main.css';

const Main = () => {
    const {currentUser} = useContext(AuthContext) ;
    const navigate = useNavigate();

    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHome">
                    <Home />
                </div>
                <div className="MainPost">
                    <PostData />
                </div>
            </div>
        </div>
    )
}

export default Main ; 