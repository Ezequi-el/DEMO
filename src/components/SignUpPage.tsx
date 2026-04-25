import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  ChevronDown, 
  Camera, 
  ArrowRight, 
  Shield, 
  Check,
  Smartphone,
  Users
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import TermsAndConditions from './TermsAndConditions';

export default function SignUpPage() {
  const { setRole, login, setIsSigningUp } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<'guardian' | 'minor'>('guardian');
  const [gender, setGender] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    login();
    setIsSigningUp(false);
  };

  if (showTerms) {
    return <TermsAndConditions onClose={() => setShowTerms(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-900 pb-12">
      {/* Top Placeholder */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-40 bg-slate-200/40 relative overflow-hidden flex items-center justify-center border-b border-slate-100"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4A90E2]/10 via-transparent to-[#9B8AFB]/10" />
        <div className="bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/60 shadow-sm z-10">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">Banner Personalizable</p>
        </div>
      </motion.div>

      <main className="px-7 -mt-6 relative z-10 flex flex-col max-w-md mx-auto w-full">
        {/* Header card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Crear cuenta</h1>
            <p className="text-slate-400 text-sm font-medium mt-2 leading-relaxed italic">
              Configura un entorno seguro para el monitoreo digital
            </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-3 mb-4">
             <div className="relative group">
                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                   <User className="w-10 h-10 text-slate-300" />
                </div>
                <button type="button" className="absolute -bottom-2 -right-2 bg-[#4A90E2] text-white p-2.5 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                   <Camera className="w-4 h-4" />
                </button>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Foto de perfil</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors" />
              <input 
                type="text" 
                placeholder="Nombre completo" 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 shadow-sm"
                required
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors" />
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 shadow-sm"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors" />
              <input 
                type="password" 
                placeholder="Crear contraseña" 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 shadow-sm"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="relative group flex-1">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#4A90E2] transition-colors" />
                <input 
                  type="number" 
                  placeholder="Edad" 
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] transition-all font-medium text-slate-700 shadow-sm"
                  required
                />
              </div>

              <div className="relative flex-1">
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-5 pr-10 outline-none focus:ring-4 focus:ring-[#4A90E2]/10 focus:border-[#4A90E2] appearance-none transition-all font-medium text-slate-700 shadow-sm"
                  required
                >
                  <option value="" disabled>Género</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="private">Prefiero no decirlo</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecciona tu rol</span>
            <div className="grid grid-cols-2 gap-4">
               <button 
                type="button"
                onClick={() => setSelectedRole('guardian')}
                className={`p-5 rounded-[1.5rem] border-2 transition-all flex flex-col items-center space-y-2 relative overflow-hidden ${
                  selectedRole === 'guardian' ? 'bg-[#4A90E2]/5 border-[#4A90E2] shadow-lg shadow-[#4A90E2]/10' : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
               >
                  <Users className={`w-8 h-8 ${selectedRole === 'guardian' ? 'text-[#4A90E2]' : 'text-slate-300'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${selectedRole === 'guardian' ? 'text-slate-800' : 'text-slate-400'}`}>Guardián</span>
                  {selectedRole === 'guardian' && (
                    <div className="absolute top-2 right-2 bg-[#4A90E2] p-0.5 rounded-full">
                       <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                    </div>
                  )}
               </button>

               <button 
                type="button"
                onClick={() => setSelectedRole('minor')}
                className={`p-5 rounded-[1.5rem] border-2 transition-all flex flex-col items-center space-y-2 relative overflow-hidden ${
                  selectedRole === 'minor' ? 'bg-[#4A90E2]/5 border-[#4A90E2] shadow-lg shadow-[#4A90E2]/10' : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
               >
                  <Smartphone className={`w-8 h-8 ${selectedRole === 'minor' ? 'text-[#4A90E2]' : 'text-slate-300'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${selectedRole === 'minor' ? 'text-slate-800' : 'text-slate-400'}`}>Menor</span>
                  {selectedRole === 'minor' && (
                    <div className="absolute top-2 right-2 bg-[#4A90E2] p-0.5 rounded-full">
                       <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                    </div>
                  )}
               </button>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#4A90E2] text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-sm shadow-xl shadow-[#4A90E2]/30 hover:bg-[#357ABD] transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>Crear cuenta</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
          Al registrarte aceptas nuestros <button type="button" onClick={() => setShowTerms(true)} className="text-slate-400 underline outline-none">Términos y Condiciones</button>
        </p>

        <div className="mt-6 text-center pb-8 border-t border-slate-100 pt-8">
           <button 
            onClick={() => setIsSigningUp(false)}
            className="text-sm font-bold text-slate-500 hover:text-[#4A90E2] transition-colors"
           >
             ¿Ya tienes cuenta? <span className="text-[#4A90E2]">Iniciar sesión</span>
           </button>
        </div>
      </main>

    </div>
  );
}
