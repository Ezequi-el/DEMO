import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Smartphone, 
  Clock, 
  Shield, 
  Unlock, 
  CheckCircle2,
  History,
  Gift,
  X,
  Zap
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import confetti from 'canvas-confetti';

interface Reward {
  id: number;
  name: string;
  description: string;
  app: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  type: 'time' | 'unlock' | 'benefit';
  instructions: string;
}

const REWARDS: Reward[] = [
  { 
    id: 1, 
    name: 'Bonus TikTok', 
    description: '+30 min de uso', 
    app: 'TikTok', 
    price: 250, 
    icon: <Clock className="w-6 h-6" />, 
    color: '#4A90E2',
    type: 'time',
    instructions: '¡Tienes un cupón por 30 minutos extra! Puedes activarlo cuando quieras desde tu historial de premios haciendo clic en el botón "Activar Tiempo".'
  },
  { 
    id: 2, 
    name: 'Gaming Extra', 
    description: '+45 min juegos', 
    app: 'Roblox / Minecraft', 
    price: 400, 
    icon: <Smartphone className="w-6 h-6" />, 
    color: '#4CD964',
    type: 'time',
    instructions: '¡Has ganado 45 minutos adicionales de juegos! Canjea este cupón en tu historial para extender tu sesión de juego hoy o cualquier otro día.'
  },
  { 
    id: 3, 
    name: 'YouTube Free', 
    description: 'Desbloqueo temporal', 
    app: 'YouTube', 
    price: 600, 
    icon: <Unlock className="w-6 h-6" />, 
    color: '#FF6B6B',
    type: 'unlock',
    instructions: 'YouTube ha sido desbloqueado por 1 hora. Para activarlo, ve a tu historial y presiona "Abrir YouTube Now".'
  },
  { 
    id: 4, 
    name: 'Tema Safari', 
    description: 'Beneficio digital', 
    app: 'Interfaz SafeFy', 
    price: 150, 
    icon: <Shield className="w-6 h-6" />, 
    color: '#FFD93D',
    type: 'benefit',
    instructions: '¡Nuevo tema desbloqueado! Para aplicarlo, ve a Ajustes > Apariencia y selecciona "Tema Safari". Tu historial guarda este canje.'
  },
  { 
    id: 5, 
    name: 'Insta Bonus', 
    description: '+15 min redes', 
    app: 'Instagram', 
    price: 300, 
    icon: <Clock className="w-6 h-6" />, 
    color: '#9B8AFB',
    type: 'time',
    instructions: 'Cupón de 15 minutos para Instagram añadido. Ve a tu historial para activarlo.'
  },
  { 
    id: 6, 
    name: 'Avatar Gold', 
    description: 'Marco exclusivo', 
    app: 'Perfil', 
    price: 1200, 
    icon: <Star className="w-6 h-6" />, 
    color: '#FFD93D',
    type: 'benefit',
    instructions: '¡Avatar Gold conseguido! Para equiparlo, ve a tu Perfil > Editar Foto y selecciona el "Marco Dorado" que ahora aparece en tu galería.'
  },
];

export default function RewardsPage() {
  const { points, setPoints, inventory, addToInventory } = useAppStore();
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [successReward, setSuccessReward] = useState<Reward | null>(null);
  const [showInventory, setShowInventory] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState<any | null>(null);

  const handleActivate = (item: any) => {
    setActivationSuccess(item);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4A90E2', '#FF6B6B', '#4CD964']
    });
  };

  const handleRedeem = (reward: Reward) => {
    if (points < reward.price) return;

    setRedeeming(reward.id);
    
    // Simulate API delay
    setTimeout(() => {
      setPoints(points - reward.price);
      addToInventory({
        id: Math.random().toString(36).substr(2, 9),
        rewardId: reward.id,
        name: reward.name,
        type: reward.type as any,
        date: new Date().toLocaleDateString(),
        instructions: reward.instructions
      });
      
      setRedeeming(null);
      setSuccessReward(reward);
      
      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A90E2', '#4CD964', '#FFD93D', '#FF6B6B']
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-900 pb-32">
      {/* Header */}
      <header className="p-6 pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tienda</h1>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-1">Premios Bepo</p>
        </div>
        <button 
          onClick={() => setShowInventory(true)}
          className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-[#4A90E2] transition-colors relative"
        >
          <History className="w-6 h-6" />
          {inventory.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A90E2] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
              {inventory.length}
            </div>
          )}
        </button>
      </header>

      <main className="px-6 space-y-8 max-w-md mx-auto w-full">
        {/* Balance Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden"
        >
          <div className="absolute -top-4 -right-4 opacity-5">
             <Star className="w-32 h-32 text-[#FFD93D] rotate-12" />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-[#4CD964]/10 p-3 rounded-2xl">
                 <Star className="w-6 h-6 text-[#4CD964] fill-[#4CD964]/20" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Saldo Disponible</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-[#4CD964] leading-none">{points}</span>
                  <span className="text-xs font-black text-[#4CD964]/60 uppercase">pts</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowInventory(true)}
              className="px-4 py-3 bg-[#4A90E2]/10 text-[#4A90E2] rounded-2xl flex flex-col items-center justify-center border border-[#4A90E2]/10 hover:bg-[#4A90E2] hover:text-white hover:shadow-lg hover:shadow-[#4A90E2]/20 transition-all group"
            >
              <History className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Historial</span>
            </button>
          </div>
        </motion.section>

        {/* Catalog Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Catálogo de Temporada</h2>
            <div className="p-2 bg-slate-100 rounded-xl">
               <Gift className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {REWARDS.map((reward) => {
              const isAvailable = points >= reward.price;
              const isRedeeming = redeeming === reward.id;

              return (
                <motion.div
                  key={reward.id}
                  layout
                  className={`bg-white rounded-[2rem] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all flex flex-col ${
                    isAvailable ? 'border-slate-50 opacity-100' : 'border-slate-100 opacity-60 grayscale-[0.5]'
                  }`}
                >
                  <div className="flex-1">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner"
                      style={{ backgroundColor: `${reward.color}15`, color: reward.color }}
                    >
                      {reward.icon}
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight">{reward.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-1">{reward.description}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-4 truncate">{reward.app}</p>
                  </div>

                  <motion.button
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    onClick={() => handleRedeem(reward)}
                    disabled={!isAvailable || isRedeeming}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                      isAvailable 
                        ? 'bg-black text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-300'
                    } flex items-center justify-center`}
                  >
                    {isRedeeming ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>{reward.price} pts</span>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Redemption Success & Instructions Modal */}
      <AnimatePresence>
        {successReward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden text-center"
            >
              <div className="mb-6 mx-auto w-20 h-20 bg-[#4CD964]/10 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                 <CheckCircle2 className="w-10 h-10 text-[#4CD964]" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-tight mb-2">¡Canje Exitoso!</h2>
              <p className="text-[#4CD964] font-black text-xs uppercase tracking-widest mb-6">{successReward.name}</p>

              <div className="bg-[#F7F9FC] p-6 rounded-3xl border border-[#D9E2EC] mb-8 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Instrucciones de canje:</p>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  {successReward.instructions}
                </p>
              </div>

              <button 
                onClick={() => setSuccessReward(null)}
                className="w-full bg-[#4A90E2] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#4A90E2]/30 hover:bg-[#357ABD] transition-all"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inventory Modal */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowInventory(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col pt-12"
            >
              <div className="px-8 flex justify-between items-center mb-8">
                <div>
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">Mis Premios</h2>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historial de canje</p>
                </div>
                <button 
                  onClick={() => setShowInventory(false)}
                  className="p-3 bg-slate-50 rounded-full text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-12">
                {inventory.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400">{item.date}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        item.type === 'time' ? 'bg-[#4A90E2] text-white' : 'bg-[#FFD93D] text-slate-700'
                      }`}>
                        {item.type}
                      </div>
                    </div>
                    <div className="bg-[#F7F9FC] p-3 rounded-xl border border-slate-50">
                       <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                         "{item.instructions}"
                       </p>
                    </div>
                    {item.type === 'time' && (
                      <button 
                        onClick={() => handleActivate(item)}
                        className="w-full mt-4 bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
                      >
                        Activar Tiempo
                      </button>
                    )}
                    {item.type === 'unlock' && (
                      <button 
                        onClick={() => handleActivate(item)}
                        className="w-full mt-4 bg-[#FF6B6B] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#EE5A5A] transition-colors"
                      >
                        Abrir App Now
                      </button>
                    )}
                  </div>
                ))}

                {inventory.length === 0 && (
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                     <History className="w-16 h-16 text-slate-300" />
                     <p className="text-sm font-bold text-slate-400 tracking-tight">No has canjeado premios aún.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Activation Success Modal */}
      <AnimatePresence>
        {activationSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setActivationSuccess(null)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden text-center"
            >
              <div className="mb-6 mx-auto w-20 h-20 bg-[#4A90E2]/10 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                 <Zap className="w-10 h-10 text-[#4A90E2]" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-tight mb-2">¡Tiempo Activado!</h2>
              <p className="text-[#4A90E2] font-black text-xs uppercase tracking-widest mb-6">Disfruta de tu beneficio</p>

              <div className="bg-[#4A90E2]/5 p-6 rounded-3xl border border-[#4A90E2]/10 mb-8">
                <p className="text-slate-600 font-bold text-sm leading-relaxed">
                  ¡Felicidades! Has activado tu tiempo extra. El sistema ha actualizado tus límites temporales automáticamente. ¡Disfrútalo!
                </p>
              </div>

              <button 
                onClick={() => setActivationSuccess(null)}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-black/20"
              >
                ¡A Jugar!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
