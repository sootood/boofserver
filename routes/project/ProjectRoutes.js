const express = require('express')
const  router =  express.Router()
const {getProjects, createProject} = require('./ProjectsController')
const {APIName} =require('../../assets/Constant')
router.route(APIName.ALLPROJECT).get(getProjects)
router.route(APIName.CREATEPROJECT).post(createProject)

module.exports = router
