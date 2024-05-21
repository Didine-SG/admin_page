import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CandidateProfile from './pages/candidate.jsx';
import Navbar from './components/navbar.jsx';
import UsersPage from './pages/allUsers.jsx';
import "./index.css"

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

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
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allUsers" element={<UsersPage />} />
        <Route path="candidate/:id" element={<CandidateProfile />} />
      </Route>
    </Route>
    </>
  )
);

function App() {
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;



