const express = require('express')
const {getPublishedTopics} = require("./NewsController");
const  router =  express.Router()
const {APIName} =require('../../assets/Constant')

router.route(APIName.PUBLISHEDTOPICS).get(getPublishedTopics)

module.exports = router
