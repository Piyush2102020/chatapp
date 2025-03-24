const mongoose=require('mongoose');


const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        createdAt:{type:Date,default:Date.now},
        email:{type:String,unique:true,required:true},
        bio:{type:String},
        password:{type:String,required:true},
        follower:[{type:mongoose.Types.ObjectId,ref:"Users"}],
        following:[{type:mongoose.Types.ObjectId,ref:"Users"}],
        posts:[{type:mongoose.Types.ObjectId,ref:"Posts"}],
        dp:{type:String},
        username:{type:String,required:true}
    }
)





exports.UserModel=mongoose.model("Users",userSchema);