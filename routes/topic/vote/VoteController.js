
const {UpdateVote} = require("../../../strategy/TopicsStrategy");
const TopicStrategyManager = require('../../../strategy/TopicsStrategyManager')
const Response = require('../../../dataModel/ResponseDataModel')
const {getTopicsById} = require("../TopicsController");

const TSM = new TopicStrategyManager()

// using strategy dp
const voting = async (req, res) => {

    try {
        const {token} = req.headers

        const TS = new UpdateVote(req.params.topicID, req.headers.token)
        TSM.strategy = TS
        TSM.key = 'vote'
        TSM.topicId = req.params.topicID
        TSM.token = token
        const result = await TSM.execute()
        res.status(result.code).send(new Response(result.code, result.message, result.body))

    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())

    }
}
module.exports={
    voting
}
