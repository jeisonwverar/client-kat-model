import axios from "axios";

export const createTrasnformerRequest=(data)=>axios.post('/transformer',data);