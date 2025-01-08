import { FaDownload } from "react-icons/fa";
import Message from "./Message";
import { useState } from "react";

const DownloadButton = ({ url, filename = "resultado.png" }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Descarga exitosa");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Error al descargar el archivo");
      console.error("Error al descargar el archivo:", error);
    } finally {
      setShowMessage(true); // Mostrar el mensaje independientemente del resultado
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="flex justify-center bg-blue-500 text-white py-4 px-4 rounded hover:bg-blue-600 mt-4"
      >
        <FaDownload />
      </button>

      {showMessage && (
        <Message
          success={isSuccess}
          message={message}
          onClose={() => setShowMessage(false)} // Cerrar el mensaje
        />
      )}
    </>
  );
};

export default DownloadButton;
