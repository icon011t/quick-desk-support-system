import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AgentPanel from './pages/AgentPanel';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const PrivateRoute = ({ element, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return element;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPanel />} roles={['admin']} />} />
        <Route path="/agent" element={<PrivateRoute element={<AgentPanel />} roles={['agent']} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
