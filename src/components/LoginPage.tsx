import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Shield, ArrowRight, UserPlus, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import TermsAndConditions from './TermsAndConditions';

export default function LoginPage() {
  const { login, setIsSigningUp } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In this UX demo, we just login
    login();
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryEmailSent(true);
  };

  if (showTerms) {
    return <TermsAndConditions onClose={() => setShowTerms(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-900 overflow-hidden relative">
      {/* Top Placeholder for Image */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-56 bg-slate-200/50 flex items-center justify-center relative overflow-hidden shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A90E2]/10 to-transparent" />
        <div className="bg-white/40 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/50 shadow-sm">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Espacio para Imagen</p>
        </div>
      </motion.div>

      <main className="flex-1 px-8 pt-10 pb-12 max-w-md mx-auto w-full flex flex-col">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-[#4A90E2] rounded-2xl shadow-xl shadow-[#4A90E2]/20 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">GUARDIAN</h1>
            <p className="text-slate-400 text-[11px] font-bold tracking-widest uppercase mt-1">Protección Digital Inteligente</p>
          </div>

          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 placeholder:text-slate-300 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 placeholder:text-slate-300 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button 
                      type="button" 
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs font-bold text-slate-400 hover:text-[#4A90E2] transition-colors tracking-tight"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#4A90E2] text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm shadow-xl shadow-[#4A90E2]/30 hover:bg-[#357ABD] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Iniciar sesión</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>

                <div className="mt-8 flex flex-col items-center space-y-6">
                  <div className="flex items-center space-x-2 w-full">
                     <div className="h-px bg-slate-200 flex-1" />
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">o</span>
                     <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  <button 
                    onClick={() => setIsSigningUp(true)}
                    className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-[#6EDC8C] transition-all group"
                  >
                     <UserPlus className="w-5 h-5 text-slate-400 group-hover:text-[#6EDC8C]" />
                     <span>Crear cuenta nueva</span>
                  </button>
                </div>
              </motion.div>
            ) : !recoveryEmailSent ? (
              <motion.div
                key="recovery-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-6"
              >
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Recuperar Contraseña</h2>
                  <p className="text-slate-400 text-xs font-medium">Ingresa tu correo y te enviaremos las instrucciones.</p>
                </div>

                <form onSubmit={handleRecoverySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        placeholder="tu-correo@ejemplo.com"
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 placeholder:text-slate-300 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#4A90E2] text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm shadow-xl shadow-[#4A90E2]/30 hover:bg-[#357ABD] transition-all"
                    >
                      Enviar Recuperación
                    </motion.button>
                    <button 
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver al inicio</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="recovery-sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center py-8 space-y-6"
              >
                <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">¡Revisa tu correo!</h2>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Hemos enviado las instrucciones de recuperación a <span className="text-[#4A90E2] font-bold">{recoveryEmail}</span>.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setRecoveryEmailSent(false);
                  }}
                  className="w-full bg-slate-900 text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
                >
                  Entendido
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-auto pt-10 text-center text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
            Al continuar aceptas nuestros <button onClick={() => setShowTerms(true)} className="text-slate-400 underline outline-none">Términos y Condiciones</button>
          </p>
      </main>
    </div>
  );
}

