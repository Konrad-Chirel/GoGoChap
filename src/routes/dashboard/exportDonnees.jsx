import React, { useState } from "react";
import { format } from "date-fns";

// Types et formats de rapports disponibles
const TYPES_RAPPORT = [
  { label: "Financier", value: "financier" },
  { label: "Opérationnel", value: "operationnel" },
  { label: "Statistique", value: "statistique" },
];

const FORMATS = [
  { label: "PDF", value: "pdf" },
  { label: "Excel", value: "excel" },
];

const ExportDonnee = () => {
  // États pour les filtres et l'historique
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [typeRapport, setTypeRapport] = useState("");
  const [formatRapport, setFormatRapport] = useState("");
  const [historique, setHistorique] = useState([]);

  // Gestion de la génération du rapport
  const handleGenerer = (e) => {
    e.preventDefault();
    if (!dateDebut || !dateFin || !typeRapport || !formatRapport) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    // Ajoute à l'historique (simulation)
    setHistorique([
      {
        id: Date.now(),
        type: TYPES_RAPPORT.find(t => t.value === typeRapport)?.label,
        periode: `${format(new Date(dateDebut), "dd/MM/yyyy")} - ${format(new Date(dateFin), "dd/MM/yyyy")}`,
        dateGen: format(new Date(), "dd/MM/yyyy HH:mm"),
        format: formatRapport.toUpperCase(),
      },
      ...historique,
    ]);
    // Simule le téléchargement
    alert(`Téléchargement du rapport ${typeRapport} (${formatRapport.toUpperCase()})...`);
  };

  // Gestion du téléchargement simulé depuis l'historique
  const handleTelecharger = (rapport) => {
    alert(`Téléchargement du rapport ${rapport.type} (${rapport.format}) pour la période ${rapport.periode}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Rapport & Exports </h1>
      {/* Formulaire de génération */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        onSubmit={handleGenerer}
      >
        {/* Sélecteurs de dates */}
        <div>
          <label className="block text-sm font-medium mb-1">Date de début</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 text-sm"
            value={dateDebut}
            max={dateFin || undefined}
            onChange={e => setDateDebut(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de fin</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 text-sm"
            value={dateFin}
            min={dateDebut || undefined}
            onChange={e => setDateFin(e.target.value)}
            required
          />
        </div>
        {/* Sélecteur type de rapport */}
        <div>
          <label className="block text-sm font-medium mb-1">Type de rapport</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={typeRapport}
            onChange={e => setTypeRapport(e.target.value)}
            required
          >
          
            {TYPES_RAPPORT.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* Sélecteur format */}
        <div>
          <label className="block text-sm font-medium mb-1">Format</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={formatRapport}
            onChange={e => setFormatRapport(e.target.value)}
            required
          >
            
            {FORMATS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* Bouton Générer */}
        <div className="md:col-span-2 flex justify-end items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded  font-semibold hover:bg-blue-700 transition"
          >
            Générer le rapport
          </button>
        </div>
      </form>

      {/* Historique des rapports */}
      <h2 className="text-lg font-bold mb-3">Historique des rapports générés</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 border-b text-left">Type</th>
              <th className="py-2 px-3 border-b text-left">Période</th>
              <th className="py-2 px-3 border-b text-left">Date de génération</th>
              <th className="py-2 px-3 border-b text-left">Format</th>
              <th className="py-2 px-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {historique.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-6">Aucun rapport généré.</td>
              </tr>
            ) : (
              historique.map(rapport => (
                <tr key={rapport.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-3 border-b">{rapport.type}</td>
                  <td className="py-2 px-3 border-b">{rapport.periode}</td>
                  <td className="py-2 px-3 border-b">{rapport.dateGen}</td>
                  <td className="py-2 px-3 border-b">{rapport.format}</td>
                  <td className="py-2 px-3 border-b">
                    <button
                      className="text-blue-600 hover:underline font-medium"
                      onClick={() => handleTelecharger(rapport)}
                    >
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExportDonnee;