import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    roles: ['admin'] },
  { to: '/voyages',      label: 'Voyages',       roles: ['admin', 'agent', 'client'] },
  { to: '/reservations', label: 'Reservations',  roles: ['admin', 'agent', 'client'] },
  { to: '/vehicules',    label: 'Vehicules',     roles: ['admin'] },
  { to: '/chauffeurs',   label: 'Chauffeurs',    roles: ['admin'] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-green-400">Sunugare</h1>
        <p className="text-xs text-gray-400 mt-1">Gare Routiere</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-sm text-gray-400 mb-2">
          {user?.name} <span className="text-green-400">({user?.role})</span>
        </div>
        <button
          onClick={logout}
          className="w-full text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          Deconnexion
        </button>
      </div>
    </aside>
  );
}