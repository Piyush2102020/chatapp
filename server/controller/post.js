const { default: mongoose } = require('mongoose');
const {PostModel, CommentModel}=require('../model/postModel');
const {UserModel}=require('../model/userModel');
const { response } = require('../helperfunctions/misc');
const cloudinary=require('../helperfunctions/cloudinary');
const streamifier=require('streamifier');



exports.CreatePost = async (req, res) => {
    try {
      const userData = req.user;
      const media = req.file;
      const data = req.body;
      let imageUri = null;
      if (media) {
  
        imageUri = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "flamingo_posts" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
  
          streamifier.createReadStream(media.buffer).pipe(uploadStream);
        });
      }

      const post = new PostModel({
        ...data,
        mediaContentUrl: imageUri,
        userid: userData._id,
      });
  
      await post.save();
      await UserModel.findByIdAndUpdate(userData._id, { $push: { posts: post._id } });
  
      res.status(200).json(response("Post Successfully created", { post }));
    } catch (error) {
      console.error("Post creation error:", error);
      res.status(500).json(response("Internal server error", error));
    }
  };


exports.AddComment=async (req,res)=>{

    const userData=req.user;
    console.log(req.body);
    
    if (req.body.type === 'reply') {
      console.log("Replying now:", req.body);
  
      try {
          const parentComment = await CommentModel.findOneAndUpdate(
              { _id: req.body.parentId }, 
              {
                  $push: { 
                      replies: {
                          repliedTo: req.body.repliedTo ? new mongoose.Types.ObjectId(req.body.repliedTo) : null,
                          userid: userData._id,
                          textContent: req.body.textContent, 
                          parentId: req.body.parentId,
                          createdAt: new Date() 
                      }
                  }
              },
              { new: true }
          );
  
          if (!parentComment) {
              return res.status(404).json({ success: false, message: "Parent comment not found" });
          }
  
          res.status(200).json({ success: true, message: "Reply added successfully", updatedComment: parentComment });
      } catch (error) {
          console.error("Error adding reply:", error);
          res.status(500).json({ success: false, message: "Failed to add reply" });
      }
  }
  

    else{
    const comment=new CommentModel({...req.body,userid:userData._id});
    try{
        let updatedComment=(await comment.save());
        updatedComment = {
          ...updatedComment.toObject(), 
          userid: {
              dp: userData.dp,
              _id: userData._id,
              username: userData.username,
              name: userData.name
          }
      };
        res.status(200).json({response:"Comment Added",updatedData:updatedComment});
    }catch(e){
        console.log(e);
        res.status(400).json(response("Error adding comment"));
    }
    }  
}


exports.LoadComment=async (req,res)=>{
    const comments=await CommentModel.find({parentId:req.body.parentId,parentType:req.body.parentType}).populate("userid","_id username dp").lean();
    if(comments){
        res.status(200).json(response(comments));
    }
    else{
        res.status(201).json(response("No Comments yet"));
    }
    
}



exports.LoadPost = async (req, res) => {
    try {
        const userId = req.user?._id; 
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        let posts = null;

        if (req.params.id) {
            posts = await PostModel.findById(req.params.id)
                .populate('userid', 'name _id username dp')
                .lean();
            if (posts) {
                posts.isLiked = posts.likedBy.some(id => id.toString() === userId);
                posts.likeCount=posts.likedBy.length();
                delete posts.likedBy;
              }
        } else {
            posts = await PostModel.find({})
                .populate('userid', 'name _id username dp')
                .lean();

                posts = posts.map(post => {
                  post.isLiked = post.likedBy?.some(id => id.toString() === userId);
                  post.likeCount=post.likedBy.length;
                  delete post.likedBy; 
                  return post;
              });
        }

        if (posts) {
            return res.status(200).json(posts);
        } else {
            return res.status(204).json({ message: "No Posts Available" });
        }
    } catch (error) {
        console.error("Error loading posts:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
