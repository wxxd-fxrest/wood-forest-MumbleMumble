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
                    <button onClick={() => {setOpen(!open)}}> Login </button>
                </div> : <div className="Auth_Component">
                    <LogIn />
                    <button onClick={() => {setOpen(!open)}}> SignUp </button>
                </div>}
            </div>
        </div>
    )
}

export default Auth ; 