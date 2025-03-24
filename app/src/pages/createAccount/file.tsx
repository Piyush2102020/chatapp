import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addData } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
export default function CreateAccount(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loginToggle,setToggle]=useState(false);
    const [signedIn,setSignedIn]=useState(false);
    const [username,setUsername]=useState("");
    const naviagate=useNavigate();
    const dispatch=useDispatch();

    const isEmpty=(value:string | null | undefined)=>{
        return !value?.trim();
    }



    const HandleAccountCreation=()=>{
        if(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(username)){
            toast.info("Fields Can't be empty")
        }
        else{
            const object={
                name:name,
                email:email,
                password:password,
                username:username
            };


            axios.post(`${import.meta.env.VITE_HOST}/createaccount`, { ...object })
            .then((response) => {
                toast.info(`${response.data.response}. Please login`);
                setToggle(true);
            })
            .catch((e) => {
                if (e.response) {
                    toast.error('Error: ' + e.response.data.response);
                } else {
                    toast.error('An unexpected error occurred');
                }
            });

            
        }
    }



    const HandleLogin=()=>{

        if( isEmpty(email) || isEmpty(password)){
            toast.info("Fields Can't be empty")
        }
        else{
            const object={email:email,password:password}
            axios.post(`${import.meta.env.VITE_HOST}/login`,{...object}).
            then((response)=>{
                if(response.status==200){
                    localStorage.setItem("token",response.data.token);
                    toast.info(response.data.response);
                    dispatch(addData(jwtDecode(response.data.token)));
                    naviagate('/dashboard')
                }
                else{
                    toast.error(response.data.response)
                }
            }).catch(e=>
                toast.error(e.response.data.response)
            )

        }
    }



    const HandleSuccess=(response:any)=>{
        const token=response.credential;
        axios.post(`${import.meta.env.VITE_HOST}/auth`,{token:token})
        .then((response)=>{

            
            const userData=response.data.response.payload;
            
            setSignedIn(true);
            setName(userData.name);
            setEmail(userData.email);

            
        }).catch(e=>toast.error(e.response.body.response));
    }

    return (
        <div className="create-account-page">
            
            <div className="form-base">
            <h1>{import.meta.env.VITE_APP_NAME}</h1>
            {!loginToggle && <> <input className="input-base" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter name"/>
            <input className="input-base" onChange={(e)=>setUsername(e.target.value)}  value={username} placeholder="Enter your username"/></>}
            <input className="input-base" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter your email"/>
            <input className="input-base" onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder="Enter your password"/>

            {!signedIn &&
            <GoogleOAuthProvider  clientId={import.meta.env.VITE_CLIENT_ID}>
            <GoogleLogin  onSuccess={HandleSuccess} 
            onError={()=>{alert("Unknown error occured");
            }}>
            </GoogleLogin>
        </GoogleOAuthProvider>
            }
            

            <button className="button-base" onClick={loginToggle?HandleLogin:HandleAccountCreation}>{loginToggle?"Login":"Create Account"}</button>

            <strong  onClick={()=>setToggle(!loginToggle)}>{loginToggle?"No Account click here to Create an account":"Already an account? Click here to login"}</strong>
            </div>
        </div>
    )
}