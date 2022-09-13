const { createClient } =require('redis');
let redisInstance=require('./../dependencies/redis')

module.exports = (async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    redisInstance.redisInstance=client
   return client;
})();