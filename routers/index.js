const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const uploadRouter = require('./upload');
const productRouter = require('./productRouter');

function route(app) {
    app.use('/user', userRouter);
    app.use('/api', categoryRouter);
    app.use('/api', uploadRouter);
    app.use('/api', productRouter);
}

module.exports = route;