const {validationResult} = require("express-validator");
let responseHelper=require('./responseHelper')


module.exports = class validator {

    /**
     * validation request data
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static validate(req, res, next) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
            let errorForBack=responseHelper.error({
                errors: extractedErrors,
            },422)
        return res.status(errorForBack.code).json(errorForBack.response)
    }
}