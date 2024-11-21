/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye las rutas de tus archivos
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        brand:{
         DEFAULT:'#E2B9A4',
          primary500:'#D3A993',
          primary400:'#DEB7A1',
          primary300:'#E9C4AF',
          secondary:'#493326'
        }
      }
    },
  },
  plugins: [
    
  ],
}

