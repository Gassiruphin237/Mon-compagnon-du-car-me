import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Trophy, User, LogOut, Cross, CalendarDays, HeartHandshake, ChurchIcon } from "lucide-react";
import { authService } from "../../services/authService";
import { toast } from "sonner";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    toast.success("Déconnexion réussie");
    navigate("/auth");
  };

 const navItems = [
  { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: ChurchIcon, label: "Messe", path: "/Messe" },
  { icon: BookOpen, label: "Méditations", path: "/meditations" },
  { icon: CalendarDays, label: "Événements", path: "/events" }, 
  { icon: Trophy, label: "Défis", path: "/challenges" },
  { icon: User, label: "Profil", path: "/profile" },
  { icon: HeartHandshake, label: "Soutenir", path: "/support" }, 
];
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col p-6 sticky top-0 h-screen">
        {/* Logo avec icône stylisée (identique au Login) */}
        <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
          <div className="relative flex-shrink-0">
            {/* Effet de lueur en arrière-plan */}
            <div className="absolute inset-0 bg-purple-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />

            {/* Le carré avec la croix */}
            <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Cross size={20} strokeWidth={2} />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 tracking-tight leading-none">
              Compagnon
            </span>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] mt-2">
              du Carême
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === item.path
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-500 hover:bg-purple-50"
                }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-auto"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <header className="p-4 md:hidden bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md rotate-3">
              <Cross size={16} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">
                Compagnon
              </span>
              <span className="text-[8px] font-bold text-purple-600 uppercase tracking-wider mt-2">
                du Carême
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
          </button>
        </header>

        {/* Zone de contenu des pages */}
        <div className="p-4 md:p-8 animate-in fade-in duration-500">
          {children}
        </div>
      </main>

    {/* Mobile Nav */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t flex justify-around p-3 z-[100] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
  {navItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex flex-col items-center gap-1 transition-colors ${
        location.pathname === item.path ? "text-purple-600" : "text-slate-400"
      }`}
    >
      <item.icon size={20} />
      <span className="text-[10px] font-medium">{item.label}</span>
    </Link>
  ))}
</nav>
    </div>
  );
}