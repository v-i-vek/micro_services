

const authenticateReq = (req,res,next)=>{
    try {
        const userId = req.headers['x-user-id']
        if(!userId){
            return res.status(401).json({message:false,message:'Authencation required! Please login to continue'})
        }
        req.user = {userId}
        next()
    } catch (error) {
        throw error
    }
}

module.exports = { authenticateReq };