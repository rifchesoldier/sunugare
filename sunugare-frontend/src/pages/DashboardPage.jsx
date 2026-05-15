import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import StatCard from '../components/common/StatCard';

export default function DashboardPage() {
  const { get, loading } = useApi();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    get('/dashboard').then(({ success, data }) => {
      if (success) setStats(data);
    });
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const formatMoney = (v) =>
    new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(v || 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ventes du jour"
          value={formatMoney(stats.ventes_jour?.total)}
          subtitle={`${stats.ventes_jour?.nombre || 0} reservations`}
          color="green"
        />
        <StatCard
          title="Ventes du mois"
          value={formatMoney(stats.ventes_mois?.total)}
          subtitle={`${stats.ventes_mois?.nombre || 0} reservations`}
          color="blue"
        />
        <StatCard
          title="Taux d'occupation"
          value={`${stats.taux_occupation_moyen || 0}%`}
          subtitle="Moyenne tous voyages"
          color="orange"
        />
        <StatCard
          title="Voyages planifies"
          value={stats.voyages_actifs || 0}
          subtitle="En attente de depart"
          color="red"
        />
      </div>

      {/* Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Destinations (30 jours)</h2>
          <div className="space-y-3">
            {stats.top_destinations?.map((dest, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{dest.destination}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{formatMoney(dest.revenu)}</p>
                  <p className="text-xs text-gray-400">{dest.total_billets} places</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolution mensuelle */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolution Mensuelle {new Date().getFullYear()}</h2>
          <div className="space-y-2">
            {stats.evolution_mensuelle?.map((m) => {
              const moisNoms = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
              const max = Math.max(...stats.evolution_mensuelle.map((x) => x.total));
              const pct = max ? (m.total / max) * 100 : 0;
              return (
                <div key={m.mois} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-8">{moisNoms[m.mois - 1]}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-24 text-right">
                    {formatMoney(m.total)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
