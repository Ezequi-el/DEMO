import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ShieldCheck, Info, X, Zap, ArrowRight } from 'lucide-react';

interface Alert {
  id: number;
  title: string;
  msg: string;
  detail: string;
  type: 'info' | 'safe';
  icon: React.ReactNode;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { 
      id: 1, 
      title: 'IA Actualizada', 
      msg: 'Hemos mejorado el escudo contra grooming.', 
      detail: 'Nuestro sistema de Inteligencia Artificial ahora detecta patrones de lenguaje sospechosos con un 99% más de precisión, protegiendo tus conversaciones en tiempo real sin invadir tu privacidad.',
      type: 'info', 
      icon: <Zap className="w-5 h-5" /> 
    },
    { 
      id: 2, 
      title: '¡Perfecto!', 
      msg: 'Llevas 5 días sin alertas de riesgo.', 
      detail: 'Tu comportamiento digital ha sido ejemplar esta semana. Sigue así para mantener tu racha y desbloquear nuevos premios en la sección de recompensas.',
      type: 'safe', 
      icon: <ShieldCheck className="w-5 h-5" /> 
    },
    { 
      id: 3, 
      title: 'Nueva Guía de Seguridad', 
      msg: 'Aprende a proteger tus contraseñas.', 
      detail: 'Hemos publicado una nueva guía sobre cómo crear contraseñas seguras y fáciles de recordar. Puedes encontrarla en la sección de ayuda una vez que tu tutor valide el acceso.',
      type: 'info', 
      icon: <Info className="w-5 h-5" /> 
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-32 p-6">
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-[#4A90E2]/10 p-2 rounded-lg">
            <Bell className="w-5 h-5 text-[#4A90E2]" />
          </div>
          <span className="text-[10px] font-black text-[#4A90E2] uppercase tracking-[0.2em]">Centro de Avisos</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Notificaciones</h1>
        <p className="text-slate-400 font-bold text-sm">Información importante sobre tu seguridad</p>
      </header>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 100 }}
              key={alert.id}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#D9E2EC] relative overflow-hidden group"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.type === 'info' ? 'bg-[#4A90E2]' : 'bg-[#4CD964]'}`} />
              
              <div className="flex justify-between items-start">
                <div className="flex space-x-4">
                  <div className={`p-3 rounded-2xl ${alert.type === 'info' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'bg-[#4CD964]/10 text-[#4CD964]'}`}>
                    {alert.icon}
                  </div>
                  <div className="pr-4">
                    <h3 className="text-slate-800 font-black text-lg tracking-tight uppercase">{alert.title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{alert.msg}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedAlert(alert)}
                  className="flex items-center space-x-2 text-[#4A90E2] text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform"
                >
                  <span>Más info</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {alerts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center space-y-4 bg-white/50 border-2 border-dashed border-[#D9E2EC] rounded-[2.5rem]"
          >
             <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-10 h-10 text-[#4CD964]" />
             </div>
             <div>
               <p className="font-black text-slate-800 uppercase tracking-tight">Todo despejado</p>
               <p className="text-xs font-bold text-slate-400">No hay más avisos por hoy.</p>
             </div>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlert(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="p-3 bg-[#F7F9FC] rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-6">
                <div className={`mx-auto w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl ${selectedAlert.type === 'info' ? 'bg-[#4A90E2] text-white shadow-[#4A90E2]/20' : 'bg-[#4CD964] text-white shadow-[#4CD964]/20'}`}>
                   {selectedAlert.icon}
                </div>
                
                <div className="space-y-2">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedAlert.type === 'info' ? 'text-[#4A90E2]' : 'text-[#4CD964]'}`}>
                    {selectedAlert.type === 'info' ? 'Informativo' : 'Seguridad'}
                  </span>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-tight italic">{selectedAlert.title}</h2>
                </div>

                <div className="bg-[#F7F9FC] p-6 rounded-3xl border border-[#D9E2EC]">
                  <p className="text-slate-600 font-medium text-sm leading-relaxed tracking-tight">
                    {selectedAlert.detail}
                  </p>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAlert(null)}
                  className="w-full bg-[#4A90E2] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#4A90E2]/30"
                >
                  Entendido
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
