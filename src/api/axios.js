import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://api-kat-model.onrender.com/api/v1',
    withCredentials: true, // Esto asegura que las cookies se envíen en cada solicitud (si es necesario)
  });
  
  // Interceptor para incluir el token automáticamente
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Incluye el token en el encabezado
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); // Maneja errores en la configuración de la solicitud
    }
  );
  
  // Interceptor para manejar errores de respuesta
  instance.interceptors.response.use(
    (response) => response, // Devuelve la respuesta si no hay error
    (error) => {
      if (error.response?.status === 401) {
        console.error('Sesión expirada o token inválido.');
        localStorage.removeItem('token'); // Limpia el token si es inválido
        // Puedes redirigir al usuario al login si es necesario
        window.location.href = '/login';
      }
      return Promise.reject(error); // Propaga el error para manejarlo en otros lugares
    }
  );
  
  export default instance;