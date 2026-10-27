import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocketUrl = (): string => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
  if (socketUrl && socketUrl.trim()) {
    return socketUrl.trim().replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (serverUrl && serverUrl.trim()) {
    return serverUrl.trim().replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
  }

  return "http://localhost:5000";
};

export function getSocket() {
  if (!socket) {
    const url = getSocketUrl();
    socket = io(url, {
      withCredentials: true,
      autoConnect: false,
      transports: ["polling", "websocket"],
    });
  }

  return socket;
}
