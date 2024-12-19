import axios from "./axios";

export const createTransformerRequest =async (personImage, clothingImage) => {

   const formData = new FormData();
  formData.append("personImage", personImage);
  formData.append("clothingImage", clothingImage);
  
  try {
    const response= await axios.post('transformer', formData,{
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials:true
    });
    if (response.status !== 200) {
      throw new Error(response.data.error || 'Error en la respuesta del servidor');
    }
    console.log(response)

    return response
  } catch (error) {
    if (error.response) {
      // Error de respuesta del servidor
      throw new Error(error.response.data.error || 'Error en el servidor');
    } else if (error.request) {
      // Error de red
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Error en la configuración de la petición
      throw new Error(`Error en la solicitud: ${error}`);
    }
  }
};