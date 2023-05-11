import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth, db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../../routers/Main/Home.css';
import ProfileEdit from "../Profile/ProfileEdit";

import Logo  from '../../Image/Trash-mumble.png' ; 
import DELETE from '../../Image/Mumble_Delete_gif.gif';

// Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
import HomeIcon from '../../Image/Icons/Mumble_Icon_home.png';
import WriteIcon from '../../Image/Icons/Mumble_Icon_edit.png';
import ProfileIcon from '../../Image/Icons/Mumble_Icon_user.png';
import EditIcon from '../../Image/Icons/Mumble_Icon_api.png';
import LogOutIcon from '../../Image/Icons/Mumble_Icon_address-card.png';
// Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>

const Home = () => {
    const {currentUser} = useContext(AuthContext) ;
    const uuidv4ID = uuidv4() ;
    const navigate = useNavigate();

    const [write, setWrite] = useState(false) ;
    const [open, setOpen] = useState(true) ; 
    const [anonymous, setAnonymous] = useState(true) ; 
    const [editOpen, setEditOpen] = useState(false) ; 
    const [loading, setLoading] = useState(false) ; 

    const [text, setText] = useState("") ;
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 

    const [selected, setSelected] = useState("") ; 

    const [trashTag, setTrashTag] = useState("") ;
    const [tag, setTag] = useState([]) ;

    const location = useLocation() ;

    const pathname = location.pathname ; 
    const pathUID = (pathname.split('/')[2]);

    // console.log(pathUID)

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

    const onSaveBtn = async () => {
        setLoading(true) ; 
        let tagEmpty = true
        if(tag !== "") {
            tagEmpty = false; 
        }
        try {
            if(select[0] == null) {
                await addDoc(collection(db, "Post"), {
                    UID: currentUser.uid,
                    UUID: uuidv4ID, 
                    PostText: text, 
                    date: Timestamp.now(),
                    music: false, 
                    anonymous, 
                    selected,
                    like: [], 
                    tagList: tag,
                    tagEmpty, 
                })
            } else {
                await addDoc(collection(db, "Post"), {
                    UID: currentUser.uid,
                    UUID: uuidv4ID, 
                    PostText: text, 
                    date: Timestamp.now(),
                    music: true, 
                    artist: select[0].artist,
                    Music: select[0].name,
                    musicImage: select[0].image[2], 
                    musicURL: select[0].url,
                    anonymous, 
                    selected,
                    like: [], 
                    tagList: tag,
                    tagEmpty, 
                })
            }
        } catch(error) {
            console.log(error) ;
        }         
        setText("") ; 
        setSelect([]) ; 
        setSelected("") ;
        setTag([]) ;
        Timer()
    } ; 

    const Timer = () => {
        setTimeout(() => {
            setWrite(!write) ; 
            setLoading(false) ; 
        }, 1500) ; 
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

    const onTrashTag = (event) => {
        if(tag.length > 3) {
            alert("3개 이상")
        } ; 
        const {target : {name, value}} = event ; 
        if (name == "trashTag") {
            setTrashTag(value) ; 
        } ; 
    } ;

    const onTag = () => {
        setTag([...tag, trashTag]) ;
        setTrashTag("") ;
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
                    <img src={Logo} onClick={() => {navigate("/")}} />
                    <div className="HomeButton">
                        <div className="Btn" 
                            onClick={() => {navigate("/")}}>
                            <div className={pathname == "/" ? 'imgBtn_on' : 'imgBtn'} >
                                <img src={HomeIcon} /> 
                            </div>
                            <h4> Home </h4>
                        </div>

                        <div className="Btn"
                            onClick={() => {
                                setEditOpen(false)
                                setWrite(!write)
                                clearTimeout(Timer)
                            }}>
                            <div className={write == true ? 'imgBtn_on' : 'imgBtn'} >
                                <img src={WriteIcon} /> 
                            </div>
                            <h4> Wirte </h4>
                        </div>
                        
                        <div className="Btn"
                            onClick={() => {
                                navigate(`/profile/${currentUser.uid}`)
                                window.location.reload();
                            }}>
                            <div className={pathUID == currentUser.uid ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={ProfileIcon} /> 
                            </div>
                            <h4> Profile </h4>
                        </div>

                        <div className="Btn">
                            <div className={editOpen == true ? 'imgBtn_on' : 'imgBtn'}>
                                <img src={EditIcon} 
                                    onClick={() => 
                                        {setWrite(false)
                                        setEditOpen(!editOpen)
                                    }}/>
                            </div>
                            <h4> Edit </h4>
                            {editOpen == true && <ProfileEdit setEditOpen={setEditOpen} editOpen={editOpen}/>}
                        </div>

                        <div className="Btn" 
                            onClick={() => {
                            signOut(auth) 
                            navigate("/")
                            alert("로그아웃 되었습니다.")
                            console.log("로그아웃 완료")}}>
                            <div className="imgBtn" >
                                <img src={LogOutIcon} />
                            </div>
                            <h4> Log Out </h4>
                        </div>
                    </div>
                </div>
                {loading ? 
                <div className="WriteContainer">
                    <div className="Write WriteLoading">
                        <img src={DELETE} /> 
                    </div>
                </div> : <> {write ? 
                <div className="WriteContainer">
                    <div className="Write">
                        
                        <div className="WriteHeader">
                            <h4> 하고 싶은 말이 있나요? </h4>
                            <p onClick={() => {setWrite(!write)}}> X </p>
                        </div>

                        <div className="HomeWrite">
                            <div className="WriteSelectForm">
                                <div className="WriteTagForm">
                                    <div>
                                        <input type="text" 
                                                placeholder="trash tag"
                                                maxLength="5"
                                                name="trashTag"
                                                value={trashTag} 
                                                onChange={onTrashTag} /> 
                                        <button onClick={onTag}> ok </button>
                                    </div>
                                    <span> #{tag[0]} </span>
                                    <span> #{tag[1]} </span>
                                    <span> #{tag[2]} </span>
                                </div>

                                <div className="MusicImgAnonymous">
                                    <div className="ImgAnonymous">
                                        <div className="anonymousForm">
                                            <h4> 프로필공개 </h4>
                                            {anonymous == true ? 
                                                <span onClick={() => setAnonymous(!anonymous)}> off </span> : 
                                                <span onClick={() => setAnonymous(!anonymous)}> on </span>}
                                        </div>

                                        <div className="musicOnOff">
                                            <h4> 노래 </h4>
                                            {open == true ? 
                                                <span onClick={() => setOpen(!open)}> off </span> : 
                                                <span onClick={() => setOpen(!open)}> on </span>}
                                        </div>
                                    </div>

                                    <div className="musicForm">
                                        <div> {select[0] ? 
                                            <div className="musicCancleForm">
                                                <p> {select[0].name} </p> 
                                                <button type="button" 
                                                    onClick={() => {
                                                        setSelect([])                     
                                                    }}> Cancle </button>
                                            </div> : <div className={open == false && "musicDontSelect"}>
                                                    <div className="musicSelect">
                                                            <input type="text"
                                                                required
                                                                name="searchMusic"
                                                                value={searchMusic} 
                                                                onChange={onChange} 
                                                                className={open == true? "searchMusic" : "DontSearchMusic"}
                                                                placeholder="제목"/>
                                                            <input type="text"
                                                                required
                                                                name="serchArtist"
                                                                value={serchArtist} 
                                                                onChange={onChange} 
                                                                className={open ? "serchArtist" : "DontSerchArtist"}
                                                                placeholder="아티스트"/>
                                                        <button type="submit" 
                                                                onClick={getMusic}
                                                                className={open ? "serchOK" : "DontSerchOK"}> ok </button> 
                                                    </div>
                                                <div className="musicList">
                                                    {musicList()}
                                                </div>
                                            </div>}
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div className="WriteFrom">
                                <textarea type="text"
                                        name="text"
                                        placeholder="버리고 싶은 일이나 감정을 입력하세요."
                                        maxLength="250"
                                        required 
                                        value={text}
                                        onChange={onChange}/>
                                <button className="WriteDeleteBtn"
                                        type="button" 
                                        onClick={onSaveBtn}> 버리기 </button>
                            </div>
                        </div>
                    </div> 
                </div> : null} </>}
            </form>
        </div>
    )
}

export default Home ; 