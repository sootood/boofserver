const express = require('express')
const {login,signup, refreshToken} = require('./AutorizationController')
const router = express.Router()
const {APIName} = require('../../assets/Constant')


router.route(APIName.LOGIN).post(login)
router.route(APIName.SIGNUP).post(signup)

router.route(APIName.REFRESHTOKEN).post(refreshToken)

module.exports=router
