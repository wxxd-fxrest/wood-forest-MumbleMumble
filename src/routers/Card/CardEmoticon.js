import Happy from '../../Image/expression_Icon/Mumble_expression_relax.png' ;
import Angry from '../../Image/expression_Icon/Mumble_expression_angry.png' ; 
import CantChoose from '../../Image/expression_Icon/Mumble_expression_cant_choose.png' ;  
import Crying from '../../Image/expression_Icon/Mumble_expression_crying.png' ;  
import Difficulty from '../../Image/expression_Icon/Mumble_expression_Difficulty.png' ;  
import Zombie from '../../Image/expression_Icon/Mumble_expression_zombie.png' ;  
import '../../routers/Emoticon.css'; 

const CardEmoticon = ({card}) => {
    return(
        <div className='emoticonForm'>
            {card.Data.selected == "행복" && <img className='emoticonBox' src={Happy}/>}
            {card.Data.selected == "화나" && <img className='emoticonBox' src={Angry}/>}
            {card.Data.selected == "슬퍼" && <img className='emoticonBox' src={Crying}/>}
            {card.Data.selected == "난감" && <img className='emoticonBox' src={Difficulty}/>}
            {card.Data.selected == "힘듦" && <img className='emoticonBox' src={Zombie}/>}
            {card.Data.selected == "혼란" && <img className='emoticonBox' src={CantChoose}/>}
        </div>
    )
}

export default CardEmoticon ; 