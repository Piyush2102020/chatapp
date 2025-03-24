import { Outlet } from "react-router-dom";
import NavigationView from "../../components/navigationView/file";
import './style.css'
import Chatbox from "../../components/chatbox/file";
import Header from "../../components/header/file";
import { useEffect } from "react";
import { addData } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
export default function Dashboard(){
    const dispatch=useDispatch();
    useEffect(()=>{
       const token= localStorage.getItem('token');
       if(token){
        const data=jwtDecode(token);
        console.log(data);
        dispatch(addData(data))
       }
      
    },[]);
    return(

       
        <div className="dashboard-page">
            
            <Header/>
            <div className="dashboard-children">
            <NavigationView/>
            <Outlet />
            <Chatbox/>
            </div>
            
        </div>
    )
}