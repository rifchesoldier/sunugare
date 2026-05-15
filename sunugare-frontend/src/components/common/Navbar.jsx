import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut } from 'lucide-react'

const navLinks = [
  { to: '/voyages',      label: 'Voyages' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/vehicules',    label: 'Véhicules' },
  { to: '/chauffeurs',   label: 'Chauffeurs' },
  { to: '/dashboard',    label: 'Dashboard' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      {/* Logo */}
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          Sunu<span className="underline decoration-[#e8a045]">gare</span>
        </h1>
        <p className="text-white/50 text-xs mt-0.5">Gestion de Gare Routière</p>
      </div>

      {/* Navigation pills */}
      <nav className="flex flex-wrap justify-center gap-2 mb-3">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-pill ${pathname === to ? 'nav-pill-active' : 'nav-pill-inactive'}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      {user && (
        <div className="flex justify-center items-center gap-3">
          <span className="text-white/70 text-sm">{user.name} ({user.role})</span>
          <button onClick={handleLogout} className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5">
            <LogOut size={13} /> Deconnexion
          </button>
        </div>
      )}
    </header>
  )
}
