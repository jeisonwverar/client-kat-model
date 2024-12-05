import axios from "./axios";

export const getProfileRequest=()=>axios.get('/profile')
export const updateProfileRequest=(id,profile)=>axios.patch(`/profile/${id}`,profile)
export const deleteProfileRequest=(id)=>axios.delete(`/profile/${id}`)