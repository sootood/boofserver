const projects = require('../db/project.json')
const Project = require('../dataModel/Project')
const Response = require('../dataModel/Response')

const getProjects = (req, res) => {
    const response = new Response(200, "", projects)
    res.status(200).send(response.getListResponse())

}

const createProject = async (req, res) => {
    try {
        const {
            description,
            title,
        } = req.body
        if (title) {
            const response = new Response(201, "created project Successfully", new Project(title, description, req.headers.token).getProject())
            res.status(201).send(response.getResponse())
        }else
            res.status(404).send(new Response(400,"title is required").getResponse())

    } catch (e) {
        res.status(500).send("Server  Error")
        console.log(e)
        throw(e)
    }


}


module.exports = {
    getProjects,
    createProject
}
