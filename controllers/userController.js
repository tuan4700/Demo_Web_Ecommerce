const Users = require('../models/userModel');
const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {

    // [POST] /user/register
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({email});
            if(user) return res.status(400).json({message: "Email is exists."});

            if(password.length < 6) return res.status(400).json({message: "Password is at least 6 characters"});

            // Password encryption
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser = new Users({
                name,
                email,
                password: passwordHash
            })

            // Save mongodb
            await newUser.save();

            // Create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser.id});
            const refreshtoken = createRefreshToken({id: newUser.id});

            res.cookie('refreshtoken', refreshtoken, { 
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    // [POST] /user/login
    async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({message: "Account does not exists."});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({message: "Password incorrect."})

            // if login successfull, create accesstoken and refreshtoken
            const accesstoken = createAccessToken({id: user.id});
            const refreshtoken = createRefreshToken({id: user.id});

            res.cookie('refreshtoken', refreshtoken, { 
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken});

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    // [GET] /user/logout
    async logout(req, res) {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
            res.json({message: "Logged out"})
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },
    
    // [GET] /user/refresh_token
    refreshToken(req, res) {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({message: "Please login or register!"});

            // verify token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({message: "Please login or register!"});
                const accesstoken = createAccessToken({id: user.id});
                
                res.json({accesstoken});
            })
    
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    // [GET] /user/info
    async getUser(req, res) {
        try {
            const infoUser = await Users.findById(req.user.id).select('-password');
            if(!infoUser) return res.status(400).json({message: "User is not exists."});
            res.json(infoUser);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [PATCH] /user/addcart
    async addCart(req, res) {
        try {
            const user = await Users.findById(req.user.id);
            if(!user) return res.status(400).json({message: "User is not exists."});

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            });

            return res.json({message: "Added to cart."});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [GET] /user/history
    async history(req, res) {
        try {
            const history = await Payments.find({user_id: req.user.id});

            res.json(history);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

function createAccessToken(userId) {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}
function createRefreshToken(userId) {
    return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports = userController;