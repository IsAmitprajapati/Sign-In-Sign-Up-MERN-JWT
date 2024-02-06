const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    profilePic : {
        type : String,
        trim : true
    },
},{
    timestamps : true
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel