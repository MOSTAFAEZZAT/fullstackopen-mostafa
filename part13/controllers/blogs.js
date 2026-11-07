const express = require('express')
const { Blog, User } = require('../models')
const { Model } = require('sequelize')
const router = express.Router()   
const { Op } = require('sequelize');


const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res, next) => {
    try {

    let where = {};
    if(req.query.search){
            where.title = {[Op.substring]: req.query.search}; 
            where.author = {[Op.substring]: req.query.search};
    }
    const blogs = await Blog.findAll({ order : [['likes', 'DESC']], where, include: { model: User, attributes: ['name'] } })
    res.json(blogs)
} catch (error) {
    next(error)
    }
})

router.post('/',  async (req, res, next ) => {
    try {
    const user = await User.findByPk(req.decodedToken.id);

    const blog = await Blog.create({ ...req.body, userId: user.id }); 
    res.status(201).json(blog)
    } catch (error) {
    next(error)
    }
})

router.get('/authors', async (req, res, next) => {
    try {
        const authors = await Blog.findAll({ attributes: ['author', 'likes', 'title'], order: [['likes', 'DESC']] });
        res.json(authors);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', blogFinder, (req, res) => {
    try {
    const blog = req.blog
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).json({ error: 'Blog not found' })
    }
} catch (error) {
    next(error)
}
})

router.delete("/:id", blogFinder, async (req, res, next) => {
    try {
        const blog = req.blog;    
        await blog.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
})


router.put("/:id", blogFinder, async (req, res, next) =>{

    try {
        const blog = req.blog;
        if(blog){
            blog.likes = req.body.likes;
            await blog.save();
            res.json(blog);
        } 
    }catch (error) {
        next(error)
    }
})

router.get('/authors', async (req, res, next) => {
    try {
        const authors = await Blog.findAll( { attributes: ['author', 'likes', 'title'], order: [['likes', 'DESC']] } );
        res.json(authors);
    } catch (error) {
        next(error)
    }
});

module.exports = router






