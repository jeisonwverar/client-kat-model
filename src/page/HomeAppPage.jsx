import  { useState } from "react";
import { useDropzone } from "react-dropzone";

const HomeAppPage = () => {
  
  const [images, setImages] = useState([]); // Almacena las imágenes cargadas

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

  const handleSubmit=(e)=>{
    e.preventDefault()
   console.log(e.target)
   console.log(images)
  }

  return (
    <form  onSubmit={handleSubmit}>
        <h2>Subir Imágenes (Arrastra y Suelta)</h2>
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
  
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
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
                  width: "150px",
                  height: "150px",
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
      
  <button className="bg-brand-secondary text-white py-3 px-4 rounded-sm">Enviar</button>
    </form>
      );
}

export default HomeAppPage