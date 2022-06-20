const {v4: uuidv4} = require('uuid');
let users = require('../db/users.json')

function _getUserId(token) {
    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === token)
    return index !== -1 ?
        users[index].id : null
}

class Project {

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
            owner: _getUserId(this.token)
        }
    }


}

module.exports = Project
