import React, { useState } from "react";

export default function RepartitionTarifs() {
  const [modeEdition, setModeEdition] = useState(false);

  const [tarifs, setTarifs] = useState([
    {
      titre: "Frais de livraison standard",
      description: "Jusqu'à 3 km",
      montant: "500 fcfa",
    },
    {
      titre: "Frais par km supplémentaire",
      description: "Au-delà de 3 km",
      montant: "200 fcfa",
    },
    {
      titre: "Bonus intempéries",
      description: "Pluie, neige, etc.",
      montant: "500 fcfa",
    },
    {
      titre: "Bonus heures de pointe",
      description: "19h - 21h",
      montant: "50 fcfa",
    },
  ]);

  const handleMontantChange = (index, newMontant) => {
    const updatedTarifs = [...tarifs];
    updatedTarifs[index].montant = newMontant;
    setTarifs(updatedTarifs);
  };

  const handleToggleEdition = () => {
    setModeEdition(!modeEdition);
  };

  return (
    <div className="min-h-screen bg-[#faf3f1] px-4 py-6 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          Gestion des tarifs
        </h1>

        <div className="bg-white rounded-2xl shadow px-4 sm:px-6 py-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <button
              onClick={handleToggleEdition}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              {modeEdition ? "Enregistrer" : "Modifier"}
            </button>
          </div>

          <div className="space-y-6">
            {tarifs.map((tarif, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
              >
                {/* Infos du tarif */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{tarif.titre}</h3>
                  <p className="text-sm text-gray-400">{tarif.description}</p>
                </div>

                {/* Montant ou input */}
                <div className="sm:text-right">
                  {modeEdition ? (
                    <input
                      type="text"
                      value={tarif.montant}
                      onChange={(e) => handleMontantChange(index, e.target.value)}
                      className="text-sm text-gray-800 border border-gray-300 rounded px-2 py-1 w-full sm:w-28 focus:outline-none focus:ring focus:ring-blue-400"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 mt-1 sm:mt-0">{tarif.montant}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
