import { useEffect, createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../hooks/useSocket';

import { useAppSelector } from '../../redux/hooks';

interface SocketCont {
  socket: Socket | null;
  online: boolean;
}
const SocketContext = createContext<SocketCont>({} as SocketCont);
interface Props {
  children: JSX.Element | JSX.Element[];
}
const SocketProvider = ({ children }: Props) => {
  const { conectarSocket, desconectarSocket, socket, online } = useSocket();

  const { token } = useAppSelector((state) => state.sessionSlice);

  useEffect(() => {
    if (token) {
      conectarSocket(token);
    }
  }, [token, conectarSocket]);

  useEffect(() => {
    if (!token) {
      desconectarSocket();
    }
  }, [token, desconectarSocket]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
export const useSocketContext = () => useContext(SocketContext);
