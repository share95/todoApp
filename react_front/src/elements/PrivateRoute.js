import jwtDecode from 'jwt-decode';
import React from 'react'
import { Route,   useNavigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const isAuthenticated = () => {
        if(localStorage.getItem('accesstoken')){
            const tokenData = jwtDecode(localStorage.getItem("accessToken"));
            if (tokenData && tokenData.exp && tokenData.iat) {
                const currentTimestamp = new Date().getTime();
                if (currentTimestamp > tokenData.exp * 1000) {
                // if token is expired
                localStorage.removeItem("accessToken");
                }
            }
        }
        return false;
    };
    

    if (!isAuthenticated) {
        navigate('/login');
        return null;
      }
    
    return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute