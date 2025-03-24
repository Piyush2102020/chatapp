import { toast } from 'react-toastify'
import axiosInstance from '../../helpers/axios'
import './style.css'
import { useEffect, useState } from 'react'
import Post from '../../components/postComponent/file';
import PostProps from '../../helpers/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CommentBox from '../../components/commentBox/file';

export default function Home(){
    const [posts,setPosts]=useState([]);
    const commentBoxVisibility=useSelector((state:RootState)=>state.comments.showCommentBox);
    const dispatch=useDispatch();

    useEffect(()=>{

        axiosInstance.get('/loadpost').then((response)=>{
            if(response.status==200){
                console.log("Data : ",response.data);
                setPosts(response.data);
            }
        }).catch(e=>toast.error(e.response.response))
    

        

    },[]);



    
    return(
        <div className='home-page'>
            {posts.map((value)=>{return <Post item={value}/>})}

{commentBoxVisibility &&
<CommentBox/>

}
            
        </div>
    )
}