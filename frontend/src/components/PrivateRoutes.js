import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({allowedRole}) => {
    const role = localStorage.getItem('role');
   

    

    if (!allowedRole.includes(role)) {
        return <Navigate to='/' />;
    }

    return <Outlet/>;
}

export default PrivateRoutes
