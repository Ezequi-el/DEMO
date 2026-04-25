import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert,
  Users, 
  AlertTriangle, 
  ChevronRight, 
  Activity, 
  Calendar, 
  Star, 
  Plus, 
  X, 
  LogOut, 
  User, 
  CheckCircle2,
  Instagram,
  Youtube,
  Smartphone,
  Camera,
  ArrowLeft,
  Mail,
  Phone,
  LockKeyhole,
  ToggleLeft as ToggleIcon,
  BellRing,
  ExternalLink,
  Clock,
  ChevronDown,
  History,
  Search,
  Filter
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';

interface UsageStat {
  name: string;
  time: number; // in minutes
  max: number;  // daily limit
  icon: any;
  color: string;
}

interface Prize {
  id: string;
  label: string;
  isActive: boolean;
}

interface Incident {
  id: string;
  type: 'blocked' | 'limit' | 'unusual';
  message: string;
  time: string;
  icon: any;
  exactTime?: string;
  ip?: string;
  location?: string;
  device?: string;
  user?: string;
  action?: string;
}

export default function TutorDashboard() {
  const { username, logout, setRole } = useAppStore();
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');
  const [showPrizes, setShowPrizes] = useState(false);
  const [showAddMinor, setShowAddMinor] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMinorExpanded, setIsMinorExpanded] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showIncidentDetails, setShowIncidentDetails] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState([
    { id: 1, label: 'Alertas de Incidencias', active: true },
    { id: 2, label: 'Reportes Semanales', active: false },
    { id: 3, label: 'Límites de Tiempo', active: true },
  ]);
  const [customPrize, setCustomPrize] = useState('');
  const [linkedSuccess, setLinkedSuccess] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  // Profile editable fields (simulated)
  const [profileData, setProfileData] = useState({
    name: 'Sr. Responsable',
    email: 'tutor@safefy.com',
    phone: '+34 600 000 000'
  });

  const [showUsageModal, setShowUsageModal] = useState(false);
  const [activeUsageTab, setActiveUsageTab] = useState('Hoy');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

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

  const [usageStats] = useState<UsageStat[]>([
    { name: 'TikTok', time: 45, max: 60, icon: Smartphone, color: 'bg-black' },
    { name: 'Instagram', time: 30, max: 45, icon: Instagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
    { name: 'YouTube', time: 15, max: 90, icon: Youtube, color: 'bg-red-600' },
  ]);

  const [incidents] = useState<Incident[]>([
    { 
      id: 'crit-1', 
      type: 'blocked', 
      message: 'ALERTA CRÍTICA: Intento de manipulación / reclutamiento detectado', 
      time: 'Hace 1m', 
      icon: ShieldAlert,
      exactTime: '06:45:10 PM',
      ip: '192.168.1.120',
      location: 'TikTok (Contenido Externo)',
      device: 'Dispositivo de AlexDigital (SM-G991B)',
      user: 'AlexDigital',
      action: 'Bloqueo automático de contenido. Riesgo: 87% (Grave). Notificación enviada al tutor y reporte generado.',
    },
    { 
      id: '1', 
      type: 'blocked', 
      message: 'Intento de acceso a "sitio-bloqueado.com"', 
      time: '10:15 AM', 
      icon: Shield,
      exactTime: '10:15:22 AM',
      ip: '192.168.1.120',
      location: 'Ciudad de México (Área Metropolitana)',
      device: 'Dispositivo de AlexDigital (SM-G991B)',
      user: 'AlexDigital',
      action: 'Bloqueo inmediato de dominio y alerta de seguridad'
    },
    { 
      id: '2', 
      type: 'limit', 
      message: 'Límite de tiempo en YouTube alcanzado', 
      time: '11:30 AM', 
      icon: Clock,
      exactTime: '11:30:15 AM',
      ip: '192.168.1.50',
      location: 'Ciudad de México (Área Metropolitana)',
      device: 'Samsung Galaxy S21',
      user: 'AlexDigital',
      action: 'Restricción de acceso a YouTube'
    },
    { 
      id: '3', 
      type: 'unusual', 
      message: 'Actividad nocturna inusual detectada', 
      time: 'Hace 5h', 
      icon: AlertTriangle,
      exactTime: '01:22:10 AM',
      ip: '192.168.1.42',
      location: 'Ubicación de Casa',
      device: 'iPad Pro Gen 4',
      user: 'AlexDigital',
      action: 'Notificación de alerta enviada al tutor'
    },
  ]);

  const [prizes, setPrizes] = useState<Prize[]>([
    { id: '1', label: 'Ir al parque', isActive: false },
    { id: '2', label: 'Cine', isActive: false },
    { id: '3', label: 'Más tiempo de juego', isActive: false },
  ]);

  const togglePrize = (id: string) => {
    setPrizes(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleAddCustomPrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrize.trim()) return;
    const newPrize: Prize = {
      id: Math.random().toString(36).substr(2, 9),
      label: customPrize,
      isActive: true,
    };
    setPrizes([...prizes, newPrize]);
    setCustomPrize('');
  };

  const simulateSuccess = () => {
    setLinkedSuccess(true);
    setTimeout(() => {
      setShowAddMinor(false);
      setLinkedSuccess(false);
      setCameraActive(false);
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    setRole('minor'); // Default back
  };

  const renderProfileView = () => (
    <div className={`min-h-screen bg-[#F8F9FA] pb-24 font-sans text-stone-800 relative ${showSecurityModal ? 'overflow-hidden' : ''}`}>
      {/* Background dimmed when modal is open */}
      <div className={`transition-all duration-300 ${showSecurityModal ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <header className="p-8 bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-2xl mx-auto flex items-center justify-between h-12">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-2 text-stone-500 hover:text-emerald-600 transition-colors font-bold text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al panel</span>
            </button>
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest whitespace-nowrap">SINCRONIZACIÓN LOCAL ACTIVA</span>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto p-6 space-y-8">
          {/* Main profile card */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-stone-900 rounded-[2rem] flex items-center justify-center font-black text-white text-3xl shadow-2xl relative">
                SR
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-2xl border-4 border-white shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">{profileData.name}</h2>
            <p className="text-stone-400 text-xs font-black uppercase tracking-widest mt-1">Tutor Principal</p>
          </section>

          {/* Info Cards */}
          <div className="space-y-6">
            <section className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm space-y-6">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-stone-400 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Información Personal</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-stone-700" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={e => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-stone-700" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Teléfono</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="text" 
                      value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-stone-700" 
                    />
                  </div>
                </div>
              </div>
            </section>

            <section 
              onClick={() => setShowSecurityModal(true)}
              className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-emerald-500 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50">
                  <LockKeyhole className="w-6 h-6 text-stone-400 group-hover:text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">Seguridad de la Cuenta</h3>
                  <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Cambiar contraseña & 2FA</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-300" />
            </section>
          </div>
        </main>
      </div>

      <div className="max-w-2xl mx-auto px-6 space-y-8 relative z-20">
        <section className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-stone-400 flex items-center space-x-2">
            <BellRing className="w-4 h-4" />
            <span>Preferencias de Notificación</span>
          </h3>
          <div className="space-y-4">
              {notificationPrefs.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <span className="text-sm font-bold text-stone-700">{item.label}</span>
                  <button 
                    onClick={() => {
                      setNotificationPrefs(prev => prev.map(p => p.id === item.id ? { ...p, active: !p.active } : p));
                    }}
                    className={`w-10 h-5 rounded-full relative transition-colors ${item.active ? 'bg-emerald-500' : 'bg-stone-300'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
          </div>
        </section>

        <section className={`bg-stone-100 p-8 rounded-[2.5rem] space-y-6 transition-all duration-300 ${showSecurityModal ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100'}`}>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-stone-400 flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Gestión de Cuenta</span>
          </h3>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 p-5 rounded-2xl flex items-center justify-center space-x-2 hover:bg-red-100 transition-all font-black uppercase tracking-widest text-xs border border-red-100 shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión Definitivamente</span>
          </button>
        </section>
      </div>

      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecurityModal(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-stone-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-stone-50 p-3 rounded-2xl text-stone-900">
                  <LockKeyhole className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-stone-900 tracking-tight">Seguridad de la Cuenta - Modificar</h2>
              </div>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 px-6 outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-stone-700" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 px-6 outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-stone-700" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Repetir Nueva Contraseña</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 px-6 outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-stone-700" 
                   />
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-1 bg-emerald-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  Confirmar Cambio
                </button>
                <button 
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-1 bg-stone-100 text-stone-400 p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-stone-200 transition-all"
                >
                  Cancelar
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-50">
                <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest text-center mb-6 italic">Sección ilustrativa</p>
                
                <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-stone-800 uppercase tracking-widest">Factor de Autenticación de Dos Pasos (2FA)</p>
                       <p className="text-[9px] text-stone-400 font-bold mt-0.5">Funcionalidad de 2FA para futura implementación</p>
                    </div>
                    <button 
                      onClick={() => setTwoFactorActive(!twoFactorActive)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${twoFactorActive ? 'bg-emerald-500' : 'bg-stone-300'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${twoFactorActive ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (currentView === 'profile') {
    return renderProfileView();
  }

  return (
    <div className={`min-h-screen bg-[#F8F9FA] pb-24 font-sans text-stone-800 ${showIncidentDetails ? 'overflow-hidden' : ''}`}>
      {/* Background dimmed when modal is open */}
      <div className={`transition-all duration-300 ${showIncidentDetails ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100'}`}>
        {/* Header */}
        <header className="p-8 bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-xl shadow-emerald-100">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-stone-900 uppercase">SAFEFY</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:ring-2 hover:ring-emerald-500 transition-all border border-stone-200 overflow-hidden"
            >
               <User className="w-5 h-5 text-stone-500" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-4 bg-stone-50 border-b border-stone-100">
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Tutor</p>
                    <p className="font-bold text-stone-800">Sr. Responsable</p>
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentView('profile');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center space-x-3 w-full p-4 hover:bg-emerald-50 transition-colors text-sm font-bold text-stone-700 group"
                  >
                    <User className="w-4 h-4 text-stone-400 group-hover:text-emerald-600" />
                    <span>Ver perfil de tutor</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full p-4 hover:bg-red-50 transition-colors text-sm font-bold text-red-600 group border-t border-stone-100"
                  >
                    <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-700" />
                    <span>Cerrar sesión</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest mb-2">MODO SUPERVISOR</span>
            <h1 className="text-4xl font-black text-stone-900 tracking-tight">Panel de Control</h1>
            <p className="text-stone-500 font-medium italic mt-1">Sincronizado con el dispositivo de {username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
      {/* Minor Status Card (Expandable -> Now triggers Modal) */}
          <section className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm transition-all duration-500 md:col-span-1 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-stone-900 rounded-3xl flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-stone-200 relative">
                    {username.charAt(0)}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-xl tracking-tight">{username}</h3>
                    <div className="flex items-center space-x-2">
                       <Activity className="w-3.5 h-3.5 text-emerald-500" />
                       <span className="text-xs text-emerald-600 font-black uppercase tracking-wider">En línea</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMinorExpanded(true)}
                  className="p-3 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all text-stone-400"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-stone-50 p-5 rounded-3xl border border-stone-100 hover:bg-stone-100 transition-colors cursor-default group">
                  <span className="block text-3xl font-black text-stone-900 mb-1 group-hover:scale-105 transition-transform origin-left">5</span>
                  <span className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Días Racha</span>
                </div>
                <div className="bg-stone-50 p-5 rounded-3xl border border-stone-100 hover:bg-stone-100 transition-colors cursor-default group">
                  <span className="block text-3xl font-black text-stone-900 mb-1 group-hover:scale-105 transition-transform origin-left">1.2h</span>
                  <span className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Tiempo Hoy</span>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alerts - Decorative -> Now Interactive */}
          {!isMinorExpanded && (
            <section className="bg-white rounded-[2.5rem] border border-stone-200 p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-black flex items-center space-x-2 text-stone-900 uppercase text-xs tracking-widest">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Riesgos</span>
                </h3>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Alerta Activa</span>
              </div>
              
              <div className="py-6 space-y-4">
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedIncident(incidents[0]);
                    setShowIncidentDetails(true);
                  }}
                  className="p-4 bg-red-50 rounded-2xl border border-red-100 cursor-pointer hover:border-red-300 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 w-2 h-2 rounded-full animate-ping" />
                      <span className="text-sm font-black text-red-600 uppercase tracking-tight">ACCESO BLOQUEADO</span>
                    </div>
                    <span className="text-[9px] font-black text-red-400">Hace 5m</span>
                  </div>
                </motion.div>

                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedIncident(incidents[1]);
                    setShowIncidentDetails(true);
                  }}
                  className="p-4 bg-amber-50 rounded-2xl border border-amber-100 cursor-pointer hover:border-amber-300 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-amber-500 w-2 h-2 rounded-full" />
                      <span className="text-sm font-black text-amber-600 uppercase tracking-tight">LÍMITE ALCANZADO</span>
                    </div>
                    <span className="text-[9px] font-black text-amber-400">Hace 11m</span>
                  </div>
                </motion.div>
              </div>

              <button 
                onClick={() => setIsMinorExpanded(true)}
                className="w-full py-4 bg-stone-50 text-stone-400 text-[10px] font-black rounded-2xl uppercase tracking-widest hover:text-stone-600 transition-colors"
              >
                Ver reporte detallado
              </button>
            </section>
          )}

          {/* Quick Actions */}
          <section className={`md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 ${isMinorExpanded ? 'opacity-50 pointer-events-none' : ''}`}>
             <button 
                onClick={() => setShowUsageModal(true)}
                className="flex flex-col items-center justify-center p-10 bg-white rounded-[2.5rem] border border-stone-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group"
              >
                <div className="bg-stone-50 p-5 rounded-3xl group-hover:bg-emerald-50 transition-colors mb-4 ring-1 ring-stone-100 group-hover:ring-emerald-100">
                  <History className="w-8 h-8 text-stone-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-sm font-black text-stone-800 uppercase tracking-widest">Historial de Uso</span>
             </button>

             <button 
                onClick={() => setShowPrizes(true)}
                className="flex flex-col items-center justify-center p-10 bg-white rounded-[2.5rem] border border-stone-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group"
              >
                <div className="bg-stone-50 p-5 rounded-3xl group-hover:bg-emerald-50 transition-colors mb-4 ring-1 ring-stone-100 group-hover:ring-emerald-100">
                  <Star className="w-8 h-8 text-stone-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-sm font-black text-stone-800 uppercase tracking-widest">Premios</span>
             </button>

             <button 
                onClick={() => setShowAddMinor(true)}
                className="flex flex-col items-center justify-center p-10 bg-stone-900 rounded-[2.5rem] hover:bg-stone-800 transition-all group shadow-xl shadow-stone-200 border-b-4 border-stone-950"
              >
                <div className="bg-white/10 p-5 rounded-3xl mb-4 text-white">
                  <Users className="w-8 h-8" />
                </div>
                <span className="text-sm font-black text-white uppercase tracking-widest">Vincular</span>
             </button>
          </section>
        </div>
      </main>
      </div>

      {/* Usage History Modal */}
      <AnimatePresence>
        {showUsageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                      El sistema SAFEFY ha detectado un uso equilibrado. Los límites establecidos siguen activos para proteger la salud digital del menor.
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Prize Management Modal */}
      <AnimatePresence>
        {showPrizes && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowPrizes(false)}
               className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity:0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 z-10 border-b border-stone-50">
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">Gestión de Premios</h2>
                <button onClick={() => setShowPrizes(false)} className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {prizes.map((prize) => (
                  <button
                    key={prize.id}
                    onClick={() => togglePrize(prize.id)}
                    className={`p-6 rounded-[2rem] border-2 transition-all text-left flex items-center justify-between group ${
                      prize.isActive 
                        ? 'bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-100' 
                        : 'bg-white border-stone-100 hover:border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl transition-colors ${prize.isActive ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400'}`}>
                        <Star className="w-5 h-5" />
                      </div>
                      <span className={`font-black text-sm uppercase tracking-wider ${prize.isActive ? 'text-emerald-700' : 'text-stone-600'}`}>{prize.label}</span>
                    </div>
                    {prize.isActive && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </button>
                ))}
              </div>

              <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200">
                <h3 className="font-black text-xs uppercase tracking-widest text-stone-400 mb-6 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Personalizar Premio</span>
                </h3>
                <form onSubmit={handleAddCustomPrize} className="flex gap-3">
                  <input 
                    type="text" 
                    value={customPrize}
                    onChange={(e) => setCustomPrize(e.target.value)}
                    placeholder="Escribe un premio..."
                    className="flex-1 bg-white p-5 rounded-[1.5rem] border border-stone-200 font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-300"
                  />
                  <button 
                    disabled={!customPrize.trim()}
                    className="bg-emerald-600 text-white px-8 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-100"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Minor Modal with QR */}
      <AnimatePresence>
        {showAddMinor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => !linkedSuccess && setShowAddMinor(false)}
               className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-2xl text-center"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-stone-900 mb-2">Vincular Menor</h2>
                <p className="text-stone-500 text-xs font-medium italic">Escanea el código QR del dispositivo secundario</p>
              </div>

              {linkedSuccess ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="py-12 space-y-4"
                >
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-stone-800">¡Vinculación Exitosa!</h3>
                  <p className="text-stone-400 text-xs uppercase font-black tracking-widest">Sincronizando perfiles...</p>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div className="aspect-square bg-stone-900 rounded-[2rem] overflow-hidden relative ring-4 ring-stone-100 shadow-2xl flex flex-col items-center justify-center p-6">
                    {!cameraActive ? (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                           <Camera className="w-8 h-8 text-white/40" />
                        </div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.15em]">Cámara Inactiva</p>
                        <button 
                          onClick={() => setCameraActive(true)}
                          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/40"
                        >
                          Activar Cámara
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale opacity-40 blur-[2px]" />
                        <div className="relative z-10 text-center space-y-4">
                          <div className="w-48 h-48 border-2 border-emerald-500/50 rounded-3xl border-dashed flex items-center justify-center">
                             <div className="w-44 h-44 border-2 border-emerald-500 rounded-2xl animate-pulse" />
                          </div>
                          <p className="text-white text-[10px] font-black uppercase tracking-widest animate-pulse">Buscando Código QR...</p>
                          <button 
                            onClick={simulateSuccess}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-xl transition-all border border-white/10"
                          >
                            Simular Detección
                          </button>
                        </div>
                        <motion.div 
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-x-0 h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20"
                        />
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowAddMinor(false);
                      setCameraActive(false);
                    }}
                    className="w-full py-4 text-stone-400 font-bold decoration-dotted hover:text-stone-900 transition-colors text-sm"
                  >
                    Cancelar vinculación
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Incident Details Modal */}
      <AnimatePresence>
        {showIncidentDetails && selectedIncident && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIncidentDetails(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-stone-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-red-50 p-3 rounded-2xl text-red-500">
                  <BellRing className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-stone-900 tracking-tight uppercase">Detalles de Incidente</h2>
              </div>

              <div className="space-y-6 mb-10">
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Descripción</p>
                  <p className="text-sm font-bold text-stone-800">{selectedIncident.message} - {selectedIncident.time}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Hora Exacta</p>
                    <p className="text-xs font-bold text-stone-700">{selectedIncident.exactTime || '--:--:--'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Dirección IP de origen</p>
                    <p className="text-xs font-bold text-stone-700">{selectedIncident.ip || '---.---.---.---'}</p>
                  </div>
                  <div className="space-y-1 col-span-2 pt-2">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Ubicación Aproximada</p>
                    <p className="text-xs font-bold text-stone-700">{selectedIncident.location || 'Ubicación desconocida'}</p>
                  </div>
                  <div className="space-y-1 col-span-2 pt-2">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Dispositivo Involucrado</p>
                    <p className="text-xs font-bold text-stone-700">{selectedIncident.device || 'N/A'}</p>
                  </div>
                  <div className="space-y-1 pt-2">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Usuario</p>
                    <p className="text-xs font-bold text-stone-700">{selectedIncident.user || 'N/A'}</p>
                  </div>
                  <div className="space-y-1 pt-2">
                    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Acción Automática Tomada</p>
                    <p className="text-xs font-bold text-emerald-600">{selectedIncident.action || 'Restricción preventiva'}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowIncidentDetails(false)}
                className="w-full bg-emerald-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                Cerrar Detalles
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vista Detallada (Apps and Incidents) overlay */}
      <AnimatePresence>
        {isMinorExpanded && (
          <div className="fixed inset-0 z-[105] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMinorExpanded(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#F8F9FA] rounded-[3rem] p-1 shadow-2xl overflow-hidden border border-stone-100 max-h-[90vh] flex flex-col"
            >
              <div className="p-8 bg-white border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsMinorExpanded(false)}
                    className="p-2 hover:bg-stone-50 rounded-xl transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 text-stone-500" />
                  </button>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 tracking-tight">Detalles de Seguridad: {username}</h3>
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Información Sincronizada en tiempo real</p>
                  </div>
                </div>
                <div className="bg-emerald-50 px-3 py-1 rounded-xl text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                  Activo
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Top Apps Charts */}
                  <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm space-y-6">
                    <h5 className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center space-x-2">
                      <Smartphone className="w-3 h-3 text-emerald-500" />
                      <span>Top Aplicaciones Hoy</span>
                    </h5>
                    <div className="space-y-6 pt-2">
                      {usageStats.map((app) => (
                          <div key={app.name} className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center space-x-2">
                                <div className={`w-8 h-8 rounded-xl ${app.color} flex items-center justify-center text-white p-1.5`}>
                                  <app.icon className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-stone-800">{app.name}</span>
                              </div>
                              <span className="font-black text-stone-400 tracking-widest">{app.time} <span className="text-[8px]">MIN</span></span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-50">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(app.time / 60) * 100}%` }}
                                className={`h-full rounded-full ${app.color === 'bg-black' ? 'bg-stone-800' : app.name === 'Instagram' ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600' : 'bg-red-500'}`}
                              />
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Incidents Summary in Modal */}
                  <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm space-y-6">
                    <h5 className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center space-x-2">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Resumen de Incidentes</span>
                    </h5>
                    <div className="space-y-3 pt-2">
                      {incidents.map((incident) => {
                        const isThisSelected = selectedIncident?.id === incident.id;
                        return (
                          <motion.div 
                            key={incident.id} 
                            onClick={() => {
                              setSelectedIncident(incident);
                              setShowIncidentDetails(true);
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center justify-between p-4 bg-white rounded-2xl border transition-all cursor-pointer ${
                              isThisSelected 
                                ? 'border-emerald-500 shadow-xl shadow-emerald-100' 
                                : 'border-stone-200/50 shadow-sm hover:border-emerald-500/50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-xl flex items-center justify-center ${incident.type === 'blocked' ? 'bg-red-50 text-red-500' : incident.type === 'limit' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                                  <incident.icon className="w-4 h-4" />
                              </div>
                              <div>
                                  <p className="text-xs font-bold text-stone-800 leading-tight">{incident.message}</p>
                                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mt-0.5">{incident.time}</p>
                              </div>
                            </div>
                            <ExternalLink className={`w-3.5 h-3.5 ${isThisSelected ? 'text-emerald-500' : 'text-stone-300'}`} />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-white border-t border-stone-100 flex justify-end">
                <button 
                  onClick={() => setIsMinorExpanded(false)}
                  className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
                >
                  Regresar al Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}


