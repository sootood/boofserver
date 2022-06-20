const express = require('express');
const topics = require('./router/Topics')
const projects = require('./router/Project')
const auth = require('./router/Autorization')
const user = require('./router/User')
const {isLoggedInUser} = require('./globalFunction/middleWares/CheckAuthorization')

const app = express()

app.use(express.json());
app.use('/api/auth',auth)
app.use('/api/topics', topics)
app.use('/api/project', isLoggedInUser,projects)
// app.use('/user/', isLoggedInUser,user)

app.all('*', (req, res) => {
    res.status(404).send("api not found")
})

app.listen(3001, () => {
    console.log('Server is running on 3001')
})
