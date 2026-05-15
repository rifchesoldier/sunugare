import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import VoyageForm from '../components/voyages/VoyageForm';
import ReservationForm from '../components/reservations/ReservationForm';

export default function VoyagesPage() {
  const { get, del, loading } = useApi();
  const { isAgent }           = useAuth();
  const [voyages, setVoyages] = useState([]);
  const [meta, setMeta]       = useState({});
  const [page, setPage]       = useState(1);
  const [filters, setFilters] = useState({ destination: '', statut: '' });
  const [modal, setModal]     = useState({ type: null, data: null });

  const fetchVoyages = useCallback(async () => {
    const { success, data } = await get('/voyages', { ...filters, page });
    if (success) {
      setVoyages(data.data);
      setMeta(data.meta);
    }
  }, [page, filters]);

  useEffect(() => { fetchVoyages(); }, [fetchVoyages]);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce voyage ?')) return;
    const { success, message } = await del(`/voyages/${id}`);
    if (success) fetchVoyages();
    else alert(message);
  };

  const formatDate = (iso) => new Date(iso).toLocaleString('fr-SN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Voyages</h1>
        {isAgent && (
          <button
            onClick={() => setModal({ type: 'create', data: null })}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Nouveau Voyage
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Destination..."
          value={filters.destination}
          onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={filters.statut}
          onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Tous les statuts</option>
          <option value="planifie">Planifie</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Termine</option>
          <option value="annule">Annule</option>
        </select>
        <button
          onClick={() => { setPage(1); fetchVoyages(); }}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
        >
          Filtrer
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Trajet', 'Depart', 'Prix', 'Places', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {voyages.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{v.origine}</p>
                    <p className="text-sm text-gray-500">vers {v.destination}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(v.heure_depart)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {Number(v.prix).toLocaleString('fr-SN')} FCFA
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${v.taux_occupation}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {v.places_disponibles}/{v.places_totales}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge status={v.statut} /></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setModal({ type: 'reserve', data: v })}
                        className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Reserver
                      </button>
                      {isAgent && (
                        <>
                          <button
                            onClick={() => setModal({ type: 'edit', data: v })}
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Total: {meta.total} voyages</span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Precedent
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">{page} / {meta.last_page}</span>
              <button
                disabled={page === meta.last_page}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={modal.type === 'create' || modal.type === 'edit'}
        onClose={() => setModal({ type: null, data: null })}
        title={modal.type === 'edit' ? 'Modifier le Voyage' : 'Nouveau Voyage'}
        size="lg"
      >
        <VoyageForm
          voyage={modal.data}
          onSuccess={() => { setModal({ type: null, data: null }); fetchVoyages(); }}
        />
      </Modal>

      <Modal
        isOpen={modal.type === 'reserve'}
        onClose={() => setModal({ type: null, data: null })}
        title="Reserver un billet"
        size="md"
      >
        <ReservationForm
          voyage={modal.data}
          onSuccess={() => { setModal({ type: null, data: null }); fetchVoyages(); }}
        />
      </Modal>
    </div>
  );
}