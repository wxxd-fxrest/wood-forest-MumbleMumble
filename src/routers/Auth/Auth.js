import { useState } from "react";
import LogIn from "./Log_in";
import SignUp from "./Sign_up";
import '../../routers/Auth/Auth.css' ; 
import None from '../../Image/Mumble_Profile_None.PNG' ;

const Auth = () => {
    const [open, setOpen] = useState(false) ; 

    return(
        <div className="Auth">
            <div className="Auth_Img">
                <img src={None} />
            </div>
            <div>
                {open ? <div className="Auth_Component">
                    <SignUp />
                    <button onClick={() => {setOpen(!open)}}> 이미 계정이 있으신가요? </button>
                </div> : <div className="Auth_Component">
                    <LogIn />
                    <button onClick={() => {setOpen(!open)}}> 계정이 없다면 회원가입을 진행해주세요. </button>
                </div>}
            </div>
        </div>
    )
}

export default Auth ; 