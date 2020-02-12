const mongoose = require('mongoose')


const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscription: {
        type: String,
        required: true,
        unique: true
    },
    organizations: {
        type: [],
        required: true,
        unique: true
    }
})