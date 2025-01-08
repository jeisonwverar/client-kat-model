import { getAllGaleryRequest } from '../api/galery.js'
import { createImageRequest } from '../api/image.js'
import Message from './Message.jsx'
import { useState } from 'react'
const SaveBotton = ({ url }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onclickSave = async () => {
    try {
      //console.log(url)
      let responseGalery = await getAllGaleryRequest()
      //console.log(responseGalery)
      if (responseGalery.data.lenght === 0) {
        setIsSuccess(false);
        setMessage("error al guardar falta crear galeria");
      }
      //console.log(url)
      const data =
      {
        galeryId: responseGalery.data[0].galery_id,
        nameImage: `image-${Math.floor(Math.random() * 100)}`,
        description: '',
        imageUrl: url
      }

      const responseImage = await createImageRequest(data)
      //console.log(responseImage)
      if (responseImage.status === 201) {
        setIsSuccess(true);
        setMessage("imagen guardada");
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("error al guardar imagen");
      console.log(err)
    } finally {
      setShowMessage(true);
    }

  }

  return (
    <>
      <button
        className="bg-blue-300 text-white py-3 px-4 rounded-sm hover:bg-blue-500"
        onClick={onclickSave}>
        guardar

      </button>
      {showMessage && (
        <Message
          success={isSuccess}
          message={message}
          onClose={() => setShowMessage(false)} // Cerrar el mensaje
        />
      )}
    </>
  )
}

export default SaveBotton