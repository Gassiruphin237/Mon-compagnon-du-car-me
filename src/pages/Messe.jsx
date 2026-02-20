import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, Loader2, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "./Layout/DashboardLayout";

const Messe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiturgie = async () => {
      try {
        // Formatage de la date du jour en YYYY-MM-DD
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
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="text-purple-600 font-medium animate-pulse">Chargement de la Parole de Dieu...</p>
      </div>
    );
  }

  if (!data || !data.messes) return null;

  const infos = data.informations;
  const lectures = data.messes[0].lectures;

  return (
     <DashboardLayout>
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-in fade-in duration-700">
      {/* En-tête Liturgique */}
      <div className="text-center space-y-2 mb-8">
        <Badge variant="outline" className="border-purple-200 text-purple-700 text-white bg-purple-500 px-4 py-1 rounded-full uppercase tracking-widest text-xs">
          {infos.temps_liturgique}
        </Badge>
        <h1 className="text-3xl font-serif font-bold text-slate-900 capitalize">
          {infos.jour_liturgique_nom}
        </h1>
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <CalendarIcon size={14} />
          <span>{new Date(infos.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      <Tabs defaultValue="lecture_1" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-purple-100/50 p-1 rounded-xl h-auto flex-wrap justify-center">
            {lectures.map((lecture, index) => (
              <TabsTrigger 
                key={index} 
                value={lecture.type}
                className="rounded-lg px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm transition-all"
              >
                {lecture.type === 'lecture_1' && "1ère Lecture"}
                {lecture.type === 'psaume' && "Psaume"}
                {lecture.type === 'evangile' && "Évangile"}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {lectures.map((lecture, index) => (
          <TabsContent key={index} value={lecture.type} className="mt-0">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 text-purple-600 mb-2">
                  {lecture.type === 'evangile' ? <Sparkles size={20} /> : <BookOpen size={20} />}
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    {lecture.intro_lue || "Lecture de la Parole"}
                  </span>
                </div>
                <CardTitle className="text-2xl font-serif leading-tight text-slate-800">
                  {lecture.titre || "Méditation du jour"}
                </CardTitle>
                <CardDescription className="text-purple-500 font-medium">
                  {lecture.ref}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {lecture.refrain_psalmique && (
                  <div className="bg-purple-50 p-4 rounded-2xl mb-6 border-l-4 border-purple-400 italic text-purple-900">
                    <div dangerouslySetInnerHTML={{ __html: lecture.refrain_psalmique }} />
                  </div>
                )}

                <ScrollArea className="h-full pr-4 text-slate-700 leading-relaxed font-serif text-lg">
                  <div 
                    className="prose prose-purple max-w-none 
                      [&>p]:mb-4 [&>p]:leading-relaxed
                      [&>b]:text-purple-700 [&>b]:font-bold"
                    dangerouslySetInnerHTML={{ __html: lecture.contenu }} 
                  />
                </ScrollArea>

                {lecture.verset_evangile && lecture.type === 'evangile' && (
                  <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500 italic">
                     <div dangerouslySetInnerHTML={{ __html: lecture.verset_evangile }} />
                  </div>
                )}
                
                <div className="mt-8 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest border-t pt-4">
                  <span>© AELF - Liturgie Romaine</span>
                  <Quote size={12} className="opacity-20" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
    </DashboardLayout>
  );
};

export default Messe;