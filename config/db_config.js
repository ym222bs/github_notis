const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongoURL = process.env.MONGO_URL

const connectToDatabase = async () => {
    console.log(mongoURL)
    try {
        await mongoose.connect(mongoURL, { 
            useNewUrlParser: true,  
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log('connected to db')
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectToDatabase