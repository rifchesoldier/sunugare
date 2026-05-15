// ══════════════════════════════════════════════════════════════════
// src/components/reservations/ReservationForm.jsx
// Formulaire de réservation glassmorphism
// ══════════════════════════════════════════════════════════════════
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { User, Phone, Users } from 'lucide-react';

export default function ReservationForm({ voyage, onSuccess }) {
  const { post, loading, error } = useApi();
  const [form, setForm] = useState({
    passager_nom:       '',
    passager_telephone: '',
    nombre_places:      1,
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await post('/reservations', {
      ...form,
      voyage_id: voyage.id,
    });
    if (result.success) onSuccess(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Infos voyage */}
      <div className="glass-card p-4 bg-white/5">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Voyage sélectionné</p>
        <p className="text-white font-semibold">{voyage.origine} → {voyage.destination}</p>
        <p className="text-[#e8a045] text-sm mt-0.5">
          {Number(voyage.prix).toLocaleString('fr-SN')} FCFA / place
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label className="block text-white/60 text-sm mb-1.5">Nom du passager</label>
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            className="input-glass pl-9"
            placeholder="Moussa Diallo"
            value={form.passager_nom}
            onChange={set('passager_nom')}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-1.5">Téléphone</label>
        <div className="relative">
          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="tel"
            className="input-glass pl-9"
            placeholder="77 XXX XX XX"
            value={form.passager_telephone}
            onChange={set('passager_telephone')}
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-1.5">Nombre de places</label>
        <div className="relative">
          <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="number"
            className="input-glass pl-9"
            min="1"
            max={voyage.places_disponibles}
            value={form.nombre_places}
            onChange={set('nombre_places')}
            required
          />
        </div>
        <p className="text-white/30 text-xs mt-1">
          {voyage.places_disponibles} places disponibles
        </p>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-3 border-t border-white/10">
        <span className="text-white/60 text-sm">Total</span>
        <span className="text-[#e8a045] font-bold text-lg">
          {(Number(voyage.prix) * Number(form.nombre_places)).toLocaleString('fr-SN')} FCFA
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 justify-center disabled:opacity-60"
      >
        {loading ? 'Réservation en cours...' : '✅ Confirmer la réservation'}
      </button>
    </form>
  );
}
