import axios from 'axios';

const instance=axios.create({
    baseURL:'https://api-kat-model.onrender.com/api/v1',
    withCredentials:true
})
export default instance;