import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Trash2 } from "lucide-react";

// Exemple d'avatars (tu peux remplacer les URLs par les vraies images de ton projet)
const avatars = {
  "Arlène McClay": "https://randomuser.me/api/portraits/women/44.jpg",
  "Leslie Alexander": "https://randomuser.me/api/portraits/women/65.jpg",
  "Alexis Antoine": "https://randomuser.me/api/portraits/men/32.jpg",
};

const litiges = [
  {
    id: "4576",
    titre: "Commande non livrée",
    date: "2025-06-21T08:00:00Z",
    description: "La cliente n’a jamais reçu sa commande mais le livreur indique l’avoir déposée.",
    auteur: "Arlène McClay",
    priorité: "Urgent",
    statut: "ouvert"
  },
  {
    id: "4570",
    titre: "Erreur de facturation",              
    date: "2025-06-20T13:00:00Z",
    description: "Le client a été facturé deux fois pour la même commande.",
    auteur: "Leslie Alexander",
    priorité: "Moyen",
    statut: "ouvert"
  },
  {
    id: "4565",
    titre: "Problème application",
    date: "2025-06-19T10:00:00Z",
    description: "L’application se fige lors de la sélection d’un moyen de paiement.",
    auteur: "Alexis Antoine",
    priorité: "Faible",
    statut: "resolu"
  },
  {
    id: "#4562",
    titre: "Livreur inapproprié",
    date: "2025-06-18T15:00:00Z",
    description: "Comportement inapproprié signalé par un client envers un livreur.",
    auteur: "Leslie Alexander",
    priorité: "Urgent",
    statut: "ouvert"
  }
];

const filtres = [
  { label: "Tous", value: "tous" },
  { label: "Ouverts", value: "ouvert" },
  { label: "Urgents", value: "urgent" },
  { label: "Résolus", value: "resolu" }
];

// Fonction utilitaire pour calculer le temps écoulé depuis la date du litige
function getElapsedTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffH / 24);

  if (diffD > 0) return `Ouvert depuis ${diffD} jour${diffD > 1 ? "s" : ""}`;
  if (diffH > 0) return `Ouvert depuis ${diffH} heure${diffH > 1 ? "s" : ""}`;
  const diffM = Math.floor(diffMs / (1000 * 60));
  if (diffM > 0) return `Ouvert depuis ${diffM} minute${diffM > 1 ? "s" : ""}`;
  return "Ouvert à l’instant";
}

// Fonction pour obtenir la couleur du badge selon la priorité
function getBadgeColor(priorité) {
  switch (priorité.toLowerCase()) {
    case "urgent":
      return "bg-red-100 text-red-700 border-red-400";
    case "moyen":
      return "bg-yellow-100 text-yellow-700 border-yellow-400";
    case "faible":
      return "bg-green-100 text-green-700 border-green-400";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

const ListeLitiges = () => {
  const [filtre, setFiltre] = useState("tous");
  const navigate = useNavigate();

  // Filtrage selon le filtre sélectionné
  const litigesFiltres = litiges.filter(litige => {
    if (filtre === "tous") return true;
    if (filtre === "ouvert") return litige.statut === "ouvert";
    if (filtre === "resolu") return litige.statut === "resolu";
    if (filtre === "urgent") return litige.priorité.toLowerCase() === "urgent";
    return true;
  });

  // Compteurs pour les boutons
  const countTous = litiges.length;
  const countOuverts = litiges.filter(l => l.statut === "ouvert").length;
  const countUrgents = litiges.filter(l => l.priorité.toLowerCase() === "urgent").length;
  const countResolus = litiges.filter(l => l.statut === "resolu").length;

  const compteurParFiltre = {
    tous: countTous,
    ouvert: countOuverts,
    urgent: countUrgents,
    resolu: countResolus,
  };

  return (
    <div className="bg-white p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestion des litiges / support client</h1>

   <div className="flex flex-wrap gap-2 mb-6">
  {filtres.map(({ label, value }) => (
    <button
      key={value}
      onClick={() => setFiltre(value)}
      className={`px-2 py-0.5 rounded-full text-[12px] sm:text-xs font-medium transition whitespace-nowrap
        ${filtre === value ? "bg-[#1238D8] text-white" : "bg-gray-100 text-[#1238D8]"}`}
    >
      {label} ({compteurParFiltre[value]})
    </button>
  ))}
</div>



      {/* Liste des litiges */}
     {/* Conteneur scrollable horizontal */}
<div className="overflow-x-auto">
  <ul className="divide-y divide-gray-200 min-w-[600px] sm:min-w-full">
    {litigesFiltres.length === 0 ? (
      <li className="py-4 px-2 text-gray-500">Aucun litige trouvé.</li>
    ) : (
      litigesFiltres.map((litige) => (
        <li
          key={litige.id}
          className="flex items-center gap-4 py-4 px-2 hover:bg-gray-50 transition cursor-pointer"
          onClick={() => navigate(`/discussion/${litige.id}`, { state: { litige } })}
        >
          <img
            src={avatars[litige.auteur] || "https://ui-avatars.com/api/?name=" + encodeURIComponent(litige.auteur)}
            alt={litige.auteur}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:scale-105 transition"
          />
          {/* Infos principales */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base truncate">{litige.titre}</span>
              <span className="text-gray-400 text-xs ml-2">{litige.id}</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{getElapsedTime(litige.date)}</div>
            <div className="text-sm text-gray-700 mt-1">{litige.description}</div>
            <div className="text-xs text-gray-400 mt-1 italic">{litige.auteur}</div>
          </div>
          {/* Statut + Action */}
          <div className="flex flex-col items-end gap-2 min-w-[90px]">
            <span
              className={`border px-2 py-0.5 rounded-full text-xs font-bold ${getBadgeColor(litige.priorité)}`}
            >
              {litige.priorité}
            </span>
            <button className="text-blue-600 text-xs font-medium hover:underline">Traiter</button>
          </div>
        </li>
      ))
    )}
  </ul>
</div>

    </div>
  );
}; 
export default ListeLitiges;// Clic sur tout le