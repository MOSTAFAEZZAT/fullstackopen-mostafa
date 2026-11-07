const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const { Blog } = require('../models');
const { Op } = require('sequelize');


userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({  include: Blog});
        res.json(users);
    } catch (error) {

        next(error);
    }
});

userRouter.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {include: Blog});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

userRouter.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, name} = req.body

        if(!name){
            res.status(400).json({error: "name and username can't be empty"})
        }
        
        if( name.trim() === "" || username.trim() === "" ){
            res.status(400).json({error: "name and username can't be empty"})
        }

        const user = await User.create(req.body);   
        const tokenUser = {
            id: user.id,
            username: user.username,
        };
        const tokenSecret = "mysecretkey";  
        const token = jsonwebtoken.sign(tokenUser,  tokenSecret);

        res.status(201).json({user: user , token});
    } catch (error) {
        console.log(error)
        next(error);
    }   
});

userRouter.put('/:id', async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(user){
            user.username = req.body.username;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = { userRouter };