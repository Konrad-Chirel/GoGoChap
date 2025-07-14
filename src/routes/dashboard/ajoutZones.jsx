import { useState } from 'react';

function ZonesGeographiques() {
  const [zones, setZones] = useState([]);
  const [zoneNom, setZoneNom] = useState('');
  const [zoneType, setZoneType] = useState('');

  const ajouterZone = () => {
    if (!zoneNom.trim() || !zoneType) return;

    const nouvelleZone = {
      id: Date.now(),
      nom: zoneNom.trim(),
      type: zoneType
    };

    setZones([...zones, nouvelleZone]);
    setZoneNom('');
    setZoneType('');
  };

  const supprimerZone = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
      setZones(zones.filter((zone) => zone.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ajout de zone géographique</h1>

      <div className="bg-white shadow rounded-lg p-8 max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <label className="block mb-3 font-semibold text-gray-700 text-center" htmlFor="zoneNom">
            Nom de la zone
          </label>
          <input
            id="zoneNom"
            type="text"
            placeholder="Nom de la zone"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 text-center"
            value={zoneNom}
            onChange={(e) => setZoneNom(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-gray-700 text-center" htmlFor="zoneType">
            Type de la zone
          </label>
          <select
            id="zoneType"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 text-center"
            value={zoneType}
            onChange={(e) => setZoneType(e.target.value)}
          >
            <option value="">Sélectionner un type</option>
            <option value="Ville">Ville</option>
            <option value="Quartier">Quartier</option>
            <option value="Arrondissement">Arrondissement</option>
          </select>
        </div>

        <button
          onClick={ajouterZone}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-center"
        >
          Ajouter
        </button>
      </div>

      {zones.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-8">Aucune zone ajoutée pour l’instant.</p>
      ) : (
        <div className="overflow-x-auto max-w-5xl mx-auto mt-8">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{zone.nom}</td>
                  <td className="p-3">{zone.type}</td>
                  <td className="p-3">
                    <button
                      onClick={() => supprimerZone(zone.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ZonesGeographiques;
