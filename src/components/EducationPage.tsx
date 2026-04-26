import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Gamepad2, 
  Video, 
  PlayCircle, 
  ArrowRight, 
  Shield, 
  ShieldAlert, 
  MessageCircle, 
  HelpCircle,
  X,
  Smartphone,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

type AgeRange = '6-9' | '10-12' | '13-15' | '16-17';

export default function EducationPage() {
  const { age, setCurrentView } = useAppStore();
  
  const getAgeRange = (ageValue: number): AgeRange => {
    if (ageValue <= 9) return '6-9';
    if (ageValue <= 12) return '10-12';
    if (ageValue <= 15) return '13-15';
    return '16-17';
  };

  const selectedAge = getAgeRange(age);
  const [currentRisk, setCurrentRisk] = useState<number>(15); // Percentage
  const [showSimulation, setShowSimulation] = useState(false);
  const [activeContent, setActiveContent] = useState<{ type: 'video' | 'quiz' | 'none', id?: number | string }>({ type: 'none' });
  const [simStep, setSimStep] = useState(0);
  const [simType, setSimType] = useState<'video' | 'chat'>('video');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const getRiskLevel = (risk: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (risk <= 40) return 'low';
    if (risk <= 70) return 'medium';
    if (risk <= 90) return 'high';
    return 'critical';
  };

  const riskLevel = getRiskLevel(currentRisk);

  const stories = {
    '6-9': [
      { id: 1, title: 'La Aventura del Escudo Mágico', desc: 'Aprende a proteger tu información con el Capitán Guardian.', icon: Gamepad2, color: 'bg-emerald-50 text-emerald-600', type: 'Juego' },
      { id: 2, title: 'El Amigo Desconocido', desc: 'Una historia sobre por qué no debemos hablar con extraños en juegos.', icon: BookOpen, color: 'bg-blue-50 text-blue-600', type: 'Cuento' },
    ],
    '10-12': [
      { id: 1, title: 'Secretos de las Redes', desc: '¿Sabes quién está detrás de la pantalla? Mira este video.', icon: Video, color: 'bg-amber-50 text-amber-600', type: 'Video' },
      { id: 2, title: 'El Detective Digital', desc: 'Encuentra las 5 pistas de un perfil falso en este quiz.', icon: HelpCircle, color: 'bg-purple-50 text-purple-600', type: 'Quiz' },
    ],
    '13-15': [
      { id: 1, title: 'Misión: Evita el Engaño', desc: 'Simulación interactiva de un chat sospechoso. Elige tus respuestas.', icon: MessageCircle, color: 'bg-rose-50 text-rose-600', type: 'Simulación' },
      { id: 2, title: 'Anatomía de un Groomer', desc: 'Aprende a identificar las técnicas de manipulación más comunes.', icon: ShieldAlert, color: 'bg-slate-50 text-slate-600', type: 'Guía' },
    ],
    '16-17': [
      { id: 1, title: 'Realidad del Reclutamiento', desc: 'Análisis profundo sobre cómo operan las redes en el mundo real.', icon: Shield, color: 'bg-red-50 text-red-600', type: 'Análisis' },
      { id: 2, title: 'Consecuencias Legales', desc: 'Lo que debes saber sobre tus derechos y riesgos en la red.', icon: BookOpen, color: 'bg-indigo-50 text-indigo-600', type: 'Podcast' },
    ],
  };

  const startVideoSim = () => {
    setCurrentView('tiktok');
  };

  const startChatSim = () => {
    setSimType('chat');
    setSimStep(1);
    setShowSimulation(true);
  };

  const handleContentClick = (item: any) => {
    if (item.type === 'Video') {
      setActiveContent({ type: 'video', id: item.id });
    } else if (item.type === 'Quiz') {
      setQuizStep(0);
      setQuizScore(0);
      setActiveContent({ type: 'quiz', id: item.id });
    }
  };

  const quizQuestions = [
    {
      q: "¿Qué señal indica que un perfil puede ser falso?",
      options: ["Tiene fotos de modelo profesional", "Tiene 1 millón de seguidores", "Te pide dinero o datos personales rápido", "Usa muchos emojis"],
      correct: 2,
      hint: "Los estafadores suelen tener prisa por obtener algo de ti."
    },
    {
      q: "Si alguien que no conoces te envía un link sospechoso, ¿qué haces?",
      options: ["Lo abro para ver qué es", "Se lo mando a un amigo", "No lo abro y aviso a mi tutor", "Lo ignoro pero lo guardo"],
      correct: 2,
      hint: "Nunca abras enlaces de desconocidos, pueden contener virus o robo de datos."
    }
  ];

  return (
    <div className="flex flex-col px-6 pt-8 pb-32 space-y-6 max-w-md mx-auto min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#D9E2EC] relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 opacity-5">
           <BookOpen className="w-40 h-40 text-[#4A90E2]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-xl">
               <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">Zona Educativa</h2>
          </div>
          <p className="text-sm font-bold text-slate-500">Aprende a estar seguro con contenido adaptado a tu edad.</p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="px-3 py-1 bg-[#4A90E2]/10 text-[#4A90E2] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#4A90E2]/10">
              Contenido adaptado para tu edad ({age} años)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Risk Level Indicator & Simulator (Demo Only) */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#D9E2EC] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado de Riesgo en Redes</h3>
          <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
            riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600' :
            riskLevel === 'medium' ? 'bg-amber-50 text-amber-600' :
            riskLevel === 'high' ? 'bg-rose-50 text-rose-600' :
            'bg-slate-900 text-white animate-pulse'
          }`}>
            {riskLevel === 'low' ? 'Seguro' : riskLevel === 'medium' ? 'Precaución' : riskLevel === 'high' ? 'Riesgo Alto' : 'Crítico'}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${currentRisk}%` }}
              className={`h-full transition-colors ${
                riskLevel === 'low' ? 'bg-emerald-400' :
                riskLevel === 'medium' ? 'bg-amber-400' :
                'bg-red-500'
              }`}
            />
          </div>
          <p className="text-[9px] font-bold text-slate-400 italic">Simular cambio de riesgo para ver adaptación:</p>
          <div className="flex space-x-2">
            {[15, 55, 85, 95].map(v => (
              <button 
                key={v}
                onClick={() => setCurrentRisk(v)}
                className={`px-2 py-1 rounded-lg text-[8px] font-black ${currentRisk === v ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-400'}`}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Lecciones para ti</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAge}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid gap-4"
          >
            {stories[selectedAge].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center space-x-5 group hover:border-amber-200 transition-colors cursor-pointer"
                onClick={() => handleContentClick(item)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-transform group-hover:scale-105 ${item.color}`}>
                   <item.icon className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{item.type}</span>
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                  <PlayCircle className="w-4 h-4 text-slate-300 group-hover:text-amber-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Real-time Interaction Preview (Simulation) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Entrenamiento IA</h3>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-[8px] font-black uppercase">Activo</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={startVideoSim}
            className="bg-white rounded-[2rem] p-6 border-2 border-dashed border-slate-200 flex items-center justify-between group cursor-pointer hover:border-amber-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FF0050]/5 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#FF0050]/10">
                <Smartphone className="w-6 h-6 text-[#FF0050]" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase italic leading-none">Simular TikTok</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Detección de contenido riesgoso</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-amber-500 transition-colors" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={startChatSim}
            className="bg-white rounded-[2rem] p-6 border-2 border-dashed border-slate-200 flex items-center justify-between group cursor-pointer hover:border-amber-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-indigo-100">
                <MessageCircle className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase italic leading-none">Simular Chat</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Identificar manipulación (Fase 1)</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-amber-500 transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Simulation Modal */}
      <AnimatePresence>
        {showSimulation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowSimulation(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {simType === 'video' ? (
                <div className="flex flex-col">
                  {simStep === 1 && (
                    <div className="p-8 space-y-6">
                      <div className="w-full aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner">
                         {/* Mock TikTok Interface */}
                         <div className="absolute inset-x-0 bottom-12 p-4 space-y-2 z-10">
                            <div className="flex items-center space-x-2">
                               <div className="w-6 h-6 rounded-full bg-slate-700 border border-white/20" />
                               <span className="text-[10px] font-black text-white">@GenteNueva_4L</span>
                            </div>
                            <p className="text-[10px] text-white/90 leading-tight">
                               Pa que tanto pancho si ya saben cuál camiseta es la que rifa 🐓 🧿 #belicones #mayozambada #CJNG
                            </p>
                            <div className="flex items-center space-x-2">
                               <PlayCircle className="w-3 h-3 text-white/60" />
                               <span className="text-[8px] text-white/60 font-mono">sonido original - Los Tucanes</span>
                            </div>
                         </div>
                         
                         {/* Video Content Mockup */}
                         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                               <PlayCircle className="w-10 h-10 text-white" />
                            </div>
                         </div>

                         {/* TikTok Right Bar */}
                         <div className="absolute right-3 bottom-20 flex flex-col space-y-4 items-center z-10">
                            <div className="flex flex-col items-center">
                               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                  <Shield className="w-4 h-4 text-white" />
                               </div>
                               <span className="text-[8px] text-white mt-1">8.5k</span>
                            </div>
                         </div>

                         <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 z-20 border border-white/20">
                             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                             <span className="text-[8px] font-black text-white uppercase tracking-widest">IA Escaneando</span>
                         </div>
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSimStep(2)}
                          className="bg-red-500 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-200"
                        >
                          Detectar Riesgo
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {simStep === 2 && (
                    <div className="p-8 space-y-6">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl ${
                        currentRisk >= 91 ? 'bg-slate-900 animate-bounce' : 'bg-red-100'
                      }`}>
                         <ShieldAlert className={`w-10 h-10 ${currentRisk >= 91 ? 'text-white' : 'text-red-500'}`} />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">
                          {currentRisk >= 91 ? '¡Bloqueo Inmediato!' : '¡Contenido Bloqueado!'}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium px-4 leading-relaxed">
                          {age <= 12 
                            ? "Hemos protegido tu cuenta porque este video puede ser un engaño." 
                            : "Nuestra IA ha detectado un intento de proselitismo criminal o reclutamiento forzado."}
                        </p>
                      </div>
                      
                      <div className={`${currentRisk >= 91 ? 'bg-slate-900 text-white' : 'bg-red-50'} p-6 rounded-[2rem] border ${currentRisk >= 91 ? 'border-white/10' : 'border-red-100'} space-y-3 text-left`}>
                         <div className="flex items-center justify-between">
                            <div className={`flex items-center space-x-2 ${currentRisk >= 91 ? 'text-red-400' : 'text-red-600'}`}>
                               <AlertTriangle className="w-4 h-4" />
                               <span className="text-[10px] font-black uppercase tracking-widest">Riesgo: {currentRisk}% ({getRiskLevel(currentRisk).toUpperCase()})</span>
                            </div>
                         </div>

                         {/* Contextual Education based on Age */}
                         <div className="mt-2 space-y-2">
                            <p className={`text-[10px] font-black uppercase tracking-tighter ${currentRisk >= 91 ? 'text-white/60' : 'text-red-800'}`}>
                               ¿Qué está pasando?
                            </p>
                            <p className={`text-[10px] leading-relaxed ${currentRisk >= 91 ? 'text-white/80' : 'text-red-700/80 font-bold'}`}>
                               {age <= 9 ? "Alguien está intentando decir cosas que no son ciertas para que hagas algo peligroso. ¡No sigas viendo!" :
                                age <= 12 ? "Este video usa música y frases para hacer que cosas malas parezcan buenas. Es una técnica para engañar a niños." :
                                age <= 15 ? "Identificamos patrones de manipulación psicológica (fase de atracción). El audio glorifica actividades delictivas." :
                                "Detección de propaganda de reclutamiento forzado. Se utilizan hashtags (#belicones) y música de apología al delito."}
                            </p>
                         </div>
                      </div>

                      <div className="space-y-3 pt-4">
                         <button 
                          onClick={() => setShowSimulation(false)}
                          className={`w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg ${
                            currentRisk >= 91 ? 'bg-white text-slate-900 shadow-white/10' : 'bg-slate-900 text-white shadow-slate-200'
                          }`}
                         >
                           Entendido
                         </button>
                         <button 
                          onClick={() => setSimStep(3)}
                          className={`w-full border-2 py-3.5 rounded-2xl font-black uppercase text-[11px] tracking-widest ${
                            currentRisk >= 91 ? 'bg-red-500 border-red-500 text-white' : 'bg-white text-red-500 border-red-500'
                          }`}
                         >
                           Hablar con mi tutor
                         </button>
                      </div>
                    </div>
                  )}

                  {simStep === 3 && (
                    <div className="p-8 space-y-6 text-center">
                       <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                         <UserCheck className="w-10 h-10 text-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">Tutor Notificado</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          Hemos enviado una alerta a tu tutor sobre este contenido para que puedan hablarlo juntos.
                        </p>
                        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                           <p className="text-[10px] font-bold text-emerald-800 leading-relaxed italic">
                             "Alex ha solicitado hablar sobre un contenido bloqueado por GUARDIAN."
                           </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowSimulation(false)}
                        className="w-full bg-[#4A90E2] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-blue-200"
                      >
                        Volver a la Zona Educativa
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
                   <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                         <MessageCircle className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800 uppercase">Chat Externo Simulado</p>
                        <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Protección Activa</p>
                      </div>
                   </div>

                   <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
                      <div className="flex justify-start">
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%]">
                            <p className="text-xs font-medium text-slate-800 leading-relaxed font-mono">Pa que tanto pancho si ya saben cuál camiseta es la que rifa 🐓 🧿 #belicones</p>
                         </div>
                      </div>

                      <AnimatePresence>
                        {simStep >= 1 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start space-x-3"
                          >
                             <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-amber-700 uppercase">Aviso de la IA</p>
                                <p className="text-[9px] font-bold text-amber-600/80 leading-relaxed italic">Detección de simbología bélica y frases de pertenencia a grupos (#belicon). ¡Cuidado!</p>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-end pt-4">
                         <div className="bg-blue-500 p-4 rounded-2xl rounded-tr-none text-white max-w-[80%]">
                            <p className="text-xs font-medium leading-relaxed">¿Qué significa eso? ¿Quién eres?</p>
                         </div>
                      </div>

                      <div className="flex justify-start pt-4">
                         <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%]">
                            <p className="text-xs font-medium text-slate-800 leading-relaxed">Somos la Nueva Generación 🦁. Estamos buscando gente como tú para el #operativamz. Mándame tu ciudad y numero 📱.</p>
                         </div>
                      </div>

                      <AnimatePresence>
                        {simStep >= 2 && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center"
                          >
                             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                             </div>
                             <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-2">¡Chat Bloqueado!</h4>
                             <p className="text-xs text-slate-500 font-medium mb-6">Se ha detectado **Fase 2: Captación de datos**. Esta es una señal clara de reclutamiento o grooming.</p>
                             
                             <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-6 w-full">
                                <p className="text-[9px] font-bold text-red-700 uppercase tracking-widest mb-1">Detección IA (92% de Riesgo)</p>
                                <p className="text-[9px] font-black text-red-500 uppercase">Alerta enviada a Autoridades (Simulación)</p>
                             </div>

                             <div className="w-full space-y-3">
                               <button 
                                onClick={() => setShowSimulation(false)}
                                className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                               >
                                 Finalizar Simulación
                               </button>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>

                   {simStep === 1 && (
                     <button 
                      onClick={() => setSimStep(2)}
                      className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-amber-200"
                     >
                       Ver intento de captación
                     </button>
                   )}
                </div>
              )}

              <button 
                onClick={() => setShowSimulation(false)}
                className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-300 hover:text-slate-500 transition-colors z-30"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content Modals */}
      <AnimatePresence>
        {activeContent.type !== 'none' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setActiveContent({ type: 'none' })}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                   <div className={`p-2 rounded-xl bg-slate-50`}>
                      {activeContent.type === 'video' ? <Video className="w-5 h-5 text-amber-500" /> : <HelpCircle className="w-5 h-5 text-purple-500" />}
                   </div>
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight italic">
                     {activeContent.type === 'video' ? 'Video Educativo' : 'Quiz Interactivo'}
                   </h3>
                </div>
                <button onClick={() => setActiveContent({ type: 'none' })} className="p-2 bg-slate-50 rounded-full text-slate-300">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeContent.type === 'video' ? (
                  <div className="space-y-6">
                    <div className="w-full aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden relative shadow-xl group cursor-pointer">
                       <iframe 
                         className="w-full h-full"
                         src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                         title="YouTube video player" 
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                         allowFullScreen
                       ></iframe>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-black text-slate-800 leading-tight italic">Secretos de las Redes: ¿Quién está ahí?</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Aprende cómo operan los perfiles falsos y por qué nunca debes compartir tu ubicación exacta con personas que acabas de conocer en línea.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Tip de Seguridad:</p>
                      <p className="text-[10px] font-bold text-amber-600/80 leading-relaxed italic">
                        Si alguien te pide fotos o tu dirección, ¡bloquea y avisa de inmediato!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {quizStep < quizQuestions.length ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                          <span>Pregunta {quizStep + 1} de {quizQuestions.length}</span>
                          <span className="text-purple-500">{quizScore} puntos</span>
                        </div>
                        <h4 className="text-base font-black text-slate-800 leading-tight italic">{quizQuestions[quizStep].q}</h4>
                        <div className="grid gap-3">
                          {quizQuestions[quizStep].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (i === quizQuestions[quizStep].correct) setQuizScore(s => s + 100);
                                setQuizStep(s => s + 1);
                              }}
                              className="w-full text-left p-4 rounded-2xl border-2 border-slate-50 hover:border-purple-200 hover:bg-purple-50/30 transition-all text-xs font-bold text-slate-700"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-start space-x-3">
                          <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <p className="text-[10px] text-slate-400 font-bold italic leading-relaxed">{quizQuestions[quizStep].hint}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 space-y-6">
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
                          <Gamepad2 className="w-10 h-10 text-purple-500" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-black text-slate-800 uppercase italic">¡Quiz Completado!</h3>
                          <p className="text-sm font-bold text-slate-500">Has ganado <span className="text-purple-600">{quizScore}</span> puntos de experiencia.</p>
                        </div>
                        <button 
                          onClick={() => setActiveContent({ type: 'none' })}
                          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest"
                        >
                          Genial, ¡Continuar!
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
