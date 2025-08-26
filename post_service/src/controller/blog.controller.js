const BlogModel = require("../model/Blog");
const {redisClient} = require('../utils/redis.service')
const {invalidateBlog} = require('../utils/redis.service')
const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    await invalidateBlog('blogs:*')
    await BlogModel.create({ user: req.user.userId, title, content });
    return res
      .status(200)
      .json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    throw error;
  }
};
const allBlogs = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = req.params.limit || 10;
    const skip = (page - 1) * limit;
    const cacheKey = `blogs:${page}:${limit}`;
    const data = await redisClient.get(cacheKey);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data,
      });
    }
    const blogs = await BlogModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const result = {
        blogs,
        currentPage:page,
        totalPages:Math.ceil(totalNoOfPost/limit),
        totalBlog:totalNoOfPost
    }
     await redisClient.set(cacheKey, JSON.stringify(result), "EX", 20);
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};

const singleBlog = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = { addBlog, allBlogs, singleBlog };
