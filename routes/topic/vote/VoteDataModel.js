
class VoteDataModel {

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
module.exports= VoteDataModel
