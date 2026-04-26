import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Star, 
  Bell, 
  User, 
  Shield, 
  Flame, 
  Clock, 
  Calendar, 
  Users, 
  ChevronRight,
  Gift,
  History,
  X,
  Filter,
  Search,
  Smartphone,
  Instagram,
  Youtube,
  QrCode,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  BookOpen,
  Gamepad2,
  Video,
  PlayCircle,
  ArrowRight,
  ShieldAlert,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import RewardsPage from './RewardsPage';
import AlertsPage from './AlertsPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import EducationPage from './EducationPage';
import TikTokFeed from './TikTokFeed';

export default function MinorDashboard() {
  const { username, currentView, setCurrentView, isLinkedToTutor, setLinkedToTutor } = useAppStore();
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [activeUsageTab, setActiveUsageTab] = useState('Hoy');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Linking flow states
  const [showLinkingModal, setShowLinkingModal] = useState(false);
  const [linkingStep, setLinkingStep] = useState<'qr' | 'success'>('qr');
  const [timer, setTimer] = useState(120); // 2 minutes

  useEffect(() => {
    let interval: any;
    if (showLinkingModal && linkingStep === 'qr' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showLinkingModal, linkingStep, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartLinking = () => {
    setTimer(120);
    setLinkingStep('qr');
    setShowLinkingModal(true);
  };

  const simulateSuccess = () => {
    setLinkingStep('success');
    setTimeout(() => {
      setLinkedToTutor(true);
      setShowLinkingModal(false);
    }, 2000);
  };

  const usagePeriods: Record<string, any[]> = {
    'Hoy': [
      { name: 'TikTok', time: '45m', icon: Smartphone, color: 'text-black bg-stone-100' },
      { name: 'Instagram', time: '1h 30m', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
      { name: 'YouTube', time: '2h 15m', icon: Youtube, color: 'text-red-600 bg-red-50' },
    ],
    'Esta semana': [
      { name: 'TikTok', time: '5h 20m', icon: Smartphone, color: 'text-black bg-stone-100' },
      { name: 'Instagram', time: '8h 15m', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
      { name: 'YouTube', time: '12h 45m', icon: Youtube, color: 'text-red-600 bg-red-50' },
      { name: 'WhatsApp', time: '3h 10m', icon: Smartphone, color: 'text-emerald-600 bg-emerald-50' },
    ],
    'Hace una semana': [
      { name: 'TikTok', time: '4h 30m', icon: Smartphone, color: 'text-black bg-stone-100' },
      { name: 'YouTube', time: '10h 00m', icon: Youtube, color: 'text-red-600 bg-red-50' },
      { name: 'Free Fire', time: '6h 15m', icon: Smartphone, color: 'text-orange-600 bg-orange-50' },
    ],
    'Hace un mes': [
      { name: 'YouTube', time: '45h 30m', icon: Youtube, color: 'text-red-600 bg-red-50' },
      { name: 'Instagram', time: '32h 10m', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
      { name: 'Discord', time: '12h 45m', icon: Smartphone, color: 'text-indigo-600 bg-indigo-50' },
    ],
    'Antiguo': [
      { name: 'Fortnite', time: '120h 00m', icon: Smartphone, color: 'text-blue-600 bg-blue-50' },
      { name: 'YouTube', time: '300h 15m', icon: Youtube, color: 'text-red-600 bg-red-50' },
    ]
  };

  const renderContent = () => {
    switch (currentView) {
      case 'rewards': return <RewardsPage />;
      case 'alerts': return <AlertsPage />;
      case 'profile': return <ProfilePage />;
      case 'settings': return <SettingsPage />;
      case 'education': return <EducationPage />;
      case 'tiktok': return <TikTokFeed onBack={() => setCurrentView('home')} />;
      default: return (
        <div className="flex flex-col px-6 pt-8 pb-32 space-y-6 max-w-md mx-auto">
          {/* 1. Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[20px] p-6 shadow-sm border border-[#D9E2EC]"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#F7F9FC] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                   <User className="w-8 h-8 text-slate-400" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4CD964] rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800">{username}</h2>
                <div className="flex items-center space-x-1.5">
                   <div className="w-2 h-2 bg-[#4CD964] rounded-full" />
                   <span className="text-xs font-medium text-slate-500">En línea</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#F7F9FC]">
              {/* Racha */}
              <div className="space-y-3">
                 <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-[#4CD964]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Racha de días</span>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-2xl font-black text-[#4CD964]">5 Días</p>
                    <div className="h-1.5 w-full bg-[#F7F9FC] rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '70%' }}
                         className="h-full bg-[#4CD964] rounded-full" 
                        />
                    </div>
                 </div>
              </div>
              
              {/* Tiempo */}
              <div className="space-y-3">
                 <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#4CD964]" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tiempo de hoy</span>
                 </div>
                 <p className="text-2xl font-black text-[#4CD964]">1h 24m</p>
              </div>
            </div>
          </motion.div>

          {/* 2. Entorno 100% Seguro Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#D9E2EC] relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-6 -right-6 opacity-[0.03]">
               <Shield className="w-40 h-40 text-[#4CD964] rotate-12" />
            </div>
            
            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#4CD964]/10 rounded-2xl flex items-center justify-center border border-[#4CD964]/10 shadow-sm animate-pulse">
                     <Shield className="w-7 h-7 text-[#4CD964]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic leading-none">Entorno 100% seguro</h3>
                    <p className="text-[11px] font-black text-[#4CD964] uppercase tracking-[0.2em] mt-1.5 flex items-center">
                      <span className="w-2 h-2 bg-[#4CD964] rounded-full mr-2 shadow-[0_0_8px_rgba(76,217,100,0.5)]" />
                      Sincronización IA activa
                    </p>
                  </div>
                </div>
              </div>

              {/* Safe Apps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { 
                    name: 'TikTok', 
                    icon: 'https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png',
                    status: 'allowed'
                  },
                  { 
                    name: 'YouTube Kids', 
                    icon: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png',
                    status: 'blocked'
                  },
                  { 
                    name: 'Roblox', 
                    icon: 'https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/roblox-512.png',
                    status: 'blocked'
                  },
                ].map((app, i) => (
                  <motion.button
                    key={i}
                    onClick={() => app.name === 'TikTok' ? setCurrentView('tiktok') : null}
                    whileTap={app.status === 'allowed' ? { scale: 0.95 } : {}}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-[1.5rem] border transition-all ${
                      app.status === 'allowed' 
                        ? 'bg-[#F7F9FC] border-transparent hover:border-[#4A90E2]/30 hover:bg-white hover:shadow-lg group' 
                        : 'bg-slate-50/50 border-slate-100 opacity-60 grayscale cursor-not-allowed'
                    }`}
                  >
                    <div className="relative w-12 h-12 mb-3">
                      <img 
                        src={app.icon} 
                        alt={app.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      {app.status === 'blocked' && (
                        <div className="absolute -top-1 -right-1 bg-slate-800 text-white p-1 rounded-full border-2 border-white shadow-sm">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tight text-center ${
                      app.status === 'allowed' ? 'text-slate-600 group-hover:text-[#4A90E2]' : 'text-slate-400'
                    }`}>
                      {app.name}
                    </span>
                    
                    {app.status === 'allowed' && (
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 bg-[#4CD964] rounded-full" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex flex-col space-y-3">
                <button className="w-full py-4 bg-[#4A90E2] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#4A90E2]/30 hover:bg-[#357ABD] transition-all">
                  Ver todas las apps seguras
                </button>
                <div className="flex items-center justify-center space-x-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <Shield className="w-3 h-3" />
                  <span>Protección infantil GUARDIAN 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Activity Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setShowUsageModal(true)}
            className="bg-white rounded-[20px] p-6 shadow-sm border border-[#D9E2EC] cursor-pointer hover:border-[#4A90E2] transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                 <div className="p-3 bg-[#F0F4F8] rounded-xl group-hover:bg-[#4A90E2]/10 transition-colors">
                    <History className="w-5 h-5 text-[#4A90E2]" />
                 </div>
                 <span className="text-sm font-black text-[#2D3748] uppercase tracking-wide">Historial de uso</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#4A90E2] group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>

          {/* 4. Rewards Section */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setCurrentView('rewards')}
            className="bg-white rounded-[20px] p-6 shadow-sm border border-[#D9E2EC] flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
               <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />
               </div>
               <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Premios</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </motion.button>

          {/* 5. Tutor Section (Updated) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[20px] p-6 shadow-sm border border-[#D9E2EC]"
          >
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Tutor</h3>
               {isLinkedToTutor && (
                 <div className="flex items-center space-x-1.5">
                   <div className="w-2 h-2 bg-[#4CD964] rounded-full animate-pulse" />
                   <span className="text-[10px] font-black text-[#4CD964] uppercase tracking-widest">En línea</span>
                 </div>
               )}
            </div>

            {isLinkedToTutor ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                     <User className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800 text-sm">Sr. Carlos Ortiz</p>
                    <button 
                      onClick={handleStartLinking}
                      className="text-[10px] font-black text-[#4A90E2] uppercase tracking-[0.1em] hover:opacity-80"
                    >
                      Vincular otro tutor
                    </button>
                  </div>
                </div>
                <div className="p-2 bg-[#D9E2EC]/30 rounded-xl">
                   <Shield className="w-5 h-5 text-[#4A90E2]/40" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                  <div className="bg-orange-100 p-2.5 rounded-xl">
                     <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-orange-800">Sin tutor vinculado</p>
                    <p className="text-[10px] text-orange-700/70 font-medium">Vincula a un adulto para gestionar tu tiempo.</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartLinking}
                  className="w-full bg-[#4A90E2] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-[#4A90E2]/20 hover:bg-[#357ABD] transition-all flex items-center justify-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Vincular tutor</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-slate-900 selection:bg-[#4A90E2]/30">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentView}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Linking Modal */}
      <AnimatePresence>
        {showLinkingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowLinkingModal(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center"
            >
              {linkingStep === 'qr' ? (
                <>
                  <div className="p-4 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex items-center justify-center mb-6 shadow-inner cursor-pointer group" onClick={simulateSuccess}>
                    <div className="relative">
                      <QrCode className="w-48 h-48 text-slate-800" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/80 transition-opacity rounded-xl">
                        <span className="text-[10px] font-black text-[#4A90E2] uppercase tracking-[0.1em]">Tocar para simular vinculación</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">Escanea el código</h3>
                    <p className="text-xs text-slate-500 font-medium px-4">Utiliza el dispositivo de tu tutor para escanear y confirmar la vinculación segura.</p>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-black uppercase tracking-widest">{formatTime(timer)}</span>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 w-full">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Código Manual</p>
                       <p className="text-2xl font-black text-slate-800 tracking-[0.2em] uppercase">SFY-9821</p>
                    </div>

                    <div className="flex items-center justify-between w-full pt-4">
                       <button 
                        onClick={() => setTimer(120)}
                        className="flex items-center space-x-2 text-[#4A90E2] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                       >
                          <RefreshCw className="w-4 h-4" />
                          <span>Generar nuevo</span>
                       </button>
                       <div className="flex items-center space-x-1.5 text-slate-300">
                          <Shield className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Conexión Segura</span>
                       </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-10 space-y-6">
                  <div className="w-24 h-24 bg-[#4CD964]/10 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
                     <CheckCircle2 className="w-12 h-12 text-[#4CD964]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">¡Vinculado!</h3>
                    <p className="text-[#4CD964] font-black text-[10px] uppercase tracking-[0.2em] mt-2">Conexión establecida con éxito</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                      Ahora tu tutor puede enviarte premios, ajustar tus horarios y garantizar un entorno digital saludable.
                    </p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setShowLinkingModal(false)}
                className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-300 hover:text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Usage History Modal */}
      <AnimatePresence>
        {showUsageModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUsageModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-20">
                <div className="flex items-center space-x-4">
                   <div className="bg-emerald-50 p-3 rounded-2xl">
                      <History className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Historial de Uso</h2>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-0.5">Reportes de actividad digital</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowUsageModal(false)}
                  className="p-3 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors text-stone-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs & Controls */}
              <div className="bg-stone-50/50 p-6 space-y-6">
                {/* Custom Tabs */}
                <div className="flex flex-wrap gap-2">
                  {Object.keys(usagePeriods).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveUsageTab(tab)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeUsageTab === tab 
                          ? 'bg-stone-900 text-white shadow-xl shadow-stone-200' 
                          : 'bg-white text-stone-400 border border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Date Filter */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                   <div className="flex items-center space-x-3 flex-1 w-full">
                      <div className="p-2 bg-stone-50 rounded-lg text-stone-400">
                         <Filter className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Rango Personalizado:</span>
                   </div>
                   <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <input 
                        type="date" 
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className="bg-stone-50 border border-stone-100 rounded-xl px-3 py-2 text-xs font-bold text-stone-600 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                      />
                      <span className="text-stone-300 font-bold">/</span>
                      <input 
                        type="date" 
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="bg-stone-50 border border-stone-100 rounded-xl px-3 py-2 text-xs font-bold text-stone-600 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                      />
                   </div>
                </div>
              </div>

              {/* Content List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-4">
                {usagePeriods[activeUsageTab]?.map((app, index) => (
                  <motion.div
                    key={`${app.name}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-5 bg-white rounded-3xl border border-stone-100 shadow-sm hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex items-center space-x-5">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-transform group-hover:scale-105 ${app.color}`}>
                          <app.icon className="w-full h-full" />
                       </div>
                       <div>
                          <h4 className="font-extrabold text-stone-800 text-lg tracking-tight">{app.name}</h4>
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mt-0.5">Aplicación de {index % 2 === 0 ? 'Entretenimiento' : 'Social'}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black text-emerald-600 tracking-tight">{app.time}</p>
                       <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Tiempo Total</p>
                    </div>
                  </motion.div>
                ))}
                
                {usagePeriods[activeUsageTab]?.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="bg-stone-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                       <Search className="w-8 h-8 text-stone-300" />
                    </div>
                    <p className="text-stone-400 font-bold italic">No hay registros para este periodo</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-stone-50 bg-stone-50/30">
                 <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-500">
                       <Shield className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-emerald-800 leading-relaxed">
                      El sistema GUARDIAN ha detectado un uso equilibrado. Los límites establecidos siguen activos para proteger la salud digital.
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#D9E2EC] px-6 py-4 z-50">
        <nav className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: Home, label: 'Inicio' },
            { id: 'education', icon: BookOpen, label: 'Educa' },
            { id: 'rewards', icon: Gift, label: 'Premios' },
            { id: 'alerts', icon: Bell, label: 'Avisos' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`flex flex-col items-center space-y-1 transition-all ${currentView === item.id ? 'text-[#4A90E2]' : 'text-[#D9E2EC]'}`}
            >
              <item.icon className={`w-6 h-6 ${currentView === item.id ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-black uppercase tracking-[0.1em]">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

