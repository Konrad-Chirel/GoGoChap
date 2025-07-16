import { Sidebar } from "../layouts/sidebar";
import { cn } from "../utils/cn";
import { Header } from "../layouts/header";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "../hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width:768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);
    
    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#fff9f9] transition-colors">
            {/* ✅ CORRIGÉ : Overlay avec z-index harmonisé */}
            <div 
                className={cn(
                    "pointer-events-none fixed inset-0 bg-black opacity-0 transition-opacity z-40",
                    !collapsed && "max-md:pointer-events-auto max-md:opacity-30"
                )}  
            />
            
            {/* Sidebar */}
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            
            {/* ✅ CORRIGÉ : Structure améliorée pour mobile */}
            <div className={cn(
                "flex flex-col h-full transition-[margin] duration-300",
                collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
            )}>
                {/* Header */}
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                
                {/* ✅ CORRIGÉ : Hauteur corrigée de 60px à 80px pour correspondre à la vraie hauteur du header */}
                <main className="flex-1 h-[calc(100vh-80px)] overflow-y-auto px-4 py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

