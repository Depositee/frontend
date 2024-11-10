import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { WebSocket, WebSocketServer } from "ws";
import { RABBIT_MQ_URL } from "@/config/config";

const RABBITMQ_URL = `amqp://${RABBIT_MQ_URL}`;
const EXCHANGE = "notification_exchange";

const wss = new WebSocketServer({ port: 8088 });

interface UserConsumers {
  [userId: string]: { channel: Channel };
}

interface UserSockets {
  [userId: string]: WebSocket;
}

const userConsumers: UserConsumers = {}; // Store active RabbitMQ consumers by user ID
const userSockets: UserSockets = {}; // Store active WebSocket connections by user ID

// Function to start RabbitMQ consumer for a specific user
const startRabbitMQConsumer = async (
  userId: string,
  channel: Channel
): Promise<void> => {
  try {
    await channel.assertExchange(EXCHANGE, "topic", { durable: true });

    const queue = `user.${userId}.notification`;
    await channel.assertQueue(queue, { durable: true });

    const routingKey = `user.${userId}.notification`;
    await channel.bindQueue(queue, EXCHANGE, routingKey);

    console.log(`Waiting for messages for user ${userId}...`);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
      if (msg) {
        const messageContent = msg.content.toString();

        // Only send the message to the WebSocket of the user that owns this queue
        if (
          userSockets[userId] &&
          userSockets[userId].readyState === WebSocket.OPEN
        ) {
          userSockets[userId].send(messageContent);
        }

        channel.ack(msg);
        console.log(
          `Received message for user ${userId}:`,
          JSON.parse(messageContent)
        );
      }
    });

    console.log("RabbitMQ Consumer is listening for messages...");
  } catch (error) {
    console.error("Error starting RabbitMQ Consumer:", error);
  }
};

// Function to stop RabbitMQ consumer when user disconnects
const stopRabbitMQConsumer = async (userId: string): Promise<void> => {
  const consumer = userConsumers[userId];
  if (consumer) {
    try {
      await consumer.channel.close(); // Close the channel to stop consuming
      console.log(`Stopped RabbitMQ consumer for user ${userId}`);
      delete userConsumers[userId]; // Remove the consumer from the active list
    } catch (error) {
      console.error("Error stopping RabbitMQ Consumer:", error);
    }
  }
};

// Handle incoming WebSocket connections
wss.on("connection", (ws: WebSocket, req) => {
  const userId = new URL(
    req.url!,
    `http://${req.headers.host}`
  ).searchParams.get("userId");

  if (!userId) {
    console.error("Missing userId in query parameters.");
    ws.close();
    return;
  }

  try {
    console.log(`Client connected with userId: ${userId}`);

    // Store the WebSocket connection for the user
    userSockets[userId] = ws;

    // If there's already an active consumer for another user, stop it first
    if (userConsumers[userId]) {
      stopRabbitMQConsumer(userId); // Stop previous consumer if exists
    }

    // Create a new RabbitMQ consumer for the new user
    amqp
      .connect(RABBITMQ_URL)
      .then((connection: Connection) => {
        return connection.createChannel().then((channel: Channel) => {
          userConsumers[userId] = { channel }; // Store the active consumer
          startRabbitMQConsumer(userId, channel); // Start consuming messages for this user
        });
      })
      .catch((error) => {
        console.error("Error connecting to RabbitMQ:", error);
        ws.close();
      });

    // Clean up when the WebSocket connection is closed
    ws.on("close", () => {
      console.log(`Client disconnected for userId: ${userId}`);

      // Remove the WebSocket connection from the dictionary
      delete userSockets[userId];
      stopRabbitMQConsumer(userId); // Stop RabbitMQ consumer if no WebSocket is connected
    });
  } catch (error) {
    console.error("Authentication failed:", error);
    ws.close(); // Close WebSocket connection if there's an error
  }
});
