import { useEffect, useState } from "react";
import SearchData from "./Search_Data";

const Search = () => {
    const [music, setMusic] = useState([]) ; 
    const [searchMusic, setSearchMusic] = useState("") ; 
    const [serchArtist, setSerchArtist] = useState("") ; 
    const [select, setSelect] = useState([]) ; 

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if(name == "searchMusic") {
            setSearchMusic(value) ; 
        } else if(name == "serchArtist") {
            setSerchArtist(value) ; 
        }
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
                        <ul onClick={onSelect}>
                            <li> {music[i].name} </li>
                            <li> {music[i].artist} </li>
                        </ul>
                    }
                </div>
            )
        }
        return serchList; 
    } ; 

    console.log(music)

    const onSelect = () => {
        setSelect(music)
        console.log(select)
    }

    return(
        <div>
            <form onSubmit={getMusic}>
                <span> search </span>
                <input type="text"
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
                <input type="submit" value="OK" /> 
            </form>
            {musicList()}
        </div>
    )
}

export default Search ; 