import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fafafa] relative overflow-hidden">
      
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-100/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-[100px]" />

      <div className="max-w-md w-full text-center z-10 space-y-8">
        
       

        {/* Texte */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Vous semblez égaré...
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Même les plus grands pèlerins perdent parfois leur route. 
            Laissez-nous vous ramener sur le bon chemin.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 transition-all">
            <Link to={-1} className="flex items-center gap-2">
              <ArrowLeft size={18} /> Retour
            </Link>
          </Button>
          
          <Button asChild className="h-12 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all flex items-center gap-2">
            <Link to="/dashboard">
              <Home size={18} /> Accueil
            </Link>
          </Button>
        </div>

        {/* Petite citation discrète */}
        <p className="text-xs text-slate-400 italic pt-8 uppercase tracking-[0.2em]">
          "Cherchez et vous trouverez"
        </p>
      </div>
    </div>
  );
}