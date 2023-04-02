import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Search from "./Search/Serch";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path='/' element={<Auth />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter ; 