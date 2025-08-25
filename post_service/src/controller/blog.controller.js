const BlogModel = require('../model/Blog')

const addBlog = async(req,res)=>{
    try {
        const{title,content} = req.body;
        await BlogModel.create({user:req.user.userId,title,content})
        return res.status(200).json({success:true,"message":"Blog added successfully"})

    } catch (error) {
        throw error
    }
}

module.exports = {addBlog}