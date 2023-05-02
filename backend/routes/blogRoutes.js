const express = require('express')
const multer = require('multer')
const uploadMiddleware = multer({ dest: './public/images'})
const requireAuth = require('../middleware/requireAuth')

const { 
    getAllBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
 } = require('../controllers/blogController')
 
const router = express.Router()


// GET all blogs
router.get('/', getAllBlogs)

// GET blog details
router.get('/:id', getBlog)

//  AUTHENTICATION: require authentication for all below routes
router.use(requireAuth)

// CREATE a new blog
router.post('/', uploadMiddleware.single('image'), createBlog)

// DELETE a blog
router.delete('/:id', deleteBlog)

// UPDATE a blog
router.patch('/:id', updateBlog)


module.exports = router