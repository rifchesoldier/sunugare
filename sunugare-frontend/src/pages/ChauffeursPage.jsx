import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const ChauffeursPage = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { get } = useApi();

    useEffect(() => {
        fetchChauffeurs();
    }, []);

    const fetchChauffeurs = async () => {
        try {
            const response = await get('/chauffeurs');
            setChauffeurs(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des chauffeurs", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Chauffeurs</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    + Recruter un chauffeur
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Chargement de l'équipe...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600">Nom & Prénom</th>
                                <th className="p-4 font-semibold text-gray-600">N° Permis</th>
                                <th className="p-4 font-semibold text-gray-600">Téléphone</th>
                                <th className="p-4 font-semibold text-gray-600">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chauffeurs.map((chauffeur) => (
                                <tr key={chauffeur.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-900 font-medium">
                                        {chauffeur.prenom} {chauffeur.nom}
                                    </td>
                                    <td className="p-4 text-gray-600">{chauffeur.numero_permis}</td>
                                    <td className="p-4 text-gray-600">{chauffeur.telephone}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            chauffeur.statut === 'disponible' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {chauffeur.statut}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ChauffeursPage;
