import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import PostData from "../Post/PostData";
import ProfileData from "../Profile/ProfileData";
import Home from "./Home";

const Main = () => {
    const {currentUser} = useContext(AuthContext) ;
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => {navigate(`/profile/${currentUser.uid}`)}}> Profile </button>
            <Home />
            <PostData />
        </div>
    )
}

export default Main ; 