const express = require('express')
const mongoose = require('mongoose')

const HttpError = require('./models/http-error');

const bodyParser = require('body-parser')

const placeRoutes = require('./routes/place-routes')
const userRoutes = require('./routes/user-routes')

const app = express()

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')

    next()
})

app.use('/api/places',placeRoutes)
app.use('/api/users',userRoutes)

mongoose.connect('mongodb+srv://sonivanshu012:wingsss@cluster0.6e0f9.mongodb.net/')
.then(()=>{
    app.listen(3001)
    console.log("Server running on port number 3001")
})
.catch(err =>{
    console.log(err)
})

app.use((req,res,next)=>{
    const error = new HttpError('Could not find the route', 404);
    throw error;
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "Something wrong with the server"})
})


// app.listen(3001);