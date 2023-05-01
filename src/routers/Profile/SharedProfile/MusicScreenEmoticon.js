import Happy from '../../../Image/expression_Icon/Mumble_expression_relax.png' ;
import Angry from '../../../Image/expression_Icon/Mumble_expression_angry.png' ; 
import CantChoose from '../../../Image/expression_Icon/Mumble_expression_cant_choose.png' ;  
import Crying from '../../../Image/expression_Icon/Mumble_expression_crying.png' ;  
import Difficulty from '../../../Image/expression_Icon/Mumble_expression_Difficulty.png' ;  
import Zombie from '../../../Image/expression_Icon/Mumble_expression_zombie.png' ;  
import '../../../routers/Emoticon.css'; 

                    
const MusicScreenEmoticon = ({pofileMusic}) => {
    return(
        <div className='emoticonForm'>
            {pofileMusic.Data.selected == "행복" && <img className='emoticonBox' src={Happy}/>}
            {pofileMusic.Data.selected == "화나" && <img className='emoticonBox' src={Angry}/>}
            {pofileMusic.Data.selected == "슬퍼" && <img className='emoticonBox' src={Crying}/>}
            {pofileMusic.Data.selected == "난감" && <img className='emoticonBox' src={Difficulty}/>}
            {pofileMusic.Data.selected == "힘듦" && <img className='emoticonBox' src={Zombie}/>}
            {pofileMusic.Data.selected == "혼란" && <img className='emoticonBox' src={CantChoose}/>}
        </div>
    )
}

export default MusicScreenEmoticon ; 