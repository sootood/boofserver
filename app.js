
const https = require("https");
const fs = require("fs");
const cors = require('cors');
const express = require('express');
const Oauch = require('express-oauth2-jwt-bearer');

const dotEnv = require('dotenv')
const topics = require('./routes/topic/TopicsRoutes')
const projects = require('./routes/project/ProjectRoutes')
const auth = require('./routes/auth/AutorizationRoutes')
const user = require('./routes/user/UserRoutes')
const {isLoggedInUser} = require('./globalFunction/middleWares/CheckAuthorization')
const {APIName} = require('./assets/Constant')
const logger = require('./globalFunction/Logger')

dotEnv.config()
const app = express()



const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_TOKEN,
    baseURL: 'http://localhost:3001',
    clientID: process.env.CLIENID,
    issuerBaseURL: 'https://dev-qkvnybou.us.auth0.com',

    // routes:{
    //     login:APIName.AUTHMAIN  + APIName.LOGIN
    // }

};

// useing ssl

// https
//     .createServer(
//         {
//             key: fs.readFileSync("./key.pem"),
//             cert: fs.readFileSync("./cert.pem"),
//         },
//         app)
//     .listen(3001, ()=>{
//         console.log('server is runing at port 3001')
//     });


// app.use(cors({
//     'cache-controle': 'private, no-cache'
// }));
// app.use(middleware.decodeToken);

app.use(Oauch.auth(config));


app.use(express.json());
app.use(isLoggedInUser)
app.use(function (req, res, next) {
    res.on('finish', function () {

        switch (res.statusCode) {

            case 404 :
                logger.error(`API : ${req.originalUrl} ${new Date().getTime()} ${res.statusMessage}`)
                break;
            case 200:
            case 201:
                logger.info(`API : ${req.originalUrl} ${new Date().getTime()} ${res.statusMessage}`)
                break;
            case 401 :
            case 403:
                logger.warn(`API : ${req.originalUrl} ${new Date().getTime()} ${res.statusMessage}`)
                break;


        }
    });
    next()
});
app.use(APIName.AUTHMAIN, auth)
// app.use(openId.requiresAuth())
app.use(APIName.TOPICS,openId.requiresAuth(), topics)
app.use(APIName.PROJECT, projects)
app.use(APIName.USER, user)

// if enable ssl comment this part
app.listen(3001, () => {
    console.log('Server is running on 3001')
})
