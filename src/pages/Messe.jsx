import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, Loader2, Sparkles, Calendar as CalendarIcon, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "./Layout/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


const Messe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSunday = new Date().getDay() === 0;

  useEffect(() => {
    const fetchLiturgie = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api.aelf.org/v1/messes/${today}/romain`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        toast.error("Impossible de récupérer les textes liturgiques");
      } finally {
        setLoading(false);
      }
    };
    fetchLiturgie();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-purple-400/20 animate-pulse" />
        </div>
        <p className="mt-4 text-slate-600 font-medium font-serif italic">Préparation de la table de la Parole...</p>
      </div>
    );
  }

  if (!data || !data.messes || data.messes.length === 0) return null;

  const infos = data.informations;
  const lectures = data.messes[0].lectures;
  const uniqueTypes = Array.from(new Set(lectures.map(l => l.type)));

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

        {/* En-tête Stylisé */}
        <header className="relative text-center space-y-4 py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            {infos.temps_liturgique}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            {infos.jour_liturgique_nom}
          </h1>

          <div className="flex items-center justify-center gap-3 text-slate-400">
            <div className="h-px w-8 bg-slate-200" />
            <div className="flex items-center gap-2 text-sm font-medium italic">
              <CalendarIcon size={16} className="text-purple-400" />
              <span className="capitalize">
                {new Date(infos.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="h-px w-8 bg-slate-200" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Colonne Principale : Lectures */}
          <main className={`${isSunday ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
            <Tabs defaultValue="lecture_1" className="w-full">
              <div className="flex justify-start overflow-x-auto pb-4 scrollbar-hide">
                <TabsList className="bg-slate-100/80 backdrop-blur p-1 rounded-2xl h-auto border border-slate-200/50">
                  {uniqueTypes.map((type) => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="rounded-xl px-6 py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md transition-all duration-300"
                    >
                      {type === 'lecture_1' && "1ère Lecture"}
                      {type === 'lecture_2' && "2ème Lecture"}
                      {type === 'psaume' && "Psaume"}
                      {type === 'sequence' && "Séquence"}
                      {type === 'evangile' && "Évangile"}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {lectures.map((lecture, index) => (
                <TabsContent key={index} value={lecture.type} className="mt-2 outline-none">
                  <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500" />

                    <CardHeader className="pt-8 px-8">
                      <div className="flex items-center gap-2 text-purple-600/70 mb-3">
                        <BookOpen size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {lecture.intro_lue || "Lecture de la Parole"}
                        </span>
                      </div>
                      <CardTitle className="text-3xl font-serif font-bold text-slate-800 leading-snug">
                        {lecture.titre || "Méditation du jour"}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-indigo-500 font-bold pt-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-[11px] border border-indigo-100 uppercase">
                          {lecture.ref}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-10">
                      {lecture.refrain_psalmique && (
                        <div className="bg-gradient-to-br from-slate-50 to-purple-50/50 p-5 rounded-[2rem] mb-8 border border-purple-100/50 relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-purple-400" />
                          <Quote className="absolute right-4 top-4 text-purple-200 rotate-180 group-hover:scale-110 transition-transform" size={40} />
                          <div className="relative z-10 font-serif italic text-purple-900 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: lecture.refrain_psalmique }} />
                        </div>
                      )}

                      <div
                        className="prose prose-slate prose-lg max-w-none font-serif
                          [&>p]:mb-6 [&>p]:leading-[1.8] [&>p]:text-slate-700
                          [&>b]:text-purple-800 [&>b]:font-bold"
                        dangerouslySetInnerHTML={{ __html: lecture.contenu }}
                      />

                      {lecture.verset_evangile && lecture.type === 'evangile' && (
                        <div className="mt-10 p-6 rounded-3xl bg-amber-50/30 border border-amber-100/50 italic text-slate-600 text-sm">
                          <div dangerouslySetInnerHTML={{ __html: lecture.verset_evangile }} />
                        </div>
                      )}

                      <footer className="mt-12 flex justify-between items-center border-t border-slate-100 pt-6">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© AELF - Liturgie</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />)}
                        </div>
                      </footer>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </main>

          {isSunday && (
            <aside className="lg:col-span-4 space-y-4 sticky top-8">
              <div className="flex items-center gap-2 text-slate-800 font-serif font-bold text-xl mb-2">
                <Lightbulb className="text-amber-500" size={24} />
                <h2>L'Homélie de L'Abbé Ulrich YEMENI</h2>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white group cursor-zoom-in">
                    <div className="relative w-full">
                      <img
                        src="/Homelie.jpeg"
                        alt="Homélie du jour"
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      {/* Overlay au survol */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                        <Sparkles className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-[95vw] h-[90vh] p-0 border-none bg-transparent shadow-none">
                  <ScrollArea className="h-full w-full rounded-md">
                    <img
                      src="/Homelie.jpeg"
                      alt="Homélie plein écran"
                      className="w-full h-auto object-contain mx-auto"
                    />
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Cliquez sur l'image pour lire en plein écran
              </p>
            </aside>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messe;