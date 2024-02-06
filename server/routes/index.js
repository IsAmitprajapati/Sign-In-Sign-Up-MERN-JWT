const express = require('express')
const router = express.Router()

const userSignUp = require('../controller/userSignUp')
const userSignin = require('../controller/userSiginIn')
const userProfile = require('../controller/userProfile')
const verifyToken = require('../middlewares/verifyToken')


//router
router.post("/sign-up",userSignUp)
router.post("/sign-in",userSignin)
router.post("/user-details",verifyToken,userProfile)




module.exports = router