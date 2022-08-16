const  express = require('express')
const {subscribeTopics} = require("./SubscribeController");
const {APIName} = require('../../../assets/Constant')

const router = express.Router({mergeParams: true})

router.route(APIName.MAIN).get(subscribeTopics)

module.exports =router
