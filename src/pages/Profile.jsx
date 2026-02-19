import React, { useState } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
// Ajout des imports pour la modal et le menu
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { User, Mail, Lock, Key, ShieldCheck, Loader2, Phone, Calendar, Trash2, Sparkles, MoreVertical, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    // Récupération de l'utilisateur
    const user = JSON.parse(localStorage.getItem("user")) || {};

    // États des formulaires
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
    });

    // FONCTION : MISE À JOUR DU PROFIL (Nom, Email, Tel)
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            await authService.updateProfile(formData);
            toast.success("Profil mis à jour avec succès !");
            setIsEditModalOpen(false);
            // On peut forcer un petit refresh si nécessaire ou laisser l'authService gérer le localStorage
        } catch (err) {
            toast.error(err);
        } finally {
            setUpdateLoading(false);
        }
    };

    // FONCTION : MISE À JOUR MOT DE PASSE
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 6) {
            return toast.error("Le nouveau mot de passe doit contenir au moins 6 caractères.");
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("Le nouveau mot de passe et la confirmation ne correspondent pas.");
        }
        setLoading(true);
        try {
            await authService.updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success("Mot de passe mis à jour !");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        alert("fonctionalité à venir !!! merci de la compréhension")
        // setDeleteLoading(true);
        // try {
        //     await new Promise(r => setTimeout(r, 1500));
        //     authService.logout();
        //     toast.success("Compte supprimé définitivement.");
        //     navigate("/auth");
        // } catch (err) {
        //     toast.error("Erreur lors de la suppression.");
        // } finally {
        //     setDeleteLoading(false);
        // }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* SECTION 1 : INFORMATIONS PERSONNELLES */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            Profil du Pèlerin
                        </h2>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-100 bg-emerald-50 font-bold">
                            Compte Actif
                        </Badge>
                    </div>

                    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden relative">
                        {/* MENU 3 POINTS EN HAUT À DROITE */}
                        <div className="absolute top-6 right-6">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                                        <MoreVertical size={20} className="text-slate-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-lg">
                                    <DropdownMenuItem 
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer p-3"
                                    >
                                        <Edit3 size={16} /> Modifier les informations
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Sparkles className="text-amber-500" size={20} />
                                Informations du compte
                            </CardTitle>
                            <CardDescription>
                                Détails de votre identité sur le chemin du Carême.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-4 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Nom du fidèle</Label>
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/50">
                                        <User size={18} className="text-slate-400" />
                                        <p className="text-sm font-bold text-slate-700">{user.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Adresse de contact</Label>
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                                        <Mail size={18} className="text-slate-400" />
                                        <p className="text-sm font-bold text-slate-700">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Ligne directe</Label>
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                                        <Phone size={18} className="text-slate-400" />
                                        <p className="text-sm font-bold text-slate-700">{user.phone || "Non renseigné"}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Début du cheminement</Label>
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                                        <Calendar size={18} className="text-slate-400" />
                                        <p className="text-sm font-bold text-slate-700">Février 2026</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* MODAL DE MODIFICATION DU PROFIL */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="rounded-[2.5rem] border-none sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-slate-900">Modifier le profil</DialogTitle>
                            <DialogDescription>Mettez à jour vos informations de contact.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdateProfile} className="space-y-5 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-400 uppercase">Nom complet</Label>
                                    <Input 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="rounded-xl bg-slate-50 border-slate-100 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-400 uppercase">Email</Label>
                                    <Input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="rounded-xl bg-slate-50 border-slate-100 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-400 uppercase">Téléphone</Label>
                                    <Input 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="rounded-xl bg-slate-50 border-slate-100 h-12"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="submit" disabled={updateLoading} className="w-full h-12 bg-slate-900 rounded-xl font-bold">
                                    {updateLoading ? <Loader2 className="animate-spin" /> : "Enregistrer les changements"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* SECTION 2 : SÉCURITÉ */}
                <section className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Sécurité</h2>
                    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <ShieldCheck className="text-purple-600" size={24} />
                                Confidentialité
                            </CardTitle>
                            <CardDescription>Modifiez votre mot de passe pour sécuriser votre compte.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdatePassword} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Mot de passe actuel</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <Input
                                            id="current"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className="pl-10 h-12 bg-slate-50 rounded-xl focus-visible:ring-purple-200"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="new">Nouveau mot de passe</Label>
                                        <div className="relative">
                                            <Key className="absolute left-3 top-3 text-slate-400" size={18} />
                                            <Input
                                                id="new"
                                                type="password"
                                                required
                                                placeholder="6 caractères min."
                                                className="pl-10 h-12 bg-slate-50 rounded-xl focus-visible:ring-purple-200"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm">Confirmer</Label>
                                        <div className="relative">
                                            <Key className="absolute left-3 top-3 text-slate-400" size={18} />
                                            <Input
                                                id="confirm"
                                                type="password"
                                                required
                                                placeholder="Répétez le mot de passe"
                                                className="pl-10 h-12 bg-slate-50 rounded-xl focus-visible:ring-purple-200"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800 rounded-xl w-full h-12 font-bold">
                                    {loading ? <Loader2 className="animate-spin" /> : "Mettre à jour le mot de passe"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>

                {/* SECTION 3 : ZONE DANGER */}
                <section className="pt-6 border-t border-red-100">
                    <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center md:text-left">
                            <h3 className="text-red-800 font-bold text-lg">Supprimer mon compte</h3>
                            <p className="text-red-600/70 text-sm italic">Cette action est irréversible.</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-red-200">
                                    <Trash2 size={18} className="mr-2" /> Supprimer définitivement
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-3xl border-none">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                                    <AlertDialogDescription>Cela supprimera définitivement votre compte et vos données.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-2">
                                    <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 rounded-xl">
                                        {deleteLoading ? <Loader2 className="animate-spin" /> : "Oui, supprimer"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}