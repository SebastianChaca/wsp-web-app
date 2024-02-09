import { Outlet, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Spinner } from '../../components/Ui';

const PublicRoute = () => {
  const { token } = useAppSelector((state) => state.sessionSlice);

  if (token) {
    return <Navigate to="/chat" replace />;
  }
  return (
    <Suspense fallback={<Spinner size="lg" height="100vh" />}>
      <Outlet />;
    </Suspense>
  );
};

export default PublicRoute;
