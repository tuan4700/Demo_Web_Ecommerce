const Products = require('../models/productModel');

// Filter, sorting and paginating
class APIFeatures {
    constructor(query, querystring) {
        this.query = query;
        this.querystring = querystring;
    }

    filter(){
        // querystring = req.query
        const queryObject = {...this.querystring};

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(excludeField => delete(queryObject[excludeField]));

        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));

        return this;
    };

    sorting(){
        if(this.querystring.sort) {
            const sortBy = this.querystring.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    };

    paginating(){
        // page location want to see
        const page = this.querystring.page * 1 || 1;
        // Products limit in 1 page
        const limit = this.querystring.limit * 1 || 9;
        // jump to the page want to see
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    };
}


const productController = {
    // [GET] /api/products
    async getProducts(req, res) {
        try {
            const features = new APIFeatures(Products.find(), req.query)
                .filter()
                .sorting()
                .paginating();
            const products = await features.query;

            res.json({
                status: 'successful',
                result: products.length,
                products: products
            });
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [POST] /api/products
    async createProducts(req, res) {
        try {
            const {checked, sold, ...dataFieldProduct} = req.body;
            if(!dataFieldProduct.image) return res.status(400).json({message: "No image uploaded"});

            const product = await Products.findOne({product_id: dataFieldProduct.product_id});
            if(product) return res.status(400).json({message: "This product already exists"});

            const newProduct = new Products ({
                ...dataFieldProduct,
                title: dataFieldProduct.title.toLowerCase()
            })
            await newProduct.save();

            res.json({message: "Created product successful"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [DELETE] /api/delete_product/:id
    async deleteProducts(req, res) {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({message: "Deleted this product."});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },

    // [PUT] /api/edit_product/:id
    async updateProducts(req, res) {
        try {
            const {product_id, checked, sold, ...dataFieldProduct} = req.body;
            if(!dataFieldProduct.image) return res.status(400).json({message: "No image uploaded."});

            await Products.findByIdAndUpdate(req.params.id, {
                ...dataFieldProduct,
                title: dataFieldProduct.title.toLowerCase()
            })

            res.json({message: "Updated this product successful"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
};

module.exports = productController;