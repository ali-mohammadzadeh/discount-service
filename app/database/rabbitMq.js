let rabbitInstance=require('./../dependencies/rabbitmq')
const amqp = require("amqplib/callback_api");



function rabbitServer(){
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost', function (error, connection) {
            if (error) reject(error);
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                let queue = 'transactionQueue';
                channel.assertQueue(queue, {durable: true});
                resolve(channel)
                return

            });
            // setTimeout(function () {
            //     connection.close();
            //     process.exit(0)
            // }, 500);
        });
    })
}

module.exports = (async () => {
    let con=await rabbitServer();
    rabbitInstance.instance=con
    // con.sendToQueue('transactionQueue', Buffer.from(JSON.stringify("hi babe")), {persistent: true});
    // console.log('Sent ',"hi babe")
    return con
})();