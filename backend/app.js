const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');


//import routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')

//CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() => console.log(`DB Connected`))
.catch((err) => console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARES

app.use("/api", authRoutes)
app.use("/api", productRoutes)
app.use("/api", categoryRoutes)


//ERROR MIDDLEWARE
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}); 