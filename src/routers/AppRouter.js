import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Auth from "./Auth/Auth";
import Main from "./Main/Main";
import ProfileEdit from "./Profile/ProfileEdit";

const AppRouter = () => {
    const {currentUser} = useContext(AuthContext) ; 

    const ProtectedRoute = ({children}) => {
      if(!currentUser) {
        return <Navigate to="/auth" /> 
      }
      return children ;
    }; 

    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route index element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute> } />
                        <Route path='/profile' element={
                            <ProtectedRoute>
                                <ProfileEdit />
                            </ProtectedRoute> } />

                        <Route path='/auth' element={<Auth />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter ; 