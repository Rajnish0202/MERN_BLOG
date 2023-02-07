const express = require('express');
const {
  postBlog,
  getAllBlog,
  getMyBlogs,
  updateBlog,
  deleteMyBlog,
  getBlogCategory,
  getBlogDetails,
} = require('../controllers/blogController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBlog);
router.get('/:id', getBlogDetails);
router.get('/myblog', isAuth, getMyBlogs);
router.put('/myblog/:id', isAuth, updateBlog);
router.delete('/myblog/:id', isAuth, deleteMyBlog);
router.post('/postblog', isAuth, postBlog);

module.exports = router;
