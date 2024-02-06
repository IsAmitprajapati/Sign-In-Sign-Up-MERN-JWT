const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    }
    catch(err){
        console.log("Error Mongoose-",err)
    }
}

module.exports = connectDB