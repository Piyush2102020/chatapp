import axios from "axios";
import { toast } from "react-toastify";


const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_HOST
});


axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
       

        return config;
    },(error)=>{
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use((response)=>response,(error)=>{
    if(error.response?.status==401){
        toast.error("Unauthorized Request.Please Login again");
        window.location.href='/auth';
    }
})
export default axiosInstance;