let votes = require('../db/votes.json')
let topics = require('../db/topics.json')
const {getUser} = require('../globalFunction/Functions')
const {writeItemOnFile, updateFile} = require('../globalFunction/db')
const path = require('path')
const Vote = require('../dataModel/Vote')
const Response = require('../dataModel/Response')
const status = require('../db/status.json')

class UpdateVote {

    constructor(topicId, token) {
        this.topicId = topicId
        const id = token ? getUser(token).id : undefined
        this.id = id
    }

    async action() {
        try {
            const index = votes.findIndex(value => value.topicId === this.topicId)
            if (index !== -1) {
                const userIndex = (votes[index].voters.findIndex(value => value === this.id))
                if (userIndex !== -1) {
                    delete votes[index].voters[userIndex]
                    votes[index].voters = votes[index].voters.filter(value => value !== undefined)
                } else {
                    votes[index].voters = [...votes[index].voters, this.id]
                }
                await updateFile(`${path.resolve()}/db/votes.json`, votes)

                return new Response(200, userIndex === -1 ? "user voe this topic" : "user unvoted", votes[index].voters.length).getResponse()
            } else {
                const vote = new Vote(this.topicId, this.id).getVote()
                await writeItemOnFile(`${path.resolve()}/db/votes.json`, vote)
                return new Response(201, "first vote",).getResponse()
            }
        } catch (e) {
            throw(e)
        }

    }
}

class CreteComment {
    action() {

    }
}

class UpdateTopicStatus {
    constructor(topicId, token, flag) {
        this.topicId = topicId
        const id = getUser(token).id
        this.id = id
        this.flag = flag
    }

    action() {
        const flagName = status.filter(value => value.id === Number(this.flag))
        if (flagName.length > 0)
            return new Response(200, "", flagName[0].name).getResponse()
        else
            return new Response(400).getResponse()
    }

}

class UpdatePublishingStatus {
    action() {
    }
}

class UpdateTopicProperty {
    constructor(topicId, key, data) {
        this.topicId = topicId
        this.key = key
        this.data = data
    }


    async action() {

        try {
            const index = topics.findIndex(value => value.guid === this.topicId)
            if (index !== -1) {
                const selectedTopics = topics[index]
                selectedTopics[this.key] = this.data
                topics[index] = selectedTopics
                await updateFile(`${path.resolve()}/db/topics.json`, topics)
                return new Response(200, "", selectedTopics).getResponse()
            } else {
                return new Response(404, "element not found").getResponse()
            }
        } catch (e) {
            throw(e)
        }
    }


}

module.exports = {
    UpdateVote, UpdateTopicProperty, UpdateTopicStatus
}
