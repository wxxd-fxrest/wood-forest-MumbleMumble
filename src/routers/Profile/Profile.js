const Profile = ({currentPost}) => {
    console.log(currentPost)
    return(
        <div style={{backgroundColor:"green"}}>
            <h3> {currentPost.Data.PostText} </h3>
            <h4> {currentPost.Data.Music} </h4> 
            <h4> {currentPost.Data.artist} </h4> 
        </div>
    )
}

export default Profile ; 