const {v4: uuidv4}= require('uuid')
const {getUser} = require('../../../helper/Functions')
class SubscribeDataModel {

    constructor( topicId, token) {

        this.topicId= topicId
        this.subscribers= []
        this.token = token

    }
    getSubscribe(){
        return {
            topicId: this.topicId ,
            subscribers:[this.token]
        }
    }




}
module.exports= SubscribeDataModel
