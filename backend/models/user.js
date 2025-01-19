const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    places:[{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Place'
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Default value if not provided
      },

})
module.exports = mongoose.model('User',userSchema)