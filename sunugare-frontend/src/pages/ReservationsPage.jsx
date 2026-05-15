// src/pages/ReservationsPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import { ChevronLeft, ChevronRight, XCircle } from 'lucide-react';

function StatusBadge({ status }) {
  const map = {
    confirmee: 'bg-green-400/20  text-green-300  border border-green-400/30',
    annulee:   'bg-red-400/20    text-red-300    border border-red-400/30',
    en_attente:'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
  };
  const cls = map[status] || 'bg-white/10 text-white/60 border border-white/20';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

export default function ReservationsPage() {
  const { get, patch, loading } = useApi();
  const [reservations, setRes] = useState([]);
  const [meta, setMeta]        = useState({});
  const [page, setPage]        = useState(1);

  const fetchData = useCallback(async () => {
    const { success, data } = await get('/reservations', { page });
    if (success) { setRes(data.data || []); setMeta(data.meta || {}); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const annuler = async (id) => {
    if (!confirm('Annuler cette réservation ?')) return;
    const result = await patch(`/reservations/${id}/annuler`);
    if (result.success) fetchData();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Réservations</h1>

      <div className="glass-card overflow-hidden p-0">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin w-10 h-10 border-4 border-[#e8a045] border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Ticket', 'Passager', 'Trajet', 'Places', 'Montant', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-white/30">
                      Aucune réservation trouvée.
                    </td>
                  </tr>
                ) : reservations.map(r => (
                  <tr key={r.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs bg-white/10 text-white/80 px-2 py-1 rounded-lg">
                        {r.numero_ticket}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white text-sm font-medium">{r.passager_nom}</p>
                      <p className="text-white/40 text-xs">{r.passager_telephone}</p>
                    </td>
                    <td className="px-5 py-4 text-white/70 text-sm">
                      {r.voyage?.origine} → {r.voyage?.destination}
                    </td>
                    <td className="px-5 py-4 text-white text-sm text-center font-medium">
                      {r.nombre_places}
                    </td>
                    <td className="px-5 py-4 text-[#e8a045] text-sm font-semibold">
                      {Number(r.montant_total).toLocaleString('fr-SN')} FCFA
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.statut} />
                    </td>
                    <td className="px-5 py-4">
                      {r.statut === 'confirmee' && (
                        <button
                          onClick={() => annuler(r.id)}
                          className="flex items-center gap-1 text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-400/30 px-3 py-1.5 rounded-lg transition-all"
                        >
                          <XCircle size={12} /> Annuler
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
            <span className="text-white/40 text-sm">Total : {meta.total}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-1.5 btn-ghost disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-white/70 text-sm px-2">{page} / {meta.last_page}</span>
              <button
                disabled={page === meta.last_page}
                onClick={() => setPage(p => p + 1)}
                className="p-1.5 btn-ghost disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
