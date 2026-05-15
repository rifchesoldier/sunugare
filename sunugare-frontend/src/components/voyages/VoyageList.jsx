import { useState } from 'react'
import { Clock, DollarSign, Users, Tag } from 'lucide-react'
import VoyageForm from './VoyageForm'

function StatusBadge({ statut }) {
  if (statut === 'disponible') return <span className="badge-disponible">Disponible 🔖</span>
  if (statut === 'complet')    return <span className="badge-complet">Complet 🔖</span>
  return <span className="badge-annule">Annulé</span>
}

function VoyageCard({ voyage, onReserver }) {
  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      {/* Image bus + badge */}
      <div className="flex justify-between items-start">
        <div className="text-4xl">🚌</div>
        <StatusBadge statut={voyage.statut} />
      </div>

      {/* Titre */}
      <h3 className="text-white font-bold text-lg">
        {voyage.depart} - {voyage.destination}
      </h3>

      {/* Infos */}
      <div className="space-y-1 text-sm text-white/75">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[#e8a045]" />
          <span>{voyage.heure_depart}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-[#e8a045]" />
          <span>{voyage.prix} FCFA</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#e8a045]" />
          <span>{voyage.places_disponibles} places</span>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onReserver(voyage)}
          disabled={voyage.statut !== 'disponible'}
          className="flex-1 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Réserver
        </button>
        <button className="flex-1 btn-ghost text-sm">
          Détails
        </button>
      </div>
    </div>
  )
}

export default function VoyageList({ voyages = [], onReserver }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {voyages.length === 0 ? (
        <div className="col-span-2 text-center text-white/40 py-12">
          Aucun voyage trouvé.
        </div>
      ) : (
        voyages.map(v => (
          <VoyageCard key={v.id} voyage={v} onReserver={onReserver} />
        ))
      )}
    </div>
  )
}
