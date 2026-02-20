import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cross, Mail, Lock, User, Phone, Loader2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "", email: "", password: "", phone: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(loginData);
      toast.success(`Heureux de vous revoir, ${data.user.name} !`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }
    setLoading(true);
    try {
      await authService.register(registerData);
      toast.success("Code envoyé !");
      setShowOtp(true);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyOtp(registerData.email, otpCode);
      toast.success("Compte activé !");
      setShowOtp(false);
      setLoginData(prev => ({ ...prev, email: registerData.email }));
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#fafafa]">
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
                    <CardTitle className="text-2xl font-bold">Bon retour</CardTitle>
                    <CardDescription>Poursuivez vos efforts et votre prière.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="ml-1">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="pl-10 h-12 rounded-xl" />
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
                    <CardTitle className="text-2xl font-bold">Nouvelle Alliance</CardTitle>
                    <CardDescription>Rejoignez la communauté des pèlerins.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="ml-1">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="ml-1">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <Input required type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className="pl-10 h-12 rounded-xl" />
                      </div>
                    </div>

                    {/* Checkbox Obligatoire */}
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <input 
                        type="checkbox" 
                        required
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label className="text-xs text-slate-500 leading-relaxed">
                        J'accepte la <button type="button" onClick={() => setIsPrivacyOpen(true)} className="text-purple-600 font-bold hover:underline">politique de confidentialité</button> et la protection de mes données personnelles.
                      </label>
                    </div>

                    <Button disabled={loading} className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold">
                      {loading ? <Loader2 className="animate-spin" /> : "S'inscrire au pèlerinage"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          /* OTP Interface originale */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <form onSubmit={handleVerifyOtp}>
              <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden text-center p-6">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold">Vérifiez votre Email</CardTitle>
                  <CardDescription>Code envoyé à {registerData.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 flex flex-col items-center">
                  <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} className="w-11 h-14 text-lg font-bold border-2" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <Button disabled={loading || otpCode.length !== 6} className="w-full h-12 bg-purple-600 text-white rounded-xl font-bold">
                    Activer mon compte
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        )}

        {/* Bouton Confidentialité Fixe */}
        <button 
          onClick={() => setIsPrivacyOpen(true)}
          className="mt-10 w-full text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
        >
          <ShieldCheck size={14} />
          Confidentialité
        </button>
      </div>

       {/* --- MODAL CONFIDENTIALITÉ (Universselle & Loi 25) --- */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400">
              <X size={18} />
            </button>

            <div className="p-7 md:p-9">
              <div className="mb-6">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Vie Privée</h2>
                <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">Protection des données</p>
              </div>

              <div className="space-y-5 text-slate-600 text-xs leading-relaxed">
                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">1. Transparence</h4>
                  <p>Nous utilisons votre prénom pour personnaliser l'accueil et votre email pour la sécurité du compte. Rien d'autre.</p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">2. Engagement éthique</h4>
                  <p>Vos données sont confidentielles. Elles ne sont <strong>jamais partagées ou vendues</strong>. L'application respecte les normes internationales (Loi 25 Canada, RGPD Europe).</p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-800 text-[13px] mb-1 uppercase tracking-tight">3. Droit à l'oubli</h4>
                  <p>Vous pouvez demander la suppression totale de vos données via l'onglet Profil. Vos données seront alors effacées de nos serveurs définitivement.</p>
                </section>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-[11px] text-slate-500">
                  "Votre marche spirituelle est privée. Nous protégeons votre intimité avec le plus grand respect."
                </div>
              </div>

              <Button 
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full mt-8 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                C'est compris
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}