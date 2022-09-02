const users = require('../db/users.json')
const {readFile, writeFile} = require('fs/promises')

function getUser(token) {
    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === token)
    return index !== -1 ?
        {name:users[index].name, id:users[index].id, picture:users[index].picture} : {}
}

function getUserById(id) {
    const loggedInUsers = users.filter(value => 'id' in value)
    const index = loggedInUsers.findIndex(value => value.id === id)
    return index !== -1 ?
        {name:users[index].name, id:users[index].id, picture:users[index].picture} : {}
}
async function readFileG(path) {
    try {
        const file = await readFile(path, 'utf8')
        if (file)
            return file
    }catch (e) {
        return  []
    }
}

async function writeItemOnFile(path, item) {
    try {
        const file = await readFile(path, 'utf8')

        if (file){
            const array = [...JSON.parse( file)]
            array.push(item)
            await  writeFile(path,JSON.stringify(array))
        }
    }catch (e) {
        throw(e)
    }
}
async function updateFile(path, data) {
    try {
        const file = await readFile(path, 'utf8')

        if (file){
            await  writeFile(path,JSON.stringify(data))
        }
    }catch (e) {
        throw(e)
    }
}

module.exports= {getUser,getUserById,readFileG,writeItemOnFile, updateFile}
