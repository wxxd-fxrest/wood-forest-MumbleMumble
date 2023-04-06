import ANGER from '../../Image/Mumble_anger.png' ; 
import CONFUSION from '../../Image/Mumble_confusion.png' ; 
import DAZED from '../../Image/Mumble_dazed.png' ; 
import HAPPY from '../../Image/Mumble_happy.png' ; 
import SADNESS from '../../Image/Mumble_sadness.png' ; 


const PostEmoticon = ({postData}) => {
    return(
        <div>
            {postData.Data.selected == "좋아" && <img src={HAPPY} width="50px"/>}
            {postData.Data.selected == "화나" && <img src={ANGER} width="50px"/>}
            {postData.Data.selected == "슬퍼" && <img src={SADNESS} width="50px"/>}
            {postData.Data.selected == "멍..." && <img src={DAZED} width="50px"/>}
            {postData.Data.selected == "혼란" && <img src={CONFUSION} width="50px"/>}
        </div>
    )
}

export default PostEmoticon ; 