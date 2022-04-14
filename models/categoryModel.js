const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema (
    {
        name: { type: String, required: true, trim: true, unique: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Categories', categorySchema);