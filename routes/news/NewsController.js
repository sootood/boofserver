const {NewsActions} = require("./NewsFunctions");


const getPublishedTopics =(req,res,next)=>{

    try {
        const NewsObj = new NewsActions()
        const result  = NewsObj.getPublishedTopics()
        return res.status(result.code).send(result.response);
    } catch (e) {
        next(e);
    }


}

module .exports={getPublishedTopics}
