const { uploadFileToS3 } = require("../service/s3Client.service")
const  MediaModel  = require("../model/Media")

const addFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const { originalname, mimetype, buffer } = req.file;
        const userId = req.user.userId;
        const currenttime = Math.ceil(Date.now() / 1000)

        const fileName = `${userId}-${currenttime}-${originalname}`;

        const objectUrl = await uploadFileToS3(req.file, fileName)

        await MediaModel.create({ user: userId, mimeType: mimetype, originalName: originalname, url: objectUrl })

        return res.status(200).json({
            success: true,
            message: "File Uploaded successfully",
            fileDetails: {
                name: originalname,
                type: mimetype,
                size: buffer.length
            }
        });
    } catch (error) {
        console.error("Error in addFile:", error);
        return res.status(500).json({
            success: false,
            message: "Error processing file upload",
            error: error.message
        });
    }
}

module.exports = { addFile }