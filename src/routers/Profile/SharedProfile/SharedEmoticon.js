import Happy from '../../../Image/expression_Icon/Mumble_expression_relax.png' ;
import Angry from '../../../Image/expression_Icon/Mumble_expression_angry.png' ; 
import CantChoose from '../../../Image/expression_Icon/Mumble_expression_cant_choose.png' ;  
import Crying from '../../../Image/expression_Icon/Mumble_expression_crying.png' ;  
import Difficulty from '../../../Image/expression_Icon/Mumble_expression_Difficulty.png' ;  
import Zombie from '../../../Image/expression_Icon/Mumble_expression_zombie.png' ;  
import '../../../routers/Emoticon.css'; 

                    
const SharedEmoticon = ({pofilePost}) => {
    return(
        <div className='emoticonForm'>
            {pofilePost.Data.selected == "행복" && <img className='emoticonBox' src={Happy}/>}
            {pofilePost.Data.selected == "화나" && <img className='emoticonBox' src={Angry}/>}
            {pofilePost.Data.selected == "슬퍼" && <img className='emoticonBox' src={Crying}/>}
            {pofilePost.Data.selected == "난감" && <img className='emoticonBox' src={Difficulty}/>}
            {pofilePost.Data.selected == "힘듦" && <img className='emoticonBox' src={Zombie}/>}
            {pofilePost.Data.selected == "혼란" && <img className='emoticonBox' src={CantChoose}/>}
        </div>
    )
}

export default SharedEmoticon ; 