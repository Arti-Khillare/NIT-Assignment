const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName : {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type : String, 
        required : true,
        trim : true
    },
    totalCount: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{timestamps : true})

module.exports = mongoose.model("Category", categorySchema)