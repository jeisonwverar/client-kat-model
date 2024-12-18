import {getAllGaleryRequest,createGaleryRequest} from '../api/galery.js'
import useStore from '../context/UseStore.jsx';
import { useState,useEffect } from 'react';

const GaleryPage = () => {
const {isAuthenticated}=useStore()
 const [galery, setGalery] = useState([])

    const getGalery=async()=>{
        let data=[];
        try {
            if(isAuthenticated){
                 data=await getAllGaleryRequest()
                
                 if(data.data.length===0){
                   await  createGaleryRequest({
                    name_galery:"general",
                    description:"galeria general"
                })
                 }
            }
            
            setGalery(data.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(()=>{
      getGalery()
      
    },[isAuthenticated])

    const onClickGetImages=(id)=>{
        console.log(id)
    }
  return (
    <div>
        
            
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      {
       galery.map((gal)=>(
    <button type="button" 
    className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
    key={gal.galery_id}
    onClick={()=>onClickGetImages(gal.galery_id)}
    >
        {gal.name_galery}
        </button>

       ))
}

</div>
        
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt=""/>
    </div>
</div>
    </div>
  )
}

export default GaleryPage