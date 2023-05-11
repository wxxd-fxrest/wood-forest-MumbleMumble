import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Auth from "./Auth/Auth";
import CardPage from "./Card/CardPage";
import Main from "./Main/Main";
import SharedProfileData from "./Profile/SharedProfile/SharedProfileData";

const AppRouter = () => {
    const {currentUser} = useContext(AuthContext) ; 

    const ProtectedRoute = ({children}) => {
      if(!currentUser) {
        return <Navigate to="/auth" /> 
      }
      return children ;
    } ; 

    return(
        <div>
            <BrowserRouter basename="wood-forest-MumbleMumble">
                <Routes>
                    <Route>
                        <Route index element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute> } />
                            
                        <Route path='/auth' element={<Auth />} />
                        <Route path='/card-page/:docid' element={<CardPage />} />
                        <Route path='/profile/:uid' element={<SharedProfileData />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter ; 