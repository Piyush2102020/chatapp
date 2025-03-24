import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../helpers/axios';
import CommentLayout from '../comment-layout/file';
import { isReplying } from '../../redux/slice';

export default function CommentBox() {
    const postId = useSelector((state: RootState) => state.comments.commentBoxId);
    const replyTo=useSelector((state:RootState)=>state.comments.parentId);
    const isReply=useSelector((state:RootState)=>state.comments.isReply);
    const dispatch=useDispatch();
    const [text, setText] = useState('');
    const [comments, setComments] = useState<any[]>([]);

    // Function to add a comment
    const addComment = () => {
        if (!text.trim()) {
            toast.warning('Comment cannot be empty.');
            return;
        }

        if(!isReply){
            axiosInstance
            .post('/addcomment', { parentId: postId, textContent: text, parentType: 'post' })
            .then(response => {
                toast.info(response.data.response);

                // Check if updatedData exists before updating state
                if (response.data.updatedData) {
                    setComments(prevComments => [...prevComments, response.data.updatedData]);
                    setText(''); // Clear input after adding comment
                }
            })
            .catch(error => {
                toast.error('Failed to add comment.');
                console.error(error);
            });
        }

        else{

            axiosInstance.post('/addcomment',{
                type:'reply',
                textContent:text,
                repliedTo:replyTo,
                parentId:replyTo
            }).then((response)=>{
              toast.info(response.data.response);                
            }).catch(e=>toast.error(e));





            dispatch(isReplying());

            
        }
        
    };

    // Load comments on mount
    useEffect(() => {
        if (!postId) return;

        axiosInstance
            .post('/loadcomment', { parentId: postId, parentType: 'post' })
            .then(response => {
                if (response.data.response) {
                    setComments(response.data.response);
                }
            })
            .catch(error => {
                toast.error('Failed to load comments.');
                console.error(error);
            });
    }, [postId]);

    return (
        <div className="comment-box">
            <h3>Comments</h3>

            <div className="comments-holder">
                {comments.length > 0 ? (
                    comments.map((comment, index) => <CommentLayout key={index} comment={comment} />)
                ) : (
                    <p className="no-comments">No comments yet.</p>
                )}
            </div>

            <div className="comment-input-box">
                <textarea
                    className="content-text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button className="button-base" onClick={addComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
}
