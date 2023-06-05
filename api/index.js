const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
var cookieParser = require('cookie-parser');

const errorHandler = require("./middleware/error")

//MIDDLEWARE 
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended:true
}));
app.use(cookieParser());
app.use(cors());

//errorhandler middleware
app.use(errorHandler);

//import routes

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoute")

//Routes Middleware
app.use("/api",authRoutes );
app.use("/api", postRoutes)
//Databse connectivity

mongoose.set('strictQuery', false);

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,

        })
        console.log(`MongoDB connected: ${con.connection.host}`);
        
    }catch(error){
        console.log(error);
        process.exit(1);

    }
}
connectDB();





//PORT

app.listen(process.env.PORT , () =>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);

});