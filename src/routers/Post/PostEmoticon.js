import Happy from '../../Image/expression_Icon/Mumble_expression_relax.png' ;
import Angry from '../../Image/expression_Icon/Mumble_expression_angry.png' ; 
import CantChoose from '../../Image/expression_Icon/Mumble_expression_cant_choose.png' ;  
import Crying from '../../Image/expression_Icon/Mumble_expression_crying.png' ;  
import Difficulty from '../../Image/expression_Icon/Mumble_expression_Difficulty.png' ;  
import Zombie from '../../Image/expression_Icon/Mumble_expression_zombie.png' ;  

const PostEmoticon = ({postData}) => {
    return(
        <div>
            {postData.Data.selected == "좋아" && <img src={Happy} width="50px"/>}
            {postData.Data.selected == "화나" && <img src={Angry} width="50px"/>}
            {postData.Data.selected == "슬퍼" && <img src={Crying} width="50px"/>}
            {postData.Data.selected == "난감" && <img src={Difficulty} width="50px"/>}
            {postData.Data.selected == "힘듦" && <img src={Zombie} width="50px"/>}
            {postData.Data.selected == "혼란" && <img src={CantChoose} width="50px"/>}
        </div>
    )
}

export default PostEmoticon ; 