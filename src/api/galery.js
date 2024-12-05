import axios from "./axios";

export const getGaleryRequest=(id)=>axios.get(`/galery/${id}`)
export const getAllGaleryRequest=()=>axios.get(`/galery`)
export const createGaleryRequest=(galery)=>axios.post('/galery',galery)
export const updateGaleryRequest=(id,galery)=>axios.patch(`/galery/${id}`,galery)
export const deleteGaleryRequest=(id)=>axios.delete(`/galery/${id}`)