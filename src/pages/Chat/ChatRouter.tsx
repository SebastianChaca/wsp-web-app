import { Route } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from '../../routers/Routes/PrivateRoute';

const ChatPage = lazy(() => import('./ChatPage'));
const ChatRouter = (
  <>
    <Route element={<PrivateRoute />}>
      <Route path="/chat" element={<ChatPage />} />
    </Route>
  </>
);

export default ChatRouter;
