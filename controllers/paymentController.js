const Payments = require ('../models/paymentModel');
const Users = require ('../models/userModel');
const Products = require ('../models/productModel');

const paymentController = {
    // [GET] /api/payment
    async getPayments(req, res) {
        try {
            const payments = await Payments.find();
            res.json(payments);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [POST] /api/payment
    async createPayments(req, res) {
        try {
            const user = await Users.findById(req.user.id).select('name email');
            if(!user) return res.status(400).json({message: "User is not exists."});
            const {cart, paymentID, address} = req.body;
            const {_id, name, email} = user
            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })
            res.json({newPayment});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
};

module.exports = paymentController;