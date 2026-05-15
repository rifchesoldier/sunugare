// src/components/voyages/VoyageForm.jsx
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';

export default function VoyageForm({ voyage, onSuccess }) {
  const { get, post, put, loading, error } = useApi();
  const [vehicules,  setVehicules]  = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [form, setForm] = useState({
    origine:               voyage?.origine || '',
    destination:           voyage?.destination || '',
    prix:                  voyage?.prix || '',
    heure_depart:          voyage?.heure_depart
      ? new Date(voyage.heure_depart).toISOString().slice(0, 16) : '',
    heure_arrivee_estimee: voyage?.heure_arrivee_estimee
      ? new Date(voyage.heure_arrivee_estimee).toISOString().slice(0, 16) : '',
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

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  // Style unifié glassmorphism pour tous les inputs
  const inputClass = "input-glass";
  const labelClass = "block text-sm font-medium text-white/70 mb-1";
  const selectClass = "input-glass";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl p-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Origine</label>
          <input type="text" value={form.origine} onChange={set('origine')}
            className={inputClass} placeholder="Dakar" required />
        </div>
        <div>
          <label className={labelClass}>Destination</label>
          <input type="text" value={form.destination} onChange={set('destination')}
            className={inputClass} placeholder="Thiès" required />
        </div>
        <div>
          <label className={labelClass}>Prix (FCFA)</label>
          <input type="number" value={form.prix} onChange={set('prix')}
            className={inputClass} min="0" step="100" required />
        </div>
        <div>
          <label className={labelClass}>Heure de départ</label>
          <input type="datetime-local" value={form.heure_depart} onChange={set('heure_depart')}
            className={inputClass} required />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Arrivée estimée</label>
          <input type="datetime-local" value={form.heure_arrivee_estimee}
            onChange={set('heure_arrivee_estimee')} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Véhicule</label>
        <select value={form.vehicule_id} onChange={set('vehicule_id')} className={selectClass} required>
          <option value="" className="bg-[#1a1a2e]">-- Sélectionner un véhicule --</option>
          {vehicules.map((v) => (
            <option key={v.id} value={v.id} className="bg-[#1a1a2e]">
              {v.immatriculation} - {v.marque} {v.modele} ({v.capacite} places)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Chauffeur</label>
        <select value={form.chauffeur_id} onChange={set('chauffeur_id')} className={selectClass} required>
          <option value="" className="bg-[#1a1a2e]">-- Sélectionner un chauffeur --</option>
          {chauffeurs.map((c) => (
            <option key={c.id} value={c.id} className="bg-[#1a1a2e]">
              {c.nom_complet}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : voyage ? 'Mettre à jour' : 'Créer le voyage'}
        </button>
      </div>
    </form>
  );
}
