const model = require("./../models/discount")
const userDiscount = require("./../repositories/userDiscountRepository")
const {Op} = require("sequelize");
module.exports = class linkRepository {


    constructor() {
        this.user = new userDiscount();
    }

    /**
     * create discount
     * @param title
     * @param code
     * @param amount
     * @param count
     * @param id
     * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
     */
    async insert({id, title, code, amount, count}) {
        return model.create({id, title, code, amount, count})
    }


    /**
     * get by code
     * @param code
     * @returns {Promise<Model<any, TModelAttributes> | null>}
     */
    async getByCode({code}) {
        let data = await model.findOne({
            where: {
                [Op.or]: [
                    {code: code}
                ]
            }
        });

        return data?.dataValues
    }


    async updateStatusCode({id, status}) {
        let res = await model.update(
            {
                status: status,
            },
            {
                where: {id: id},
            }
        );
        return res
    }
}