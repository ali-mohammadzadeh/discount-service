const redisInstance = require("../../dependencies/redis");
module.exports = async (discountHooks) => {


    /**
     * after create discount, discount should be save in redis
     */
    discountHooks.addHook('afterCreate', async (discount) => {
        redisInstance.redisInstance.HSET('discounts', discount.code, JSON.stringify(discount))
            .then(() => console.table({
                status: "success",
                "message": "discount created to redis and database",
                code: discount.code
            }))
    });

    /**
     * after delete discount
     */
    discountHooks.addHook('afterDestroy', async (discount) => {
        redisInstance.redisInstance.HDEL('discounts', discount.code)
            .then(() => console.table({
                status: "success",
                "message": "discount deleted from redis and database",
                code: discount.code
            }))
    });

    return;

}

