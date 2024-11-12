import { GATE_WAY_URL } from "@/config/config";
import { UserData } from "@/interface/auth/user";
import { toast } from "react-toastify";

let currentWebSocket: WebSocket | null = null;

export const connectWebSocket = (user: UserData) => {
  const userId = user.id;

  if (currentWebSocket) {
    currentWebSocket.close();
    currentWebSocket = null;
  }

  const createWebSocket = () => {
    const ws = new WebSocket(`ws://${GATE_WAY_URL}/ws?userId=${userId}`);
    currentWebSocket = ws;

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      toast.info(`New notification: ${message.message}`);
    };

    ws.onopen = () => console.log("Connected to WebSocket");

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      if (currentWebSocket === ws) {
        currentWebSocket = null;
      }
    };
  };

  createWebSocket();

  return () => {
    if (currentWebSocket) {
      currentWebSocket.close();
      currentWebSocket = null;
    }
  };
};
