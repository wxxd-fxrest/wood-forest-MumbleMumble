import { addDoc, collection, Timestamp } from "firebase/firestore";
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
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../../routers/Main/Home.css';
import None  from '../../Image/Mumble_Profile_None.PNG' ; 
import IMG from '../../Image/Mumble_imgIcon.png' ;
import ProfileEdit from "../Profile/ProfileEdit";
import HomeIcon from '../../Image/Icons/Mumble_Icon_home.png';
import WriteIcon from '../../Image/Icons/Mumble_Icon_edit.png';
import ProfileIcon from '../../Image/Icons/Mumble_Icon_user.png';
import EditIcon from '../../Image/Icons/Mumble_Icon_api.png';
import LogOutIcon from '../../Image/Icons/Mumble_Icon_address-card.png';

const Home = () => {
    const {currentUser} = useContext(AuthContext) ;
    const uuidv4ID = uuidv4() ;
    const navigate = useNavigate();

    const [write, setWrite] = useState(false) ;
    const [open, setOpen] = useState(true) ; 
    const [anonymous, setAnonymous] = useState(true) ; 
    const [editOpen, setEditOpen] = useState(false) ; 

    const [text, setText] = useState("") ;
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 
    const [cardImg, setCardImg] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 

    const selectList = ["감정을 선택", "좋아", "화나", "슬퍼", "멍...", "혼란"] ;
    const [selected, setSelected] = useState("") ; 
    const location = useLocation() ;

    const pathname = location.pathname ; 
    const pathUID = (pathname.split('/')[2]);

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
                            <li className="musicListLI"> 
                                🎶 {music[i].name} - {music[i].artist}
                            </li>
                        </ul>}
                </div>
            )
        }
        return serchList; 
    } ; 

    return (
        <div className="Home">
            <form className="HomeForm" 
                onSubmit={(event) => {event.preventDefault()}}>

                <div className="HomeButtonForm">
                    <img src={None} />
                    <div className="HomeButton">
                    <div className="Btn">
                            <div className={pathname == "/" ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={HomeIcon} 
                                    onClick={() => {navigate("/")}} /> 
                            </div>
                            <h4> Home </h4>
                        </div>

                        <div className="Btn">
                            <div className={write == true ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={WriteIcon}
                                    onClick={() => {setWrite(!write)}} /> 
                            </div>
                            <h4> Wirte </h4>
                        </div>
                        
                        <div className="Btn">
                            <div className={pathUID == currentUser.uid ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={ProfileIcon}
                                    onClick={() => {navigate(`/profile/${currentUser.uid}`)}} /> 
                            </div>
                            <h4> Profile </h4>
                        </div>

                        <div className="Btn">
                            <div className={editOpen == true ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={EditIcon} onClick={() => setEditOpen(!editOpen)} />
                            </div>
                            <h4> Edit </h4>
                            {editOpen == true && <ProfileEdit setEditOpen={setEditOpen} editOpen={editOpen}/>}
                        </div>

                        <div className="Btn">
                            <div className="imgBtn">
                                <img src={LogOutIcon}
                                    onClick={() => {
                                    signOut(auth) 
                                    navigate("/")
                                    console.log("로그아웃 완료")}} />
                            </div>
                            <h4> Log Out </h4>
                        </div>
                    </div>
                </div>

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
                                    <div className="ImgAnonymous">
                                        <div className="anonymousForm">
                                            <h4> 프로필 숨기기 </h4>
                                            {anonymous == true ? 
                                                <span onClick={() => setAnonymous(!anonymous)}> 공개 </span> : 
                                                <span onClick={() => setAnonymous(!anonymous)}> 숨기기 </span>}
                                        </div>

                                        <div className="imgForm">
                                            <h4> 사진 선택 </h4>
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
                                        <div className="musicOnOff">
                                            <h4> 노래 선택 </h4>
                                            {open == true ? 
                                                <span onClick={() => setOpen(!open)}> off </span> : 
                                                <span onClick={() => setOpen(!open)}> on </span>}
                                        </div>
                                    </div>

                                    <div className="musicForm">
                                        {open ? <> {select[0] ? 
                                            <div className="musicCancleForm">
                                                <p> {select[0].name} </p> 
                                                <button type="button" 
                                                    onClick={() => {
                                                        setSelect([])                     
                                                    }}> Cancle </button>
                                            </div> : <div>
                                                    <div className="musicSelect">
                                                        <input type="text"
                                                            required
                                                            name="searchMusic"
                                                            value={searchMusic} 
                                                            onChange={onChange} 
                                                            className="searchMusic"
                                                            placeholder="제목"/>
                                                        <input type="text"
                                                            required
                                                            name="serchArtist"
                                                            value={serchArtist} 
                                                            onChange={onChange} 
                                                            className="serchArtist"
                                                            placeholder="아티스트"/>
                                                        <button type="submit" onClick={getMusic}> ok </button> 
                                                    </div>
                                                <div className="musicList">
                                                    {/* {select ? <p> 🎶 노래를 선택하세요 🎶 </p> : musicList()} */}
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
                                <button className="WriteDeleteBtn"
                                        type="button" 
                                        onClick={onSaveBtn}> 버리기 </button>
                            </div>
                        </div>
                    </div>
                </div> : null} 
            </form>
        </div>
    )
}

export default Home ; 