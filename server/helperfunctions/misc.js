const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.response=(response)=>{
    return {response:response}
}

exports.hashPassword=(password)=>{
    return bcrypt.hash(password,10);
}

exports.VerifyPassword=(passowrd,hashedPassword)=>{
    return bcrypt.compare(passowrd,hashedPassword);
}


exports.CreateToken=(object)=>{
    return jwt.sign(object,process.env.JWT_SECRET,{expiresIn:'1D'});
}

exports.VerifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}