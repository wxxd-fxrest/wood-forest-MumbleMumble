import { useState } from "react";
import LogIn from "./Log_in";
import SignUp from "./Sign_up";

const Auth = () => {
    const [open, setOpen] = useState(false) ; 

    const onClick = () => {
        setOpen(!open)
    }

    return(
        <div>
            {open ? <div>
                <SignUp />
                <button onClick={onClick}> Login </button>
            </div> : <div>
                <LogIn />
                <button onClick={onClick}> SignUp </button>
            </div>}
        </div>
    )
}

export default Auth ; 