const Categories = require('../models/categoryModel');

const categoryController = {
    // [GET] /api/category
    async getCategories(req, res) {
        try {
            const category = await Categories.find();
            res.json(category);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [POST] /api/category
    async createCategory(req, res) {
        try {
            // user have role = 1 --> admin --> can create category
            const {name} = req.body;
            const category = await Categories.findOne({name});
            if(category) return res.status(400).json({message: "This category is already exists."});

            const newCategory = new Categories({name});
            await newCategory.save();

            res.json({message: "Created a category."});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [DELETE] /api/category/id
    async deleteCategory(req, res) {
        try {
            // user have role = 1 --> admin --> can delete category
            await Categories.findByIdAndDelete(req.params.id);
            res.json({message: "Deleted category"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [PUT] /api/category/id
    async updateCategory(req, res) {
        try {
            // user have role = 1 --> admin --> can delete category
            const {name} = req.body;
            await Categories.findByIdAndUpdate(req.params.id, {name});
            res.json({message: "Updated category"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = categoryController;