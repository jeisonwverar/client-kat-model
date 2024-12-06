import { create } from 'zustand';
import {loginRequest,logoutRequest,validateRequest} from '../api/auth.js'
import {jwtDecode} from 'jwt-decode';
 const useStore = create((set) => ({
  user:null,
  isAuthenticated: false,
  loading:false,
  login:async(email,password)=>{
    try {
      set({loading:true});
      const response =await loginRequest({email,password});
      const decodedToken = jwtDecode(response.data.token);

      set({
        user: { email: decodedToken.email, role: decodedToken.role },
        isAuthenticated: true,
        loading: false, 
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
  validateToken:async ()=>{
    try {
      set({ loading: true });
      const response = await validateRequest()
      const decodedToken = jwtDecode(response.data.token);
      set({
        user: { email: decodedToken.email, role: decodedToken.role },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Error al validar el token:', error.message);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
  logout:()=>async () => {
    try {
      await logoutRequest()
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  },
}));
export default useStore