import PostData from "../Post/PostData";
import Home from "./Home";
import '../../routers/Main/Main.css';
import Empty from "../Empty/Empty";

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
                <div className="MainEmpty">
                    <Empty />
                </div>
            </div>
        </div>
    )
}

export default Main ; 