const _ = require('lodash')
class NewsDataModel {

    constructor(ownerId,title) {
        this.ownerId = ownerId
        this.title =title
    }

    setDiscription(des){
        this.description = des
    }

    setImage(image){
        this.description = image
    }

    setTopcId (topicId){
        this.topicId = topicId
    }

    getResponse(){

        const object = {

            ownerId : this.ownerId,
            title : this.title,
            description : this.description,
            topicId : this.topicId,
        }
        return _.omitBy(object,_.isNil)

    }


}
