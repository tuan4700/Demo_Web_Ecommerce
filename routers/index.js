const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const uploadRouter = require('./upload');
const productRouter = require('./productRouter');
const paymentRouter = require('./paymentRouter');

function route(app) {
    app.use('/user', userRouter);
    app.use('/api', categoryRouter);
    app.use('/api', uploadRouter);
    app.use('/api', productRouter);
    app.use('/api', paymentRouter);
}

module.exports = route;