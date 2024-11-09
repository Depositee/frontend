import amqp from 'amqplib';
import { WebSocketServer } from 'ws';

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE = 'notification_exchange';

const wss = new WebSocketServer({ port: 8088 });

const startRabbitMQConsumer = async (userId) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const queue = `user.${userId}.notification`;
    await channel.assertQueue(queue, { durable: true });

    const routingKey = `user.${userId}.notification`;
    await channel.bindQueue(queue, EXCHANGE, routingKey);

    console.log(`Waiting for messages for user ${userId}...`);

    channel.consume(queue, async(msg) => {
      const messageContent = msg.content.toString();

      wss.clients.forEach(client  => {
        if (client.readyState === client.OPEN) {
          client.send(messageContent);
        }
      });

      channel.ack(msg);
      console.log(`Received message for user ${userId}:`, JSON.parse(messageContent));
    });

    console.log('RabbitMQ Consumer is listening for messages...');
  } catch (error) {
    console.error('Error starting RabbitMQ Consumer:', error);
  }
};

wss.on('connection', (ws , req) => {

  const userId = req.url.split('userId=')[1];
  try {
    console.log(`Client connected with userId: ${userId}`);
    startRabbitMQConsumer(userId); 

    ws.on('close', () => {
      console.log(`Client disconnected for userId: ${userId}`);
    });

  } catch (error) {
    console.error('Authentication failed:', error);
    ws.close(); 
  }
});

