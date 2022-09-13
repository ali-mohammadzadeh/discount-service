const discountLogic = require("../../businessLogic/discount/discountLogic")
class discountClass {

    constructor() {
        this.logic=new discountLogic();
    }

    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async store(req,res){
        try{
            let response=await this.logic.store(req.body);
            res.status(response.code).send(response.response)
            return
        }catch (e){
            console.log(e)
            res.status(e.code?e.code:500).send(e.response?e.response:{})
        }

    }
    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async register(req,res){
        try{
            const data={
                username:req.body.username,
                code:req.params.code
            }
            let response=await this.logic.register(data);
            res.status(response.code).send(response.response)
            return
        }catch (e){
            console.log(e)
            res.status(e.code?e.code:500).send(e.response?e.response:{})
        }

    }


    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async get(req,res){
        try{
            let response=await this.logic.get(req.params);
            res.status(response.code).send(response.response)
            return
        }catch (e){
            res.status(e.code?e.code:500).send(e.response?e.response:{})
        }

    }

}
module.exports = new discountClass();