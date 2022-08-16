const Response = require('../../../dataModel/ResponseDataModel')
const CommentController = require('./CommentDataModel')
const Strings = require('../../../assets/Strings')
const comments = require('../../../db/comments.json')
const {writeItemOnFile} = require('../../../globalFunction/db')
const  path = require('path')


const getCmnt = (req, res)=>{

    try{

        const{topicID}=req.params
        const filteredCmnts= comments.filter(value=> value.topicId === topicID)
        if (filteredCmnts.length>0)
            res.status(200).send(new Response(200,"", filteredCmnts).getListResponse())
        else
            res.status(200).send(new Response(200,"", []).getListResponse())


    }catch (e) {
        res.status(500).send(new Response(500,Strings.ServerError).getResponse())

    }


}


const createNewCmnt= async (req,res)=>{

    try{
        const {text}= req.body
        const {topicID}= req.params
        if (text){
            const newCmnt = new CommentController(text,topicID,req.headers.token)
            await  writeItemOnFile(`${path.resolve()}/db/comments.json`,newCmnt.getDBVersionComment())
            res.status(201).send(new Response(201," comment created", newCmnt.getComment()).getResponse())

        }else
            res.status(404).send(new Response(404," you cant crete empty comment ").getResponse())


    }catch (e) {
        console.error(e)

        res.status(500).send(new Response(500,Strings.ServerError).getResponse())
    }

}

module.exports={createNewCmnt,getCmnt}
