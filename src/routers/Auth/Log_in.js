import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import '../../routers/Auth/AuthComponent.css';

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
        <div className="ComponentContainer">
            <p> 로그인을 진행해주세요. </p>
            <form onSubmit={onSubmit} className="ComponentForm">
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
                <button> 로그인 </button>
            </form>
        </div>
    )
}

export default LogIn ; 