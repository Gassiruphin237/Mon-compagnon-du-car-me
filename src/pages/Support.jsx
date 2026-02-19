import React from 'react';
import DashboardLayout from './Layout/DashboardLayout';
import { Heart, Coffee, ExternalLink, Code2, User } from 'lucide-react';

function Support() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        
        {/* Header simple */}
        <div className="border-b border-slate-200 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Soutenir le Projet</h1>
          <p className="text-slate-500 font-medium">Une application faite avec cœur pour la communauté.</p>
        </div>

        {/* Section Profil Développeur */}
<div className="border border-slate-200 bg-white rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
  <img 
    src="/photo.jpeg" // Remplace par le lien de ton image
    alt="Ruphin Gassi"
    className="w-54 h-54 rounded-xl object-cover border border-slate-200 shrink-0 shadow-sm"
  />
  
  <div className="space-y-3 text-center md:text-left">
    <div>
      <h2 className="text-2xl font-black text-slate-900">Ruphin Gassi</h2>
      <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Développeur Frontend</p>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">
      Passionné par la création d'interfaces intuitives et modernes, j'ai développé cette plateforme 
      pour accompagner chacun dans sa marche spirituelle durant le Carême. 
      Votre soutien m'aide à maintenir les serveurs et à continuer d'innover.
    </p>
  </div>
</div>

        {/* Section Paiement Mobile */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] text-center">Faire un don via Mobile Money ou Orange Money</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MTN Mobile Money */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl flex flex-col items-center space-y-4 hover:border-amber-400 transition-colors">
              <div className="h-12 w-20 flex items-center justify-center bg-[#FFCC00] rounded-md font-black text-xs text-black shadow-sm">
                MTN MoMo
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 font-bold uppercase">NGUEFACK GASSI RUPHIN</p>
                <p className="font-bold text-slate-900">683 179 281</p>
              </div>
            </div>

            {/* Orange Money */}
            <div className="border border-slate-200 bg-white p-6 rounded-xl flex flex-col items-center space-y-4 hover:border-orange-500 transition-colors">
              <div className="h-12 w-20 flex items-center justify-center bg-[#FF6600] rounded-md font-black text-xs text-white shadow-sm">
                ORANGE
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 font-bold uppercase">NGUEFACK GASSI RUPHIN</p>
                <p className="font-bold text-slate-900">697 814 134</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
          "Que chacun donne comme il a décidé dans son cœur"
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Support;