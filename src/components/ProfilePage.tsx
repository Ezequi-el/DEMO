import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, LogOut, ChevronRight, Share2, Shield, X, Trophy } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function ProfilePage() {
  const { username, points, streak, age, setCurrentView, logout, setAge } = useAppStore();
  const [showShareSoon, setShowShareSoon] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-32">
      {/* Header / Banner */}
      <div className="h-48 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="px-6 -mt-20 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl relative">
            <div className="w-full h-full bg-[#F0F4F8] rounded-[2rem] flex items-center justify-center">
               <User className="w-16 h-16 text-[#4A90E2]/30" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
               <Shield className="w-5 h-5 text-indigo-900" />
            </div>
          </div>
          
          <h1 className="mt-4 text-3xl font-black text-slate-800 tracking-tight">{username}</h1>
          <p className="text-[#4A90E2] font-black uppercase tracking-[0.2em] text-[10px] mt-1">Ciudadano Digital Nivel 14</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
           <div className="bg-white rounded-3xl p-6 border border-[#D9E2EC] text-center shadow-sm">
              <span className="block text-3xl font-black text-slate-800 mb-1">{streak}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Racha de días</span>
           </div>
           <div className="bg-white rounded-3xl p-6 border border-[#D9E2EC] text-center shadow-sm">
              <span className="block text-3xl font-black text-[#4CD964] mb-1">{points}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Puntos Bepo</span>
           </div>
        </div>

        {/* Age Adjustment (Test Only) */}
        <div className="mt-8 bg-white rounded-3xl p-6 border border-[#D9E2EC] shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Tu Edad Actual</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black">{age} años</span>
           </div>
           <div className="flex space-x-2">
              {[8, 11, 14, 17].map(a => (
                <button 
                  key={a}
                  onClick={() => setAge(a)}
                  className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${age === a ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                >
                  {a}
                </button>
              ))}
           </div>
           <p className="mt-4 text-[9px] text-slate-400 font-bold italic leading-relaxed">
             * Ajusta tu edad para ver cómo cambian las lecciones y las advertencias de la IA en la Zona Educativa.
           </p>
        </div>

        {/* Action Menu */}
        <div className="mt-8 space-y-3">
          <button 
            onClick={() => setCurrentView('settings')}
            className="w-full bg-white rounded-2xl p-5 flex items-center justify-between text-slate-900 hover:border-[#4A90E2] border border-[#D9E2EC] transition-all shadow-sm group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-[#F0F4F8] rounded-xl text-slate-400 group-hover:text-[#4A90E2] group-hover:bg-[#4A90E2]/10 transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700 tracking-tight">Configuración Personal</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-200" />
          </button>

          <button 
            onClick={() => setShowShareSoon(true)}
            className="w-full bg-white rounded-2xl p-5 flex items-center justify-between text-slate-900 hover:border-[#4A90E2] border border-[#D9E2EC] transition-all shadow-sm group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-[#F0F4F8] rounded-xl text-slate-400 group-hover:text-[#4A90E2] group-hover:bg-[#4A90E2]/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700 tracking-tight">Compartir Perfil</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-200" />
          </button>

          <button 
            onClick={logout}
            className="w-full bg-red-50 text-red-600 rounded-2xl p-5 flex items-center justify-center space-x-3 font-black uppercase tracking-widest text-xs mt-6 border border-red-100 hover:bg-red-100 transition-colors shadow-sm"
          >
             <LogOut className="w-4 h-4" />
             <span>Cerrar Sesión</span>
          </button>
        </div>

        <p className="mt-12 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] pb-10">
          Guardian v1.0.0        </p>
      </div>

      {/* Share Soon Modal */}
      <AnimatePresence>
        {showShareSoon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowShareSoon(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden text-center"
            >
              <div className="mb-6 mx-auto w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                 <Trophy className="w-10 h-10 text-amber-500" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-tight mb-4">Competir con amigos</h2>
              
              <div className="bg-[#F0F4F8] p-6 rounded-3xl mb-8">
                <p className="text-slate-600 font-bold text-sm leading-relaxed">
                  ¡Próximamente podrás comparar tus rachas y logros con tus amigos de forma segura! Estamos preparando un entorno 100% verificado para esta función.
                </p>
              </div>

              <button 
                onClick={() => setShowShareSoon(false)}
                className="w-full bg-[#4A90E2] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#4A90E2]/30"
              >
                ¡Qué guay!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
