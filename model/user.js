const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String
     },
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    id: {
        type: String,
        required: true,
        unique: true
    },
    organizations: {
        type: []
    }
})
const Hook = mongoose.model('user_information', userSchema)

module.exports = Hook