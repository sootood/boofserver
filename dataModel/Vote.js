const {v4: uuidv4}= require('uuid')
const {getUser} = require('../globalFunction/Functions')
class Vote {

    constructor( topicId, token) {

        this.topicId= topicId
        this.voters= []
        this.token = token

    }
    getVote(){
        return {
            topicId: this.topicId ,
            voters:[this.token]
        }
    }




}
module.exports= Vote
