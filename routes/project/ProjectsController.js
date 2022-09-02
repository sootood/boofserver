const projects = require('../../db/project.json')
const Project = require('./ProjectDataModel')
const Response = require('../../response/ResponseDataModel')
const {getUser} = require("../../helper/Functions");
const Strings= require('../../assets/Strings')

const getProjects = (req, res) => {

    let response = new Response(200, "", projects)
    const {isMin} = req.query
    const {token} = req.headers

    if (isMin && token){
        const userId = getUser(token).id
        if(userId!==undefined) {
            const list = projects.filter(value => value.ownerId === userId)
            response = new Response(200, "", list)
        }
    }
    res.status(200).send(response.getListResponse())

}

const createProject = async (req, res) => {
    try {
        const {
            description,
            title,
        } = req.body
        if (title) {
            const response = new Response(201, Strings.newProject, new Project(title, description, req.headers.token).getProject())
            res.status(201).send(response.getResponse())
        }else
            res.status(404).send(new Response(400,Strings.titleRequire).getResponse())

    } catch (e) {
        res.status(500).send("Server  Error")
        throw(e)
    }


}


module.exports = {
    getProjects,
    createProject
}
