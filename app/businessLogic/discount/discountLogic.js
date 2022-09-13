const discountRepository = require("../../repositories/discountRepository");
const redisInstance = require("../../dependencies/redis");
const giftBucket = require("../../businessLogic/discount/giftBucket");
const responseHelper = require("../../helpers/responseHelper");
const dictionary = require("./../../../dictionary/dictionary")[process.env["lang"] ?? "en"].api.discounts;
const httpCodeDictionary = require("./../../../dictionary/httpStatusCodesDictionary")
const {v4: uuidv4} = require('uuid');
const rabbitmqInstance = require("../../dependencies/rabbitmq");
module.exports = class discountLogic {


    constructor() {
        this.repository = new discountRepository()
    }


    /**
     * create discount
     * @param title
     * @param code
     * @param count
     * @param amount
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async store({title, code, count, amount}) {
        try {

            const id = uuidv4();
            let isCode = await this.repository.getByCode({code})
            if (isCode) throw responseHelper.error({message: dictionary.exists}, httpCodeDictionary.BAD_REQUEST)
            await this.repository.insert({id, title, code, count, amount})

            let gi = new giftBucket(redisInstance)
                gi.name(code)
                .size(count)
                 .add()
            return responseHelper.success({
                message: dictionary.create, informations: {
                    id,
                    title,
                    amount,
                    code
                }
            }, httpCodeDictionary.CREATED)
        } catch (e) {
            throw  e
        }

    }

    /**
     *
     * @param username
     * @param code
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async register({username, code}) {
        try {
            let promises = [];
            let giftBucketInstance = new giftBucket(redisInstance)
            giftBucketInstance.name(code)
            promises.push(this.repository.getByCode({code}))
            promises.push(giftBucketInstance.name(code).count())

            let result = await Promise.allSettled(promises)
            const discount = result[0].value
            const bucketCount = result[1].value

            if (!discount) throw responseHelper.error({message: dictionary.notFound}, httpCodeDictionary.NOT_FOUND)
            if (bucketCount === null || bucketCount <= 0) throw responseHelper.error({message: dictionary.expired}, httpCodeDictionary.BAD_REQUEST)

            giftBucketInstance.decrease()


            let checkUserGotGift = await this.repository.user.get({username, discountId: discount.id})
            if (checkUserGotGift) {
                giftBucketInstance.increase()
                throw responseHelper.error({message: dictionary.alreadyGot}, httpCodeDictionary.BAD_REQUEST)
            }


            rabbitmqInstance.instance.sendToQueue('transactionQueue', Buffer.from(JSON.stringify(data)), {persistent: true});

            let discountPromises = []
            if (bucketCount == 1) discountPromises.push(this.repository.updateStatusCode({
                id: discount.id,
                status: "completed"
            }))

            const trackingCode=uuidv4();
            const data={
                id: uuidv4(),
                discountId: discount.id,
                amount: discount.amount,
                username,
                trackingCode:trackingCode
            }
            discountPromises.push(this.repository.user.insert(data))
            await Promise.allSettled(discountPromises);


            console.log("message send")
            return responseHelper.success({
                message: dictionary.success
            }, httpCodeDictionary.CREATED)
        } catch (e) {
            giftBucketInstance.decrease()
            throw  e
        }

    }

    async get({code}) {
        try {
            let discount = await this.repository.getByCode({code})
            if (!discount) throw responseHelper.error({message: dictionary.notFound}, httpCodeDictionary.NOT_FOUND)

            let users = await this.repository.user.getByDiscountId({discountId: discount.id})
            return responseHelper.success({
                count: users.length,
                result: users

            }, httpCodeDictionary.OK)
        } catch (e) {
            throw  e
        }

    }


}