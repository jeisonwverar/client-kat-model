import axios from "./axios";

export const getUserRequest=(id)=>axios.get(`/user/${id}`)
export const getAllUserRequest=()=>axios.get(`/user`)
export const createUserRequest=(user)=>axios.post('/user',user)
export const updateUserRequest=(id,user)=>axios.patch(`/user/${id}`,user)
export const deleteUserRequest=(id)=>axios.delete(`/user/${id}`)