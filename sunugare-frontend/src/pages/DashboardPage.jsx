// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { TrendingUp, Users, Bus, BarChart3 } from 'lucide-react';

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const colors = {
    green:  'text-green-400  bg-green-400/10  border-green-400/20',
    blue:   'text-blue-400   bg-blue-400/10   border-blue-400/20',
    orange: 'text-[#e8a045] bg-[#e8a045]/10  border-[#e8a045]/20',
    red:    'text-red-400    bg-red-400/10    border-red-400/20',
  };
  const cls = colors[color] || colors.green;

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wider">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${cls}`}>
            <Icon size={20} className={cls.split(' ')[0]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { get, loading } = useApi();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    get('/dashboard').then(({ success, data }) => {
      if (success) setStats(data);
    });
  }, []);

  const formatMoney = (v) =>
    new Intl.NumberFormat('fr-SN', {
      style: 'currency', currency: 'XOF', maximumFractionDigits: 0,
    }).format(v || 0);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-[#e8a045] border-t-transparent rounded-full" />
      </div>
    );
  }

  const moisNoms = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const maxMois  = Math.max(...(stats.evolution_mensuelle || []).map(x => x.total), 1);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ventes du jour"
          value={formatMoney(stats.ventes_jour?.total)}
          subtitle={`${stats.ventes_jour?.nombre || 0} réservations`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Ventes du mois"
          value={formatMoney(stats.ventes_mois?.total)}
          subtitle={`${stats.ventes_mois?.nombre || 0} réservations`}
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="Taux occupation"
          value={`${stats.taux_occupation_moyen || 0}%`}
          subtitle="Moyenne tous voyages"
          icon={Users}
          color="orange"
        />
        <StatCard
          title="Voyages planifiés"
          value={stats.voyages_actifs || 0}
          subtitle="En attente de départ"
          icon={Bus}
          color="red"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Destinations */}
        <div className="glass-card p-6">
          <h2 className="text-white font-semibold text-lg mb-4">
            🏆 Top Destinations <span className="text-white/40 text-sm font-normal">(30 jours)</span>
          </h2>
          <div className="space-y-3">
            {(stats.top_destinations || []).map((dest, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#e8a045]/20 text-[#e8a045] rounded-full flex items-center justify-center text-xs font-bold border border-[#e8a045]/30">
                    {i + 1}
                  </span>
                  <span className="text-white/80 text-sm">{dest.destination}</span>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">{formatMoney(dest.revenu)}</p>
                  <p className="text-white/40 text-xs">{dest.total_billets} places</p>
                </div>
              </div>
            ))}
            {!stats.top_destinations?.length && (
              <p className="text-white/30 text-center py-4 text-sm">Aucune donnée</p>
            )}
          </div>
        </div>

        {/* Evolution mensuelle */}
        <div className="glass-card p-6">
          <h2 className="text-white font-semibold text-lg mb-4">
            📈 Evolution {new Date().getFullYear()}
          </h2>
          <div className="space-y-2.5">
            {(stats.evolution_mensuelle || []).map((m) => {
              const pct = (m.total / maxMois) * 100;
              return (
                <div key={m.mois} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-8 shrink-0">
                    {moisNoms[m.mois - 1]}
                  </span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-[#e8a045] h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-white/70 text-xs w-24 text-right shrink-0">
                    {formatMoney(m.total)}
                  </span>
                </div>
              );
            })}
            {!stats.evolution_mensuelle?.length && (
              <p className="text-white/30 text-center py-4 text-sm">Aucune donnée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
