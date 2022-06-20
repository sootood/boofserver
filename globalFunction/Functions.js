const users = require('../db/users.json')
function getUser(token) {
    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === token)
    return index !== -1 ?
        {name:users[index].name, id:users[index].id, picture:users[index].picture} : {}
}
module.exports= {getUser}
