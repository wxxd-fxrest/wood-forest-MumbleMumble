import PostData from "../Post/PostData";
import Home from "./Home";
import '../../routers/Main/Main.css';

const Main = () => {
    return (
        <div className="Main">
            <div className="MainContainer">
                <div className="MainHome">
                    <Home />
                </div>
                <div className="MainPost">
                    <PostData />
                </div>
            </div>
        </div>
    )
}

export default Main ; 