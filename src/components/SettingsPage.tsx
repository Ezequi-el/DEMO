import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Globe, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function SettingsPage() {
  const { setCurrentView } = useAppStore();
  
  // States for toggles
  const [filterActive, setFilterActive] = useState(true);
  const [blockExplicit, setBlockExplicit] = useState(true);
  const [filterLevel, setFilterLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  
  const [notificationsActive, setNotificationsActive] = useState(true);
  const [suspiciousAlerts, setSuspiciousAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [realTime, setRealTime] = useState(true);

  const [language, setLanguage] = useState('Español');

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-[#6EDC8C]' : 'bg-slate-200'}`}
    >
      <motion.div 
        animate={{ x: active ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-900 pb-32">
      {/* Header */}
      <header className="p-6 flex items-center justify-between sticky top-0 bg-[#F7F9FC]/80 backdrop-blur-md z-20">
        <button 
          onClick={() => setCurrentView('profile')}
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Configuración</h1>
        <div className="w-11" /> {/* Spacer */}
      </header>

      <main className="px-6 space-y-8 max-w-md mx-auto w-full">
        
        {/* Section: Content Filter */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="p-2 bg-[#4A90E2]/10 rounded-xl">
              <Shield className="w-4 h-4 text-[#4A90E2]" />
            </div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Filtro de Contenido</h2>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700">Filtro Inteligente</p>
                <p className="text-[10px] text-slate-400 font-medium">Activar protección activa por IA</p>
              </div>
              <Toggle active={filterActive} onToggle={() => setFilterActive(!filterActive)} />
            </div>

            {filterActive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 pt-6 border-t border-slate-50"
              >
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nivel de Filtro</p>
                  <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                    {(['Low', 'Medium', 'High'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setFilterLevel(level)}
                        className={`py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                          filterLevel === level 
                            ? 'bg-white text-[#4A90E2] shadow-md shadow-slate-200/50' 
                            : 'text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        {level === 'Low' ? 'Bajo' : level === 'Medium' ? 'Medio' : 'Alto'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-orange-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-600">Bloquear contenido explícito</p>
                  </div>
                  <Toggle active={blockExplicit} onToggle={() => setBlockExplicit(!blockExplicit)} />
                </div>

                <button className="w-full py-4 px-6 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                     <AlertTriangle className="w-4 h-4 text-slate-400" />
                     <span className="text-sm font-bold text-slate-600">Bloquear apps específicas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-slate-300">12 Apps</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Section: Language */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="p-2 bg-[#9B8AFB]/10 rounded-xl">
              <Globe className="w-4 h-4 text-[#9B8AFB]" />
            </div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lenguaje</h2>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 flex items-center justify-between group cursor-pointer hover:border-[#9B8AFB]/20 transition-all">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-[#9B8AFB]/5 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#9B8AFB]" />
               </div>
               <div>
                  <p className="font-bold text-slate-700">Idioma de la App</p>
                  <p className="text-[10px] text-slate-400 font-medium">{language}</p>
               </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#9B8AFB]/10 text-[#9B8AFB] text-[10px] font-black px-3 py-1 rounded-full uppercase">ES</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </section>

        {/* Section: Notifications */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="p-2 bg-[#FFD93D]/10 rounded-xl">
              <Bell className="w-4 h-4 text-[#FFD93D]" />
            </div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Notificaciones</h2>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-700">Notificaciones Push</p>
                <p className="text-[10px] text-slate-400 font-medium">Alertas y actualizaciones</p>
              </div>
              <Toggle active={notificationsActive} onToggle={() => setNotificationsActive(!notificationsActive)} />
            </div>

            {notificationsActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-6 border-t border-slate-50"
              >
                {[
                  { id: 'suspicious', label: 'Actividad sospechosa', sub: 'Alertas críticas detectadas', active: suspiciousAlerts, setter: setSuspiciousAlerts, icon: AlertTriangle, color: 'text-red-400' },
                  { id: 'summary', label: 'Resumen diario', sub: 'Reporte de uso cada noche', active: dailySummary, setter: setDailySummary, icon: Clock, color: 'text-[#4A90E2]' },
                  { id: 'realtime', label: 'Tiempo real', sub: 'Notificaciones inmediatas', active: realTime, setter: setRealTime, icon: Check, color: 'text-[#6EDC8C]' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-600">{item.label}</p>
                        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">{item.sub}</p>
                      </div>
                    </div>
                    <Toggle active={item.active} onToggle={() => item.setter(!item.active)} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer info */}
        <div className="text-center py-4 space-y-2">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">SafeFy v1.0.4 - Hackathon Build</p>
           <button className="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest underline decoration-dotted">Eliminar todos los datos</button>
        </div>
      </main>
    </div>
  );
}
