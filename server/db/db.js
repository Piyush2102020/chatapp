const mongoose=require('mongoose');
exports.connectDb=()=>{
    // Connect to database and return false if an error occurs

    try{
        // Try connecting to mongo db
        mongoose.connect(process.env.DB_URL);
        return true;
    }catch(e){
        console.log("Error occured in connecting database : ",e);
        return false;
    }
}