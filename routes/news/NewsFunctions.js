const fs = require('fs')
const path = require('path')
const Strings = require("../../assets/Strings");
const Response = require("../../response/ResponseDataModel");

const readPublished = ()=>{

    const published = JSON.parse(fs.readFileSync(`${path.resolve()}/db/news.json`,{encoding:'utf8'}))
   const finalArray = published.map((value)=>{

        const bitmap = fs.readFileSync(`${path.resolve()}/assets/images/${value.picture}`);
        const base64File = new Buffer.from(bitmap).toString('base64');

        return{
            ...value,
            'base64':base64File
        }
    })

    return finalArray

}

class NewsActions {
    constructor() {
    }

    getPublishedTopics(){
        return {
            code:200,
            response:  new Response(200, Strings.Success, readPublished()).getListResponse()
           }
    }
}

module.exports={
    NewsActions
}
