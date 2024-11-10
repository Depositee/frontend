import amqp from 'amqplib';
import { WebSocketServer } from 'ws';

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE = 'notification_exchange';

const wss = new WebSocketServer({ port: 8088 });

const userConsumers = {}; // Store active consumers by user ID

const startRabbitMQConsumer = async (userId, channel) => {
  try {
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    const queue = `user.${userId}.notification`;
    await channel.assertQueue(queue, { durable: true });

    const routingKey = `user.${userId}.notification`;
    await channel.bindQueue(queue, EXCHANGE, routingKey);

    console.log(`Waiting for messages for user ${userId}...`);

    channel.consume(queue, async (msg) => {
      const messageContent = msg.content.toString();

      wss.clients.forEach((client) => {
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

const stopRabbitMQConsumer = async (userId) => {
  const consumer = userConsumers[userId];
  if (consumer) {
    try {
      await consumer.channel.close(); // Close the channel to stop consuming
      console.log(`Stopped RabbitMQ consumer for user ${userId}`);
      delete userConsumers[userId]; // Remove the consumer from the active list
    } catch (error) {
      console.error('Error stopping RabbitMQ Consumer:', error);
    }
  }
};

wss.on('connection', (ws, req) => {
  const userId = req.url.split('userId=')[1];
  
  try {
    console.log(`Client connected with userId: ${userId}`);

    // If there's an active consumer for the previous user, stop it
    if (userConsumers[userId]) {
      stopRabbitMQConsumer(userId);
    }

    // Create a new connection to RabbitMQ and start consuming messages for the new user
    amqp.connect(RABBITMQ_URL).then((connection) => {
      return connection.createChannel().then((channel) => {
        userConsumers[userId] = { channel }; // Store the active consumer
        startRabbitMQConsumer(userId, channel);
      });
    }).catch((error) => {
      console.error('Error connecting to RabbitMQ:', error);
      ws.close();
    });

    ws.on('close', () => {
      console.log(`Client disconnected for userId: ${userId}`);
      stopRabbitMQConsumer(userId); // Clean up when the client disconnects
    });

  } catch (error) {
    console.error('Authentication failed:', error);
    ws.close(); 
  }
});
