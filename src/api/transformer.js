import axios from "axios";

export const createTransformerRequest = (personImage, clothingImage) => {
  console.log(personImage,clothingImage)
  const formData = new FormData();
  formData.append("personImage", personImage);
  formData.append("clothingImage", clothingImage);

  try {
    const response=axios.post('/transformer', formData,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error; // Re-lanza el error para manejarlo en el frontend
  }
};