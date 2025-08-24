const userModel = require('../Models/user')
const { createToken } = require('../utils/generateToken')


const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await userModel.findOne({ $or: [{ username }, { email }] })
        if (user) {
            return res.status(400).json({ message: "User Already Exist" })
        }

        user = new userModel({ username, email, password })
        await user.save()

        return res.status(200).json({ message: 'user added successfully' })
    } catch (error) {
        console.log("Error ", error)
        throw new Error(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userModel.findOne({ username: userName })
        console.log("user  ", user)
        if (!user) {
            return res.status(400).json({ message: "Incorrect UserName or Password" })
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) return res.status(400).json({ message: "Incorrect dafUserName or Password" })
        const { accessToken, refreshToken } = await createToken(user)
        return res.status(200).json({ message: "success", data: { accessToken, refreshToken } })


    } catch (error) {
        throw error
    }
}

module.exports = { addUser, loginUser }