const express = require('express')
const { Blog, User } = require('../models')
const { Model } = require('sequelize')
const authorRouter = express.Router()   
const { Op } = require('sequelize');
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}
 
authorRouter.get('/', async (req, res, next) => {
    try {
        const authors = await Blog.findAll( { attributes: ['author', 'likes', 'title'], order: [['likes', 'DESC']] } );
        res.json(authors);
    } catch (error) {
        next(error)
    }
});

module.exports = authorRouter