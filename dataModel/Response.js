
function _getSuitMessage(type) {
    switch (type) {
        case 200 :
            return 'success';

        case 201:
            return 'created'
        case 404:
            return 'not Found'
        case 400:
            return 'bad request'


    }
}

class Response {

    constructor(...args) {
        this.data = args[2]
        this.description = args[1]
        this.code = args[0]

    }


    getListResponse(){
        return {
            body: {data:this.data, totalCount: this.data.length},
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
            message: _getSuitMessage(this.code),
            timeResponse: new Date().getTime()
        }
    }


}

module.exports = Response
