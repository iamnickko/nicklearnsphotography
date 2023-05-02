const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
const fs = require('fs')

// GET all blogs
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1})
    res.status(200).json(blogs)
}


// GET a single blog
const getBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No such blog exists"})
    }
    const blog = await Blog.findOne({_id: id})
    if (!blog) {
        return res.status(404).json({error: "No such blog exists"})
    }
    res.status(200).json(blog)
}

// CREATE a new blog
const createBlog = async (req, res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
   

    const { title, summary, catalogue } = req.body
    try {
        const blog = await Blog.create({ title, summary, catalogue, image: newPath })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// DELETE a blog
const deleteBlog = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"})
    }
    const blog = await Blog.findOneAndDelete({_id: id})
    fs.unlink(blog.image, (err) => {
        if (err) throw err
    })
    if (!blog) {
        return res.status(400).json({erorr: "No such blog exists"})
    }
    res.status(200).json(blog)
}


// UPDATE a blog
const updateBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"})
    }
    const blog = await Blog.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})
    if (!blog) {
        return res.status(400).json({error: "No such blog exists"})
    }
    res.status(200).json(blog)
}



module.exports = { 
    getAllBlogs, 
    getBlog, 
    createBlog,
    deleteBlog,
    updateBlog
 }