import { useState } from 'react'
import DeleteModal from './DeleteModal.jsx'
import DownloadButton from './DownloadButton'
import SuccessModal from './SuccessModal.jsx'
import {updateImageRequest,deleteImageRequest} from '../api/image.js'
const CardImage = ({img}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen]=useState(false)
  const handleDeleteImage = async () => {
    try {
  
      await deleteImageRequest(img.image_id);
      alert('Imagen eliminada correctamente');
      setIsDeleteModalOpen(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

 

  
 
  return (
    <div key={img.image_id}>
    <img className="h-auto max-w-full rounded-lg" src={img.url} alt={img.name_image}/>
    <div className='flex gap-2'>
      <DownloadButton url={img.url} filename={img.name_image}/>
      <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4'onClick={()=>setIsUpdateModalOpen(true)}>Editar</button>
      <SuccessModal status={isUpdateModalOpen}
      setStatus={setIsUpdateModalOpen}
      updateImage={updateImageRequest}
      imageData={img}
      />
      <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4' onClick={()=>setIsDeleteModalOpen(true)} >eliminar</button>
      <DeleteModal 
      status={isDeleteModalOpen}
      onConfirm={handleDeleteImage}
      onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
</div>
  )
}

export default CardImage