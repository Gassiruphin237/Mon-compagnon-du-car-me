import React from "react";
import { Home, BookOpen, Trophy, User, Settings, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path} className={`flex flex-col md:flex-row items-center gap-3 p-3 rounded-xl transition-all ${
    active ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "text-slate-500 hover:bg-purple-50 hover:text-purple-600"
  }`}>
    <Icon size={22} />
    <span className="text-[10px] md:text-sm font-medium">{label}</span>
  </Link>
);

export default function DashboardLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Home size={20} />
          </div>
          <span className="font-bold text-slate-800 tracking-tight">Mon Carême</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={Home} label="Tableau de bord" path="/dashboard" active={location.pathname === "/dashboard"} />
          <NavItem icon={BookOpen} label="Méditations" path="/meditations" active={location.pathname === "/meditations"} />
          <NavItem icon={Trophy} label="Défis" path="/challenges" active={location.pathname === "/challenges"} />
          <NavItem icon={User} label="Profil" path="/profile" active={location.pathname === "/profile"} />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 pb-24 md:pb-8">
        <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-bold text-slate-800 md:hidden">Tableau de bord</h1>
          <div className="hidden md:block">
            <p className="text-sm text-slate-500">Paix et Joie,</p>
            <h2 className="text-lg font-bold text-slate-800">Bienvenue, Pèlerin</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-200 to-indigo-200 border-2 border-white shadow-sm" />
        </header>
        
        <div className="p-6 max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* BOTTOM NAV (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 p-2 flex justify-around items-center z-50">
        <NavItem icon={Home} label="Accueil" path="/dashboard" active={location.pathname === "/dashboard"} />
        <NavItem icon={BookOpen} label="Parole" path="/meditations" active={location.pathname === "/meditations"} />
        <NavItem icon={Trophy} label="Défis" path="/challenges" active={location.pathname === "/challenges"} />
        <NavItem icon={User} label="Moi" path="/profile" active={location.pathname === "/profile"} />
      </nav>
    </div>
  );
}