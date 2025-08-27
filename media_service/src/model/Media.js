const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    mimeType:{
        type:String,
        require:true
    },
    originalName:{
        type:String,
        require:true
    },
     url: {
      type: String,
      required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},  { timestamps: true })

MediaSchema.index({content:'text'})

const MediaModel = mongoose.model('Media',MediaSchema)

module.exports = MediaModel;