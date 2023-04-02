import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";

const SignUp = () => {
    const [displayName, setDisplayName] = useState("") ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ;

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ; 
        } else if (name == "email") {
            setEmail(value) ;
        } else if (name == "password") {
            setPassword(value) ; 
        }
    } ; 
    
    return(
        <div>
            <p> SignUp </p>``
            <form>
                <input type="text"
                        name="displayName"
                        placeholder="Display name"
                        required 
                        maxLength="6"
                        value={displayName}
                        onChange={onChange} />
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
                <button> 회원가입하기 </button>
            </form>
        </div>
    )
}

export default SignUp ; 