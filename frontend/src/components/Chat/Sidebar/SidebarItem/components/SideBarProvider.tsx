import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { friend as friendType } from '../../../../../types/friend/friend';
import { sessionState } from '../../../../../types/session/session';
import { useAppSelector } from '../../../../../redux/hooks';

interface SideBarContextType {
  friend: friendType;
  session: sessionState;
}

interface SideBarProps {
  friend: friendType;
  children?: ReactNode;
}
const SideBarContext = createContext<SideBarContextType>(
  {} as SideBarContextType
);
const SideBarProvider: FC<SideBarProps> = ({ friend, children }) => {
  const session = useAppSelector((state) => state.sessionSlice);
  const values = useMemo(() => {
    return {
      friend,
      session,
    };
  }, [friend, session]);

  return (
    <SideBarContext.Provider value={values}>{children}</SideBarContext.Provider>
  );
};

export default SideBarProvider;
export const useSideBarContext = () => useContext(SideBarContext);
