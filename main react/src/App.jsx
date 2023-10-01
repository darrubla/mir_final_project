//import { useState } from 'react'
import { Suspense } from 'react'
import './App.css'
import { UserProvider } from './containers/UserContext'
import { Welcome } from './pages/Welcome'
import { Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { StudentAccountInfo } from './pages/StudentAccountInfo'
import { NotFound } from './pages/NotFound'
import { Schedule } from './pages/Schedule'
import { Overview } from './pages/Overview'
import { TeacherView } from './pages/TeacherView'
import { Container } from 'react-bootstrap'
import { Index } from './pages/Index'
import { Navigation } from './components/Navigation'
import { Landing } from './pages/Landing'
import ProtectedRoute from './containers/ProtectedRoute'

function App() {
  return (
    <UserProvider>
      <Container fluid className='p-0'>
        <Suspense fallback={null}>
          {false && <Index />}
          <Navigation />
          <Routes>
            <Route path='/signin/*' element={<Signin />} />
            <Route path='/signup/*' element={<Signup />} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path='/schedule'
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path='/overview'
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path='/teachers/:id'
              element={
                <ProtectedRoute>
                  <TeacherView />
                </ProtectedRoute>
              }
            />
            <Route
              path='/my_account'
              element={
                <ProtectedRoute>
                  <StudentAccountInfo />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </UserProvider>
  )
}
export default App
