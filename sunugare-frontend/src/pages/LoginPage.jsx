// ══════════════════════════════════════════════════════════════════
// src/pages/LoginPage.jsx
// ══════════════════════════════════════════════════════════════════
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/voyages');
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)' }}
    >
      <div className="glass-card p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🚌</div>
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Sunu<span className="underline decoration-[#e8a045]">gare</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Gestion de Gare Routière</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-300 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/60 text-sm mb-1.5">Adresse email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                className="input-glass pl-9"
                placeholder="admin@sunugare.sn"
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                className="input-glass pl-9"
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-base justify-center mt-2 disabled:opacity-60"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2024 SUNUGARE — Gare des Baux Maraîchers
        </p>
      </div>
    </div>
  );
}
