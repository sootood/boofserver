const  express = require('express')
const {voting} = require("./VoteController");
const {APIName} = require('../../../assets/Constant')

const router = express.Router({mergeParams: true})

router.route(APIName.MAIN).get(voting)

module.exports =router
