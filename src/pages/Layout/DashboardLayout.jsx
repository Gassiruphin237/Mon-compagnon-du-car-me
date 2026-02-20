import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, BookOpen, Trophy, User, LogOut, Cross, 
  CalendarDays, HeartHandshake, ChurchIcon, ShieldCheck, X 
} from "lucide-react";
import { authService } from "../../services/authService";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export default function DashboardLayout({ children }) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Récupération sécurisée du nom (Prénom uniquement pour l'anonymisation)
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.name ? user.name.split(' ')[0] : "Pèlerin";

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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden md:flex w-60 bg-white border-r flex-col p-5 sticky top-0 h-screen">
        <div className="flex items-center gap-2.5 mb-8 px-2 group cursor-pointer" onClick={() => navigate("/dashboard")}>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-purple-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md">
              <Cross size={18} />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-tight leading-none text-base text-slate-800">Compagnon</span>
            <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest mt-1">du Carême</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm ${
                location.pathname === item.path
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 space-y-2 border-t border-slate-50">
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="flex items-center gap-3 w-full p-2 text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-bold uppercase tracking-wider"
          >
            <ShieldCheck size={16} />
            <span>Confidentialité</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-h-screen">
        
        {/* MOBILE HEADER (Ajusté pour voir Confidentialité) */}
        <header className="p-3 md:hidden bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-sm">
              <Cross size={14} />
            </div>
            <span className="font-bold text-slate-800 text-sm tracking-tight">Compagnon</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="p-1.5 text-slate-400"
            >
              <ShieldCheck size={18} />
            </button>
            <button onClick={handleLogout} className="text-rose-500 font-bold text-[10px] uppercase px-2 py-1 bg-rose-50 rounded-md">
              Quitter
            </button>
          </div>
        </header>

        <div className="flex-1 p-5 md:p-10 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
          {children}
        </div>
        
        <footer className="py-6 px-6 border-t border-slate-100 bg-white mt-auto pb-24 md:pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest text-center italic">
              © 2026 Compagnon du Carême 
            </p>
            <div className="flex gap-6">
              <button onClick={() => setIsPrivacyOpen(true)} className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest">
                Confidentialité
              </button>
              <a href="gassiruphin@gmail.com" className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>

 {/* --- MOBILE BOTTOM NAV (ULTRA COMPACT) --- */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
  <div className="flex justify-between items-center px-1 py-2">
    {navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={`flex flex-col items-center flex-1 gap-1 min-w-0 ${
          location.pathname === item.path ? "text-purple-600" : "text-slate-400"
        }`}
      >
        <item.icon size={16} /> {/* Icône plus petite */}
        <span className="text-[6.5px] font-bold uppercase tracking-tighter truncate w-full text-center px-0.5">
          {item.label}
        </span>
      </Link>
    ))}
  </div>
</nav>

      {/* --- MODAL CONFIDENTIALITÉ (Universselle & Loi 25) --- */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400">
              <X size={18} />
            </button>

            <div className="p-7 md:p-9">
              <div className="mb-6">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Vie Privée</h2>
                <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">Protection des données</p>
              </div>

              <div className="space-y-5 text-slate-600 text-xs leading-relaxed">
                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">1. Transparence</h4>
                  <p>Nous utilisons votre prénom pour personnaliser l'accueil et votre email pour la sécurité du compte. Rien d'autre.</p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">2. Engagement éthique</h4>
                  <p>Vos données sont confidentielles. Elles ne sont <strong>jamais partagées ou vendues</strong>. L'application respecte les normes internationales (Loi 25 Canada, RGPD Europe).</p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">3. Droit à l'oubli</h4>
                  <p>Vous pouvez demander la suppression totale de vos données via l'onglet Profil. Vos données seront alors effacées de nos serveurs définitivement.</p>
                </section>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-[11px] text-slate-500">
                  "Votre marche spirituelle est privée. Nous protégeons votre intimité avec le plus grand respect."
                </div>
              </div>

              <Button 
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full mt-8 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                C'est compris
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}