const amqp  = require(amqplib)

const EXChCHANGE_NAME = "BLOG_EVENTS"
let connection = null;
let channel = null;
async function connectTOMQ  (){
try {
    connection = await amqp.connect(process.env.RABBITMQ_URL)
    channel = await connection.createchannel();
    await channel.assertExchange(EXChCHANGE_NAME,"topic",{durable:false});

    return channel;

} catch (error) {
    console.log("Something we wrong while establishing the connectin with RabbitMQ \n",error)

    throw error
}
}

const publishEvent = async(routingKey,message)=>{
    try {
        if(!channel){
            await connectTOMQ()
        }
        channel.publish(EXChCHANGE_NAME,routingKey,Buffer.from(JSON.stringify(message)))
    } catch (error) {
        console.log("Error while executing publishEvent() \n",error)
        throw error
    }
}

module.export = {publishEvent}