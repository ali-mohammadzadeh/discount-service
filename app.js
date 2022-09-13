require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const discountsRoutes = require('./routes/discounts');
const responseHelper = require('./app/helpers/responseHelper');
const app = express();

//init default discount
// require('./app/database/redis').then(require("./app/bootstrap"))
require('./app/database/redis')
require('./app/database/rabbitMq')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/discounts', discountsRoutes);


// error handler
app.use(function(err, req, res, next) {
    let resData=responseHelper.error({"message":"connection refused!"},500)
    res.status(resData.code).send(resData.response)
});


const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
module.exports = app;
