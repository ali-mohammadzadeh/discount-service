class responseHelper {

    standardResponse={
        response:{
            data:{
            },
            meta:{
                date:Date.now()
            }
        },
        code:500 //default
    }
    success(data,code){
        return  this.generateResponse(data,code)
    }

    error(data,code){
    return  this.generateResponse(data,code)
    }

    generateResponse(data,code){
        this.standardResponse.response.data=data;
        this.standardResponse.code=code;
        return this.standardResponse;
    }
}

module.exports = new responseHelper();