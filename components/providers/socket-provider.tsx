"use client";
import configs from "@/config";
import { socket } from "@/lib/socket-client";
import { Contact } from "@/schemas/contact";
import React, { useRef, useState } from "react";
import { createContext } from "react";
import { Socket as SocketClient, io } from "socket.io-client";

type SocketContext = {
  socketIoClient: SocketClient | null;
  connected: boolean;
};

const initData: SocketContext = {
  socketIoClient: null,
  connected: false,
};

export const socketContext = createContext(initData);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketIo = useProvideSocketIoClient();

  return (
    <socketContext.Provider
      value={{
        connected: socketIo?.connected || false,
        socketIoClient: socketIo?.client || null,
      }}
    >
      {children}
    </socketContext.Provider>
  );
}

function useProvideSocketIoClient() {
  const clientRef = useRef<SocketClient | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  if (typeof window === "undefined") return;

  if (!clientRef.current) {
    clientRef.current = io(configs.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket", "polling"],
      secure: true,
    });

    clientRef.current.on("connect", () => {
      setConnected(true);
      console.log("Socket.io client connected");
    });

    clientRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("Socket.io client disconnected");
    });
  }
  return { client: clientRef.current, connected };
}
