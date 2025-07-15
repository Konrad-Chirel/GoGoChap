import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const COLORS = ["#ffc107", "#1d4ed8"];

const GestionTarifs= () => {
  // États pour les répartitions
  const [commandePartenaire, setCommandePartenaire] = useState(80);
  const [livraisonLivreur, setLivraisonLivreur] = useState(80);

  // Simule montants totaux (à remplacer par tes vraies données)
  const montantTotalCommande = 1000000; // ex. 1 000 000 FCFA total commandes
  const montantTotalLivraison = 500000; // ex. 500 000 FCFA total livraisons

  // Calcul des montants GogoChap et Partenaires sur commande
  const montantPartenaireCommande = (commandePartenaire / 100) * montantTotalCommande;
  const montantGogoChapCommande = montantTotalCommande - montantPartenaireCommande;

  // Calcul des montants GogoChap et Livreur sur livraison
  const montantLivreurLivraison = (livraisonLivreur / 100) * montantTotalLivraison;
  const montantGogoChapLivraison = montantTotalLivraison - montantLivreurLivraison;

  // Totaux
  const soldeGeneral = montantTotalCommande + montantTotalLivraison;
  const soldeGogoChap = montantGogoChapCommande + montantGogoChapLivraison;
  const soldePartenaires = montantPartenaireCommande + montantLivreurLivraison;

  // Données graphiques (inchangées)
  const revenueCommandeData = [
    { name: "Pour partenaires", value: commandePartenaire },
    { name: "Pour GoGoChop", value: 100 - commandePartenaire },
  ];

  const revenueLivraisonData = [
    { name: "Pour livreur", value: livraisonLivreur },
    { name: "Pour GoGoChop", value: 100 - livraisonLivreur },
  ];

  // Gestion des changements avec borne [0, 100]
  const handleInputChange = (setter) => (e) => {
    const val = Math.max(0, Math.min(100, parseInt(e.target.value || "0")));
    setter(val);
  };

  return (
    <div className="w-full px-4 md:px-12 py-6 bg-[#fff9f9] min-h-screen overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Répartition des revenus
      </h2>

      {/* 3 cases solde */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* Solde général */}
        <div className="flex-1 bg-green-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Solde Général</h3>
          <p className="text-3xl font-bold">{soldeGeneral.toLocaleString()} FCFA</p>
        </div>

        {/* Solde GogoChap */}
        <div className="flex-1 bg-[#1d4ed8] text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Solde GogoChap</h3>
          <p>
            Commande : {montantGogoChapCommande.toLocaleString()} FCFA
          </p>
          <p>
            Livraison : {montantGogoChapLivraison.toLocaleString()} FCFA
          </p>
          <p className="mt-2 font-bold text-2xl">{soldeGogoChap.toLocaleString()} FCFA</p>
        </div>

        {/* Solde Partenaires */}
        <div className="flex-1 bg-[#ffc107] text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Solde Partenaires</h3>
          <p>
            Commande : {montantPartenaireCommande.toLocaleString()} FCFA
          </p>
          <p>
            Livraison : {montantLivreurLivraison.toLocaleString()} FCFA
          </p>
          <p className="mt-2 font-bold text-2xl">{soldePartenaires.toLocaleString()} FCFA</p>
        </div>
      </div>

      {/* Graphiques existants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique 1 - Commande reçue */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Pourcentage sur une commande reçue
          </h3>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm text-gray-700">
              Pour partenaires :
              <input
                type="number"
                value={commandePartenaire}
                onChange={handleInputChange(setCommandePartenaire)}
                className="ml-2 px-3 py-1 border rounded-md w-20"
              />
              %
            </label>
            <p className="text-sm text-gray-500">
              GoGoChop recevra automatiquement {100 - commandePartenaire}%.
            </p>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueCommandeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {revenueCommandeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ whiteSpace: 'normal', lineHeight: '20px' }} />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique 2 - Livraison effectuée */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Pourcentage sur une livraison effectuée
          </h3>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm text-gray-700">
              Pour livreur :
              <input
                type="number"
                value={livraisonLivreur}
                onChange={handleInputChange(setLivraisonLivreur)}
                className="ml-2 px-3 py-1 border rounded-md w-20"
              />
              %
            </label>
            <p className="text-sm text-gray-500">
              GoGoChop recevra automatiquement {100 - livraisonLivreur}%.
            </p>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueLivraisonData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {revenueLivraisonData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionTarifs;



















