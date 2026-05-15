// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage        from './pages/LoginPage';
import DashboardPage    from './pages/DashboardPage';
import VoyagesPage      from './pages/VoyagesPage';
import ReservationsPage from './pages/ReservationsPage';
import VehiculesPage    from './pages/VehiculesPage';
import ChauffeursPage   from './pages/ChauffeursPage';
import Navbar           from './components/common/Navbar';

// Layout protégé avec Navbar en haut (pas Sidebar)
function ProtectedLayout({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      <Navbar />
      <main className="px-4 py-6 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/voyages" replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/voyages" replace /> : <LoginPage />}
      />
      <Route path="/" element={<Navigate to="/voyages" replace />} />

      <Route path="/voyages" element={
        <ProtectedLayout><VoyagesPage /></ProtectedLayout>
      } />

      <Route path="/reservations" element={
        <ProtectedLayout><ReservationsPage /></ProtectedLayout>
      } />

      <Route path="/dashboard" element={
        <ProtectedLayout>
          <AdminRoute><DashboardPage /></AdminRoute>
        </ProtectedLayout>
      } />

      <Route path="/vehicules" element={
        <ProtectedLayout>
          <AdminRoute><VehiculesPage /></AdminRoute>
        </ProtectedLayout>
      } />

      <Route path="/chauffeurs" element={
        <ProtectedLayout>
          <AdminRoute><ChauffeursPage /></AdminRoute>
        </ProtectedLayout>
      } />
    </Routes>
  );
}
