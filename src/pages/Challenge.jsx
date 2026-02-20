import React, { useState, useEffect } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
    CheckCircle2, Lock, Sparkles, Flame, Heart, Sun,
    Loader2, Circle, Trophy, Medal, Star, Target
} from "lucide-react";
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
            setChallenges(prev => prev.map(c =>
                c._id === challengeId ? { ...c, completed: true } : c
            ));
        } catch (err) {
            toast.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const completedCount = challenges.filter(c => c.completed).length;
    const progressPercentage = (completedCount / 40) * 100;

    const getUserBadge = () => {
        if (completedCount >= 31) return { name: "Apôtre de Lumière", icon: <Trophy className="text-amber-500" />, color: "bg-amber-100 text-amber-700", desc: "Niveau 31-40 : Persévérance ultime" };
        if (completedCount >= 16) return { name: "Disciple Fidèle", icon: <Medal className="text-indigo-500" />, color: "bg-indigo-100 text-indigo-700", desc: "Niveau 16-30 : Engagement profond" };
        if (completedCount >= 1) return { name: "Pelerin", icon: <Star className="text-emerald-500" />, color: "bg-emerald-100 text-emerald-700", desc: "Niveau 1-15 : Premier pas vers la foi" };
        return { name: "Novice", icon: <Target className="text-slate-400" />, color: "bg-slate-100 text-slate-500", desc: "Commencez votre première action !" };
    };

    const currentBadge = getUserBadge();

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
            <div className="space-y-8 max-w-7xl mx-auto">

                {/* --- HEADER & PROGRESSION --- */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Le Chemin des 40 Jours</h2>
                        </div>

                        {/* Badge de Niveau Actuel */}
                        <div className={`flex items-center gap-3 p-4 rounded-2xl ${currentBadge.color} transition-all duration-500 scale-105 shadow-sm border border-white`}>
                            <div className="bg-white p-2 rounded-xl shadow-sm">
                                {currentBadge.icon}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Badge Actuel</p>
                                <p className="font-black text-lg">{currentBadge.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Barre de Progression */}
                    <div className="mt-8 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-slate-600">Progression du Carême</span>
                            <span className="text-2xl font-black text-indigo-600">{completedCount} actions <span className="text-slate-300 text-lg">/40</span></span>
                        </div>
                        <Progress value={progressPercentage} className="h-3 bg-slate-100" />
                        <p className="text-xs text-slate-400 italic text-right">{currentBadge.desc}</p>
                    </div>
                </div>

                {/* --- GRILLE DES DÉFIS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
                    {challenges.map((item) => {
                        const isToday = item.isCurrent;
                        const isLocked = item.isLocked;
                        const isMissed = item.isMissed;

                        return (
                            <Card
                                key={item._id}
                                className={`p-6 border-none transition-all duration-500 relative group ${isToday ? "ring-2 ring-indigo-500 shadow-2xl scale-[1.02] bg-white z-10" : "shadow-sm hover:shadow-md"
                                    } ${isLocked ? "bg-slate-50/80 opacity-60" : isMissed ? "bg-red-50/30 border border-red-100" : "bg-white"}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:rotate-6 ${isToday ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" :
                                            isMissed ? "bg-red-100 text-red-400" :
                                                isLocked ? "bg-slate-200 text-slate-400" : "bg-indigo-50 text-indigo-600"
                                        }`}>
                                        {item.dayNumber}
                                    </div>

                                    <Badge variant="secondary" className={`${isMissed ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-600"
                                        } border-none px-3 py-1`}>
                                        {isMissed ? "Jour manqué" : item.category}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <h3 className={`font-bold text-lg leading-tight ${isMissed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {isLocked ? "Cette grâce sera révélée en temps voulu..." : item.description}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    {item.completed ? (
                                        <div className="flex items-center gap-2 text-emerald-600 font-black text-sm bg-emerald-50 w-full p-4 rounded-2xl justify-center animate-in zoom-in-95 duration-300">
                                            <CheckCircle2 size={20} /> ACTION VALIDÉE
                                        </div>
                                    ) : isMissed ? (
                                        <div className="flex items-center gap-2 text-red-400 font-bold text-sm bg-red-50/50 w-full p-4 rounded-2xl justify-center border border-dashed border-red-200">
                                            <Circle className="rotate-45" size={18} /> JOURNÉE TERMINÉE
                                        </div>
                                    ) : isLocked ? (
                                        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-slate-100/50 w-full p-4 rounded-2xl justify-center">
                                            <Lock size={18} /> VERROUILLÉ
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => handleComplete(item._id, isLocked)}
                                            disabled={actionLoading === item._id}
                                            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold transition-all shadow-lg hover:shadow-indigo-200 active:scale-95"
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