const {v4: uuidv4}= require('uuid')
const {getUser} = require('../globalFunction/Functions')
class Comment {

    constructor(text, topicId, token) {

        this.text= text
        this.topicId= topicId
        this.token= token

    }

    getComment() {
        return {
            id: uuidv4(),
            owner: getUser(this.token),
            text: this.text,
            createdTime: new Date().getTime(),

        }
    }

        getDBVersionComment()
        {
            return {
                id: uuidv4(),
                owner: getUser(this.token),
                text: this.text,
                createdTime: new Date().getTime(),
                topicId: this.topicId

            }
        }


}
module.exports= Comment
