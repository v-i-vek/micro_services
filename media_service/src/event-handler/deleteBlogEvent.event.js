const MediaModel = require("../model/Media");
const { deleteFileFromS3 } = require("../service/s3Client.service");

const handleBlogDeleted = async (content) => {
  try {
    console.log("Event : \n", content);

    const { userId, mediaUrl } = content;
    for (let media of mediaUrl) {
      const blog = await MediaModel.findOneAndDelete({
        $and:[
            {_id:media.blogId},
            {user:userId}
        ],
      });
      await deleteFileFromS3(blog.s3ObjectKey);
    }
    return "success";
  } catch (error) {
    console.log("Error while exeucting handleBlogDeleted \n", error);
    throw error;
  }
};

module.exports = { handleBlogDeleted };
