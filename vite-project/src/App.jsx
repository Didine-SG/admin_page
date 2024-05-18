import { useState } from 'react'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import dashboard from "./pages/dashboard"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="login" element={<Login />} />
    </>
  )
);

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  return token ? <Dashboard /> : <Navigate to="/login" />;
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
