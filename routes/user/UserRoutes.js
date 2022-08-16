const express= require('express')
const { getUserSubscribed, getUserActivities,getUserProfile, updateUserProfile} = require('./UserController')
const route = express.Router()
const {APIName} = require('../../assets/Constant')

route.route(APIName.PROFILE).put(updateUserProfile)
route.route(APIName.PROFILE).get(getUserProfile)
route.route(APIName.ACTIVITIES).get(getUserActivities)
route.route(APIName.SUBSCRIBED).get(getUserSubscribed)

module.exports= route
