const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    title:{
        type:String,
        require:true
    },
     content: {
      type: String,
      required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},  { timestamps: true })

BlogSchema.index({content:'text'})

const BlogModel = mongoose.model('Blog',BlogSchema)

module.exports = BlogModel;