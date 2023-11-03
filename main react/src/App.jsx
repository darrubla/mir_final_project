//import { useState } from 'react'
import { Suspense } from 'react';
import './App.css';
import { UserProvider } from './containers/UserContext';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Signed } from './pages/Signed';
import ConfirmationStudent from './pages/ConfirmationStudent';
import ConfirmationTeacher from './pages/ConfirmationTeacher';
import { ActivateTeacher } from './pages/ActivateTeacher';
import { ActivateStudent } from './pages/ActivateStudent';
import { StudentAccountInfo } from './pages/StudentAccountInfo';
import { NotFound } from './pages/NotFound';
import { Schedule } from './pages/Schedule';
import { Overview } from './pages/Overview';
import { TeacherView } from './pages/TeacherView';
import { StudentView } from './pages/StudentView';
import { Container } from 'react-bootstrap';
import { Index } from './pages/Index';
import { Navigation } from './components/Navigation';
import { Landing } from './pages/Landing';
// import ProtectedRoute from './containers/ProtectedRoute'
import Checkout from './pages/Checkout';
import CheckoutStatus from './pages/CheckoutStatus';
import { ModalAlert } from './components/ModalAlert';
import { AuthApp } from './components/AuthApp';

function App() {
  return (
    <UserProvider>
      <Container fluid className="p-0">
        <Suspense fallback={null}>
          {false && <Index />}
          <Navigation />
          <Routes>
            <Route path="/signin/*" element={<Signin />} />
            <Route path="/signup/*" element={<Signup />} />
            <Route path="/signed" element={<Signed />} />
            <Route
              path="/activate_teacher/:token"
              element={<ActivateTeacher />}
            />
            <Route
              path="/activate_student/:token"
              element={<ActivateStudent />}
            />
            <Route
              path="/confirmation_teacher"
              element={<ConfirmationTeacher />}
            />
            <Route
              path="/confirmation_student"
              element={<ConfirmationStudent />}
            />
            <Route path="/" element={<Landing />}>
              <Route path="/auth/*" element={<AuthApp />} />
            </Route>
            <Route path="/home" element={<Landing />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/teachers/:id" element={<TeacherView />} />
            <Route path="/students/:id" element={<StudentView />} />
            <Route path="/my_account" element={<StudentAccountInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment_status" element={<CheckoutStatus />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </UserProvider>
  );
}
export default App;
