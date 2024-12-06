import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import  useStore  from '../context/UseStore';
import Loading from '../components/Loading';


const PrivateRoute = ({allowedRoles }) => {
 const {user,isAuthenticated,loading } = useStore();
 if(loading){
    return <Loading/>
 }
 if(!isAuthenticated){
    return <Navigate to="/login" />;
 }
 if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />; // Redirige a una página de "Acceso no autorizado"
  }
  return <Outlet />;
}

export default PrivateRoute