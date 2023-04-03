const Post = ({postData}) => {
    return (
        <div>
            <div style={{backgroundColor:"yellow"}}>
                <h3> {postData.Data.PostText} </h3>
                <h4> {postData.Data.Music} </h4>
                <h4> {postData.Data.artist} </h4>
            </div>
        </div>
    )
}

export default Post ; 