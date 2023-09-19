//import { useState } from 'react'
import { Suspense } from 'react';
import './App.css';
import { UserProvider } from './containers/UserContext';
import { Welcome } from './pages/Welcome';
import { Route, Routes } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { StudentAccountInfo } from './pages/StudentAccountInfo';
import { NotFound } from './pages/NotFound';
import { Schedule } from './pages/Schedule';
import { TeacherView } from './pages/TeacherView';
import { Container } from 'react-bootstrap';
import { Index } from './pages/Index';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <UserProvider>
      <Container fluid className="p-0">
        <Suspense fallback={null}>
          {false && <Index />}
          <Navigation />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin/*" element={<Signin />} />
            <Route path="/signup/*" element={<Signup />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teachers/:id" element={<TeacherView />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/my_account" element={<StudentAccountInfo />} />
          </Routes>
        </Suspense>
      </Container>
    </UserProvider>
  );
}
export default App;
