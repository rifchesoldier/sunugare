import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';

export default function VoyageForm({ voyage, onSuccess }) {
  const { get, post, put, loading, error } = useApi();
  const [vehicules, setVehicules]         = useState([]);
  const [chauffeurs, setChauffeurs]       = useState([]);
  const [form, setForm] = useState({
    origine:               voyage?.origine || '',
    destination:           voyage?.destination || '',
    prix:                  voyage?.prix || '',
    heure_depart:          voyage?.heure_depart
      ? new Date(voyage.heure_depart).toISOString().slice(0, 16)
      : '',
    heure_arrivee_estimee: voyage?.heure_arrivee_estimee
      ? new Date(voyage.heure_arrivee_estimee).toISOString().slice(0, 16)
      : '',
    vehicule_id:           voyage?.vehicule?.id || '',
    chauffeur_id:          voyage?.chauffeur?.id || '',
  });

  useEffect(() => {
    get('/vehicules').then(({ data }) => setVehicules(data?.data || []));
    get('/chauffeurs').then(({ data }) => setChauffeurs(data?.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fn     = voyage ? put : post;
    const url    = voyage ? `/voyages/${voyage.id}` : '/voyages';
    const result = await fn(url, form);
    if (result.success) onSuccess();
  };

  const field = (label, name, type = 'text', opts = {}) => (
    <div key={name}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        {...opts}
        required
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {field('Origine', 'origine')}
        {field('Destination', 'destination')}
        {field('Prix (FCFA)', 'prix', 'number', { min: 0, step: 100 })}
        {field('Heure de depart', 'heure_depart', 'datetime-local')}
        {field('Arrivee estimee', 'heure_arrivee_estimee', 'datetime-local', { required: false })}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicule</label>
        <select
          value={form.vehicule_id}
          onChange={(e) => setForm({ ...form, vehicule_id: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">-- Selectionner un vehicule --</option>
          {vehicules.map((v) => (
            <option key={v.id} value={v.id}>
              {v.immatriculation} - {v.marque} {v.modele} ({v.capacite} places)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chauffeur</label>
        <select
          value={form.chauffeur_id}
          onChange={(e) => setForm({ ...form, chauffeur_id: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">-- Selectionner un chauffeur --</option>
          {chauffeurs.map((c) => (
            <option key={c.id} value={c.id}>{c.nom_complet}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? 'Enregistrement...' : voyage ? 'Mettre a jour' : 'Creer le voyage'}
        </button>
      </div>
    </form>
  );
}