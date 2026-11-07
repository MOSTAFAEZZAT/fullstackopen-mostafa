const express = require('express')
const User = require('../models/user')

const authRouter = express.Router()
const jsonwebtoken = require('jsonwebtoken');

authRouter.post('/', async (req, res, next) => {
    try {
        const { username , password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }
         const tokenSecret = "mysecretkey";
        const tokenUser = {
            id: user.id,
            username: user.username,
        };
        const token = jsonwebtoken.sign(tokenUser,  tokenSecret);
        res.status(200).json({ user: user , token , status: 'logged-in' });
    } catch (error) {
        next(error);
    }
});

module.exports = { authRouter };
 


