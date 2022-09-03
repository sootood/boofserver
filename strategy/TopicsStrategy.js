
let votes = require('../db/votes.json')
let subscribes = require('../db/subscribes.json')
let topics = require('../db/topics.json')
const {getUser,getUserById,writeItemOnFile, updateFile} = require('../helper/Functions')
const path = require('path')
const Vote = require('../routes/topic/vote/VoteDataModel')
const Subscribe = require('../routes/topic/subscribe/SubscribeDataModel')
const Response = require('../response/ResponseDataModel')
const status = require('../db/status.json')
const fs = require('fs')

const _ = require('lodash');

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

class subscribeTopic {

    constructor(topicId, token) {
        this.topicId = topicId
        const id = token ? getUser(token).id : undefined
        this.id = id
    }

    async action() {
        try {
            const index = subscribes.findIndex(value => value.topicId === this.topicId)
            if (index !== -1) {
                const userIndex = (subscribes[index].subscribers.findIndex(value => value === this.id))
                if (userIndex !== -1) {
                    delete subscribes[index].subscribers[userIndex]
                    subscribes[index].subscribers = subscribes[index].subscribers.filter(value => value !== undefined)
                } else {
                    subscribes[index].subscribers = [...subscribes[index].subscribers, this.id]
                }
                await updateFile(`${path.resolve()}/db/subscribes.json`, subscribes)

                return new Response(200, userIndex === -1 ? "user subscribe this topic" : "user unsubscribe", userIndex === -1).getResponse()
            } else {
                const subscribe = new Subscribe(this.topicId, this.id).getSubscribe()
                await writeItemOnFile(`${path.resolve()}/db/subscribes.json`, subscribe)
                return new Response(201, "first subscriber",).getResponse()
            }
        } catch (e) {
            throw(e)
        }

    }
}



class GetFilteredTopics {

    constructor(queries, index, page) {

        const queryArray = []
        for (let query in queries) {
            query !== 'sortBy' && query !== 'isSubscribe' ?
                queryArray.push({key: query, value: queries[query]}) :
                this.sortedBy = queries[query]
        }


        this.index = index
        this.page = page
        this.total =0
        this.filteredArray = queryArray
    }

    getTotalLength(){

        return this.total
    }

    execute() {
        let rearrangedTopics = new Array(topics.length) 
        rearrangedTopics = [...topics]

        for (let filterItem of this.filteredArray) {
            rearrangedTopics = [...rearrangedTopics].filter(function (value,index) {
                if (filterItem.key in value) {
                    if (typeof value[filterItem.key] === 'number')
                        return value[filterItem.key] === Number(filterItem.value)
                    else
                        return value[filterItem.key].toString().includes(filterItem.value)
                }else{
                }
            })
        }
       

        if (this.sortedBy)
            rearrangedTopics = _.sortBy(rearrangedTopics, this.sortedBy)
        this.total = rearrangedTopics.length

        this.mainArray = [...rearrangedTopics]
        this.array = [...rearrangedTopics].slice((this.page - 1) * (this.index), (this.page * this.index))
       
        const finalArray = []
        for (const item of this.array) {

            const newItem = new GetTopicConvertedImage(item).getTopicBase64Image()
           
            finalArray.push(newItem.body)
        }

       
        return [...finalArray].slice((this.page - 1) * (this.index), (this.page * this.index))

    }


}


//decrorator
class GetTopicsWithUser extends GetFilteredTopics {

    execute() {
        super.execute()
        const finalArray = []
        for (const item of this.array) {

            const newItem = new GetTopicWithToken(item, this._token)
            finalArray.push(newItem.body)
        }
        return  (finalArray)

    }
}

//decrorator
class GetSubscribedTopics extends GetFilteredTopics {


    constructor(queries, index, page, token) {
        super(queries, index, page);
        this.token= token
    }

    execute() {
        super.execute()
        const userId = getUser(this.token).id
        const subscribedTopics = subscribes.filter(value=> {
            const index =   value.subscribers.findIndex(v=> v === userId )
            if (index!==-1)
                return value.topicId
        })
        const finalArray =this.mainArray.filter(value=> {
            for (const item of subscribedTopics) {
                if (value.guid === item.topicId)
                    return value
            }
        })
        this.total = finalArray.length

        return  (finalArray.slice((this.page - 1) * (this.index), (this.page * this.index)))

    }
}


//faced
class GetTopicWithToken {

    constructor(item, token) {
        this._item = item
        this._token = token
        return new Response(200, "",  this.getUpdatedItemByToken()).getResponse()
    }

    getUpdatedItemByToken() {
        const subscribersList = subscribes.filter(value => value.topicId === this._item.guid)
        const voteList = votes.filter(value => value.topicId === this._item.guid)
        const userId = getUser(this._token).id

        if (subscribersList.length !== 0) {

            const isUserSubscribe = subscribersList[0].subscribers.findIndex(value => value === userId) !== -1
            this._item['isSubscribe'] = isUserSubscribe
        } else {
            this._item['isSubscribe'] = false

        }
        if (voteList.length !== 0) {
            const isUserVoted = voteList[0].voters.findIndex(value => value === userId) !== -1
            this._item['isUserVoted'] = isUserVoted
        } else {
            this._item['isUserVoted'] = false

        }
        return this._item
    }


}

class GetTopicConvertedImage {

    constructor(item) {
        this._item = item
        
    }

     getTopicBase64Image() {
       const pic = this._item.picture
       if (pic) {
        const bitmap = fs.readFileSync(`${path.resolve()}/assets/images/${pic}`);
        const base64File = new Buffer.from(bitmap).toString('base64');
       if (base64File) {
        this._item.picture = base64File

       }
       
       }
       return new Response(200, "",  this._item).getResponse()
    }


}




class RedesignTopicObject {

    constructor(array) {
        this._array = [...array]
    }

    getUpdatedArray() {

        const redesinedArray = []
        for (const item of this._array) {

            if (item.hasOwnProperty('ownerId')) {
                const ownerName = getUserById(item.ownerId).name
                item['owner'] = ownerName
                // delete item.ownerId
                redesinedArray.push(_.omit( item, ['ownerId']))
            }else
                redesinedArray.push(item)


        }
        return redesinedArray
    }


}

module.exports = {
    UpdateVote,
    UpdateTopicProperty,
    UpdateTopicStatus,
    subscribeTopic,
    GetFilteredTopics,
    GetTopicsWithUser,
    GetTopicWithToken,RedesignTopicObject,
    GetSubscribedTopics,
    GetTopicConvertedImage
}
