import { useCallback, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  // TODO: revisar tema desconectar sockets e implementacion de tipado
  // https://socket.io/how-to/use-with-react
  // https://socket.io/docs/v4/typescript/
  const conectarSocket = useCallback((token: string) => {
    const socketTemp = io(process.env.REACT_APP_API_URL || '', {
      transports: ['websocket'],
      //  autoConnect: true,
      // TODO:revisar esto
      forceNew: true,
      query: {
        'x-token': token,
      },
    });

    setSocket(socketTemp);
  }, []);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(!!socket && !!socket.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false));
  }, [socket]);

  return {
    conectarSocket,
    desconectarSocket,
    socket,
    online,
  };
};
