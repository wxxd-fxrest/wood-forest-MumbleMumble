import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../firebase";

const Home = () => {
    const {currentUser} = useContext(AuthContext) ; 
    const [write, setWrite] = useState(false) ;
    const [open, setOpen] = useState(true) ; 
    const [anonymous, setAnonymous] = useState(true) ; 

    const [text, setText] = useState("") ;
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 
    const [currentData, setCurrentData] = useState([]) ; 


    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if(name == "text") {
            setText(value) ; 
        } else if(name == "searchMusic") {
            setSearchMusic(value) ; 
        } else if(name == "serchArtist") {
            setSerchArtist(value) ; 
        }
    } ; 

    const CurrentUserInfo = async () => {
        const getUserData = query(collection(db, "UserInfo"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setCurrentData(doc.data()) ;
            // console.log(doc.data())
        }); 
    } ; 



    const onSaveBtn = async () => {
        if(select[0] == null) {
            await addDoc(collection(db, "Post"), {
                displayName: currentData.displayName, 
                attachmentUrl: currentData.attachmentUrl, 
                UID: currentUser.uid,
                PostText: text, 
                date: Timestamp.now(),
                music: false, 
                anonymous
            })
        } else {
            await addDoc(collection(db, "Post"), {
                displayName: currentData.displayName, 
                attachmentUrl: currentData.attachmentUrl, 
                UID: currentUser.uid,
                PostText: text, 
                date: Timestamp.now(),
                artist: select[0].artist, 
                Music: select[0].name,
                musicImage: select[0].image[2], 
                musicURL: select[0].url,
                anonymous
            })
        } 
        setText("") ; 
        setSelect([]) ; 
        setWrite(!write) ; 
    } ; 

    const getMusic = async(event) => {
        event.preventDefault() ; 
        const response = await fetch(`
            https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchMusic.trim()}&artist=${serchArtist.trim()}&limit=1&api_key=2856d44ba61487909d1756d75157fbe5&format=json
        `) ;
        const json = await response.json() ; 
        setMusic(json.results.trackmatches.track) ; 
        console.log(json) ;
    } ; 

    const musicList = () => {
        let serchList = [] ; 
        for(let i = 0; i < music.length; i++) {
            serchList.push(
                <div key={i}>
                    {music[i] && 
                        <ul onClick={onSelectMusic}>
                            <li> {music[i].name} </li>
                            <li> {music[i].artist} </li>
                            <img src={music[0].image[2]} width="30px"/>
                        </ul>}
                </div>
            )
        }
        return serchList; 
    } ; 

    const onSelectMusic = () => {
        setSelect(music) ;  
        setSearchMusic("") ; 
        setSerchArtist("") ;
        setMusic([]) ; 
    } ; 

    useEffect(() => {
        CurrentUserInfo() ; 
    }, []) ;

    return (
        <div style={{backgroundColor:"grey"}}>
            <form onSubmit={((event) => {event.preventDefault() ; })}>
                <span> Home </span>
                <button onClick={(() => {setWrite(!write)})}> write </button>

                {write ? 
                <div style={{backgroundColor:"green"}}>
                    <input type="text"
                            name="text"
                            placeholder="버리고 싶은 감정을 입력하세요."
                            required 
                            value={text}
                            onChange={onChange} />
                    <button onClick={onSaveBtn}> 버리기 </button>
                    {anonymous == true ? <span>공개</span> : <span>익명</span>}
                    <button onClick={(() => setAnonymous(!anonymous))}> 익명 or 공개 </button>
                    <button onClick={(() => {setOpen(!open)})}> 노래 on / off </button>

                    {open ? <>
                        {select[0] ? 
                        <div>
                            <p> {select[0].name} </p> 
                            <button onClick={(() => {
                                setSelect([])                     
                            })}> Cancle </button>
                        </div> : <div style={{backgroundColor:"skyblue"}}>
                                <div>
                                    <span> search </span>
                                    <input type="text"
                                        required
                                        name="searchMusic"
                                        value={searchMusic} 
                                        onChange={onChange} 
                                        placeholder="노래 이름을 입력하세요."/>
                                    <input type="text"
                                        required
                                        name="serchArtist"
                                        value={serchArtist} 
                                        onChange={onChange} 
                                        placeholder="아티스트 이름을 입력하세요."/>
                                    <button onClick={getMusic}> ok </button> 
                                </div>
                                {musicList()}
                            </div>}
                        </> : null}
                </div> : null} 
            </form>
        </div>
    )
}

export default Home ; 