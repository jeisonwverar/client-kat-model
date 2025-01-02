import {getAllGaleryRequest} from '../api/galery.js'
import {createImageRequest} from '../api/image.js'

const SaveBotton = ({url}) => {

  const  onclickSave=async()=>{
    console.log(url)
     let responseGalery = await getAllGaleryRequest()
     console.log(responseGalery)
     if(responseGalery.data.lenght===0){
        console.log('falta galeria')
     }
      console.log(url)
      const data=
     { galeryId:responseGalery.data[0].galery_id, 
        nameImage:`image-${Math.floor(Math.random()*100)}`, 
        description:'', 
        imageUrl:url
    }
     
    const responseImage= await createImageRequest(data)
    console.log(responseImage)
     if(responseImage.status===201){
        console.log('imagen guardada')
     }

    }

  return (
    <button 
     className="bg-blue-300 text-white py-3 px-4 rounded-sm hover:bg-blue-500"
    onClick={onclickSave}>
        guardar

    </button>
  )
}

export default SaveBotton