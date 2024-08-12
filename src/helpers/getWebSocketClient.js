import { createClient } from "graphql-ws";

let client;
const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL;

export function getWebSocketClient(token) {
  if (!client && token) {
    client = createClient({
      url: apiUrl,
      keepAlive: 30000,
      connectionParams: async () => {
        return { access_token: token };
      },
      on: {
        connected: () => {
          console.log("WebSocket connected");
        },
        closed: () => {
          console.log("WebSocket disconnected");
        },
      },
    });
  }
  return client;
}
