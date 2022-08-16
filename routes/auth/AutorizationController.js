const {v4: uuidv4} = require('uuid');
const path = require('path');

let users = require('../../db/users.json')
const {updateFile} = require('../../globalFunction/db')
const Strings = require('../../assets/Strings')
const Response = require('../../dataModel/ResponseDataModel')

const login = async (req, res) => {




    try {
        if ('password' in req.body && 'mobile' in req.body) {
            const {mobile, password} = req.body

            const user = users.filter(value => value.mobile === mobile)
            if (user.length > 0) {
                let newUsers = [...users]
                let loggedInUser = {}

                if (user[0].password === password) {
                    loggedInUser[0] = {...user[0], 'token': uuidv4(), 'isUser': true}
                    newUsers = users.map(function (value) {

                        if (value.mobile === mobile)
                            return loggedInUser[0]
                        else
                            return value
                    })
                    users = [...newUsers]
                    const role = user[0].isAdmin ? {isAdmin: true} : {isUser: true}
                    await updateFile(`${path.resolve().replace(`\``, '/')}/db/users.json`, [...newUsers])
                    return res.status(200).send(new Response(200, Strings.Success, {
                        mobile: loggedInUser[0].mobile,
                        token: loggedInUser[0].token,
                        ...role
                    }).getResponse())
                } else {
                    return res.status(200).send(new Response(200, Strings.wrongPass).getResponse())
                }

            } else {
                return res.status(409).send(new Response(409, Strings.userNotExist).getResponse())
            }
        } else {
            return res.status(400).send(new Response(400).getResponse())
        }
    } catch (e) {
        throw(e)
    }
}

const signup = (req, res) => {
    if ('password' in req.body && 'mobile' in req.body && 'co_pass' in req.body) {
        const {mobile, password, co_pass} = req.body

        const user = users.filter(value => value.mobile === mobile)
        const biggetsId = Math.max(...users.map(o => o.id))
        if (user.length === 0) {
            delete req.body.co_pass
            users = [...users, {...req.body, isUser: true, id: biggetsId + 1, name: ''}]
            return res.status(201).send(new Response(201, Strings.userCreated).getResponse())


        } else {
            return res.status(400).send(new Response(400, Strings.userduplicated).getResponse())
        }
    } else {
        return res.status(400).send(new Response(400))
    }
}

module.exports = {
    login,
    signup
}
