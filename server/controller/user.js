const { default: mongoose } = require("mongoose");
const { response, hashPassword, VerifyPassword, CreateToken } = require("../helperfunctions/misc");
const { UserModel } = require("../model/userModel");

exports.CreateAccout = async (req, res) => {
    // Creates a user account
    console.log(req.body);
    
    const { email, password, name ,username} = req.body;
    const alreadyUsed = await UserModel.findOne({  $or: [{ email: email }, { username: req.body.username }]});
    if (alreadyUsed) {
        if(alreadyUsed.email==req.body.email){
            return res.status(400).json(response("Email already in use"))
        }
        else{
            return res.status(400).json(response("Username not available"))
        }
        
    } else {
        try {
            req.body.password = await hashPassword(req.body.password);
            const newUser = await new UserModel(req.body);
            await newUser.save();
            return res.status(200).json(response("User Successfully Created"));
        }
        catch (e) {
            console.log(e);
            return res.status(500).json(response("Internal Server error try again later"))
        }
    }
}



exports.Login = async (req, res) => {
    console.log(req.body);
    
    // Login a user
    const email = req.body.email;
    console.log(email);

    const isUser = await UserModel.findOne({ email: email });

    if (isUser) {

        const passwordMatched = await VerifyPassword(req.body.password, isUser.password);
        if (passwordMatched) {
            const token = await CreateToken(isUser.toObject());
            return res.status(200).json({ response: "Login Success", token: token });
        }
        else {            
            return res.status(201).json(response("Incorrect password or email"));
        }
    }
    else {
        return res.status(400).json(response("User not found"));
    }
}




exports.Account=async (req,res)=>{
    const username=req.params.username;
    try{
        if(username){
        
                const user= await UserModel.findOne({username:username}).lean();
                if(user){
                    delete user.password;
                    user.nfollower=user.follower.length;
                    user.nfollowing=user.following.length;
                    delete user.follower,user.following;
                    return res.status(200).json({response:"Account info",data:user});
                }else{
                return res.status(203).json({response:"no user found"});
                }
           
        }
        else{
            const user=await UserModel.findById(req.user._id).lean();
                delete user.password;
                return res.status(200).json({response:"Account info",data:user})
    
        }
    }
    catch(e){
        return res.status(400).json(response(e.message));
    }
   
}