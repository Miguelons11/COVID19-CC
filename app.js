const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const favicon = require('serve-favicon');
const cors = require('cors');

require('./models/db');


const apiRouter = require('./routes/index');

const app = express();
app.use("/",apiRouter)

app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,PUT,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
})

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', apiRouter);
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;
