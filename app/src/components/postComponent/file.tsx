import {  useEffect, useState } from 'react';
import './style.css';
import PostProps from '../../helpers/interface';
import axiosInstance from '../../helpers/axios';
import { useDispatch } from 'react-redux';
import { commentBoxId, toggleCommentBox } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';


export default function Post({ item }: PostProps) {
    const [timeAgo, setTimeAgo] = useState<string>("");
    const [isLiked,setIsLiked]=useState(false);
    const [likes,setLikes]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(() => {
        setLikes(item.likeCount);
        const createdAtDate = new Date(item.createdAt); // Convert to Date object
        const timeDifference = Date.now() - createdAtDate.getTime(); // Get the difference in milliseconds
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        let timeString = '';
        if (days > 0) {
            timeString = `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            timeString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            timeString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
        setTimeAgo(timeString);
        setIsLiked(item.isLiked);
    }, [item.createdAt,item.isLiked]);



    function handleAction(interaction:string=''){
        let action='';
        if(interaction==='like'){
            if(isLiked){
                setLikes(likes-1>0?likes-1:0)
                setIsLiked(!isLiked);
                action='dislike';
            }else{
                setLikes(likes+1);
                setIsLiked(!isLiked);
                action='like'
            }
        }else if(interaction==='report'){
            action='report';
        }

        console.log(action);
        
        axiosInstance.post(`/interaction/${item._id}`,{type:'post',action:action}).then((response)=>{
            console.log(response);
        });
    }

    return (
        <div className="post-component">
            <div className="post-first-section">
                <img 
                    className="post-dp" 
                    src={item.dp ? item.dp : '/icons/user-image-with-black-background.png'} 
                    alt="user profile" 
                />
                <div className="post-header">
                    <strong onClick={()=>{navigate(`/dashboard/profile/${item.userid?.username}`)}} className='username'>{item.userid?.username}</strong>
                    <span className="time">{timeAgo}</span>
                </div>

                <div onClick={()=>handleAction('report')} className='post-icon save'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

                </div>
            </div>

            <div className="post-content-section">
                <p className="post-text">{item.textContent}</p>
                {item.mediaContentUrl && <img className="uploaded-image" src={item.mediaContentUrl} alt="media content" />}
            </div>

            <div className="post-footer-section">
            {likes}
                <div  onClick={()=>{handleAction('like')}} className="post-icon">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isLiked?'none':"currentColor"} className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>

                <div className="post-icon" onClick={()=>{
                    dispatch(toggleCommentBox());
                    dispatch(commentBoxId(item._id));
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                </div>
                <div className="post-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>


                <div  className='post-icon save'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg>
                </div>
            </div>
        </div>
    );
}
