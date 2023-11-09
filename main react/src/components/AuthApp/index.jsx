import { Route, Routes } from 'react-router-dom';

import { AuthModal } from './AuthModal';
import { SignInApp } from './SignIn';
import { SignUpApp } from './SignUp';
import { AuthProvider } from '../../containers/AuthContext';
import { Signed } from '../../pages/Signed';

export function AuthApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthModal>
              <SignInApp />
            </AuthModal>
          }
        />
        <Route
          path="/register"
          element={
            <AuthModal>
              <SignUpApp />
            </AuthModal>
          }
        />
        <Route
          path="/signed"
          element={
            <AuthModal>
              <Signed />
            </AuthModal>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
