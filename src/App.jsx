import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CandidateProfile from './pages/candidate.jsx';

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute token:', token);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

function Root() {
  const token = localStorage.getItem('token');
  console.log('Root token:', token);
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="candidate/:id" element={<CandidateProfile />} />
    </Route>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;



