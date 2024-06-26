import { Route } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from '../../routers/Routes/PrivateRoute';
import { Profile } from '../../components/Settings';

const SettingsPage = lazy(() => import('./SettingsPage'));
const SettingsRouter = (
  <>
    <Route element={<PrivateRoute />}>
      <Route path="settings" element={<SettingsPage />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  </>
);

export default SettingsRouter;
