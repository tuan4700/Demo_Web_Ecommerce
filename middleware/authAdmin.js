const Users = require('../models/userModel');

async function authAdmin(req, res, next) {
    try {
        // Get user information by id
        const user = await Users.findOne({_id: req.user.id});
        if(user.role === 0) return res.status(500).json({message: "Admin resource access denied."});
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = authAdmin;