const {v4: uuidv4} = require('uuid');
let users = require('../../db/users.json')
const {getUser} = require("../../helper/Functions");
function _getUserId(token) {
    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === token)
    return index !== -1 ?
        users[index].id : null
}

class ProjectDataModel {

    constructor(title, description, token) {
        this.guid = uuidv4()
        this.token = token
        this.description = description
        this.title = title


    }


    getProject() {

        return {
            guid: this.guid,
            title: this.title,
            description: this.description,
            createdTime: new Date().getTime(),
            owner: getUser(this.token).id
        }
    }


}

module.exports = ProjectDataModel
