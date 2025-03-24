const mongoose=require('mongoose');



const replySchema=new mongoose.Schema({
    createdAt:{type:Date,default:Date.now},
    repliedTo:{type:mongoose.Types.ObjectId},
    userid:{type:mongoose.Types.ObjectId,ref:"Users"},
    textContent:{type:String},
    parentId:{type:mongoose.Types.ObjectId,ref:"Users"}
});

const commentSchema=new mongoose.Schema({
    createdAt:{type:Date,default:Date.now},
    parentId:{type:mongoose.Types.ObjectId,index:true}, 
    userid:{type:mongoose.Types.ObjectId,ref:"Users"},
    textContent:{type:String},
    parentType:{type:String,enum:["post","comment"],default:"post"},
    replies:[replySchema]
});


const postSchema=new mongoose.Schema({
    createdAt:{type:Date,default:Date.now},
    type:{type:String,enum:["image","video","text","hybrid"],required:true},
    likedBy:[{type:mongoose.Types.ObjectId,ref:"Users"}],
    userid:{type:mongoose.Types.ObjectId,required:true,ref:"Users"},
    reportedBy:[{type:String}],
    textContent:{type:String,trim:true},
    mediaContentUrl:{type:String}
});



exports.PostModel=mongoose.model("Posts",postSchema);
exports.CommentModel=mongoose.model("Comments",commentSchema);