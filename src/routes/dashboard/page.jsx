import { overviewData, recentSalesData } from "@/constants";
import { useFilter } from "@/contexts/filter-context";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer, Legend} from "recharts";
import { ShoppingCart } from "lucide-react";

const DashboardPage = () => {
  const { filter } = useFilter();

  // Exemple de logique de filtrage selon le filtre sélectionné
  const filteredData = (() => {
    if (filter === "Semaine passée") return overviewData.slice(0, 7);
    if (filter === "Semaine en cours") return overviewData.slice(7, 12);
    return overviewData; // Mois en cours (tout)
  })();

  return (
    <div className="flex flex-col gap-y-0 px-2 md:px-8 lg:px-14 pt-6 pb-8 min-h-screen">
     <h1 className="font-poppins font-extrabold text-[36px] leading-[100%] tracking-[0em] text-[#353535] mb-1">
  Tableau de bord
</h1>

   <h1 className="font-poppins font-extrabold text-[20px] leading-[100%] tracking-[0em] text-[#CCCCCC] mb-8 pl-1">
  Salut, Pascal !
</h1>


      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Évolution des Revenus, Dépenses et Ventes
        </h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenu" barSize={18} />
              <Bar dataKey="expenses" fill="#EC4899" name="Dépenses" barSize={18} />
              <Bar dataKey="sales" fill="#10B981" name="Ventes" barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Section Commandes Récentes */}
       <h2 className="font-poppins font-semibold text-[24px] leading-[100%] tracking-[0] mb-6 text-[#353535] ">
  Commandes Récentes
</h2>

      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-7 overflow-x-auto">
  <div className="min-w-full w-full">
    <table className="min-w-[700px] w-full table-fixed text-sm lg:text-base">
      <tbody>
        {recentSalesData.map((sale, idx) => {
          const statuses = [
             { label: "En cours", color: "bg-[rgba(246,188,45,0.53)]" },
           { label: "Livrée", color: "bg-[rgba(53,155,42,0.53)] text-green-700" },
            { label: "En attente", color: "bg-[rgba(59,130,246,0.53)] text-blue-800" },
            { label: "Annulée", color: "bg-[rgba(239,68,68,0.53)] text-red-800" },
          ];
          const heures = ["12:02", "15:25", "08:02", "18:00"];
          const status = statuses[idx % statuses.length];
          const heure = heures[idx % heures.length];
          return (
            <tr key={sale.id} className="hover:bg-slate-50/40 transition">
              {/* Colonne commande */}
              <td className="w-[30%] py-3 px-4 md:px-6 lg:px-8  text-slate-900 flex items-center gap-2 font-medium whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex flex-col leading-tight">
                 <span className="font-poppins font-normal text-[14px] leading-[100%] tracking-[0%] text-[#000000] ">
  Commande #{String(sale.id).padStart(4, "0")}
</span>

                  <div className="font-poppins font-normal text-[12px] leading-[100%] tracking-[0%] text-[#CCCCCC] ">
  il y a 5 minutes <span>{sale.total} fcfa</span>
</div>

                </div>
              </td>

              {/* Colonne produit */}
             <td className="w-[25%] py-3 px-4 md:px-6 lg:px-8 whitespace-nowrap font-poppins font-normal text-[14px] leading-[100%] tracking-[0]">
  {sale.produit}
</td>


              {/* Colonne statut */}
              <td className="w-[25%] py-3 px-4 md:px-6 lg:px-8 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs  ${status.color}`}
                >
                <span className="font-poppins font-normal text-[#000000] text-[14px] leading-[150%] tracking-[0]">
  {status.label}
</span>

                </span>
              </td>

              {/* Colonne heure */}
             <td
  className="
    w-[20%] py-3 px-4 md:px-6 lg:px-8
    text-[#CCCCCC] text-sm text-right
    font-poppins font-normal text-[14px] leading-[100%] tracking-[0%]
  "
>
  {heure}
</td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default DashboardPage;