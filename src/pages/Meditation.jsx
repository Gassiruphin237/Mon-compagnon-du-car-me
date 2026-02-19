import React, { useState } from 'react';
import DashboardLayout from './Layout/DashboardLayout';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronRight, BookOpen, Cross, Wind, ArrowLeft, ShieldCheck, Star, Heart } from "lucide-react";

// Composant pour les étapes du Chapelet
const RosaryStep = ({ number, title, text }) => (
    <div className="flex gap-6 group">
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 border-2 border-amber-400 flex items-center justify-center font-black shadow-lg group-hover:scale-110 transition-transform">
                {number}
            </div>
            <div className="w-0.5 h-full bg-slate-200 my-2"></div>
        </div>
        <div className="pb-10">
            <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                {text}
            </p>
        </div>
    </div>
);

function Meditation() {
    const [activeSection, setActiveSection] = useState(null);

    if (!activeSection) {
        return (
            <DashboardLayout>
                <div className="max-w-6xl mx-auto space-y-10 pb-10 px-4">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Espace de Recueillement</h1>
                        <p className="text-slate-500 max-w-lg mx-auto font-medium text-lg">
                            "La prière est l'élévation de l'âme vers Dieu."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card onClick={() => setActiveSection('prayers')} className="group cursor-pointer p-8 border-none shadow-sm hover:shadow-xl transition-all bg-white rounded-[2.5rem] relative overflow-hidden">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white mb-6 shadow-lg"><BookOpen size={28} /></div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Prières</h3>
                            <p className="text-slate-500 text-sm">Textes fondamentaux pour chaque jour.</p>
                            <div className="mt-6 flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:text-indigo-600">Ouvrir <ChevronRight size={16} /></div>
                        </Card>

                        <Card onClick={() => setActiveSection('cross')} className="group cursor-pointer p-8 border-none shadow-sm hover:shadow-xl transition-all bg-white rounded-[2.5rem] relative overflow-hidden">
                            <div className="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center text-white mb-6 shadow-lg"><Cross size={28} /></div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Chemin de Croix</h3>
                            <p className="text-slate-500 text-sm">Méditez les 14 stations de la Passion.</p>
                            <div className="mt-6 flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:text-rose-600">Suivre le chemin <ChevronRight size={16} /></div>
                        </Card>

                        <Card onClick={() => setActiveSection('rosary')} className="group cursor-pointer p-8 border-none shadow-sm hover:shadow-xl transition-all bg-white rounded-[2.5rem] relative overflow-hidden">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white mb-6 shadow-lg"><Wind size={28} /></div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Le Chapelet</h3>
                            <p className="text-slate-500 text-sm">Apprenez à prier le Rosaire pas à pas.</p>
                            <div className="mt-6 flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest group-hover:text-amber-600">Commencer <ChevronRight size={16} /></div>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto pb-20 px-4">
                <Button
                    variant="ghost"
                    onClick={() => setActiveSection(null)}
                    className="mb-8 hover:bg-slate-100 rounded-xl gap-2 text-slate-500 font-bold"
                >
                    <ArrowLeft size={18} /> Retour
                </Button>
                {/* --- DÉTAIL CHEMIN DE CROIX --- */}
                {activeSection === 'cross' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">

                        {/* En-tête avec structure complète */}
                        <div className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100 space-y-6">
                            <div>
                                <h2 className="text-3xl font-black text-rose-900 mb-2">Le Chemin de Croix</h2>
                                <p className="text-rose-800/60 font-bold uppercase text-xs tracking-widest">Rituel Traditionnel</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-rose-900/80">
                                <div className="space-y-3">
                                    <p className="font-bold flex items-center gap-2 text-rose-900">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> L'Ouverture
                                    </p>
                                    <p className="italic leading-relaxed">
                                        On commence par le Signe de la Croix et une prière d'introduction pour entrer en compassion avec le Christ.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <p className="font-bold flex items-center gap-2 text-rose-900">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> À chaque station
                                    </p>
                                    <ul className="space-y-3 ml-4 list-decimal font-medium">
                                        <li>
                                            <strong>L'Annonce :</strong> On nomme la station (ex: "Première station...").
                                        </li>
                                        <li>
                                            <strong>L'Acclamation :</strong>
                                            <div className="mt-1 pl-4 border-l-2 border-rose-200">
                                                <p>— "Nous t'adorons, ô Christ, et nous te bénissons."</p>
                                                <p className="text-rose-900 ">— "Car tu as racheté le monde par ta sainte Croix."</p>
                                            </div>
                                        </li>
                                        <li>
                                            <strong>La Parole :</strong> Lecture du verset biblique correspondant.
                                        </li>
                                        <li>
                                            <strong>L'Oraison :</strong> Temps de silence suivi de la prière.
                                        </li>
                                        <li>
                                            <strong>Le Chant :</strong> Un couplet pour marcher vers la station suivante.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Liste des Stations */}
                        <div className="space-y-8">
                            {[
                                {
                                    s: 1,
                                    t: "Jésus est condamné à mort",
                                    v: "« Pilate, voulant satisfaire la foule, leur relâcha Barabbas ; et, après avoir fait battre de verges Jésus, il le livra pour être crucifié. » (Mc 15, 15)",
                                    p: "Seigneur, l'Innocent condamné, donne-nous la force de ne jamais juger nos frères et de rester fidèles à la vérité, même face à la pression du monde."
                                },
                                {
                                    s: 2,
                                    t: "Jésus est chargé de sa croix",
                                    v: "« Jésus, portant sa croix, arriva au lieu du Crâne, qui se nomme en hébreu Golgotha. » (Jn 19, 17)",
                                    p: "Seigneur, tu acceptes le bois de la souffrance. Aide-nous à embrasser nos propres croix quotidiennes avec patience et à te suivre sans murmurer."
                                },
                                {
                                    s: 3,
                                    t: "Jésus tombe pour la première fois",
                                    v: "« C'est de nos souffrances qu'il s'est chargé, c'est de nos douleurs qu'il s'est encombré. » (Is 53, 4)",
                                    p: "Seigneur, quand le poids de nos fautes nous terrasse, donne-nous la grâce de ne pas rester à terre, mais de puiser dans ton amour la force de nous relever."
                                },
                                {
                                    s: 4,
                                    t: "Jésus rencontre sa mère",
                                    v: "« Syméon leur dit : 'Voici que cet enfant doit amener la chute et le relèvement d'un grand nombre... et toi-même, un glaive te transpercera l'âme.' » (Lc 2, 34-35)",
                                    p: "Ô Marie, par ta présence silencieuse sur le chemin du Calvaire, apprends-nous à rester debout auprès de ceux qui souffrent aujourd'hui."
                                },
                                {
                                    s: 5,
                                    t: "Simon de Cyrène aide Jésus",
                                    v: "« Ils réquisitionnèrent, pour porter la croix, un passant qui revenait des champs, Simon de Cyrène. » (Mc 15, 21)",
                                    p: "Seigneur, fais de nous des 'Cyrénéens' pour nos frères. Apprends-nous à partager le fardeau des autres avec un cœur généreux."
                                },
                                {
                                    s: 6,
                                    t: "Véronique essuie le visage de Jésus",
                                    v: "« Il n'avait ni aspect ni éclat pour attirer nos regards... homme de douleurs, familier de la souffrance. » (Is 53, 2-3)",
                                    p: "Seigneur, imprime ton visage dans notre cœur. Que nous sachions reconnaître ton image dans les plus défigurés et les plus abandonnés de nos frères."
                                },
                                {
                                    s: 7,
                                    t: "Jésus tombe pour la deuxième fois",
                                    v: "« Je suis un ver de terre, et non un homme, l'opprobre des hommes et le rebut du peuple. » (Ps 21, 7)",
                                    p: "Seigneur, malgré la fatigue qui grandit, tu persévères. Soutiens notre persévérance dans le bien, surtout quand les épreuves se répètent."
                                },
                                {
                                    s: 8,
                                    t: "Jésus console les filles de Jérusalem",
                                    v: "« Jésus se tourna vers elles et dit : 'Filles de Jérusalem, ne pleurez pas sur moi, mais pleurez sur vous-mêmes et sur vos enfants.' » (Lc 23, 28)",
                                    p: "Seigneur, purifie nos larmes. Donne-nous un vrai repentir pour nos péchés et un cœur attentif à la détresse du monde."
                                },
                                {
                                    s: 9,
                                    t: "Jésus tombe pour la troisième fois",
                                    v: "« Ma force s'en va, mes os se disloquent, mon cœur est comme de la cire qui fond. » (Ps 21, 15)",
                                    p: "Seigneur, à bout de forces, tu tombes une dernière fois. Que ta faiblesse devienne notre force quand nous sommes au bord du découragement."
                                },
                                {
                                    s: 10,
                                    t: "Jésus est dépouillé de ses vêtements",
                                    v: "« Ils partagent entre eux mes habits et tirent au sort ma tunique. » (Jn 19, 24)",
                                    p: "Seigneur, dépouillé de tout, tu nous apprends la liberté intérieure. Aide-nous à nous détacher des biens futiles pour ne nous revêtir que de toi."
                                },
                                {
                                    s: 11,
                                    t: "Jésus est cloué à la croix",
                                    v: "« Lorsqu'ils furent arrivés au lieu dit : Le Crâne, ils l'y crucifièrent. » (Lc 23, 33)",
                                    p: "Seigneur, tes mains sont fixées pour ne plus que bénir. Apprends-nous à pardonner à ceux qui nous font du mal et à offrir nos douleurs pour le salut du monde."
                                },
                                {
                                    s: 12,
                                    t: "Jésus meurt sur la croix",
                                    v: "« Jésus poussa un grand cri et dit : 'Père, entre tes mains je remets mon esprit.' » (Lc 23, 46)",
                                    p: "*(Silence)* Seigneur, par ta mort, tu as vaincu la mort. Accorde-nous de vivre chaque jour en mourant à notre égoïsme pour renaître en toi."
                                },
                                {
                                    s: 13,
                                    t: "Jésus est descendu de la croix",
                                    v: "« Joseph d'Arimathie demanda le corps de Jésus. Il le descendit de la croix et l'enveloppa d'un linceul. » (Lc 23, 52-53)",
                                    p: "Seigneur, entre les mains de Marie, ton corps repose. Donne-nous une foi ferme dans le silence de tes absences apparentes."
                                },
                                {
                                    s: 14,
                                    t: "Jésus est mis au tombeau",
                                    v: "« Il y avait un jardin, et dans ce jardin un tombeau neuf. C'est là qu'ils déposèrent Jésus. » (Jn 19, 41-42)",
                                    p: "Seigneur, le grain de blé est tombé en terre. Dans l'attente du matin de Pâques, aide-nous à attendre dans la paix et l'espérance la victoire de la Vie."
                                }
                            ].map((item) => (
                                <div key={item.s} className="relative group">
                                    {/* Ligne de connexion pour l'effet "Chemin" */}
                                    <div className="absolute left-6 top-12 bottom-0 w-px bg-slate-100 group-last:hidden" />

                                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-rose-200 transition-all ml-4">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 shadow-lg">
                                                {item.s}
                                            </div>

                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h4 className="font-black text-slate-800 text-xl uppercase tracking-tight">{item.t}</h4>
                                                    <div className="h-1 w-12 bg-rose-100 mt-1 rounded-full" />
                                                </div>

                                                <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-rose-400">
                                                    <p className="text-slate-600 text-sm italic leading-relaxed">
                                                        {item.v}
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Oraison</p>
                                                    <p className="text-slate-700 font-medium">
                                                        {item.p}
                                                    </p>
                                                </div>

                                                <div className="pt-2 flex items-center gap-3 text-slate-400 italic text-xs border-t border-slate-50">
                                                    <Wind size={14} className="text-rose-300" />
                                                    <span>Chant : « Ô Croix mon unique espérance... »</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conclusion */}
                        <Card className="p-10 border-none bg-slate-900 text-white rounded-[3rem] text-center space-y-6 relative overflow-hidden">
                            {/* Décoration subtile en arrière-plan */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />

                            <div className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-black tracking-tight">Conclusion du Chemin</h3>

                                {/* Section Parce Domine */}
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-rose-400 font-bold text-sm">V/. Parce, Dómine, parce pópulo tuo:</p>
                                        <p className="text-slate-300 italic text-sm">ne in aetérnum irascáris nobis.</p>
                                    </div>
                                    <div className="w-8 h-px bg-white/10 mx-auto" />
                                    <div className="space-y-1">
                                        <p className="text-rose-400 font-bold text-sm">R/. Parce, Dómine, parce pópulo tuo:</p>
                                        <p className="text-slate-300 italic text-sm">ne in aetérnum irascáris nobis.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-amber-400">La 15ème Station</h4>
                                    <p className="text-slate-400 max-w-md mx-auto italic leading-relaxed">
                                        "Le chemin de croix ne s'arrête pas au tombeau. Nous attendons dans l'espérance la joie de la Résurrection."
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-amber-400 font-bold tracking-wide uppercase text-xs mb-3">Aux intentions du Saint-Père</p>
                                    <p className="text-white font-medium">Notre Père... Je vous salue Marie... Gloire au Père.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
                {/* --- DÉTAIL CHAPELET --- */}
                {activeSection === 'rosary' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-slate-900">Guide du Chapelet</h2>
                            <p className="text-slate-500 font-medium italic">"Le chapelet est une chaîne qui nous relie à Dieu par Marie"</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">

                            <Card className="p-8 border-none bg-slate-900 text-white rounded-[3rem] shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"></div>
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-amber-400">
                                        <Star size={20} /> Rappel des Mystères
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="font-bold text-amber-200 mb-1">Joyeux (Lun & Sam)</p>
                                            <span className="text-slate-400">Annonciation, Visitation, Nativité...</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="font-bold text-rose-300 mb-1">Douloureux (Mar & Ven)</p>
                                            <span className="text-slate-400">Agonie, Flagellation, Couronnement d'épines...</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="font-bold text-indigo-300 mb-1">Glorieux (Mer & Dim)</p>
                                            <span className="text-slate-400">Résurrection, Ascension, Pentecôte...</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <p className="font-bold text-emerald-300 mb-1">Lumineux (Jeudi)</p>
                                            <span className="text-slate-400">Baptême, Noces de Cana, Transfiguration...</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <RosaryStep
                                number="1"
                                title="Introduction"
                                text="Faites le Signe de la Croix. Sur la Croix, récitez le 'Je crois en Dieu' (Credo)."
                            />
                            <RosaryStep
                                number="2"
                                title="Le premier gros grain"
                                text="Récitez un 'Notre Père'. C'est la prière que Jésus nous a enseignée."
                            />
                            <RosaryStep
                                number="3"
                                title="Les trois petits grains"
                                text="Récitez trois 'Je vous salue Marie'. On prie pour la Foi, l'Espérance et la Charité."
                            />
                            <RosaryStep
                                number="4"
                                title="Avant la première dizaine"
                                text="Récitez le 'Gloire au Père'. Annoncez ensuite le premier Mystère (ex: L'Annonciation)."
                            />
                            <RosaryStep
                                number="5"
                                title="La Dizaine (Le cœur du chapelet)"
                                text="Sur le gros grain : un 'Notre Père'. Sur les 10 petits grains : 10 'Je vous salue Marie' en méditant le mystère. Finissez par un 'Gloire au Père'."
                            />
                        </div>
                    </div>
                )}

                {/* --- DÉTAIL PRIÈRES --- */}
              {activeSection === 'prayers' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
    <h2 className="text-3xl font-black text-slate-900">Prières Fondamentales</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Notre Père */}
      <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-indigo-50/50">
        <h4 className="font-bold text-indigo-900 text-xl mb-4">Notre Père</h4>
        <p className="text-slate-700 leading-relaxed italic">
          "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen."
        </p>
      </Card>

      {/* Je vous salue Marie */}
      <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-rose-50/50">
        <h4 className="font-bold text-rose-900 text-xl mb-4">Je vous salue Marie</h4>
        <p className="text-slate-700 leading-relaxed italic">
          "Je vous salue, Marie pleine de grâces ; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous pauvres pécheurs, maintenant et à l’heure de notre mort. Amen."
        </p>
      </Card>

      {/* Acte de Contrition */}
      <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-amber-50/50 md:col-span-2">
        <h4 className="font-bold text-amber-900 text-xl mb-4">Acte de Contrition</h4>
        <p className="text-slate-700 leading-relaxed italic">
          "Mon Dieu, j'ai un très grand regret de vous avoir offensé parce que vous êtes infiniment bon, infiniment aimable et que le péché vous déplaît. Je prends la ferme résolution, avec le secours de votre sainte grâce, de ne plus vous offenser et de faire pénitence. Amen."
        </p>
      </Card>

      {/* Gloire au Père */}
      <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-slate-100/50">
        <h4 className="font-bold text-slate-900 text-xl mb-4">Gloire au Père</h4>
        <p className="text-slate-700 leading-relaxed italic">
          "Gloire au Père, et au Fils, et au Saint-Esprit, comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen."
        </p>
      </Card>

      {/* Invocation à l'Esprit Saint */}
      <Card className="p-8 border-none shadow-sm rounded-[2rem] bg-emerald-50/50">
        <h4 className="font-bold text-emerald-900 text-xl mb-4">Viens Esprit-Saint</h4>
        <p className="text-slate-700 leading-relaxed italic">
          "Viens, Esprit-Saint, remplis le cœur de tes fidèles et allume en eux le feu de ton amour. Envoie ton Esprit et tout sera créé, et tu renouvelleras la face de la terre. Amen."
        </p>
      </Card>

    </div>
  </div>
)}
            </div>
        </DashboardLayout>
    );
}

export default Meditation;