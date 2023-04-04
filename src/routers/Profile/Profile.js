import None  from '../../Image/Mumble_Profile_None.PNG' ; 

const Profile = ({currentPost}) => {
    // console.log(currentPost)
    return(
        <div>
        {currentPost.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${currentPost.Data.cardImgUrl})`, height:"300px"}}>
                {currentPost.Data.anonymous == true && 
                    <h5 style={{backgroundColor:"red"}}> {currentPost.Data.displayName} </h5>}
                {currentPost.Data.anonymous == true ?
                    <img src={currentPost.Data.attachmentUrl} width="80px"/>: 
                    <img src={None} width="80px"/>}
                <h3> {currentPost.Data.PostText} </h3>
                <h4> {currentPost.Data.Music} </h4>
                <h4> {currentPost.Data.artist} </h4>
                {currentPost.Data.selected == "좋아" && <p>🤗</p>}
                {currentPost.Data.selected == "화나" && <p>🤬</p>}
                {currentPost.Data.selected == "슬퍼" && <p>😢</p>}
            </div> : <div style={{backgroundColor:"yellow"}}>
                {currentPost.Data.anonymous == true && 
                    <h5 style={{backgroundColor:"red"}}> {currentPost.Data.displayName} </h5>}
                <h3> {currentPost.Data.PostText} </h3>
                <h4> {currentPost.Data.Music} </h4>
                <h4> {currentPost.Data.artist} </h4>
                {currentPost.Data.selected == "좋아" && <p>🤗</p>}
                {currentPost.Data.selected == "화나" && <p>🤬</p>}
                {currentPost.Data.selected == "슬퍼" && <p>😢</p>}
            </div>}
        </div>
    )
}

export default Profile ; 