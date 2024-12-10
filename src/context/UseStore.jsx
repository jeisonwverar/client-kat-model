import { create } from 'zustand';
import { loginRequest, logoutRequest, validateRequest, registerRequest } from '../api/auth';
import {jwtDecode} from 'jwt-decode';

const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Acción para iniciar sesión
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await loginRequest({ email, password });
      const decodedToken = jwtDecode(response.data.token);

      set({
        user: { email: decodedToken.email, role: decodedToken.role },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error: error.response?.data?.message || 'Error al iniciar sesión' });
    }
  },

  // Acción para registrar un usuario
  singUp: async (name,email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await registerRequest({name, email, password });
      const decodedToken = jwtDecode(response.data.token);

      set({
        user: { email: decodedToken.email, role: decodedToken.role },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error: error.response?.data?.error|| 'Error al registrar' });
      console.log(error.response?.data?.error|| 'Error al registrar')
    }
  },

  // Acción para validar el token
  validateToken: async () => {
    try {
      set({ loading: true });
      const response = await validateRequest();
      const decodedToken = jwtDecode(response.data.token);

      set({
        user: { email: decodedToken.email, role: decodedToken.role },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false, error });
    }
  },

  // Acción para cerrar sesión
  logout: async () => {
    try {
      await logoutRequest();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  },
}));

export default useStore;