import './style.css';
import getTime from '../../helpers/manipulator';
import axiosInstance from '../../helpers/axios';
import { useState } from 'react';
import { isReplying, setParentId } from '../../redux/slice';
import { useDispatch } from 'react-redux';

export default function CommentLayout({ comment }: any) {
    const dispatch=useDispatch();
    function addReply(){
        dispatch(setParentId(comment._id))
        dispatch(isReplying());
    }

    return (
        <div className='comment-layout'>
            <img className='post-dp' src={comment.dp ? comment.dp : '/icons/user-image-with-black-background.png'} />

            <div className='comment-details'>
                <strong>{comment.userid.username}</strong> {getTime(comment.createdAt)}
                <div className='comment-content'>
                    <p>{comment.textContent}</p>
                </div>

                <div className='comment-actions'>
                    <span onClick={addReply}>Add Reply</span>
                    <span>Report</span>
                </div>
            </div>

            <div className='comment-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>

            <div className='replies'>

            </div>
        </div>
    );
}
