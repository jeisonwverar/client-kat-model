import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:3000/api/v1/',
    withCredentials: true, // Esto asegura que las cookies se envíen en cada solicitud (si es necesario)
  });
  
// Interceptor para incluir el token automáticamente
instance.interceptors.request.use(
  (config) => {
    // Aquí no es necesario incluir el token manualmente si lo estás manejando en las cookies
    return config;
  },
  (error) => Promise.reject(error)
);
  
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    return Promise.reject(error);
  }
);
  
  export default instance;