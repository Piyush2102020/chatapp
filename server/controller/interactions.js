const mongoose = require('mongoose');
const { response } = require('../helperfunctions/misc');
const { CommentModel, PostModel } = require('../model/postModel');

exports.interactions = async (req, res) => {
    try {
        const { id } = req.params;
        const { action, type } = req.body; 
        const user = req.user;

        
        const validActions = ['like', 'dislike', 'comment', 'report'];
        const validTypes = { comment: CommentModel, post: PostModel };

        if (!validActions.includes(action) || !validTypes[type]) {
            return res.status(400).json(response("Invalid action or type. Supported actions: like, dislike, comment, report. Supported types: post, comment"));
        }

        const Model = validTypes[type];
        const objectId = new mongoose.Types.ObjectId(id);

        let update = {};

        if (action === 'like') {
            update = { $addToSet: { likedBy: user._id } };
        } else if (action === 'dislike') {
            update = { $pull: { likedBy: user._id } };
        }  else if (action === 'report') {
            update = { $addToSet: { reportedBy: user._id } };
        }

        const result = await Model.findOneAndUpdate({ _id: objectId }, update, { new: true });

        if (!result) {
            return res.status(404).json(response("Item not found"));
        }

        res.status(200).json(response("Action applied successfully", result));
    } catch (error) {
        console.error(error);
        res.status(500).json(response("Internal server error"));
    }
};
