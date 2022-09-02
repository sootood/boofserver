const Strings = require('../assets/Strings')

function _getSuitMessage(type, text, path) {
    switch (type) {
        case 200 :
            return Strings.Success;
        case 201:
            return Strings.Created
        case 404:
            return Strings.NotFound
        case 400:
            return Strings.BadReq

    }
}

class ResponseDataModel {


    static createResponeData(code,description,data,path,total){

        const response = new ResponseDataModel(code)
            .setData(data)
            .setPath(path)
            .setTotal(total)
            .setDescription(description)
        return response
    }

    static createErrorResponeData(code,description,data){

        const response = new ResponseDataModel(code)
            .setData(data)
            .setDescription(description)
        return response.getResponse()
    }


    // constructor(code) {
    //     this.data =null
    //     this.description =null
    //     this.code =code
    //     this.path = null
    //     this.total = null
    //
    //     if (ResponseDataModel.instance)
    //         return  ResponseDataModel.instance
    //
    //
    // }
    constructor(...args) {
        this.data = args[2]
        this.description = args[1]
        this.code = args[0]
        this.path=args[3]
        this.total = args[4]

            if (ResponseDataModel.instance)
                return  ResponseDataModel.instance
    }

    setData(data){
        this.data = data
    }

    setPath(path){
        this.path = path
    }
    setTotal(total){
        this.total = data
    }
    setDescription(desc){
        this.description = desc
    }


    getListResponse() {
        return {
            body: {data: this.data, totalCount: this.total},
            code: this.code,
            description: this.description,
            message: _getSuitMessage(this.code),
            timeResponse: new Date().getTime()
        }
    }

    getResponse() {
        return {
            body: this.data,
            code: this.code,
            description: this.description,
            message: _getSuitMessage(this.code, this.description, this.path),
            timeResponse: new Date().getTime()
        }
    }



}

module.exports = ResponseDataModel
