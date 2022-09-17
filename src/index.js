const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route');
require('dotenv').config();

/**
 * creating the seperate variable for express  function
 */
const app = express();

/**
 * it is cross orgin resource sharing package, it is used to specify which
 * orign can access the api
 */
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

/**
 * created variable for port where port will listen on the env.PORT or 3000 port
 */

const PORT = process.env.PORT || 3000;

/**
 * parsing the requested data bodyParse so it will convert into json form
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * connecting the mongodb atlast string to mongodb with mongoose
 */

mongoose.connect('mongodb+srv://ArtiKhillare:jR067NcnClM96Fp1@cluster0.wi9j2.mongodb.net/NIT-Database?retryWrites=true&w=majority')
.then( () => {
    console.log( "MongoDb is successfully connected")
})
.catch( err => {
    console.log(err)
} )

/**
 * handling the router path with express app
 */

app.use('/', route);

/**
 * server app is listning on the port
 */

app.listen(PORT , function () {
    console.log('Express app running on port ' +(PORT));
});