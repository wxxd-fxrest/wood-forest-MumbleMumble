import { useContext, useState } from "react";
import None  from '../../../Image/Mumble_Profile_None.PNG' ; 
import { AuthContext } from "../../../Context/AuthContext";
import SharedEmoticon from "./SharedEmoticon";
import { useNavigate } from "react-router-dom";
import Music from '../../../Image/Mumble_Music.png' ;
import '../../../routers/Post/Post.css' ;

const SharedProfile = ({pofilePost, profileInfo}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();
    const [next, setNext] = useState(false) ; 

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${pofilePost.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${pofilePost.Data.UID}`) ; 
    } ; 
    
    return(
        <div className="Post">
            {currentUser.uid == profileInfo.uid ?
            <div className="PostBackGroundImg">
                <img src={pofilePost.Data.cardImgUrl} />
                <div className='PostProfile'>
                    {pofilePost.Data.UID == profileInfo.uid ? 
                        <div className='PostProfileTrue' onClick={onProfilePage}>
                            <img src={profileInfo.attachmentUrl} />
                            <h5> {profileInfo.displayName} </h5>
                            {pofilePost.Data.anonymous == false && <p className="ProfileAnonymous"> 익명으로 올라간 카드입니다. </p>}
                        </div> : <div>
                            <img src={None} width="180px"/>
                            {pofilePost.Data.anonymous == false && <p className="ProfileAnonymous"> 익명으로 올라간 카드입니다. </p>}
                        </div>} 
                    <div className='PostEmotion'>
                        <SharedEmoticon pofilePost={pofilePost}/>
                    </div>
                </div>

                <div className='PostForm'  
                    onClick={onCardPage}>
                    {next == false ? 
                    <h3> {pofilePost.Data.PostText} </h3> : <>
                        {pofilePost.Data.music == false ? null :
                        <div className='PostMusicForm'>
                            <div className='PostMusicName'>
                                <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
                            </div>
                            <div className='PostMusic'>
                                <img src={Music} />
                                <div className='PostMusicBox'></div>
                            </div>
                        </div>}
                    </>}
                </div>
                {pofilePost.Data.music == false ? null : <>
                    {next == false ? 
                    <button className='PostNextButton1'
                        type='button'
                        onClick={() => {setNext(!next)}}> 다음 </button> :
                    <button className='PostNextButton2'
                        type='button'
                        onClick={() => {setNext(!next)}}> 이전 </button> }
                </> }
            </div> : <div>
                {pofilePost.Data.anonymous == false ? null : <div>
                    {pofilePost.Data.cardImgUrl ? <div>
                        <div className="PostBackGroundImg">
                            <img src={pofilePost.Data.cardImgUrl} />
                            <div className='PostProfile'>
                                {pofilePost.Data.UID == profileInfo.uid ? 
                                    <div className='PostProfileTrue' onClick={onProfilePage}>
                                        <img src={profileInfo.attachmentUrl} />
                                        <h5> {profileInfo.displayName} </h5>
                                        {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                    </div> : <div>
                                        <img src={None} width="180px"/>
                                        {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                    </div>} 

                                <div className='PostEmotion'>
                                    <SharedEmoticon pofilePost={pofilePost}/>
                                </div>
                            </div>

                            <div className='PostForm'  
                                onClick={onCardPage}>
                                {next == false ? 
                                <h3> {pofilePost.Data.PostText} </h3> : <>
                                    {pofilePost.Data.music == false ? null :
                                    <div className='PostMusicForm'>
                                        <div className='PostMusicName'>
                                            <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
                                        </div>
                                        <div className='PostMusic'>
                                            <img src={Music} />
                                            <div className='PostMusicBox'></div>
                                        </div>
                                    </div>}
                                </>}
                            </div>
                            {pofilePost.Data.music == false ? null : <>
                                {next == false ? 
                                <button className='PostNextButton1'
                                    type='button'
                                    onClick={() => {setNext(!next)}}> 다음 </button> :
                                <button className='PostNextButton2'
                                    type='button'
                                    onClick={() => {setNext(!next)}}> 이전 </button> }
                            </> }
                        </div>
                    </div> : <div className="PostBackGroundImg">
                        <div className='PostProfile'>
                            {pofilePost.Data.UID == profileInfo.uid ? 
                                <div className='PostProfileTrue' onClick={onProfilePage}>
                                    <img src={profileInfo.attachmentUrl} />
                                    <h5> {profileInfo.displayName} </h5>
                                    {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                </div> : <div>
                                    <img src={None} width="180px"/>
                                    {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                                </div>} 

                            <div className='PostEmotion'>
                                <SharedEmoticon pofilePost={pofilePost}/>
                            </div>
                        </div>

                        <div className='PostForm'  
                            onClick={onCardPage}>
                            {next == false ? 
                            <h3> {pofilePost.Data.PostText} </h3> : <>
                                {pofilePost.Data.music == false ? null :
                                <div className='PostMusicForm'>
                                    <div className='PostMusicName'>
                                        <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
                                    </div>
                                    <div className='PostMusic'>
                                        <img src={Music} />
                                        <div className='PostMusicBox'></div>
                                    </div>
                                </div>}
                            </>}
                        </div>
                        {pofilePost.Data.music == false ? null : <>
                            {next == false ? 
                            <button className='PostNextButton1'
                                type='button'
                                onClick={() => {setNext(!next)}}> 다음 </button> :
                            <button className='PostNextButton2'
                                type='button'
                                onClick={() => {setNext(!next)}}> 이전 </button> }
                        </> }
                    </div>}
                </div>}
            </div>}
        </div>
    )
}

export default SharedProfile ; 


    // <div className="Post">
    //         {currentUser.uid ==! profileInfo.uid ? 
    //             <div className="PostBackGroundImg">
    //                 <img src={pofilePost.Data.cardImgUrl} />
    //                 <div className='PostProfile' 
    //                     onClick={onProfilePage}>
    //                     {pofilePost.Data.UID == profileInfo.uid ? 
    //                         <div className='PostProfileTrue'>
    //                             <img src={profileInfo.attachmentUrl} />
    //                             <h5> {profileInfo.displayName} </h5>
    //                             {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
    //                         </div> : <div>
    //                             <img src={None} width="180px"/>
    //                             {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
    //                         </div>} 

    //                     <div className='PostEmotion'>
    //                         <SharedEmoticon pofilePost={pofilePost}/>
    //                     </div>
    //                 </div>

    //                 <div className='PostForm'  
    //                     onClick={onCardPage}>
    //                     {next == false ? 
    //                         <h3> {pofilePost.Data.PostText} </h3> : <>
    //                         {pofilePost.Data.music == false ? null :
    //                             <div className='PostMusicForm'>
    //                                 <div className='PostMusicName'>
    //                                     <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
    //                                 </div>
    //                                 <div className='PostMusic'>
    //                                     <img src={Music} />
    //                                     <div className='PostMusicBox'></div>
    //                                 </div>
    //                             </div>}
    //                     </>}
    //                 </div>

    //                 {pofilePost.Data.music == false ? null : <>
    //                     {next == false ? 
    //                     <button className='PostNextButton1'
    //                         type='button'
    //                         onClick={() => {setNext(!next)}}> 다음 </button> :
    //                     <button className='PostNextButton2'
    //                         type='button'
    //                         onClick={() => {setNext(!next)}}> 이전 </button> }
    //                 </> }
    //             </div> 
    //             : <div>
    //             {pofilePost.Data.cardImgUrl ? 
    //             <div className="PostBackGroundImg">
    //                 <img src={pofilePost.Data.cardImgUrl} />
    //                 <div className='PostProfile' 
    //                     onClick={onProfilePage}>
    //                     {pofilePost.Data.anonymous == true && <> 
    //                         {pofilePost.Data.UID == profileInfo.uid ? <div className='PostProfileTrue'>
    //                             <img src={profileInfo.attachmentUrl} />
    //                             <h5> {profileInfo.displayName} </h5>
    //                         </div> : <img src={None} width="180px"/>} 
    //                     </> }
    //                     <div className='PostEmotion'>
    //                         <SharedEmoticon pofilePost={pofilePost}/>
    //                     </div>
    //                 </div>

    //                 <div className='PostForm'  
    //                     onClick={onCardPage}>
    //                     {next == false ? 
    //                         <h3> {pofilePost.Data.PostText} </h3> : <>
    //                         {pofilePost.Data.music == false ? null :
    //                             <div className='PostMusicForm'>
    //                                 <div className='PostMusicName'>
    //                                     <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
    //                                 </div>
    //                                 <div className='PostMusic'>
    //                                     <img src={Music} />
    //                                     <div className='PostMusicBox'></div>
    //                                 </div>
    //                             </div>}
    //                     </>}
    //                 </div>

    //                 {pofilePost.Data.music == false ? null : <>
    //                     {next == false ? 
    //                     <button className='PostNextButton1'
    //                         type='button'
    //                         onClick={() => {setNext(!next)}}> 다음 </button> :
    //                     <button className='PostNextButton2'
    //                         type='button'
    //                         onClick={() => {setNext(!next)}}> 이전 </button> }
    //                 </> }
    //             </div> : <div className="PostBackGroundImg" style={{backgroundColor:"skyblue"}}>
    //                 <div onClick={onProfilePage}>
    //                     {pofilePost.Data.anonymous == true ? <> 
    //                         {pofilePost.Data.UID == profileInfo.uid ? <div className='PostProfileTrue'>
    //                             <img src={profileInfo.attachmentUrl} />
    //                             <h5> {profileInfo.displayName} </h5>
    //                         </div> : <img src={None} width="180px"/>}
    //                         <div className='PostEmotion'>
    //                             <SharedEmoticon pofilePost={pofilePost}/>
    //                         </div>

    //                         <div className='PostForm'  
    //                             onClick={onCardPage}>
    //                             {next == false ? 
    //                                 <h3> {pofilePost.Data.PostText} </h3> : <>
    //                                 {pofilePost.Data.music == false ? null :
    //                                     <div className='PostMusicForm'>
    //                                     <div className='PostMusicName'>
    //                                         <h4> {pofilePost.Data.Music} - {pofilePost.Data.artist}</h4>
    //                                     </div>
    //                                     <div className='PostMusic'>
    //                                         <img src={Music} />
    //                                         <div className='PostMusicBox'></div>
    //                                     </div>
    //                                 </div>}
    //                             </>}
    //                         </div>
    //                         {pofilePost.Data.music == false ? null : <>
    //                             {next == false ? 
    //                             <button className='PostNextButton1'
    //                                 type='button'
    //                                 onClick={() => {setNext(!next)}}> 다음 </button> :
    //                             <button className='PostNextButton2'
    //                                 type='button'
    //                                 onClick={() => {setNext(!next)}}> 이전 </button> }
    //                         </> } 
    //                     </> : 
    //                     <div className="PostForm">
    //                         <p> 익명으로 올라간 카드입니다. </p>
    //                     </div>}
    //                 </div>
                    
    //             </div>}
    //         </div>}
    //     </div>