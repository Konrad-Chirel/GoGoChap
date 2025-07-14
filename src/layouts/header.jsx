import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUser } from "@/contexts/user-context";


import {
  Bell,
  ChevronsLeft,
  ShoppingCart,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import PropTypes from "prop-types";
import { useFilter } from "@/contexts/filter-context";
import { toast } from "react-hot-toast"; // ✅ en haut du fichier

export const Header = ({ collapsed, setCollapsed }) => {
   const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
const isHomePage = location.pathname === "/";

  const { filter, setFilter } = useFilter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      type: "order",
      title: "Nouvelle commande",
      description: "Vous avez reçu une commande de 35.000 FCFA.",
      time: "Il y a 5 min",
      timestamp: Date.now() - 5 * 60 * 1000,
    },
    {
      id: 2,
      type: "client",
      title: "Nouveau client",
      description: "Un client s’est inscrit à votre plateforme.",
      time: "Il y a 30 min",
      timestamp: Date.now() - 30 * 60 * 1000,
    },
    {
      id: 3,
      type: "alert",
      title: "Problème détecté",
      description: "Une erreur a été signalée sur le serveur.",
      time: "Il y a 1h",
      timestamp: Date.now() - 60 * 60 * 1000,
    },
    
  ]);

  const notificationRef = useRef(null);
  const bellRef = useRef(null);
const prevNotifCount = useRef(notificationList.length); // ✅ en haut du composant

useEffect(() => {
  if (notificationList.length > prevNotifCount.current) {
    const lastNotif = notificationList[0];
    toast(`🔔 ${lastNotif.title}`, {
      icon: "📢",
      duration: 4000,
      style: {
        background: "#fff",
        color: "#333",
        border: "1px solid #eee",
      },
    });
  }
  prevNotifCount.current = notificationList.length;
}, [notificationList]);


  // Supprimer notifications après 24h
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationList((prev) =>
        prev.filter((n) => Date.now() - n.timestamp < 300000)
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fermer la liste si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Détecter ajout et animer la cloche
  useEffect(() => {
    if (bellRef.current) {
      bellRef.current.classList.add("animate-bounce");
      setTimeout(() => bellRef.current.classList.remove("animate-bounce"), 1000);
    }
  }, [notificationList.length]);

  const getIconByType = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="text-[#1238D8] mr-2" size={18} />;
      case "client":
        return <UserPlus className="text-green-600 mr-2" size={18} />;
      case "alert":
        return <AlertCircle className="text-red-600 mr-2" size={18} />;
      default:
        return <AlertCircle className="text-gray-400 mr-2" size={18} />;
    }
  };

  return (
    <header className="relative z-10 flex h-[80px] items-center justify-between bg-[#ffc107] px-4 md:px-6 shadow-md">
      {/* Gauche */}
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <button
          className="btn-ghost w-8 h-8 md:w-10 md:h-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} size={20} />
        </button>

       {isHomePage && (
  <>
    {collapsed && (
      <span className="font-bold text-[#1238D8] hidden md:inline text-sm">
        Filtre :
      </span>
    )}

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="rounded-lg px-2 py-1 text-xs md:text-sm bg-[#ffc107] border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <option>Semaine passée</option>
      <option>Semaine en cours</option>
      <option>Mois en cours</option>
    </select>
  </>
)}

      </div>

      {/* Droite */}
      <div
        className="flex items-center gap-x-1 md:gap-x-2 relative"
        ref={notificationRef}
      >
        {/* Cloche */}
        <button
          className="btn-ghost w-8 h-8 md:w-10 md:h-10 relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell ref={bellRef} size={18} className="text-[#333]" />
          {notificationList.length > 0 && (
            <span className="absolute -top-1 -right-0 flex items-center justify-center w-4 h-4 md:w-5 md:h-5 bg-[#1238D8] text-white text-xs font-bold rounded-full border-2 border-white">
              {notificationList.length}
            </span>
          )}
        </button>

        {/* Liste des notifications */}
        {showNotifications && (
          <div className="absolute top-14 right-0 w-[300px] bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200">
            <div className="p-4 border-b bg-[#1238D8] text-white rounded-t-lg font-semibold text-sm">
              Notifications
            </div>
            <ul className="max-h-[320px] overflow-y-auto divide-y divide-gray-100">
              {notificationList.length === 0 ? (
                <li className="px-4 py-3 text-sm text-gray-500 text-center">
                  Aucune notification
                </li>
              ) : (
                notificationList.slice(0, 10).map((notif) => (
                  <li
                    key={notif.id}
                    className="px-4 py-3 hover:bg-gray-50 flex items-start"
                  >
                    {getIconByType(notif.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#1238D8]">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {notif.description}
                      </p>
                      <span className="text-[10px] text-gray-400">
                        {notif.time}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Avatar + infos */}
         <div
      className="flex items-center gap-x-1 md:gap-x-2 cursor-pointer"
      onClick={() => navigate("/settings")}
      title="Aller aux paramètres"
    >
         <div
  className="overflow-hidden rounded-full w-8 h-8 md:w-10 md:h-10 border-2 border-white"
  title={user.name}
>
  {user.profileImage ? (
    <img
      src={user.profileImage}
      className="w-full h-full object-cover"
      alt="avatar"
    />
  ) : (
    <UserPlus className="text-gray-400 w-8 h-8" />
  )}
</div>


          <div className="flex flex-col items-start pr-12 hidden sm:flex">
            <span className="font-poppins font-semibold text-[16px] leading-[100%] tracking-[0] text-[#1238D8]
">
   {user.name}
</span>

            <span className="font-poppins font-light text-[11px] leading-[100%] tracking-[0] text-[#1C31EF]">
   {user.email}
</span>

          </div>
        </div>
      </div>
     
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};