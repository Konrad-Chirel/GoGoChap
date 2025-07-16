import React from "react";
import { Outlet } from "react-router-dom";
import ListeLitiges from "@/routes/dashboard/listeLitiges";

export default function GestionLitiges() {
  return (
    <div className="h-full">
      {/* ✅ CORRIGÉ : Utilise Outlet pour afficher les routes enfants (DiscussionLitige) */}
      <Outlet />
      {/* Si aucune route enfant n'est active, affiche la liste des litiges */}
      <ListeLitiges />
    </div>
  );
}

