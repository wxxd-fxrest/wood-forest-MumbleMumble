import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ;

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "email") {
            setEmail(value) ;
        } else if (name == "password") {
            setPassword(value) ; 
        }
    } ; 

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password) ;
            navigate("/");
            console.log("로그인 완료") ; 
        } catch (error) {
            console.log(error) ;
        }
    } ; 

    return(
        <div>
            <p> LogIn </p>
            <form onSubmit={onSubmit}>
                <input type="email"
                        name="email"
                        placeholder="이메일"
                        required 
                        value={email}
                        onChange={onChange} />
                <input type="password"
                        name="password"
                        placeholder="비밀번호"
                        required 
                        value={password}
                        onChange={onChange} />
                <button> 로그인하기 </button>
            </form>
        </div>
    )
}

export default LogIn ; 