import { Route } from 'react-router-dom';
import PublicRoute from '../../../routers/Routes/PublicRoute';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp.';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';

const SessionRouter = (
  <Route path="/session" element={<PublicRoute />}>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="resetpassword" element={<ResetPassword />} />
  </Route>
);

export default SessionRouter;
