import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth, db, storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import ANGER from '../../Image/Mumble_anger.png' ; 
import CONFUSION from '../../Image/Mumble_confusion.png' ; 
import DAZED from '../../Image/Mumble_dazed.png' ; 
import HAPPY from '../../Image/Mumble_happy.png' ; 
import SADNESS from '../../Image/Mumble_sadness.png' ; 
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../../routers/Main/Home.css';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import IMG from '../../Image/Mumble_imgIcon.png' ;

const Home = () => {
    const {currentUser} = useContext(AuthContext) ;
    const uuidv4ID = uuidv4() ;
    const navigate = useNavigate();

    const [write, setWrite] = useState(false) ;
    const [open, setOpen] = useState(true) ; 
    const [anonymous, setAnonymous] = useState(true) ; 

    const [text, setText] = useState("") ;
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 
    const [cardImg, setCardImg] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 

    const selectList = ["감정을 선택", "좋아", "화나", "슬퍼", "멍...", "혼란"] ;
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
                            UID: currentUser.uid,
                            UUID: uuidv4ID, 
                            PostText: text, 
                            date: Timestamp.now(),
                            music: false, 
                            anonymous, 
                            selected,
                            cardImgUrl,
                        })
                    } else {
                        await addDoc(collection(db, "Post"), {
                            UID: currentUser.uid,
                            UUID: uuidv4ID, 
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
                        UID: currentUser.uid,
                        UUID: uuidv4ID, 
                        PostText: text, 
                        date: Timestamp.now(),
                        music: false, 
                        anonymous, 
                        selected,
                    })
                } else {
                    await addDoc(collection(db, "Post"), {
                        UID: currentUser.uid,
                        UUID: uuidv4ID, 
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
                            <li> {music[i].name} - {music[i].artist}</li>
                            {/* <img src={music[0].image[2]} width="30px"/> */}
                        </ul>}
                </div>
            )
        }
        return serchList; 
    } ; 



    // useEffect(() => {
    //     CurrentUserInfo() ; 
    // }, []) ;

    return (
        <div className="Home">
            <form className="HomeForm" 
                onSubmit={(event) => {event.preventDefault()}}>
                <img src={None} />

                <button type="button" 
                    onClick={() => {setWrite(!write)}}> write </button>
                <button type="button" 
                    onClick={() => {navigate(`/profile/${currentUser.uid}`)}}> Profile </button>
                <button type="button"
                    onClick={() => {
                        signOut(auth) 
                        navigate("/")
                        console.log("로그아웃 완료")}}> Log Out </button>
                <button type="button" 
                    onClick={() => {
                        navigate("/profile-edit")}}> Profile Edit </button>

                {write ? 
                <div className="WriteContainer">
                    <div className="Write">
                        <div className="WriteHeader">
                            <h4> 하고 싶은 말이 있나요? </h4>
                            <p onClick={() => {setWrite(!write)}}> X </p>
                        </div>

                        <div className="HomeWrite">
                            <div className="WriteSelectForm">
                                <div className="Select">
                                    <select onChange={(e) => {setSelected(e.target.value)}} value={selected}>
                                        {selectList.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <div>  
                                        {selected == selectList[1] && <img src={HAPPY} />}
                                        {selected == selectList[2] && <img src={ANGER} />}
                                        {selected == selectList[3] && <img src={SADNESS} />}
                                        {selected == selectList[4] && <img src={DAZED} />}
                                        {selected == selectList[5] && <img src={CONFUSION} />}
                                    </div>
                                </div>

                                <div className="MusicImgAnonymous">
                                    <div className="anonymousForm">
                                        <h4> 카드를 업로드한 사용자의 익영 여부를 선택할 수 있습니다. </h4>
                                        {anonymous == true ? <span> 공개</span> : <span>익명</span>}
                                        <button type="button" onClick={() => setAnonymous(!anonymous)}> 익명 or 공개 </button>
                                    </div>

                                    <div className="imgForm">
                                        <h4> 버리고 싶은 감정과 어울리는 사진이 있다면 선택하세요. </h4>
                                        <input type="file"
                                                style={{display:"none"}}
                                                id="inputFile"
                                                onChange={onFileChange}
                                                required />
                                        <label htmlFor="inputFile">
                                            {cardImg ? 
                                                <img src={cardImg} alt="" width="50px"/> : 
                                                <img src={IMG} className="inputImgSelect"/>}
                                        </label>
                                    </div>

                                    <div className="musicForm">
                                        <button type="button" onClick={() => {setOpen(!open)}}> 노래 on / off </button>
                                        {open ? <> {select[0] ? 
                                            <div>
                                                <p> {select[0].name} </p> 
                                                <button type="button" onClick={() => {
                                                    setSelect([])                     
                                                }}> Cancle </button>
                                            </div> : <div style={{backgroundColor:"skyblue"}}>
                                                    <div className="musicSelect">
                                                        <span> 감정을 버릴 때 도움이 될만한 노래가 있다면 선택해주세요. </span>
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
                                                        <button type="submit" onClick={getMusic}> ok </button> 
                                                    </div>
                                                    <div>
                                                        {musicList()}
                                                    </div>
                                                </div>}
                                        </> : null} 
                                    </div>
                                </div>
                            </div>

                            <div className="WriteFrom">
                                <textarea type="text"
                                        name="text"
                                        placeholder="버리고 싶은 일이나 감정을 입력하세요."
                                        maxLength="400"
                                        required 
                                        value={text}
                                        onChange={onChange}/>
                            </div>
                        </div>
                    </div>
                </div> : null} 
                <button className="WriteDeleteBtn"
                        type="button" 
                        onClick={onSaveBtn}> 버리기 </button>
            </form>
        </div>
    )
}

export default Home ; 