import  { useState } from "react";
import { useDropzone } from "react-dropzone";
import {createTransformerRequest} from '../api/transformer.js'
import SaveBotton from "../components/SaveBotton.jsx";
import DownloadButton from '../components/DownloadButton.jsx'
const HomeAppPage = () => {
  const imageTemporal='https://plus.unsplash.com/premium_photo-1669950093661-be9dedbda440?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWxvJTIwZmVtZW5pbmF8ZW58MHx8MHx8fDA%3D'
  const [images, setImages] = useState([]); // Almacena las imágenes cargadas
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorType, setError] = useState('');
  const onDrop = (acceptedFiles) => {
    const filesWithPreviews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...filesWithPreviews]);
    setError(null); // Agrega las nuevas imágenes
  };


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    maxFiles: 2, // Solo permite imágenes
    onDrop,
  });

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length !== 2) {
      setError("Debes subir 2 imágenes: modelo y prenda.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await createTransformerRequest(
        images[0].file,
        images[1].file
      );
      //console.log(response)
      if (response.data.result?.[0]?.url) {
        setResultUrl(response.data.result[0].url);
      } else {
        throw new Error('No se recibió una URL válida del servidor');
      }
    } catch (error) {
      console.log("Error al procesar las imágenes:", error);
      setError(error || "Error al procesar las imágenes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col m-4 gap-4">
      <div>{}</div>
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
    {!resultUrl&&( //codigo original resultUrl quitar cuando termine las pruebas
      <div className="flex flex-col justify-center text-center ">
      <h2 className="text-2xl font-bold mb-6 text-center">Resultado</h2>
      <div className="flex flex-col border-4 border-blue-300 rounded-md max-w-62">
        <img /* src={resultUrl}  */  src={imageTemporal}
        alt="Resultado"  
        className="h-auto  rounded-lg"/>
         {/* <DownloadButton url={resultUrl} /> */}
         <DownloadButton url={imageTemporal} />

        <SaveBotton 
        url={imageTemporal}
        />
      </div>
    </div>
    )}
          
    </div>
      );
}

export default HomeAppPage