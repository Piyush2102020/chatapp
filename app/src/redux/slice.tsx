import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const slice=createSlice(
    {
        name:"context",
        initialState:{
            userData: {} as Record<string, string>,
            comments:{
                showCommentBox:false,
                commentBoxId:'',//Post ID
                isReply:false, //Is a reply
                parentId:'', //Reply to
                replyTo:'',
        }
            
        },
        reducers:{
            addData:(state,action:PayloadAction<{}>)=>{state.userData=action.payload},
            toggleCommentBox:(state=>{state.comments.showCommentBox=!state.comments.showCommentBox}),
            commentBoxId:((state,action:PayloadAction<string>)=>{state.comments.commentBoxId=action.payload}),

            isReplying:(state=>{state.comments.isReply=!state.comments.isReply}),
            setParentId:(state,action:PayloadAction<string>)=>{state.comments.parentId=action.payload},
            setReplyTo:(state,action:PayloadAction<string>)=>{state.comments.replyTo=action.payload}
        }
    }
)

export const {addData,toggleCommentBox,commentBoxId,isReplying,setParentId,setReplyTo}=slice.actions;
export default slice.reducer;