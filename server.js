require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var morgan = require('morgan')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const route = require('./routers/index.js');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
}));

// Routers
route(app);

// Show log
app.use(morgan('combined'));

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})