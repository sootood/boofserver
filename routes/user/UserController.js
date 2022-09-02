const users = require('../../db/users.json')
const subscribe = require('../../db/subscribes.json')
const topics = require('../../db/topics.json')
const projects = require('../../db/project.json')
const activites = require('../../db/activities.json')
const Response = require('../../response/ResponseDataModel')
const {updateFile,getUser} = require("../../helper/Functions");
const path = require('path')


const getUserActivities = (req, res) => {
try{
    const myactivity = activites.filter(value => value.ownerId === getUser( req.headers.token).id)

   const result= myactivity.map(value => {
       const projectName= projects.filter(v=> v.guid === value.projectId)
       const topicName= topics.filter(v=> v.guid === value.toipcId)
        return{
            ...value, projectName:projectName[0]?.title, topicName:topicName[0]?.title
        }
    })
        return res.send(new Response(200, "suuccess", result).getListResponse())
}catch (e) {
    throw (e)
}


}

const getUserSubscribed = (req, res) => {

    try {
         const discribedArrya=[]
        const id = getUser(req.headers.token).id
        for (const item of subscribe) {
            if (item.subscribers.includes(id)){
                discribedArrya.push(topics.filter(value=> value.guid === item.topicId)[0])
            }
        }
        return res.status(200).send(new Response(200, "suuccess", discribedArrya).getListResponse())
    } catch (e) {
        throw (e)
    }

}


const getUserProfile = (req, res) => {
    try {
        const me = users.filter(value => value.token === req.headers.token)
        if (me.length !== 0)
            return res.send(new Response(200, "suuccess", me[0]).getResponse())

    } catch (e) {
        throw (e)
    }
}

const updateUserProfile = async(req, res) => {
    try {
        const me = users.findIndex(value => value.token === req.headers.token)
        const userArray  = [...users]
        if (me !== -1){

           const item = {...userArray[me], ...req.body}
           userArray[me] = item

           await  updateFile(`${path.resolve()}/db/users.json`,userArray )
            return res.send(new Response(200, "suuccess", item).getResponse())
        }else{
            return res.send(new Response(404, "user not found").getResponse())

        }


    } catch (e) {
        throw (e)
    }
}

module.exports = {
    getUserProfile, getUserSubscribed, getUserActivities,updateUserProfile
}
