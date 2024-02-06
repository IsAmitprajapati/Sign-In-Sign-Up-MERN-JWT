const userModel = require("../model/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function userSignin(req,res){
    try{
        const {email , password} = req.body

        if(!email){
            return res.status(400).json({
                message : "Please provide email",
                error : true,
                success : false
            })
        }
        if(!password){
            return res.status(400).json({
                message : "Please provide email",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User not available",
                error : true,
                success : false
            })
        }

        // console.log("user",user)

        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function(err, resBcrypt) {
            // res === true
            if(err){
                return res.status(400).json({
                    message : "Check your password",
                    error : true,
                    success : false
                })
            }

            const payload =  {
                _id : user._id,
                email : user.email
            }


           const token =  jwt.sign(payload,process.env.JWT_SECRET,{ 
                expiresIn : '1h'
            })

            res.status(200).json({
                token : token,
                error : false,
                success : true,
                message : "Login successfully"
            })

        });



    }catch(err){
        res.status(500).json({
            message : err,
            error : true,
            success : false
        })
    }

}

module.exports = userSignin