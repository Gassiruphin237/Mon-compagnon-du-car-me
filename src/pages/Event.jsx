import React from 'react';
import DashboardLayout from './Layout/DashboardLayout';
import { CalendarDays, Clock, MapPin, ChevronRight } from 'lucide-react';

function Event() {
  const events2026 = [
    {
      date: "18 Fév",
      jour: "Mercredi",
      title: "Mercredi des Cendres",
      desc: "Entrée en Carême, jeûne et imposition des cendres.",
      type: "Liturgie",
      current: false
    },
    {
      date: "22 Fév",
      jour: "Dimanche",
      title: "1er Dimanche de Carême",
      desc: "Méditation sur la tentation de Jésus au désert.",
      type: "Dimanche",
      current: false
    },
    {
      date: "29 Mar",
      jour: "Dimanche",
      title: "Dimanche des Rameaux",
      desc: "Célébration de l'entrée triomphale de Jésus à Jérusalem.",
      type: "Semaine Sainte",
      current: false
    },
    {
      date: "02 Avr",
      jour: "Jeudi",
      title: "Jeudi Saint",
      desc: "Messe de la Cène et lavement des pieds.",
      type: "Triduum",
      current: false
    },
    {
      date: "03 Avr",
      jour: "Vendredi",
      title: "Vendredi Saint",
      desc: "Passion du Seigneur et Chemin de Croix solennel.",
      type: "Triduum",
      current: false
    },
    {
      date: "04 Avr",
      jour: "Samedi",
      title: "Samedi Saint",
      desc: "Vigile Pascale et célébration de la lumière.",
      type: "Triduum",
      current: false
    },
    {
      date: "05 Avr",
      jour: "Dimanche",
      title: "Pâques",
      desc: "Résurrection du Seigneur. Alléluia !",
      type: "Solennité",
      current: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header simple et plat */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Calendrier 2026</h1>
          <p className="text-slate-500 font-medium">Les temps forts de votre marche vers la Résurrection.</p>
        </div>

        {/* Liste des événements */}
        <div className="grid gap-4">
          {events2026.map((event, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row md:items-center gap-6 p-6 border ${
                event.current 
                ? 'border-indigo-500 bg-indigo-50/30' 
                : 'border-slate-200 bg-white'
              } rounded-xl transition-colors hover:border-slate-300`}
            >
              {/* Date Block */}
              <div className="flex flex-col items-center justify-center min-w-[80px] h-20 border-r border-slate-100 md:pr-6">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{event.jour}</span>
                <span className="text-2xl font-black text-slate-900 leading-none">{event.date.split(' ')[0]}</span>
                <span className="text-xs font-bold text-slate-500">{event.date.split(' ')[1]}</span>
              </div>

              {/* Content Block */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 text-lg">{event.title}</h3>
                  {event.current && (
                    <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded">
                      Aujourd'hui
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded">
                    {event.type}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {event.desc}
                </p>
              </div>

              {/* Action/Icon */}
              <div className="hidden md:block">
                <ChevronRight className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Note de bas de page */}
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-sm text-slate-500 italic">
            "Convertissez-vous et croyez à l'Évangile."
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Event;