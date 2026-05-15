import { useState } from 'react'
import { Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import VoyageList from '../components/voyages/VoyageList'
import useApi from '../hooks/useApi'

export default function VoyagePage() {
  const api = useApi()
  const [search,  setSearch]  = useState('')
  const [statut,  setStatut]  = useState('')

  const { data: voyages = [], isLoading } = useQuery({
    queryKey: ['voyages', search, statut],
    queryFn: () => api.get('/voyages', { params: { destination: search, statut } }).then(r => r.data.data ?? r.data),
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Voyages</h2>

      {/* Barre de recherche */}
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
        <button className="btn-primary px-4">Filtrer</button>
      </div>

      {/* Liste */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-4 h-48 animate-pulse bg-white/5" />
          ))}
        </div>
      ) : (
        <VoyageList voyages={voyages} onReserver={v => console.log('reserver', v)} />
      )}
    </div>
  )
}
