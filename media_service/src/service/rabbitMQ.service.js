const amq = require("amqplib");

let connection = null;
let channel = null;
const EXChCHANGE_NAME = "BLOG_EVENTS";

async function connectTOMQ() {
  try {
    connection = await amq.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXChCHANGE_NAME, "topic", { durable: false });
    console.log("Connection established with RABBIT_MQ successfully")
    return channel;
  } catch (error) {
    console.log("Error while exeucting connectTOMQ() \n", error);
    throw error;
  }
}
const publishEvent = async (routingKey, message) => {
  try {
    if (!channel) {
      await connectTOMQ();
    }
    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );

  } catch (error) {
    console.log("Error while exeucting publishEvent() \n", error);
    throw error;
  }
};

const consumeEvent = async(routingKey,callback)=>{
    try {
          if (!channel) {
      await connectTOMQ();
    }
    const q = await channel.assertQueue("",{exclusive:true})
    await channel.bindQueue(q.queue,EXChCHANGE_NAME,routingKey)
    channel.consume(q.queue,(msg)=>{
        if(msg !==null){
            const content = JSON.parse(msg.content.toString())
            callback(content)
            channel.ack(msg)
        }
    })

    } catch (error) {
      console.log("Error while exeucting consumeEvent() \n", error);
    throw error;  
    }
}

module.exports = {publishEvent,consumeEvent}