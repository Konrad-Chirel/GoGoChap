import { forwardRef } from "react";
import { cn } from "@/utils/cn"; 
import image2 from "@/assets/image2.png";
import { logout } from "@/utils/auth"; 
import PropTypes from "prop-types";
import { navbarLinks, settingsLinks } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  const navigate = useNavigate();

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full flex-col overflow-x-hidden bg-[#1238D8] transition-all duration-300 rounded-r-3xl shadow-xl",
        collapsed ? "w-[80px] md:items-center" : "w-[270px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className={`flex flex-col items-center py-6 ${collapsed ? 'gap-y-0' : 'gap-y-2'}`}>
        <div
          className={cn(
            "rounded-full overflow-hidden border-4 bg-white mt-10 border-white mb-1 transition-all duration-300",
            collapsed ? "w-10 h-10" : "w-20 h-20"
          )}
        >
          <img src={image2} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="w-full flex flex-col h-full overflow-y-auto [scrollbar-width:_thin] pt-2 pb-12 pl-4">

        {/* Liens principaux */}
        <div className="flex flex-col gap-y-2">
          {navbarLinks.map((navbarLink) => (
            <nav key={navbarLink.title} className={cn("sidebar-group", collapsed && "items-center")}>
              <div className="flex flex-col gap-y-1">
                {navbarLink.links.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-x-3 py-2 rounded-lg transition-all duration-200",
                        collapsed ? "justify-center px-0" : "px-5",
                        isActive ? "bg-blue-900/40 text-white" : "hover:bg-blue-900/20 text-[#ffc107]"
                      )
                    }
                  >
                    <link.icon size={22} className="flex-shrink-0" />
                    {!collapsed && <span className="break-words text-sm">{link.label}</span>}
                  </NavLink>
                ))}
              </div>
            </nav>
          ))}
        </div>

        {/* Settings tout en bas */}
        <div className="mt-auto pt-2 border-t border-blue-800">
          {settingsLinks.map((link) => {
            if (link.onClick === "logout") {
              return (
                <button
                  key={link.label}
                  onClick={() => logout(navigate)}
                  className={cn(
                    "flex items-center gap-x-3 py-2 rounded-lg transition-all duration-200 w-full text-left",
                    collapsed ? "justify-center px-0" : "px-5",
                    "text-[#ffc107] hover:bg-blue-900/20"
                  )}
                >
                  <link.icon size={22} className="flex-shrink-0" />
                  {!collapsed && <span className="whitespace-nowrap text-sm">{link.label}</span>}
                </button>
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-x-3 py-2 rounded-lg transition-all duration-200",
                    collapsed ? "justify-center px-0" : "px-5",
                    isActive ? "bg-blue-900/40 text-white" : "hover:bg-blue-900/20 text-[#ffc107]"
                  )
                }
              >
                <link.icon size={22} className="flex-shrink-0" />
                {!collapsed && <span className="whitespace-nowrap text-sm">{link.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
