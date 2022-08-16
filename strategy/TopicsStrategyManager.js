const {GetTopicWithToken} = require("./TopicsStrategy");
const {UpdateTopicProperty} = require('./TopicsStrategy')

class TopicsStrategyManager {

    constructor() {
        this._strategy = null
        this._topicId = null
        this._key = null
        this._token = null
    }


    set strategy(strategy) {
        if (strategy)
            this._strategy = strategy
    }

    set key(key) {
        if (key)
            this._key = key
    }

    set topicId(topicId) {
        if (topicId)
            this._topicId = topicId
    }
    set token(token) {
        if (token)
            this._token = token
    }

    async execute() {
        const res = await this._strategy.action()
        if (res.code !== 404) {
            const TSU = new UpdateTopicProperty(this._topicId, this._key, res.body)
            let resUpdateTopic = await TSU.action()

            if (this._token){
                resUpdateTopic = new GetTopicWithToken(resUpdateTopic.body, this._token)
            }
            return resUpdateTopic
        } else {
        return res
        }

    }

}

module.exports = TopicsStrategyManager
