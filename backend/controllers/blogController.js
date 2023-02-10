const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');
const Blog = require('../models/blogModel');

// Create Blog

const postBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  // Validation
  if (!title || !description || !category) {
    res.status(400);
    throw new Error('Please fill in all fields!');
  }

  // Handle Image Upload
  let fileData = {};
  if (req.body.image) {
    // Save Image to cloudinary
    let uploadedFile;

    try {
      uploadedFile = await cloudinary.uploader.upload(req.body.image, {
        folder: 'Blog-Post',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Image could not be uploaded');
    }

    fileData = {
      public_id: uploadedFile.public_id,
      url: uploadedFile.secure_url,
    };
  }

  // Create Blog
  const blog = await Blog.create({
    author: req.user.id,
    title,
    description,
    category,
    image: fileData,
  });

  res.status(201).json({
    success: true,
    blog,
  });
});

// Get All Blog
const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate('author', ['name', 'avataar', 'bio'])
    .sort('-createdAt');

  const categories = await Blog.find().distinct('category');

  res.status(200).json({
    success: true,
    blogCounts: blogs.length,
    blogs,
    categories,
  });
});

// Get All Blog
const getBlogDetails = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', [
    'avataar',
    'bio',
    'name',
  ]);

  res.status(200).json({
    success: true,
    blog,
  });
});

// Get All Blogs created by author
const myBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id })
    .populate('author', ['avataar', 'bio', 'name'])
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    blogCounts: blogs.length,
    blogs,
  });
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found!');
  }

  // Match Blog to its author
  if (blog.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }

  if (req.body.image !== undefined) {
    await cloudinary.uploader.destroy(blog.image.public_id, {
      folder: 'Blog-Post',
    });
  }

  // Handle Image Upload
  let fileData = {};
  if (req.body.image) {
    // Save Image to cloudinary
    let uploadedFile;

    try {
      uploadedFile = await cloudinary.uploader.upload(req.body.image, {
        folder: 'Blog-Post',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Image could not be uploaded');
    }

    fileData = {
      public_id: uploadedFile.public_id,
      url: uploadedFile.secure_url,
    };
  }

  // Update Blogs
  const updateBlog = await Blog.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      description,
      category,
      image: Object.keys(fileData).length === 0 ? blog?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    updateBlog,
  });
});

// Delete Blogs
const deleteMyBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  // If Blog doesn't exists
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found!');
  }

  if (blog.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }

  await cloudinary.uploader.destroy(blog.image.public_id, {
    folder: 'Blog-Post',
  });

  await blog.remove();
  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
  });
});

module.exports = {
  postBlog,
  getAllBlog,
  getBlogDetails,
  myBlogs,
  updateBlog,
  deleteMyBlog,
};
