import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import useStore from '../context/UseStore.jsx';
const LoginPage = () => {
  const {login,error,isAuthenticated} =useStore();
  const {register, handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate()
  const [errorUser,setErrorUser]=useState([])
  


  const onSubmit=handleSubmit((values)=>{
    try {
      login(values)
      
    } catch (e) {
      console.log({e,error})
    }
 

  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/home')
      if(error==='unauthorized'){
        setErrorUser([])
      }
  },[isAuthenticated])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Seción</h2>
          <div className={`${errorUser?'flex':'hidden'} bg-red-500 text-red-50 justify-center py-1 rounded-sm`}>{error}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
           

            {/* Correo */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Correo</label>
              <input
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "El correo no es válido",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: "La contraseña es obligatoria" })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              className="w-full bg-brand-secondary text-white py-2 px-4 rounded-lg hover:bg-brown-700 transition"
            >
              Ingresar
            </button>
          </form>

          {/* Logo */}
          <div className="mt-6 flex justify-center">
            <img src="/img/logo-transparente.png" alt="Kat Model Fashion" className="h-12" />
          </div>
        </div>
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/img/login-1.png')`}}
        >
        </div>
      </div>
    </div>
  );
}

export default LoginPage