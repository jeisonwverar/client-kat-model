import  { useState } from "react";
import { useDropzone } from "react-dropzone";
import {createTransformerRequest} from '../api/transformer.js'
const HomeAppPage = () => {
  
  const [images, setImages] = useState([]); // Almacena las imágenes cargadas
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const onDrop = (acceptedFiles) => {
    const filesWithPreviews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...filesWithPreviews]); // Agrega las nuevas imágenes
  };


  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Solo permite imágenes
    onDrop,
  });

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remueve la imagen seleccionada
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (images.length < 2) {
      alert("Debes subir 2 imágenes: modelo y prenda.");
      return;

      
    }
    const personImage = images[0].file;
    const clothingImage = images[1].file;
    setLoading(true);
      try {
        const response = await createTransformerRequest(personImage, clothingImage);
      setResultUrl(response.result[0].url);
      } catch (error) {
        console.error("Error al procesar las imágenes:", error);
        alert("Hubo un error al procesar las imágenes.");
      }
      finally {
        setLoading(false);
      }
   
  }

  return (
    <div className="flex flex-col m-4 gap-4">
    <form  onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h2 className="text-1xl font-bold text-center">Subir Imágen (Arrastra y Suelta) del modelo</h2>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #cccccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          <input {...getInputProps()} />
          <p>Arrastra tus imágenes aquí o haz clic para seleccionarlas</p>
        </div>
        <h2 className="text-1xl font-bold  text-center">Subir Imagen (Arrastra y Suelta) de la prenda</h2>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #cccccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          <input {...getInputProps()} />
          <p>Arrastra tus imágenes aquí o haz clic para seleccionarlas</p>
        </div>
  
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                margin: "10px",
                position: "relative",
                display: "inline-block",
              }}
            >
              <img
                src={image.preview}
                alt={`Preview ${index}`}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  padding: "5px 8px",
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      
  <button className="bg-brand-secondary text-white py-3 px-4 rounded-sm"
  disabled={loading}
  > {loading ? "Procesando..." : "Enviar"}
  </button>
    </form>
    {resultUrl&&(
      <div className="flex flex-col justify-center text-center ">
      <h2 className="text-2xl font-bold mb-6 text-center">Resultado</h2>
      <div className="flex flex-col border-4 border-blue-300 rounded-md max-w-62">
        <img src={resultUrl} alt="Resultado"  className="h-auto  rounded-lg"/>
        <a
            href={resultUrl}
            download="resultado.png"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Descargar Imagen
          </a>
        <button className="bg-blue-300 text-white py-3 px-4 rounded-sm hover:bg-blue-500">guardar</button>
      </div>
    </div>
    )}
          
    </div>
      );
}

export default HomeAppPage