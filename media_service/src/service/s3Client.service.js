const { S3Client, PutObjectCommand, } = require("@aws-sdk/client-s3");
const REGION = process.env.REGION;
const s3Client = new S3Client(
    {
        region: REGION,
        credentials: { accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_ACCESS_KEY }
    }
);


const uploadFileToS3 = async(file, objectKey)=>{
    try {
        const bucketName = process.env.BUCKET_NAME;
        if (!bucketName) {
            throw new Error('BUCKET_NAME environment variable is not set');
        }
        
        const uploadFileParams = {
            Bucket: bucketName,
            Key: objectKey,          // Changed to uppercase K
            Body: file.buffer,       // Use buffer from multer file
            ContentType: file.mimetype // Add content type for proper file handling
        };
        
        console.log("S3 Upload Parameters:", {
            Bucket: uploadFileParams.Bucket,
            Key: uploadFileParams.Key,
            ContentType: uploadFileParams.ContentType,
            BodySize: uploadFileParams.Body.length
        });
        
        const command = new PutObjectCommand(uploadFileParams);
        await s3Client.send(command)
        const objectUrl = `https://${bucketName}.s3.${REGION}.amazonaws.com/${objectKey}`;

        return objectUrl
        
    } catch (error) {
        console.log("Error while executing uploadFileTos3() function \n",error)
        throw error
    }
}

module.exports = { uploadFileToS3 }
