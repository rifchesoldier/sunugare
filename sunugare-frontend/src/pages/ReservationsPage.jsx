import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import Badge from '../components/common/Badge';

export default function ReservationsPage() {
  const { get, patch, loading } = useApi();
  const [reservations, setRes] = useState([]);
  const [meta, setMeta]        = useState({});
  const [page, setPage]        = useState(1);

  const fetch = useCallback(async () => {
    const { success, data } = await get('/reservations', { page });
    if (success) { setRes(data.data); setMeta(data.meta); }
  }, [page]);

  useEffect(() => { fetch(); }, [fetch]);

  const annuler = async (id) => {
    if (!confirm('Annuler cette reservation ?')) return;
    const result = await patch(`/reservations/${id}/annuler`);
    if (result.success) fetch();
    else alert(result.message);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reservations</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Ticket', 'Passager', 'Trajet', 'Places', 'Montant', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{r.numero_ticket}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">{r.passager_nom}</p>
                    <p className="text-xs text-gray-500">{r.passager_telephone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {r.voyage?.origine} - {r.voyage?.destination}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-medium">{r.nombre_places}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {Number(r.montant_total).toLocaleString('fr-SN')} FCFA
                  </td>
                  <td className="px-6 py-4"><Badge status={r.statut} /></td>
                  <td className="px-6 py-4">
                    {r.statut === 'confirmee' && (
                      <button
                        onClick={() => annuler(r.id)}
                        className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Annuler
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {meta.last_page > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <span className="text-sm text-gray-500">Total: {meta.total}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Precedent</button>
              <span className="px-3 py-1 text-sm">{page}/{meta.last_page}</span>
              <button disabled={page === meta.last_page} onClick={() => setPage(page + 1)}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40">Suivant</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}