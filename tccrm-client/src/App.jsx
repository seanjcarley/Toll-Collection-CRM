import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import { BrowserRouter as Router ,generatePath, Navigate, Route, 
  Routes, useParams } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AgentDashboardPage from './pages/AgentDashboardPage';

const Redirect = ({ to }) => {
  const params = useParams();
  return <Navigate to={generatePath(to, params)} replace />;
}

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to='/' replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route
          path='/reset_password'
          element={
            <ResetPasswordPage />
          }
        />
        <Route
          path='/agent_dashboard'
          element= {
            <RequireAuth>
              <AgentDashboardPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
