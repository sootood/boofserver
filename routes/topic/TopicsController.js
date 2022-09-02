const {readFileG, writeItemOnFile, updateFile} = require('../../helper/Functions')
const Response = require('../../response/ResponseDataModel')
const Topic = require('./TopicDataModel')
const topicsController = require('../../db/topics.json')
const subscribes = require('../../db/subscribes.json')
const votes = require('../../db/votes.json')
const TopicStrategyManager = require('../../strategy/TopicsStrategyManager')
const {UpdateTopicStatus, GetFilteredTopics, GetTopicsWithUser, RedesignTopicObject} = require('../../strategy/TopicsStrategy')
const {getUser} = require('../../helper/Functions')
const path = require('path')
const RefactoTopics = require("./RefactoTopics");
const TSM = new TopicStrategyManager()

//chain of responsibiity
// const getTopics = async (req, res) => {
//
//     try {
//         const {token} = req.headers
//         let response = ''
//         const index = req.query.index ? req.query.index : 3
//         const page = req.query.page ? req.query.page : 1
//         const {isMine} = req.query
//         delete req.query.index
//         delete req.query.page
//
//         if (isMine===true || isMine === true.toString()) {
//             req.query['ownerId'] = getUser(token).id
//             delete  req.query.isMine
//         }
//
//
//         let filtered =[]
//         let length = 0
//         if (token) {
//            const topicsWU =  new GetTopicsWithUser(req.query, index, page)
//             topicsWU.execute()
//             filtered = topicsWU.addUserProperty()
//             length = topicsWU.getTotalLength()
//         }else{
//             const filteredTopic = new GetFilteredTopics(req.query, index, page)
//             filtered = filteredTopic.execute()
//             length = filteredTopic.getTotalLength()
//         }
//         const redesinedArray = new RedesignTopicObject(filtered).getUpdatedArray()
//         response = new Response(200, "", redesinedArray,0,length)
//         res.status(200).send(response.getListResponse())
//     } catch (e) {
//         res.status(500).send(new Response(500, "server error" + e).getResponse())
//     }
// }


const getTopics = async (req, res) => {

    try {
        const {token} = req.headers
        const topicFactory = new RefactoTopics(token).getTypeOfFactory(req.query)
        const response = new Response(200, "", topicFactory.execute(), 0, topicFactory.getTotalLength())
        res.status(200).send(response.getListResponse())

    } catch (e) {
        res.status(500).send(new Response(500, "server error" + e).getResponse())
    }
}

const getTopicsById = async (req, res) => {

    try {
        const {topicID} = req.params
        const {token} = req.headers
        const file = JSON.parse(await readFileG('./db/topics.json'))
        const array = file.filter(value => value['guid'] === topicID)
        if (token) {
            const subscribersList = subscribes.filter(value => value.topicId === topicID)
            const voteList = votes.filter(value => value.topicId === topicID)

            if (subscribersList.length !== 0) {
                const userId = getUser(token).id
                const isUserSubscribe = subscribersList[0].subscribers.findIndex(value => value === userId) !== -1
                array[0]['isSubscribe'] = isUserSubscribe
            }
            if (voteList.length !== 0) {
                const userId = getUser(token).id
                const isUserVoted = voteList[0].voters.findIndex(value => value === userId) !== -1
                array[0]['isUserVoted'] = isUserVoted
            }
        }
        res.status(200).send(new Response(200, "", array[0]).getResponse())
    } catch (e) {
        console.log(e)
        res.status(500).send(new Response(500, "server error"))
    }
}

const createTopic = async (req, res) => {
    try {
        const newTopic = new Topic(req.body, req.headers.token)
        if (typeof newTopic.getTopic() == "object") {
            await writeItemOnFile(`${path.resolve()}/db/topics.json`, newTopic.getTopic())
            res.status(201).send(new Response(201, "successfully created", newTopic.getTopic()).getResponse())
        } else
            res.status(400).send(new Response(400, newTopic.getTopic()).getResponse())

    } catch (e) {
        res.status(500).send(new Response(500, "server error").getResponse())
    }
}

const updateTopic = async (req, res) => {
    try {
        const {topicID} = req.params
        const index = topicsController.findIndex(value => value.guid === topicID)
        if (index !== -1) {
            const selectedTopics = topicsController[index]
            const updateTopic = {...selectedTopics, ...req.body}
            topicsController[index] = _.omit(updateTopic, ['isSubscribe', 'isUserVoted'])
            await updateFile(`${path.resolve()}/db/topics.json`, topicsController)
            res.status(200).send(new Response(200, "Updated successfully", updateTopic,).getResponse())

        } else {

            res.status(404).send(new Response(404, "selected topic doent existed ",).getResponse())
        }
    } catch (e) {
        res.status(500).send(new Response(500, "server Error").getResponse())
    }
}

const deleteTopic = async (req, res) => {

    try {
        const {topicID} = req.params
        const index = topicsController.findIndex(value => value.guid === topicID)
        if (index !== -1) {
            const selectedTopics = topicsController[index]
            delete topicsController[index]
            await updateFile(`${path.resolve()}/db/topics.json`, topicsController.filter(value => value !== undefined))
            return res.status(200).send(new Response(200, "delete successfully").getResponse())

        } else {

            return res.status(404).send(new Response(404, "selected topic doent existed ").getResponse())
        }

    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())
    }

}
// using strategy dp
const changeTopiStatus = async (req, res) => {
    try {

        const {topicID} = req.params
        const {flag} = req.query
        if (flag) {
            const changingStatus = new UpdateTopicStatus(topicID, req.headers.token, flag)
            TSM.strategy = changingStatus
            TSM.key = 'topicStatus'
            TSM.topicId = topicID
            const result = await TSM.execute()
            res.status(result.code).send(new Response(result.code, result.message, result.body))
        } else {
            res.status(400).send(new Response(400, "bad request ").getResponse())
        }
    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())
    }
}


module.exports = {
    getTopics, getTopicsById, createTopic, updateTopic, deleteTopic, changeTopiStatus
}
