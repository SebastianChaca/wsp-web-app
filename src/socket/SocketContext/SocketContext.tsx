import { useEffect, createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../hooks/useSocket';

import { useAppSelector } from '../../redux/hooks';

interface SocketCont {
  // socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  socket: Socket | null;
  online: boolean;
  socketErrorConnection: null | string;
}
const SocketContext = createContext<SocketCont>({} as SocketCont);
interface Props {
  children: JSX.Element | JSX.Element[];
}
const SocketProvider = ({ children }: Props) => {
  const {
    conectarSocket,
    desconectarSocket,
    socket,
    online,
    socketErrorConnection,
  } = useSocket();

  const { token } = useAppSelector((state) => state.sessionSlice);

  useEffect(() => {
    if (token && !socketErrorConnection) {
      conectarSocket(token);
    }
  }, [token, conectarSocket, socketErrorConnection]);

  useEffect(() => {
    if (!token) {
      desconectarSocket();
    }
  }, [token, desconectarSocket]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, online, socketErrorConnection }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
export const useSocketContext = () => useContext(SocketContext);
