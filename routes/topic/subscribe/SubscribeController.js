const {subscribeTopic} = require("../../../strategy/TopicsStrategy");
const Response = require('../../../dataModel/ResponseDataModel')
const TopicStrategyManager = require('../../../strategy/TopicsStrategyManager')

const TSM = new TopicStrategyManager()

const subscribeTopics  = async (req,res)=>{

    try {
        const {token} = req.headers
        const TS = new subscribeTopic(req.params.topicID, req.headers.token)
        TSM.strategy = TS
        TSM.key = 'subscribe'
        TSM.topicId = req.params.topicID
        TSM.token = token
        const result = await TSM.execute()
        res.status(result.code).send(new Response(result.code, result.message, result.body))

    } catch (e) {
        res.status(500).send(new Response(500, "server Error ").getResponse())

    }

}
module.exports={subscribeTopics}
