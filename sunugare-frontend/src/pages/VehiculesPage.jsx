import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const VehiculesPage = () => {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const { get } = useApi();

    useEffect(() => {
        fetchVehicules();
    }, []);

    const fetchVehicules = async () => {
        try {
            const response = await get('/vehicules');
            setVehicules(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des véhicules", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion du Parc Automobile</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    + Ajouter un véhicule
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10">Chargement des véhicules...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicules.map((vehicule) => (
                        <div key={vehicule.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{vehicule.immatriculation}</h3>
                                    <p className="text-sm text-gray-500">{vehicule.marque} - {vehicule.modele}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    vehicule.statut === 'en_service' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {vehicule.statut.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Capacité :</span>
                                    <span className="font-medium text-gray-900">{vehicule.capacite} places</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Type :</span>
                                    <span className="font-medium text-gray-900">{vehicule.type_vehicule}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehiculesPage;
