import { useState } from "react";
import LogIn from "./Log_in";
import SignUp from "./Sign_up";

const Auth = () => {
    const [open, setOpen] = useState(false) ; 

    return(
        <div>
            {open ? <div>
                <SignUp />
                <button onClick={() => {setOpen(!open)}}> Login </button>
            </div> : <div>
                <LogIn />
                <button onClick={() => {setOpen(!open)}}> SignUp </button>
            </div>}
        </div>
    )
}

export default Auth ; 