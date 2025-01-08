
import { useEffect } from "react";

const Message = ({ message, success, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded shadow-md transition-all ${
        success ? "bg-green-600" : "bg-red-600"
      } text-white font-bold ${message ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {message}
    </div>
  );
};

export default Message;
