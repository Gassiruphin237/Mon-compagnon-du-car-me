import React, { useState, useEffect } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Sun, Coffee, Heart, Flame, CheckCircle2,
  Quote, Calendar, TrendingUp, Target, Sparkles, Loader2,
  Trophy, Medal, Star
} from "lucide-react";
import { toast } from "sonner";
import { challengeService } from "../services/challengeService";

// 1. KPI Card - TON STYLE ORIGINAL
const StatCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <Card className="p-5 border-none shadow-sm bg-white hover:shadow-md transition-all group">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110`}>
        <Icon size={22} />
      </div>
      {trend && <Badge variant="outline" className="text-emerald-600 border-emerald-100 bg-emerald-50">+{trend}%</Badge>}
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
    </div>
  </Card>
);

// 2. Journey Progress - TON STYLE ORIGINAL
const JourneyProgress = ({ currentDay }) => {
  const percentage = (currentDay / 40) * 100;
  return (
    <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-[#2D1B69] via-[#4F46E5] to-[#7C3AED] text-white relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <Badge className="bg-white/20 text-white border-none mb-3 backdrop-blur-md">Temps de conversion</Badge>
          <h3 className="text-3xl font-extrabold mb-2 text-white">Jour {currentDay} / 40</h3>
          <p className="text-indigo-100/80 mb-6">"Le Carême est le printemps de l'âme."</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span>Progression Spirituelle</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <Progress value={percentage} className="h-3 bg-white/10" />
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="h-32 w-32 rounded-full border-8 border-white/10 flex items-center justify-center text-4xl font-black">
            {40 - currentDay} <span className="text-xs ml-1 opacity-60">j restants</span>
          </div>
        </div>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
    </Card>
  );
};

export default function Dashboard() {
  // --- LOGIQUE API AJOUTÉE ---
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await challengeService.getTodayChallenge();
      setData(res);
    } catch (err) {
      toast.error("Erreur de récupération des données");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setCompleting(true);
      await challengeService.completeChallenge(data.challenge._id);

      setData(prev => ({ ...prev, isCompleted: true }));

      toast.success("Défi validé !");
    } catch (err) {
      if (err.includes("déjà accompli")) {
        setData(prev => ({ ...prev, isCompleted: true }));
      }
      toast.error(err);
    } finally {
      setCompleting(false);
    }
  };

  // --- LOGIQUE DES BADGES ---
  const completedCount = data ? parseInt(data.progression) : 0;

  const getUserBadge = () => {
    if (completedCount >= 31) return { name: "Apôtre de Lumière", icon: <Trophy size={18} className="text-amber-500" />, color: "bg-amber-50 text-amber-700" };
    if (completedCount >= 16) return { name: "Disciple Fidèle", icon: <Medal size={18} className="text-indigo-500" />, color: "bg-indigo-50 text-indigo-700" };
    if (completedCount >= 1) return { name: "Pélerin", icon: <Star size={18} className="text-emerald-500" />, color: "bg-emerald-50 text-emerald-700" };
    return { name: "Novice", icon: <Target size={18} className="text-slate-400" />, color: "bg-slate-50 text-slate-500" };
  };

  const currentBadge = getUserBadge();

  if (loading) return (
    <DashboardLayout>
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    </DashboardLayout>
  );

  // --- TON INTERFACE ORIGINALE ---
  const kpis = [
    { label: "Progression", value: data?.progression || "0/40", icon: Sun, color: "text-amber-500", bg: "bg-amber-50", trend: "12" },
    { label: "Série Actuelle", value: `${data?.day || 0} Jours`, icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Niveau", value: currentBadge.name, icon: Sparkles, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Objectif", value: "40 Jours", icon: Coffee, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* En-tête de bienvenue - OPTIMISÉ MOBILE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bonjour, {user.name || "Pèlerin"} 👋</h1>
              <p className="text-slate-500">Que votre journée soit remplie de paix et de recueillement.</p>
            </div>

            {/* Badge visible partout (Mobile + Desktop) */}
            <div className={`flex items-center w-fit gap-2 px-3 py-1.5 rounded-full border ${currentBadge.color} text-[11px] font-extrabold shadow-sm mt-2 sm:mt-0`}>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Badge Actuel</p>
              {currentBadge.icon}
              <span className="uppercase tracking-wider">{currentBadge.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl w-fit">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm">
              <Calendar size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date du jour</span>
              <span className="text-sm font-bold text-slate-700 capitalize">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
          </div>
        </div>

        <JourneyProgress currentDay={data?.day || 0} />

        {/* Section KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((stat, i) => <StatCard key={i} {...stat} />)}
        </div>

        <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">

            {/* Section Vidéo */}
            <div className="w-full md:w-[300px] bg-slate-900 flex items-center justify-center p-4">
              <div className="w-full aspect-[9/16] border border-white/10 rounded-md overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/NCojJjF2XhY"
                  title="Le carême"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Section Contenu */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-amber-500"></span>
                <span className="text-amber-600 font-bold text-xs uppercase tracking-tighter">Enseignement</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                Comprendre le sens du Carême
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-xl">
                Découvrez en 60 secondes pourquoi le Carême dépasse la simple privation.
                C'est un temps de <strong>renouvellement intérieur</strong> articulé autour de trois piliers : la prière, le jeûne et l'aumône.
              </p>

              <div className="grid grid-cols-2 gap-0 border-t border-l border-slate-100">
                <div className="p-4 border-r border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Durée</p>
                  <p className="text-slate-900 font-bold italic">40 Jours</p>
                </div>
                <div className="p-4 border-r border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">But</p>
                  <p className="text-slate-900 font-bold italic">La Résurrection</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Défi du Jour */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Target className="text-indigo-600" size={20} /> Défi du jour
              </h3>

              <Card className="p-8 border-none bg-white border-l-4 border-l-indigo-600 rounded-3xl shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
                  <div className="space-y-2">
                    {/* On grise le texte si c'est complété (en utilisant 'completed') */}
                    <h3 className={`text-2xl font-black tracking-tight ${data?.completed ? "text-slate-400" : "text-slate-800"}`}>
                      {data?.challenge?.title || "Méditation"}
                    </h3>
                    <p className="text-slate-600 max-w-md">
                      {data?.challenge?.description || "Prenez un moment de silence."}
                    </p>
                  </div>

                  {/* Condition basée sur la clé 'completed' du backend */}
                  {data?.completed ? (
                    <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm animate-in zoom-in duration-300">
                      <div className="bg-emerald-500 text-white p-1 rounded-full">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="font-bold tracking-tight">Défi relevé !</span>
                    </div>
                  ) : (
                    <Button
                      onClick={handleComplete}
                      disabled={completing || !data?.challenge}
                      className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold transition-all flex gap-3 shadow-xl"
                    >
                      {completing ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <CheckCircle2 size={20} /> Valider l'action
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            </section>

            {/* Message du Pape */}
            <Card className="p-8 border-none shadow-sm bg-indigo-50/50 rounded-3xl relative overflow-hidden group">
              <Quote className="absolute top-4 right-4 text-indigo-200 group-hover:text-indigo-300 transition-colors" size={40} />
              <div className="relative z-10 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-500">Message du pape pour le Carême 2026</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative h-44 w-44 md:h-28 md:w-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <img src="/pape2.jpg" alt="Pape Léon XIV" className="h-full w-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=L.XIV"; }} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xl italic font-medium text-slate-700 leading-relaxed">
                      "Pour ce Carême, je vous invite à une forme d'abstention très concrète : celle des paroles qui blessent le prochain"
                    </p>
                    <p className="text-sm font-black text-slate-800 tracking-tight">Sa Sainteté Léon XIV</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-indigo-200/30 rounded-full blur-3xl" />
            </Card>
          </div>

          {/* Sidebar : Les 3 Piliers */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-indigo-600" size={20} /> Les Piliers du Carême
              </h3>
              <div className="space-y-3">
                {[
                  { t: "La Prière", desc: "Élever son âme vers Dieu.", ic: Sun, c: "bg-amber-100 text-amber-600", border: "hover:border-amber-200" },
                  { t: "Le Jeûne", desc: "Se détacher du superflu.", ic: Coffee, c: "bg-purple-100 text-purple-600", border: "hover:border-purple-200" },
                  { t: "L'Aumône", desc: "Reconnaître le Christ dans le frère.", ic: Heart, c: "bg-rose-100 text-rose-600", border: "hover:border-rose-200" }
                ].map((pilier, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl bg-white border border-transparent ${pilier.border} transition-all shadow-sm`}>
                    <div className={`p-3 rounded-xl shrink-0 ${pilier.c}`}><pilier.ic size={20} /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{pilier.t}</p>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">{pilier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Card className="p-6 border-none shadow-lg bg-slate-900 text-white rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                  <Quote size={18} /> Verset du jour
                </h4>

                <div className="space-y-3">
                  <p className="text-sm text-slate-100 leading-relaxed italic font-medium">
                    {data?.challenge?.verse ? (
                      `"${data.challenge.verse}"`
                    ) : (
                      "Chargement de la parole de Dieu..."
                    )}
                  </p>
                  {data?.challenge?.reference && (
                    <p className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest text-right">
                      — {data.challenge.reference}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}