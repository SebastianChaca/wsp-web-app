import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function PublicRoute() {
  const { token } = useAppSelector((state) => state.sessionSlice);

  if (token) {
    return <Navigate to="/chat" replace />;
  }
  return <Outlet />;
}

export default PublicRoute;
