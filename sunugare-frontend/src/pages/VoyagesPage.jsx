// src/pages/VoyagesPage.jsx
// ⚠️ NOTE : votre fichier s'appelle VoyagesPage.jsx (avec s) pas VoyagePage.jsx
import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import VoyageList from '../components/voyages/VoyageList';
import Modal from '../components/common/Modal';
import VoyageForm from '../components/voyages/VoyageForm';
import ReservationForm from '../components/reservations/ReservationForm';

export default function VoyagesPage() {
  const { get, loading } = useApi();
  const [voyages, setVoyages] = useState([]);
  const [search,  setSearch]  = useState('');
  const [statut,  setStatut]  = useState('');
  const [selectedVoyage, setSelectedVoyage] = useState(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchVoyages = useCallback(async () => {
    const params = {};
    if (search) params.destination = search;
    if (statut) params.statut = statut;
    const { success, data } = await get('/voyages', params);
    if (success) setVoyages(data?.data || []);
  }, [search, statut]);

  useEffect(() => { fetchVoyages(); }, [fetchVoyages]);

  const handleReserver = (voyage) => {
    setSelectedVoyage(voyage);
    setShowReserveModal(true);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white text-center mb-6">Voyages</h2>

      {/* Barre de recherche + filtres */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            className="input-glass pl-9"
            placeholder="Destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-glass w-40"
          value={statut}
          onChange={e => setStatut(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="disponible">Disponible</option>
          <option value="complet">Complet</option>
          <option value="annule">Annulé</option>
        </select>
        <button className="btn-primary px-4" onClick={fetchVoyages}>
          Filtrer
        </button>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-4 h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <VoyageList voyages={voyages} onReserver={handleReserver} />
      )}

      {/* Modal Réservation */}
      {showReserveModal && selectedVoyage && (
        <Modal
          title={`Réserver — ${selectedVoyage.origine} → ${selectedVoyage.destination}`}
          onClose={() => setShowReserveModal(false)}
        >
          <ReservationForm
            voyage={selectedVoyage}
            onSuccess={() => { setShowReserveModal(false); fetchVoyages(); }}
          />
        </Modal>
      )}
    </div>
  );
}
