import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import None  from '../../../Image/Mumble_Profile_None.PNG' ; 
import ANGER from '../../../Image/Mumble_anger.png' ; 
import CONFUSION from '../../../Image/Mumble_confusion.png' ; 
import DAZED from '../../../Image/Mumble_dazed.png' ; 
import HAPPY from '../../../Image/Mumble_happy.png' ; 
import SADNESS from '../../../Image/Mumble_sadness.png' ; 
import { AuthContext } from "../../../Context/AuthContext";
import SharedEmoticon from "./SharedEmoticon";
import { useNavigate } from "react-router-dom";

const SharedProfile = ({pofilePost, profileInfo}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const navigate = useNavigate();

    const onCardPage = (e) => {
        e.preventDefault();
        navigate(`/card-page/${pofilePost.Data.UUID}`) ; 
    } ; 

    const onProfilePage = (e) => {
        e.preventDefault();
        navigate(`/profile/${pofilePost.Data.UID}`) ; 
    } ; 

    // console.log(pofilePost)
    return(
        <div>
            {currentUser.uid == profileInfo.uid ? <>
                <div style={{backgroundImage: `url(${pofilePost.Data.cardImgUrl})`, height:"300px"}}>
                    <div onClick={onProfilePage}>
                        {pofilePost.Data.UID == profileInfo.uid && 
                            <h5 style={{backgroundColor:"red"}}> {profileInfo.displayName} </h5>}                     
                        {pofilePost.Data.UID == profileInfo.uid ?
                            <img src={profileInfo.attachmentUrl} width="50px"/> : 
                            <img src={None} width="50px"/>}
                    </div>
                    <div onClick={onCardPage}>
                        <h3> {pofilePost.Data.PostText} </h3>
                        <h4> {pofilePost.Data.Music} </h4>
                        <h4> {pofilePost.Data.artist} </h4>
                        {pofilePost.Data.anonymous == false && <p> 익명으로 올라간 카드입니다. </p>}
                        <SharedEmoticon pofilePost={pofilePost}/>
                    </div>
                </div>
            </> : <>
            {pofilePost.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${pofilePost.Data.cardImgUrl})`, height:"300px"}}>
                <div onClick={onProfilePage}>
                    {pofilePost.Data.anonymous == true && <> 
                        {pofilePost.Data.UID == profileInfo.uid && 
                            <h5 style={{backgroundColor:"red"}}> {profileInfo.displayName} </h5>} 
                        </> }
                    {pofilePost.Data.anonymous == true && <> 
                        {pofilePost.Data.UID == profileInfo.uid ?
                            <img src={profileInfo.attachmentUrl} width="50px"/> : 
                            <img src={None} width="50px"/>}
                    </>}
                </div>
                <div onClick={onCardPage}>
                    <h3> {pofilePost.Data.PostText} </h3>
                    <h4> {pofilePost.Data.Music} </h4>
                    <h4> {pofilePost.Data.artist} </h4>
                    <SharedEmoticon pofilePost={pofilePost}/>
                </div>
            </div> : <div style={{backgroundColor:"yellow"}}>
                <div onClick={onProfilePage}>
                    {pofilePost.Data.anonymous == true && <> 
                        {pofilePost.Data.UID == profileInfo.uid && 
                            <h5 style={{backgroundColor:"red"}}> {profileInfo.displayName} </h5>} 
                        </> }
                    {pofilePost.Data.anonymous == true && <> 
                        {pofilePost.Data.UID == profileInfo.uid ?
                            <img src={profileInfo.attachmentUrl} width="50px"/> : 
                            <img src={None} width="50px"/>}
                    </>}
                </div>
                <div onClick={onCardPage}>
                    <h3> {pofilePost.Data.PostText} </h3>
                    <h4> {pofilePost.Data.Music} </h4>
                    <h4> {pofilePost.Data.artist} </h4>
                    <SharedEmoticon pofilePost={pofilePost}/>
                </div>

            </div>}
            </>}
        </div>
    )
}

export default SharedProfile ; 