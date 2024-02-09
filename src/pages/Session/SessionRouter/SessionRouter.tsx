import { Route } from 'react-router-dom';
import { lazy } from 'react';
import PublicRoute from '../../../routers/Routes/PublicRoute';

const SignIn = lazy(() => import('../SignIn/SignIn'));
const SignUp = lazy(() => import('../SignUp/SignUp.'));
const ForgotPassword = lazy(() => import('../ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('../ResetPassword/ResetPassword'));
const SessionRouter = (
  <Route path="/session" element={<PublicRoute />}>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="resetpassword" element={<ResetPassword />} />
  </Route>
);

export default SessionRouter;
