//import { useState } from 'react'
import { Suspense } from 'react';
import './App.css';

import { Welcome } from './pages/Welcome';
import { Route, Routes } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

function App() {

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/home" element={<Welcome/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </Suspense>
    
  );
}
export default App
