/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import WebSocket,  {WebSocketServer}  from "ws";
import amqp, { Channel, ConsumeMessage } from "amqplib";
import { RABBIT_MQ_URL } from "@/config/config";

interface UserConsumers {
  [userId: string]: Channel;
}

const RABBITMQ_URL = `amqp://${RABBIT_MQ_URL}`;
const EXCHANGE = "notification_exchange";

const userConsumers: UserConsumers = {}; // Stores active RabbitMQ channels per user
let wsServer: WebSocketServer | null = null;

export const config = {
  api: {
    bodyParser: false,
  },
};

const startRabbitMQConsumer = async (userId: string, ws: WebSocket) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    userConsumers[userId] = channel;

    await channel.assertExchange(EXCHANGE, "topic", { durable: true });
    const queue = `user.${userId}.notification`;
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, EXCHANGE, `user.${userId}.notification`);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
      if (msg && ws.readyState === ws.OPEN) {
        const messageContent = msg.content.toString();
        ws.send(messageContent);
        channel.ack(msg);
      }
    });

    console.log(`Started RabbitMQ consumer for user ${userId}`);
  } catch (error) {
    console.error("Error starting RabbitMQ Consumer:", error);
  }
};

const stopRabbitMQConsumer = async (userId: string) => {
  const channel = userConsumers[userId];
  if (channel) {
    await channel.close();
    delete userConsumers[userId];
    console.log(`Stopped RabbitMQ consumer for user ${userId}`);
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!wsServer) {
    wsServer = new WebSocketServer({ noServer: true });

    wsServer.on("connection", (ws : any, request : any) => {
      const userId = request.url?.split("/").pop();

      if (!userId) {
        ws.close();
        return;
      }

      startRabbitMQConsumer(userId, ws);

      ws.on("close", () => {
        stopRabbitMQConsumer(userId);
      });
    });

    (res.socket as any).server.on("upgrade", (request: any, socket: any, head: any) => {
      const userId = request.url?.split("/").pop();
      if (userId) {
        wsServer?.handleUpgrade(request, socket, head, (ws : any) => {
          wsServer?.emit("connection", ws, request);
        });
      }
    });
  }

  res.end();
}
