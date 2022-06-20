
const {v4: uuidv4} = require('uuid');
let users = require('../db/users.json')
const {updateFile}= require('../globalFunction/db')
var path = require('path');


const login = async (req, res) => {

    try {
        if ('password' in req.body && 'mobile' in req.body) {
            const {mobile, password} = req.body

            const user = users.filter(value => value.mobile === mobile)
            if (user.length > 0) {
                let newUsers = [...users]
                let loggedInUser = {}

                if (user[0].password === password) {
                    loggedInUser[0] = {...user[0], 'token': uuidv4()}
                    newUsers = users.map(function (value) {

                        if (value.mobile === mobile)
                            return loggedInUser[0]
                        else
                            return value
                    })
                    users = [...newUsers]
                    await  updateFile(`${path.resolve().replace(`\``,'/')}/db/users.json`,[...newUsers] )
                    return res.status(200).send({message: 'success', data: {mobile:loggedInUser[0].mobile, token:loggedInUser[0].token }})
                } else {
                    return res.status(200).send({message: 'Wrong password',})
                }

            } else {
                return res.status(404).send('user not found')
            }
        } else {
            return res.status(400).send(' bad request')
        }
    }catch (e) {
        throw(e)
    }
}

const signup = (req, res) => {
    if ('password' in req.body && 'mobile' in req.body && 'co_pass' in req.body) {
        const {mobile, password, co_pass} = req.body

        const user = users.filter(value => value.mobile === mobile)
        if (user.length === 0) {

            users = [...users, req.body]
            return res.status(201).send({message: 'success',})


        } else {
            return res.status(200).send({message: 'A user with same name EXISTED',})
        }
    } else {
        return res.status(400).send(' bad request')
    }
}

module.exports = {
    login,
    signup
}
