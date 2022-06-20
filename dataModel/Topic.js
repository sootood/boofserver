const {v4: uuidv4} = require('uuid');
let users = require('../db/users.json')
let types = require('../db/types.json')
let projects = require('../db/project.json')

function _getUserId(token) {
    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === token)
    return index !== -1 ?
        users[index].id : null
}
function _getType(typeID) {
    const index = types.findIndex(value => value.id === Number( typeID))
    return index !== -1 ?
        types[index].name : null
}
function _getProject(cmpId) {
    const index = projects.findIndex(value => value.guid === Number( cmpId))
    return index !== -1 ?
        types[index].id : null
}

class Topic {

    constructor(body,token) {
        this.guid = uuidv4()
        this.description = body.description
        this.title = body.title
        this.token= token
        this.type=body.typeID
        this.cmpId =body.project_ID
        this.isPublic= body.isPublic

    }


    getTopic() {
        if (this.title && this.type)
        return {
            guid: this.guid,
            title: this.title,
            description: this.description,
            createdTime: new Date().getTime(),
            owner: _getUserId(this.token),
            publishingStatus:'approving',
            topicStatus:-1,
            vote:0,
            type:_getType(this.type),
            project:_getProject(this.cmpId),
            timeline:[new Date().getTime()],
            isPublic:this.isPublic

        }
        else if (this.title){
            return  'type is required'
        } else{
            return  'title is required'

        }
    }


}

module.exports = Topic
