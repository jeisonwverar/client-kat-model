import { Navigate, Outlet } from "react-router-dom";
import useStore from "../context/UseStore";
import Loading from "../components/Loading";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useStore();
 //console.log(user)
  // Mostrar una pantalla de carga si la validación está en progreso
  if (loading) {
    return <Loading />;
  }

  // Redirigir al login si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verificar roles permitidos
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" />; // Página de acceso denegado
  }

  // Si pasa todas las verificaciones, renderiza el Outlet
  return <Outlet />;
};

export default PrivateRoute;
