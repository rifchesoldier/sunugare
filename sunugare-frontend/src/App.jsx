import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage        from './pages/LoginPage';
import DashboardPage    from './pages/DashboardPage';
import VoyagesPage      from './pages/VoyagesPage';
import ReservationsPage from './pages/ReservationsPage';
import VehiculesPage    from './pages/VehiculesPage';
import ChauffeursPage   from './pages/ChauffeursPage';
import Sidebar          from './components/common/Sidebar';

function ProtectedLayout({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
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
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={
        <ProtectedLayout>
          <AdminRoute><DashboardPage /></AdminRoute>
        </ProtectedLayout>
      } />
      <Route path="/voyages" element={<ProtectedLayout><VoyagesPage /></ProtectedLayout>} />
      <Route path="/reservations" element={<ProtectedLayout><ReservationsPage /></ProtectedLayout>} />
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
