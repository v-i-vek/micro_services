const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
    expiresAt:{
        type:Date,
        require:true
    }
},{timeStamps:true})

const refreshTokenModel = mongoose.model('refreshToken',refreshTokenSchema)

module.exports = refreshTokenModel