const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema  = mongoose.Schema({
    username:{
        unique:true,
        type:String,
        require:true
    },
    email:{
        unique:true,
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
     createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  })

userSchema.pre('save', async function(next){
  try {
      if(this.isModified('password')){
      console.log("this passowrd ", this.password)
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function(userPassword){
    try {
        return await bcrypt.compare(userPassword, this.password)
    } catch (error) {
        throw error
    }
}

userSchema.index({username:'text'})
const userModel = mongoose.model('user',userSchema)

module.exports = userModel