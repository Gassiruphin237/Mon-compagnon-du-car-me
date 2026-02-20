import React, { useState, useEffect } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle2, Lock, Sparkles, Flame, Heart, Sun, Loader2, Circle } from "lucide-react";
import { challengeService } from "@/services/challengeService";
import { toast } from "sonner";

export default function Challenge() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

   useEffect(() => {
    fetchChallenges();
}, []);

const fetchChallenges = async () => {
    try {
        const data = await challengeService.getAllChallenges();
        setChallenges(data);
    } catch (err) {
        toast.error(err); 
    } finally {
        setLoading(false);
    }
};

const handleComplete = async (challengeId, isLocked) => {
    if (isLocked) {
        toast.error("Patience ! Ce défi n'est pas encore disponible.");
        return;
    }

    setActionLoading(challengeId);
    try {
        await challengeService.completeChallenge(challengeId);
        toast.success("Félicitations ! Défi accompli.");

        // Mise à jour locale pour un retour visuel immédiat
        setChallenges(prev => prev.map(c =>
            c._id === challengeId ? { ...c, completed: true } : c
        ));
    } catch (err) {
        // 'err' affichera par exemple : "Ce défi est déjà accompli aujourd’hui."
        toast.error(err); 
    } finally {
        setActionLoading(null);
    }
};

    const getCategoryIcon = (category) => {
        switch (category) {
            case "Prière": return <Sun size={16} className="text-amber-500" />;
            case "Jeûne": return <Flame size={16} className="text-purple-500" />;
            case "Aumône": return <Heart size={16} className="text-rose-500" />;
            default: return <Sparkles size={16} className="text-indigo-500" />;
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="h-[60vh] flex items-center justify-center">
                    <Loader2 className="animate-spin text-indigo-600" size={40} />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Le Chemin des 40 Jours</h2>
                        <p className="text-slate-500 italic">Un jour à la fois, une victoire à la fois.</p>
                    </div>
                    <Badge className="bg-indigo-600 text-white px-4 py-1.5 rounded-full border-none font-bold shadow-lg shadow-indigo-100">
                        {challenges.filter(c => c.completed).length}/40 Accomplis
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">

                    {challenges.map((item) => {
                        const isToday = item.isCurrent;
                        const isLocked = item.isLocked;
                        const isMissed = item.isMissed; // Nouvelle propriété du backend

                        return (
                            <Card
                                key={item._id}
                                className={`p-6 border-none transition-all duration-500 relative ${isToday ? "ring-2 ring-indigo-500 shadow-xl scale-[1.02] bg-white" : "shadow-sm"
                                    } ${isLocked ? "bg-slate-50/80 opacity-60" : isMissed ? "bg-red-50/30 border border-red-100" : "bg-white"}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg ${isToday ? "bg-indigo-600 text-white shadow-lg" :
                                            isMissed ? "bg-red-100 text-red-400" :
                                                isLocked ? "bg-slate-200 text-slate-400" : "bg-indigo-50 text-indigo-600"
                                        }`}>
                                        {item.dayNumber}
                                    </div>

                                    <Badge variant="secondary" className={`${isMissed ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-600"
                                        } border-none`}>
                                        {isMissed ? "Non atteint" : item.category}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <h3 className={`font-bold text-lg ${isMissed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {isLocked ? "Contenu verrouillé" : item.description}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    {item.completed ? (
                                        <div className="flex items-center gap-2 text-emerald-600 font-black text-sm bg-emerald-50 w-full p-3 rounded-xl justify-center">
                                            <CheckCircle2 size={20} /> ACTION VALIDÉE
                                        </div>
                                    ) : isMissed ? (
                                        <div className="flex items-center gap-2 text-red-400 font-bold text-sm bg-red-50/50 w-full p-3 rounded-xl justify-center border border-dashed border-red-200">
                                            <Circle className="rotate-45" size={18} /> JOURNÉE TERMINÉE
                                        </div>
                                    ) : isLocked ? (
                                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-slate-100/50 w-full p-3 rounded-xl justify-center">
                                            <Lock size={18} /> À VENIR
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => handleComplete(item._id, isLocked)}
                                            disabled={actionLoading === item._id}
                                            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold"
                                        >
                                            {actionLoading === item._id ? <Loader2 className="animate-spin" /> : "Marquer comme fait"}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}