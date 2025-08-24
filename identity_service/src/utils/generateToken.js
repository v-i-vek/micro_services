const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const RefreshTokenModel = require('../Models/refreshToken')

const createToken = async (user) => {
    try {
        const accessToken = await jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' })

        const refreshToken = crypto.randomBytes(40).toString('hex')
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // refresh token expires in 7 days

        await RefreshTokenModel.create({
            token: refreshToken,
            userId: user._id,
            expiresAt,
        });

        return { accessToken, refreshToken }

    } catch (error) {
        throw error
    }
}

module.exports = { createToken }