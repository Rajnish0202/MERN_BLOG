const express = require('express');
const {
  postBlog,
  getAllBlog,
  getMyBlogs,
  updateBlog,
  deleteMyBlog,
  getBlogCategory,
  getBlogDetails,
  myBlogs,
} = require('../controllers/blogController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/allblogs', getAllBlog);
router.get('/', isAuth, myBlogs);
router.get('/:id', getBlogDetails);
router.put('/myblog/:id', isAuth, updateBlog);
router.delete('/myblog/:id', isAuth, deleteMyBlog);
router.post('/postblog', isAuth, postBlog);

module.exports = router;
