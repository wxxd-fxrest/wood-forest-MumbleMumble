import None  from '../../Image/Mumble_Profile_None.PNG' ; 

const Post = ({postData}) => {

    return (
        <div>
        {postData.Data.cardImgUrl ? 
            <div style={{backgroundImage: `url(${postData.Data.cardImgUrl})`, height:"300px"}}>
                {postData.Data.anonymous == true && 
                    <h5 style={{backgroundColor:"red"}}> {postData.Data.displayName} </h5>}
                {postData.Data.anonymous == true ?
                    <img src={postData.Data.attachmentUrl} width="80px"/>: 
                    <img src={None} width="80px"/>}
                <h3> {postData.Data.PostText} </h3>
                <h4> {postData.Data.Music} </h4>
                <h4> {postData.Data.artist} </h4>
                {postData.Data.selected == "좋아" && <p>🤗</p>}
                {postData.Data.selected == "화나" && <p>🤬</p>}
                {postData.Data.selected == "슬퍼" && <p>😢</p>}
            </div> : <div style={{backgroundColor:"skyblue"}}>
                {postData.Data.anonymous == true && 
                    <h5 style={{backgroundColor:"red"}}> {postData.Data.displayName} </h5>}
                <h3> {postData.Data.PostText} </h3>
                <h4> {postData.Data.Music} </h4>
                <h4> {postData.Data.artist} </h4>
                {postData.Data.selected == "좋아" && <p>🤗</p>}
                {postData.Data.selected == "화나" && <p>🤬</p>}
                {postData.Data.selected == "슬퍼" && <p>😢</p>}
            </div>}
        </div>
    )
}

export default Post ; 