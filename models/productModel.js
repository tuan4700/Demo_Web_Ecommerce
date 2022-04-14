const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema (
    {
        product_id: { type: String, unique: true, trim: true, require: true },
        title: { type: String, trim: true, require: true },
        price: { type: Number, trim: true, require: true },
        description: { type: String, require: true },
        content: { type: String, require: true },
        image: { type: Object, require: true },
        category: { type: String, require: true },
        checked: { type: Boolean, default: false },
        sold: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Products', productSchema);