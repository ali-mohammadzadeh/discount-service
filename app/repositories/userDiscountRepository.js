const model = require("./../models/userDiscount")
const {Op} = require("sequelize");
module.exports = class linkRepository {


    /**
     * create discount
     * @param title
     * @param code
     * @param amount
     * @param count
     * @param id
     * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
     */
    async insert({id, discountId, amount, username, trackingCode}) {
        return model.create({id, discountId, amount, username, trackingCode})
    }


    /**
     * get
     * @param code
     * @returns {Promise<Model<any, TModelAttributes> | null>}
     */
    async get({username, discountId}) {
        return model.findOne({
            where: {
                [Op.or]: [
                    {username: username, discountId: discountId}
                ]
            }
        });
    }


    /**
     * get By Discount Id
     * @param discountId
     * @returns {Promise<Model<any, TModelAttributes>[]>}
     */
    async getByDiscountId({discountId}) {
        return model.findAll({
            where: {
                [Op.or]: [
                    {discountId: discountId}
                ]
            }
        });
    }


}