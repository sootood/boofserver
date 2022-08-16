const express = require('express')
const {getTopics, getTopicsById, createTopic, updateTopic, deleteTopic, changeTopiStatus} = require('./TopicsController')
const {APIName} =require('../../assets/Constant')

const comment = require('./comment/CommentRoute')
const subscribe = require('./subscribe/SubscribeRouter')
const vote = require('./vote/VoteRouter')

const router = express.Router({mergeParams: true})

router.route(APIName.MAIN).get(getTopics)
router.route(APIName.DETAILTOPICS).get(getTopicsById)
router.use(APIName.COMMENTTOPICS,comment)



router.use(APIName.SUBSCRIBETOPIC,subscribe)
router.use(APIName.VOTETOPIC,vote)

router.route(APIName.CHANGETOPICSTATUS).get(changeTopiStatus)
router.route(APIName.CREATETOPIC).post(createTopic)
router.route(APIName.DETAILTOPICS).put(updateTopic).delete(deleteTopic)



module.exports = router
