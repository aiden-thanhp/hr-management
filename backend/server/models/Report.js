const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ReportSchema = new Schema({
    title: {
        type: String, 
        required: [true, 'Report title required']
    },
    description: {
        type: String, 
        required: [true, 'Report description required']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed']
    },
    createdBy: { type: refType, ref: "User" },
    comment: [{ type: refType, ref: "Comment" }]
}, {
    timestamps: true
});

const Report = mongoose.model("Report", ReportSchema, "Report");

module.exports = Report;