import axios from "./axios";

export const getImageRequest=(galeryId)=>axios.get(`/image/${galeryId}`)
//export const getAllImageRequest=()=>axios.get(`/image`)
export const createImageRequest=(image)=>axios.post('/image',image)
export const updateImageRequest=(id,image)=>axios.patch(`/image/${id}`,image)
export const deleteImageRequest=(id)=>axios.delete(`/image/${id}`)