const express = require('express')
const  router =  express.Router()
const {getProjects, createProject} = require('../controller/Projects')

router.route('/allProjects').get(getProjects)
router.route('/project').post(createProject)

module.exports = router
