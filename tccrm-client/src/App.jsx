import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import { BrowserRouter as Router ,generatePath, Navigate, Route, 
  Routes, useParams } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

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
      </Routes>
    </AuthProvider>
  );
}

