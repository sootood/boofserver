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

    constructor(...args) {
        this.data = args[2]
        this.description = args[1]
        this.code = args[0]
        this.path = args[3]
        this.total = args[4]

        if (ResponseDataModel.instance)
            return  ResponseDataModel.instance


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
