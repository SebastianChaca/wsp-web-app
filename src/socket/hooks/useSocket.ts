import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}
export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socketErrorConnection, setSocketError] = useState<string | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  // TODO: revisar tema desconectar sockets e implementacion de tipado
  // https://socket.io/how-to/use-with-react
  // https://socket.io/docs/v4/typescript/
  const conectarSocket = useCallback((token: string) => {
    const socketTemp = io(`${import.meta.env.VITE_API_URL}/events`, {
      transports: ['websocket'],
      // autoConnect: true,
      // TODO:revisar esto
      // forceNew: true,

      query: { token },
    });

    setSocket(socketTemp);
  }, []);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  useEffect(() => {
    setOnline(!!socket && !!socket.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect_error', (err) => {
      // eslint-disable-next-line no-console
      console.warn(`connect_error due to ${err.message}`);
      setSocketError(err.message);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      setSocketError(null);
      console.log('conectado');
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false));
  }, [socket]);

  return {
    socketErrorConnection,
    conectarSocket,
    desconectarSocket,
    socket,
    online,
  };
};
