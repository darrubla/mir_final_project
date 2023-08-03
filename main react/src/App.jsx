//import { useState } from 'react'
import { Suspense } from 'react';
import './App.css';
import { UserProvider } from './containers/UserContext';

import { Welcome } from './pages/Welcome';
import { Route, Routes } from 'react-router-dom';

import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

function App() {

  return (
    <UserProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signin/*" element={<Signin />} />
          <Route path="/signup/*" element={<Signup/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/my_account" element={<StudentAccountInfo />} />
        </Routes>
      </Suspense>
    </UserProvider>
  );
}
export default App
