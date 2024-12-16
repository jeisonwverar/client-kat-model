import { getProfileRequest } from "../api/profile.js";
import { useState, useEffect } from "react";
import useStore from "../context/UseStore.jsx";

const ProfilePage = () => {
  //const [response, setResponse] = useState(null);
  const [profile, setProfile] = useState(null); // Para almacenar los datos del perfil
  const { isAuthenticated, validateSession} = useStore();
 
  
  // Función para obtener el perfil
  const ejecutarPerfil = async () => {
    try {
      if (isAuthenticated) {
        console.log("Usuario autenticado, obteniendo perfil...");
      
        const data = await getProfileRequest();
        setProfile(data); // Guarda los datos del perfil en el estado
        console.log("Perfil obtenido:", data);
      } else {
        console.log("Usuario no autenticado.");
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error.message);
    }
  };

  // Llama a la función de perfil solo si el usuario está autenticado
  useEffect(() => {
    ejecutarPerfil()
    console.log('app principal',isAuthenticated) // Valida la sesión al cargar la aplicación
  }, []);


  // Si el usuario no está autenticado, muestra un mensaje o redirige
  if (!isAuthenticated) {
    return <p>Redirigiendo a login...</p>; // Opcional: podría redirigir aquí directamente
  }

  // Muestra un indicador de carga mientras se obtiene el perfil
  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-1">
      <h1 className="text-center grow w-screen text-3xl font-bold">Perfil</h1>
      <div className="m-10 p-10 flex flex-col gap-2 justify-evenly border-2 border-brand-secondary rounded-md">
        <h2 className="text-xl font-bold">Datos:</h2>
        <p>user: {profile.username || "Desconocido"}</p>
        <p>email: {profile.email || "Desconocido"}</p>
        <p>nickname: {profile.email || "Desconocido"}</p>
        <button className="text-white bg-brand-secondary hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Editar
        </button>
        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium border-2 border-brand-secondary text-brand-secondary focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-red-700">
          Eliminar cuenta
        </button>
      </div>
      <div>
        <img
          className="w-full aspect-[3/4] object-contain"
          src="./img/profile-image.png"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;