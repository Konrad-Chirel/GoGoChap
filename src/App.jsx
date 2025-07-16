import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import Layout from "./routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import GestionUtilisateur from "@/routes/dashboard/gestionUtilisateur";
import SettingsPage from "./routes/dashboard/settings";
import ZonesGeographiques from "./routes/dashboard/ajoutZones";
import ExportDonnee from "./routes/dashboard/exportDonnees";
import GestionLitiges from "./routes/dashboard/gestionLitiges";
import GestionTarifs from "./routes/dashboard/gestionTarifs";
import ListeLitiges from "./routes/dashboard/listeLitiges";
import DiscussionLitige from "./routes/dashboard/discussionLitige";
import { FilterProvider } from "./contexts/filter-context";
import { Toaster } from "react-hot-toast";
import RepartitionTarifs from "./routes/dashboard/repartitionTarifs.jsx";
import Login from "./routes/login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "gestion_utilisateur",
          element: <GestionUtilisateur />,
        },
        {
          path: "repartition_des_tarifs",
          element: <RepartitionTarifs />,
        },
        {
          path: "gestion_des_tarifs",
          element: <GestionTarifs />,
        },
        {
          path: "gestion_des_litiges",
          element: <GestionLitiges />,
        },
        {
          path: "export_donnees",
          element: <ExportDonnee />,
        },
        {
          path: "zone_geographique_desservies",
          element: <ZonesGeographiques />,
        },
        // ✅ CORRIGÉ : La route pour DiscussionLitige doit être imbriquée sous gestion_des_litiges
        {
          path: "gestion_des_litiges/:id",
          element: <DiscussionLitige />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider storageKey="theme">
      <FilterProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <RouterProvider router={router} />
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;


