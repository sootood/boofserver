const express = require('express')
const {login,signup} = require('./AutorizationController')
const router = express.Router()
const {APIName} = require('../../assets/Constant')


router.route(APIName.LOGIN).post(login)
router.route(APIName.SIGNUP).post(signup)


module.exports=router
