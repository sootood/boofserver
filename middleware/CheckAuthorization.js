const users = require('../db/users.json')
const Api = require('../assets/APIs')
const Strings = require('../assets/Strings')
const Response = require('../response/ResponseDataModel')
const jwt = require("jsonwebtoken");
require("dotenv").config();

const url = require('url');



const isLoggedInUser = (req, res, next) => {


    const calledApi = Api.filter(value => {
        const reg = new RegExp(value.pattern)
        return reg.test(req.path)
    })

    if (calledApi.length !== 0) {
        if (calledApi[0].authenticationType.length !== 0) {
            /*
            const user = users.filter(value => value['token'] === req.headers.token && req.headers.token !== undefined)

            if (user.length >0) {
                for (let permission of calledApi[0].authenticationType) {
                    if (user[0][permission] === true)
                        return next()
                }

                return res.status(403).send(new Response(403, Strings.AccessDenied))

            }
            return  res.status(401).send(new Response(401, Strings.AuthorizaionError))
            */
            try {
                const token = req.headers.token.split(" ")[1]
                const userInfo = jwt.verify(token, process.env.SECRETKEY);
                for (let permission of calledApi[0].authenticationType) {
                  if (userInfo[permission] === true) return next();
                }
              } catch (e) {
                if (e.toString().includes("expired"))
                  res.status(403).send(new Response(403,"please refresh your token" ));
                else res.status(401).send(new Response(401, Strings.AuthorizaionError));
              }

        }
        return  next()
    }
    res.status(404).send(new Response(404, Strings.APINotFound))

}


module.exports = {isLoggedInUser}
