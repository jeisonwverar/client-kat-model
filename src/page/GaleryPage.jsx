import { 
    getAllGaleryRequest, 
    createGaleryRequest, 
    deleteGaleryRequest 
  } from '../api/galery.js';
  import { getImageRequest } from '../api/image.js';
  import useStore from '../context/UseStore.jsx';
  import { useState, useEffect } from 'react';
  import { useForm } from 'react-hook-form';
  import CardImage from '../components/CardImage.jsx';
  
  const GaleryPage = () => {
    const { isAuthenticated } = useStore();
    const [galery, setGalery] = useState([]);
    const [images, setImages] = useState([]);
    const [isCreateGalery,setIsCreateGalery]=useState(false)
    const [isDeleteGalery,setIsDeleteGalery]=useState(false)
    const { register, handleSubmit, reset } = useForm();
    
  
    // Obtener todas las galerías
    const getGalery = async () => {
      let data = [];
      try {
        if (isAuthenticated) {
          data = await getAllGaleryRequest();
         
          setGalery(data.data);
  
          // Cargar imágenes de la primera galería automáticamente
          if (data.data.length > 0) {
            const firstGaleryId = data.data[0].galery_id;
            onClickGetImages(firstGaleryId);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Obtener imágenes de una galería
    const onClickGetImages = async (id) => {
      try {
        const response = await getImageRequest(id);
        setImages(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setImages([]);
        }
      }
    };
  
    // Crear una nueva galería
    const handleCreateGalery = async (values) => {
      try {
        if (!values.name_galery || !values.description) {
          alert('El nombre y la descripción son obligatorios');
          return;
        }
        await createGaleryRequest(values);
        alert('Galería creada con éxito');
        reset(); // Limpia el formulario
        await getGalery(); // Refresca la lista de galerías
      } catch (error) {
        console.error('Error al crear la galería:', error);
      }
    };
  
    // Eliminar una galería
    const handleDeleteGalery = async (galeryId) => {
      try {
        await deleteGaleryRequest(galeryId);
        alert('Galería eliminada con éxito');
        await getGalery(); // Refresca la lista de galerías
      } catch (error) {
        console.error('Error al eliminar la galería:', error);
      }
    };
  
    useEffect(() => {
      getGalery();
    }, [isAuthenticated]);
  
    return (
      <div>
        {/* botones de galeria */}
        <div className='flex justify-evenly items-center  bg-brand-primary500 py-3 mb-4'>
            <button 
            className='text-white border-b-2 border-white text-lg font-bold hover:text-brand-secondary hover:border-brand-secondary'
            onClick={()=>setIsDeleteGalery(!isDeleteGalery)}>{!isDeleteGalery?'Eliminar':'Cancelar'}</button>
            <button 
            className='text-white border-b-2 border-white text-lg font-bold hover:text-brand-secondary hover:border-brand-secondary'
            onClick={()=>setIsCreateGalery(!isCreateGalery)}>{!isCreateGalery?'Crear':'Cancelar'}</button>
        </div>
        
        {/* Crear Nueva Galería */}
        <div className={`${!isCreateGalery?'hidden':'flex'} mb-6  flex-col  gap-2 justify-center flex-grow`} >
          <h3 className="text-lg font-semibold flex-shrink-0 text-center">Crear Nueva Galería</h3>
          <form
            onSubmit={handleSubmit(handleCreateGalery)}
            className="flex  justify-center gap-4"
          >
            <input
              type="text"
              placeholder="Nombre de la galería"
              {...register('name_galery', { required: 'Nombre es obligatorio' })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Descripción"
              {...register('description', { required: 'Descripción es obligatoria' })}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Crear
            </button>
          </form>
         
        </div>
  
        {/* Botones de Galerías */}
        <div className="flex  items-center justify-center py-4 md:py-8 flex-wrap">
          {galery.map((gal) => (
            <div key={gal.galery_id} className="flex items-center gap-2">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3"
                onClick={() => onClickGetImages(gal.galery_id)}
              >
                {gal.name_galery}
              </button>
              <button
                className={`${!isDeleteGalery?'hidden':'block'} bg-red-500 text-white px-2 py-1 rounded-xl relative bottom-4 right-4 hover:bg-red-400`}
                onClick={() => handleDeleteGalery(gal.galery_id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
  
        {/* Imágenes de la Galería */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.length === 0 ? (
            <div className="text-lg h-5 w-4">Vacio</div>
          ) : (
            images.map((img) => <CardImage img={img} key={img.image_id} />)
          )}
        </div>
      </div>
    );
  };
  
  export default GaleryPage;