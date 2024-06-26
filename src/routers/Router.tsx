import { Routes, Route, Navigate } from 'react-router-dom';

import ChatRouter from '../pages/Chat/ChatRouter';
import SessionRouter from '../pages/Session/SessionRouter/SessionRouter';
import SettingsRouter from '../pages/Settings/SettingsRouter';

const Router = () => {
  // TODO: mejor forma de implementar ?

  return (
    <Routes>
      {SessionRouter}
      {ChatRouter}
      {SettingsRouter}
      <Route path="*" element={<Navigate to="/session/signin" replace />} />
    </Routes>
  );
};

export default Router;
