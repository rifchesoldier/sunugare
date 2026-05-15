export default function StatCard({ title, value, subtitle, color = 'green' }) {
  const colors = {
    green:  'border-green-500 text-green-600',
    blue:   'border-blue-500 text-blue-600',
    orange: 'border-orange-500 text-orange-600',
    red:    'border-red-500 text-red-600',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${colors[color]}`}>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[color].split(' ')[1]}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}