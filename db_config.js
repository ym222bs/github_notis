const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const password = process.env.MONGO_PASS
const username = process.env.MONGO_USERNAME

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@mern-stack-qwxuy.mongodb.net/test?retryWrites=true&w=majority`, { 
            useNewUrlParser: true,  
            useUnifiedTopology: true
        })
        
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectToDatabase