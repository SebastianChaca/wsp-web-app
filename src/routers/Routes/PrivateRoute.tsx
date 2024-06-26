import { Outlet, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { Grid } from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import { Spinner } from '../../components/Ui';

import { LeftContainer } from '../../components/AppLayoutContainers';
import SettingsSidebar from '../../components/Settings/SettingsSidebar/SettingsSidebar';

const PrivateRoute = () => {
  const { token } = useAppSelector((state) => state.sessionSlice);

  if (!token) {
    return <Navigate to="/session/signin" replace />;
  }
  return (
    <Suspense fallback={<Spinner size="lg" height="100vh" />}>
      <Grid templateColumns="5% 95%" height="100vh" overflow="hidden">
        <LeftContainer>
          <SettingsSidebar />
        </LeftContainer>
        <Outlet />
      </Grid>
    </Suspense>
  );
};

export default PrivateRoute;
