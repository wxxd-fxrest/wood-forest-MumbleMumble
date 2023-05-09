import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import '../../routers/Auth/AuthComponent.css';
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
// <a href="https://www.flaticon.com/kr/free-icons/" title="공고 아이콘">공고 아이콘  제작자: Slidicon - Flaticon</a>

const SignUp = () => {
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
            const authData = await createUserWithEmailAndPassword(auth, email, password) ;
            await setDoc(doc(db, "UserInfo", `${authData.user.uid}`), {
                uid: authData.user.uid,
                email: email, 
                displayName: "Unkown",
                attachmentUrl: Logo,
            })
            navigate("/");
            console.log("회원가입 완료") ;
        } catch(error) {
            console.log(error) ;
        }
    } ; 
    
    return(
        <div className="ComponentContainer">
            <p> 회원가입을 진행해주세요. </p>
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
                <button> 가입하기 </button>
            </form>
        </div>
    )
}

export default SignUp ; 