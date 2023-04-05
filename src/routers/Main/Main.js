import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import PostData from "../Post/PostData";
import ProfileData from "../Profile/ProfileData";
import Home from "./Home";

const Main = () => {
    const [change, setChange] = useState(false) ; 
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={(() => {
                signOut(auth) 
                console.log("로그아웃 완료")})}> Log Out </button>
            <button onClick={() => {navigate("/profile")}}> Profile Edit </button>
            <button onClick={() => {setChange(!change)}}> change </button>
            <Home />
            {change ? <ProfileData /> : <PostData />}
        </div>
    )
}

export default Main ; 