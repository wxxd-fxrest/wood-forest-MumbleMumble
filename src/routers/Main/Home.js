import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

const Home = () => {
    const {currentUser} = useContext(AuthContext) ; 
    const [write, setWrite] = useState(false) ;
    const [open, setOpen] = useState(true) ; 
    const [anonymous, setAnonymous] = useState(true) ; 

    const [text, setText] = useState("") ;
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 
    const [cardImg, setCardImg] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 
    const [currentData, setCurrentData] = useState([]) ; 

    const selectList = ["감정을 선택", "좋아", "화나", "슬퍼"] ;
    const [selected, setSelected] = useState("") ; 
    
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
        }); 
    } ; 

    const onFileChange = (event) => {
        setCardImg(null) ;
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setCardImg(result) ; 
        } ;
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile) ; 
        }
    } ; 

    const onSaveBtn = async () => {
        try {
            let cardImgUrl = "" ; 
            let uploadTask ; 
            if(cardImg !== "") {
                const cardImgRef = ref(storage, `images/${currentUser.uid + uuidv4()}`)
                uploadTask = uploadBytes(cardImgRef, cardImg)
                uploadString(cardImgRef, cardImg, 'data_url')

                uploadTask.then(async (snapshot) => {
                    cardImgUrl = await getDownloadURL(snapshot.ref)

                    if(select[0] == null) {
                        await addDoc(collection(db, "Post"), {
                            displayName: currentData.displayName, 
                            attachmentUrl: currentData.attachmentUrl, 
                            UID: currentUser.uid,
                            PostText: text, 
                            date: Timestamp.now(),
                            music: false, 
                            anonymous, 
                            selected,
                            cardImgUrl,
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
                            anonymous, 
                            selected,
                            cardImgUrl,
                        })
                    }
                })
                setCardImg("") ; 
            } 
            else if(cardImg == "") {
                if(select[0] == null) {
                    await addDoc(collection(db, "Post"), {
                        displayName: currentData.displayName, 
                        attachmentUrl: currentData.attachmentUrl, 
                        UID: currentUser.uid,
                        PostText: text, 
                        date: Timestamp.now(),
                        music: false, 
                        anonymous, 
                        selected,
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
                        anonymous, 
                        selected,
                    })
                }
            }
        } catch(error) {
            console.log(error) ;
        }         
        setText("") ; 
        setSelect([]) ; 
        setWrite(!write) ; 
        setSelected("") ;
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

    const onSelectMusic = () => {
        setSelect(music) ;  
        setSearchMusic("") ; 
        setSerchArtist("") ;
        setMusic([]) ; 
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



    useEffect(() => {
        CurrentUserInfo() ; 
    }, []) ;

    return (
        <div style={{backgroundColor:"grey"}}>
            <form onSubmit={((event) => {event.preventDefault() ; })}>
                <span> Home </span>
                <button onClick={(() => {setWrite(!write)})}> write </button>

                {write ? 
                <div style={{backgroundColor:"green", width: "270px"}}>
                    <input type="text"
                            name="text"
                            placeholder="버리고 싶은 일이나 감정을 입력하세요."
                            maxLength="200"
                            required 
                            value={text}
                            onChange={onChange} 
                            style={{width: "200px"}}/>
                    <button onClick={onSaveBtn}> 버리기 </button>

                    <select onChange={((e) => {setSelected(e.target.value)})} value={selected}>
                        {selectList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <div> 
                        {selected == selectList[1] && <p>🤗</p>}
                        {selected == selectList[2] && <p>🤬</p>}
                        {selected == selectList[3] && <p>😢</p>}
                    </div>

                    {anonymous == true ? <span>공개</span> : <span>익명</span>}
                    <button onClick={(() => setAnonymous(!anonymous))}> 익명 or 공개 </button>
                    <button onClick={(() => {setOpen(!open)})}> 노래 on / off </button>

                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile">
                        {cardImg ? <img src={cardImg} alt="" width="50px"/> : <p> card select </p>}
                    </label>

                    {open ? <> {select[0] ? 
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
                    </> : null} </div> : null} 
            </form>
        </div>
    )
}

export default Home ; 