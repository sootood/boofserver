const {readFileG, writeItemOnFile, updateFile} = require('../globalFunction/db')
const Response = require('../dataModel/Response')
const Topic = require('../dataModel/Topic')
const topics = require('../db/topics.json')
const TopicStrategyManager = require('../strategy/TopicsStrategyManager')
const {UpdateVote, UpdateTopicStatus} = require('../strategy/TopicsStrategy')
const path = require('path')
const TSM = new TopicStrategyManager()

const getTopics = async (req, res) => {
    try {
        const file = await readFileG('./db/topics.json')
        const response = new Response(200, "", JSON.parse(file))
        res.status(200).send(response.getListResponse())
    } catch (e) {
        res.status(500).send("server error")
    }
}

const getTopicsById = async (req, res) => {

    try {
        const {topicID} = req.params
        const file = JSON.parse(await readFileG('./db/topics.json'))
        const array = file.filter(value => value['_id'] === topicID)
        res.status(200).send(new Response(200, "", array).getListResponse())
    } catch (e) {
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
            res.status(400).send(new Response(400, newTopic.getTopic()))


    } catch (e) {
        res.status(500).send(new Response(500, "server error"))
    }
}
const updateTopic = async (req, res) => {
    try {
        const {topicID} = req.params
        const index = topics.findIndex(value => value.guid === topicID)
        if (index !== -1) {
            const selectedTopics = topics[index]
            const updateTopic = {...selectedTopics, ...req.body}
            topics[index] = updateTopic
            await updateFile(`${path.resolve()}/db/topics.json`, topics)
            res.status(200).send(new Response(200, "Updated successfully", updateTopic))

        } else {
            res.status(404).send(new Response(404, "selected topic doent existed "))
        }
    } catch (e) {
        res.status(500).send(new Response(500, "server Error"))
    }
}


const deleteTopic = async (req, res) => {

    try {
        const {topicID} = req.params
        const index = topics.findIndex(value => value.guid === topicID)
        if (index !== -1) {
            const selectedTopics = topics[index]
            delete topics[index]
            await updateFile(`${path.resolve()}/db/topics.json`, topics.filter(value => value !== undefined))
            res.status(204).send(new Response(204, "delete successfully").getResponse())

        } else {
            res.status(404).send(new Response(404, "selected topic doent existed ").getResponse())
        }


    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())
    }

}
// using strategy dp
const voting = async (req, res) => {

    try {

        const TS = new UpdateVote(req.params.topicID, req.headers.token)
        TSM.strategy = TS
        TSM.key = 'vote'
        TSM.topicId = req.params.topicID
        const result = await TSM.execute()
        res.status(result.code).send(new Response(result.code, result.message, result.body))

    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())

    }
}

const changeTopiStatus = async (req, res) => {
    try {

        console.log(req.query)
        const {topicID } = req.params
        const {flag } = req.query
        if (flag) {
            const changingStatus = new UpdateTopicStatus(topicID, req.headers.token, flag)
            TSM.strategy = changingStatus
            TSM.key = 'topicStatus'
            TSM.topicId = topicID
            const result = await TSM.execute()
            res.status(result.code).send(new Response(result.code, result.message, result.body))
        }else{
            res.status(400).send(new Response(400, "bad request ").getResponse())
        }
    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())
    }
}

module.exports = {
    getTopics, getTopicsById, createTopic, updateTopic, deleteTopic, voting, changeTopiStatus
}
