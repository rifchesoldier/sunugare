const statusMap = {
  planifie:        { label: 'Planifie',    cls: 'bg-blue-100 text-blue-700' },
  en_cours:        { label: 'En cours',    cls: 'bg-yellow-100 text-yellow-700' },
  termine:         { label: 'Termine',     cls: 'bg-gray-100 text-gray-600' },
  annule:          { label: 'Annule',      cls: 'bg-red-100 text-red-700' },
  confirmee:       { label: 'Confirmee',   cls: 'bg-green-100 text-green-700' },
  disponible:      { label: 'Disponible',  cls: 'bg-green-100 text-green-700' },
  en_service:      { label: 'En service',  cls: 'bg-blue-100 text-blue-700' },
  en_maintenance:  { label: 'Maintenance', cls: 'bg-orange-100 text-orange-700' },
  actif:           { label: 'Actif',       cls: 'bg-green-100 text-green-700' },
  inactif:         { label: 'Inactif',     cls: 'bg-gray-100 text-gray-600' },
  suspendu:        { label: 'Suspendu',    cls: 'bg-red-100 text-red-700' },
};

export default function Badge({ status }) {
  const config = statusMap[status] || { label: status, cls: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.cls}`}>
      {config.label}
    </span>
  );
}