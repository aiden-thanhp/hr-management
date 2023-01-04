const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    description: {
        type: String, 
        required: [true, 'Report description required']
    },
    report: { type: refType, ref: "Report" }
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema, "Comment");

module.exports = Comment;