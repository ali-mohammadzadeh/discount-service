const redisInstance = require("../../dependencies/redis");

module.exports = class GiftBucket {
    constructor(redis) {
        this.redis=redis.redisInstance
        this.bucketDetails = {}
    }


    name(name) {
        Object.assign(this.bucketDetails, {name: name})
        return this

    }

    size(count) {
        Object.assign(this.bucketDetails, {size: count})
        return this
    }

    expireTile(time) {
        Object.assign(this.bucketDetails, {expireTime: time})
        return this
    }

    add() {
        return this.redis.set(this.bucketDetails.name, this.bucketDetails.size)

    }

    count() {
        return this.redis.get(this.bucketDetails.name)
    }

    increase() {
        return this.redis.incr(this.bucketDetails.name)
    }

    decrease() {
        return this.redis.decr(this.bucketDetails.name)
    }
}