import { useState } from 'react';
import { useApi } from '../../hooks/useApi';

export default function ReservationForm({ voyage, onSuccess }) {
  const { post, loading, error } = useApi();
  const [form, setForm] = useState({
    voyage_id:          voyage?.id || '',
    passager_nom:       '',
    passager_telephone: '',
    nombre_places:      1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await post('/reservations', form);
    if (result.success) {
      alert(`Billet reserve ! Numero: ${result.data.numero_ticket}`);
      onSuccess();
    }
  };

  const total = voyage ? (voyage.prix * form.nombre_places).toLocaleString('fr-SN') : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
      )}

      {voyage && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm">
          <p className="font-semibold text-green-800">{voyage.origine} - {voyage.destination}</p>
          <p className="text-green-600 mt-1">
            Depart: {new Date(voyage.heure_depart).toLocaleString('fr-SN')}
          </p>
          <p className="text-green-600">
            Prix: {Number(voyage.prix).toLocaleString('fr-SN')} FCFA / place
          </p>
          <p className="text-green-600">{voyage.places_disponibles} places disponibles</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet du passager</label>
        <input
          type="text"
          required
          value={form.passager_nom}
          onChange={(e) => setForm({ ...form, passager_nom: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
        <input
          type="tel"
          required
          value={form.passager_telephone}
          onChange={(e) => setForm({ ...form, passager_telephone: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de places</label>
        <input
          type="number"
          required
          min="1"
          max={voyage?.places_disponibles || 10}
          value={form.nombre_places}
          onChange={(e) => setForm({ ...form, nombre_places: parseInt(e.target.value) })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Montant total</span>
          <span className="text-lg font-bold text-green-600">{total} FCFA</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? 'Traitement en cours...' : 'Confirmer la reservation'}
      </button>
    </form>
  );
}