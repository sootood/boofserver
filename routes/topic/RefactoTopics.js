const {GetTopicsWithUser, GetSubscribedTopics, GetFilteredTopics} = require("../../strategy/TopicsStrategy");
const subscribes = require('../../db/subscribes.json')
const {getUser} = require("../../helper/Functions");

//factory

 class RefactoTopics {

    constructor(token) {
        this.token = token

    }

    getTypeOfFactory(queries) {

        const index = queries.index ? queries.index : 3
        const page = queries.page ? queries.page : 1
        delete queries.index
        delete queries.page

        if (queries.hasOwnProperty('isMine')) {

            if (queries.isMine === true || queries.isMine === true.toString()) {
                queries['ownerId'] = getUser(this.token).id
                delete queries.isMine
                return new GetTopicsWithUser(queries,index,page)
            }

        }
        if (queries.hasOwnProperty('isSubscribe')) {


            return new GetSubscribedTopics(queries,index,page,this.token)
        }

        if (this.token)
            return new GetTopicsWithUser(queries,index,page)


        return new GetFilteredTopics(queries,index,page)


    }


}
module.exports = RefactoTopics
