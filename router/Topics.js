const express = require('express')
const {getTopics, getTopicsById,createTopic, updateTopic, deleteTopic,voting,changeTopiStatus} = require('../controller/Topics')
const {createNewCmnt,getCmnt} = require('../controller/Comment')
const {isLoggedInUser, isAdminLoggedIn} = require('../globalFunction/middleWares/CheckAuthorization')

const router = express.Router()

router.route('/').get(getTopics)
router.route('/:topicID').get(getTopicsById)
router.route('/:topicID/comment').get(getCmnt)

router.use(isAdminLoggedIn).route('/:topicID/change-status').get(changeTopiStatus)

router.use(isLoggedInUser)
router.route('/:topicID/vote').get(voting)
router.post('/',createTopic)
router.route('/:topicID').put(updateTopic).delete(deleteTopic)
router.route('/:topicID/comment').post(createNewCmnt)



module.exports = router
