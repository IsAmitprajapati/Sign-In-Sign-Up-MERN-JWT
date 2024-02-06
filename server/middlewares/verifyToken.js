const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

async function verifyToken(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
            console.log("decode",decode)

            if(err){
                res.status(400).json({
                    message : "Unauthorized access",
                    error : true,
                    success : false
                })
            }

            req.userId = decode?._id

            next()
        })


    
    }catch(err){
        res.status(500).json({
            message : err,
            error : true,
            success : false
        })
    }
}


module.exports = verifyToken