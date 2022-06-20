const {readFileG} = require('../db')
const users = require('../../db/users.json')

const isLoggedInUser = async (req,res,next)=>{

    const loggedInUsers = users.filter(value => 'token' in value)
    const index = loggedInUsers.findIndex(value => value.token === req.headers.token)

   index!== -1 ? next() : res.status(401).send({message:'UNAUTHORIZED ERROR'})

}
const isAdminLoggedIn = async (req,res,next)=>{

    const loggedInUsers = users.filter(value => 'token' in value && value.isAdmin ===true)
    const index = loggedInUsers.findIndex(value => value.token === req.headers.token)

    index!== -1 ? next() : res.status(403).send({message:'you cant access to this part'})

}

module.exports={isLoggedInUser,isAdminLoggedIn}
