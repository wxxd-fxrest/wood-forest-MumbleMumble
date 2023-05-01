import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth, db, storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../../routers/Main/Home.css';
import Logo  from '../../Image/expression_Icon/Mumble_Logo_icon.png' ; 
import IMG from '../../Image/Mumble_imgIcon.png' ;
import ProfileEdit from "../Profile/ProfileEdit";
import HomeIcon from '../../Image/Icons/Mumble_Icon_home.png';
import WriteIcon from '../../Image/Icons/Mumble_Icon_edit.png';
import ProfileIcon from '../../Image/Icons/Mumble_Icon_user.png';
import EditIcon from '../../Image/Icons/Mumble_Icon_api.png';
import LogOutIcon from '../../Image/Icons/Mumble_Icon_address-card.png';

import Happy from '../../Image/expression_Icon/Mumble_expression_relax.png' ;
import Angry from '../../Image/expression_Icon/Mumble_expression_angry.png' ; 
import Crying from '../../Image/expression_Icon/Mumble_expression_crying.png' ;  
import Difficulty from '../../Image/expression_Icon/Mumble_expression_Difficulty.png' ;  
import CantChoose from '../../Image/expression_Icon/Mumble_expression_cant_choose.png' ;  
import Zombie from '../../Image/expression_Icon/Mumble_expression_zombie.png' ;  

import DELETE from '../../Image/Mumble_Delete_gif.gif';

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
    const [cardImg, setCardImg] = useState("") ; 

    const [music, setMusic] = useState([]) ; 
    const [select, setSelect] = useState([]) ; 

    const selectList = ["감정을 선택", "행복", "분노", "슬퍼", "난감", "힘듦", "혼란"] ;
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
        setLoading(true) ; 
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
                            like: [], 
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
                            cardImgUrl,
                            like: [], 
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
                        like: [], 
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
                    })
                }
            }
        } catch(error) {
            console.log(error) ;
        }         
        setText("") ; 
        setSelect([]) ; 
        setSelected("") ;
        Timer()
    } ; 

    const Timer = () => {
        setTimeout(() => {
            setWrite(!write) ; 
            setLoading(false) ; 
        }, 1500) ; 
    }

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
                    <img src={Logo} />
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
                                    onClick={() => {
                                        setEditOpen(false)
                                        setWrite(!write)
                                        clearTimeout(Timer)
                                    }} /> 
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
                                <img src={EditIcon} 
                                    onClick={() => 
                                        {setWrite(false)
                                        setEditOpen(!editOpen)
                                    }} />
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
                                <div className="Select">
                                    <select onChange={(e) => {setSelected(e.target.value)}} value={selected}>
                                        {selectList.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <div>  
                                        {selected == selectList[1] && <img src={Happy} />}
                                        {selected == selectList[2] && <img src={Angry} />}
                                        {selected == selectList[3] && <img src={Crying} />}
                                        {selected == selectList[4] && <img src={Difficulty} />}
                                        {selected == selectList[5] && <img src={Zombie} />}
                                        {selected == selectList[6] && <img src={CantChoose} />}
                                    </div>
                                </div>

                                <div className="MusicImgAnonymous">
                                    <div className="ImgAnonymous">
                                        <div className="anonymousForm">
                                            <h4> 프로필 공개 </h4>
                                            {anonymous == true ? 
                                                <span onClick={() => setAnonymous(!anonymous)}> off </span> : 
                                                <span onClick={() => setAnonymous(!anonymous)}> on </span>}
                                        </div>

                                        <div className="imgForm">
                                            <h4> 사진 </h4>
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
                                            <h4> 노래 </h4>
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
                </div> : null} </>}
            </form>
        </div>
    )
}

export default Home ; 