import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cross, Mail, Lock, User, Phone, ArrowRight, Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false); // Bascule l'affichage
  const [otpCode, setOtpCode] = useState(""); // Stocke le code saisi

  // States pour les formulaires
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    name: "", email: "", password: "", phone: "" 
  });

  // Gestion de la Connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(loginData);
      toast.success(`Heureux de vous revoir, ${data.user.name} !`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Gestion de l'Inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(registerData);
      toast.success("Code envoyé !", {
        description: "Vérifiez votre boîte mail pour activer votre compte.",
      });
      setShowOtp(true); // <--- On affiche l'interface OTP ici
    } catch (err) {
      toast.error(err.message || "Impossible de créer le compte.");
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la vérification OTP
 const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Appel au service au lieu d'axios en direct
      await authService.verifyOtp(registerData.email, otpCode);
      
      toast.success("Compte activé avec succès !", {
        description: "Vous pouvez maintenant vous connecter."
      });
      
      setShowOtp(false); // On repasse à l'interface de connexion
      
      // On pré-remplit l'email pour faciliter la connexion
      setLoginData(prev => ({ ...prev, email: registerData.email }));
      
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#fafafa]">
      {/* Design Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />

      <div className="w-full max-w-[450px] z-10">
        <div className="text-center mb-10 space-y-3">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-2xl rotate-3">
              <Cross size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-4">Compagnon du Carême</h1>
        </div>

        {!showOtp ? (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full gap-1 h-15 bg-slate-100/50 backdrop-blur-md rounded-2xl p-1 mb-8">
              <TabsTrigger value="login" className="rounded-xl h-12 text-base font-semibold">Se connecter</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl h-12 text-base font-semibold">S'inscrire</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl">
                  <CardHeader>
                    <CardTitle>Bon retour</CardTitle>
                    <CardDescription>Poursuivez vos efforts et votre prière.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="ml-1">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <Button disabled={loading} className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold">
                      {loading ? <Loader2 className="animate-spin" /> : "Commencer ma journée"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl">
                  <CardHeader>
                    <CardTitle>Nouvelle Alliance</CardTitle>
                    <CardDescription>Rejoignez la communauté des pèlerins.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tes champs Name, Phone, Email, Password ici (identiques à ton code) */}
                    <div className="space-y-2">
                      <Label className="ml-1">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required value={registerData.name} onChange={(e) => setRegisterData({...registerData, name: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required value={registerData.phone} onChange={(e) => setRegisterData({...registerData, phone: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="email" value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="password" value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <Button disabled={loading} className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold mt-2">
                      {loading ? <Loader2 className="animate-spin" /> : "S'inscrire au pèlerinage"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          /* INTERFACE OTP - Apparaît après handleRegister */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <form onSubmit={handleVerifyOtp}>
              <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600" />
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck size={24} />
                  </div>
                  <CardTitle className="text-xl">Vérifiez votre Email</CardTitle>
                  <CardDescription>
                    Nous avons envoyé un code à 6 chiffres à <br />
                    <span className="font-bold text-slate-900">{registerData.email}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Input 
                      required 
                      type="text" 
                      placeholder="000000"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="text-center text-2xl tracking-[0.5em] font-bold h-16 bg-slate-50 border-2 focus:border-purple-500 rounded-2xl"
                    />
                  </div>
                  <Button disabled={loading} className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold flex gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : "Activer mon compte"}
                  </Button>
                  <button 
                    type="button"
                    onClick={() => setShowOtp(false)}
                    className="w-full text-sm text-slate-500 hover:text-purple-600 transition-colors"
                  >
                    Retour à l'inscription
                  </button>
                </CardContent>
              </Card>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}