import { FaDownload } from "react-icons/fa";

const DownloadButton = ({ url, filename = "resultado.png" }) => {
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
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
      }
    };
  
    return (
      <button
        onClick={handleDownload}
        className="flex justify-center bg-blue-500 text-white py-4 px-4 rounded hover:bg-blue-600 mt-4"
      >
        <FaDownload />
      </button>
    );
  };
  
  export default DownloadButton;