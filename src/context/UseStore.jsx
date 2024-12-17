import { create } from 'zustand';
import { loginRequest, logoutRequest, validateRequest, registerRequest } from '../api/auth';


const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Acción para iniciar sesión
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await loginRequest(email, password);
      console.log('response login',response.data.user)
      set({
        user: response.data.user, // La API puede devolver datos adicionales del usuario
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error: error.response?.data?.message || 'Error al iniciar sesión' });
      console.error('Error al iniciar sesión:', error);
    }
  },

  // Acción para registrar un usuario
  singUp: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await registerRequest({ name, email, password });
      console.log('response register',response)
      set({
        user: response.data.user, // Actualiza el estado con los datos del usuario registrado
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error: error.response?.data?.message || 'Error al registrarse' });
      console.error('Error al registrarse:', error);
    }
  },

  // Acción para validar el token
  validateSession: async () => {
    try {
      set({ loading: true, error: null });
      const response = await validateRequest() 
      //console.log(response)
      set({
        user: response.data.user, // Actualiza el estado con los datos del usuario
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error: error.response?.data?.message || 'Error al validar sesión' });
      console.error('Error al validar sesión:', error);
    }
  },

  // Acción para cerrar sesión
  logout: async () => {
    try {
      await logoutRequest(); // Elimina la cookie en el backend
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },
}));

export default useStore;