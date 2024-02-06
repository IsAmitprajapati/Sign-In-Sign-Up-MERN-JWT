const userModel = require("../model/user.model")

async function userProfile(req,res){
    try{
       console.log("userId - userprofile",req.userId)

       const user = await userModel.findById(req.userId).select("-password")

       res.status(200).json({
            message : "user details",
            data : user,
            error : false,
            success : true,
       })

    }catch(err){
        res.status(500).json({
            message : err,
            error : true,
            success : false
        })
    }

}

module.exports = userProfile