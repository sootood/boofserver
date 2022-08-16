const  express = require('express')
const {getCmnt,createNewCmnt} = require("./CommentController");
const {APIName} = require('../../../assets/Constant')

const router = express.Router({mergeParams: true})

router.route(APIName.MAIN).get(getCmnt).post(createNewCmnt)

module.exports =router
