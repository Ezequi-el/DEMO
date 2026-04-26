import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Heart,
  MessageCircle,
  Share2,
  Lock,
  User
} from 'lucide-react';
import { analyzeVideoUrl, AnalysisResult } from '../services/aiService';

const VIDEO_IDS = [
  '7631052154580602142',
  '7622846264975101198',
  '7613872806232739080',
  '7602075380316392712',
  '7632538705583934734',
  '7626911009302760711',
  '7632690576097430804'
];

interface TikTokVideoProps {
  videoId: string;
  isActive: boolean;
}

const TikTokVideo: React.FC<TikTokVideoProps> = ({ videoId, isActive }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      const runAnalysis = async () => {
        const result = await analyzeVideoUrl(`https://www.tiktok.com/video/${videoId}`);
        setAnalysis(result);
        setIsLoading(false);
      };
      runAnalysis();
    }
  }, [isActive, videoId]);

  return (
    <div className="relative w-full h-[100dvh] snap-start bg-black flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none" />
      
      {/* Video Iframe - TikTok Embed: Full Screen Experience */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          title={`TikTok video ${videoId}`}
          style={{ border: 'none' }}
          scrolling="no"
        />
      </div>

      {/* AI Analysis Overlay (Safe/Warning) - Adjusted for mobile position */}
      <AnimatePresence>
        {!isLoading && analysis && analysis.status !== 'blocked' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-24 left-4 right-16 z-20 flex flex-col gap-2"
          >
            <div className={`w-fit px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-black uppercase tracking-wider backdrop-blur-xl border ${
              analysis.status === 'safe' 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {analysis.status === 'safe' ? <CheckCircle2 size={14} strokeWidth={3} /> : <AlertTriangle size={14} strokeWidth={3} />}
              <span>{analysis.status === 'safe' ? 'Sincronización IA: Seguro' : 'Analizado: Neutral'}</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5 shadow-2xl">
              <p className="text-white text-[10px] font-medium leading-relaxed opacity-90 italic">
                "{analysis.message}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Block Banner - Mobile Ready */}
      <AnimatePresence>
        {analysis?.status === 'blocked' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-[2rem] flex items-center justify-center mb-6 border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
              <ShieldAlert className="text-red-500" size={40} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">Contenido Bloqueado</h2>
            <p className="text-stone-400 text-sm mb-8 max-w-xs font-medium">
              Este video ha sido restringido por el protocolo de seguridad infantil GUARDIAN.
            </p>
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-3xl mb-8 w-full max-w-xs">
              <div className="flex items-center justify-center gap-2 text-red-400 font-black mb-2 text-[10px] uppercase tracking-widest">
                <Lock size={14} /> Reporte de Seguridad IA
              </div>
              <p className="text-xs text-red-200/70 italic leading-relaxed">
                "{analysis.message}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Actions - Adjusted for mobile visibility */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col gap-5">
        <div className="flex flex-col items-center gap-1 group">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-xl border border-white/10 group-active:scale-90 transition-transform">
            <Heart className="text-white fill-white/10" size={22} />
          </div>
          <span className="text-white text-[10px] font-black">1.2k</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-xl border border-white/10">
            <MessageCircle className="text-white" size={22} />
          </div>
          <span className="text-white text-[10px] font-black">85</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-xl border border-white/10">
            <Share2 className="text-white" size={22} />
          </div>
          <span className="text-white text-[10px] font-black uppercase tracking-tighter">Share</span>
        </div>
      </div>
    </div>
  );
};

export default function TikTokFeed({ onBack }: { onBack: () => void }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  
  // Función para desordenar el array (Fisher-Yates shuffle)
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [items, setItems] = useState(() => [...shuffleArray(VIDEO_IDS), ...shuffleArray(VIDEO_IDS)]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      setActiveVideoIndex(index);

      // Si estamos cerca del final (a 2 videos de distancia), añadimos más aleatoriamente
      if (scrollTop + clientHeight >= scrollHeight - clientHeight * 2) {
        setItems(prev => [...prev, ...shuffleArray(VIDEO_IDS)]);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: windowHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        containerRef.current.scrollBy({ top: -windowHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[110] flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-4 text-white font-black text-sm uppercase tracking-widest">
          <span className="opacity-40">Siguiendo</span>
          <span className="border-b-2 border-white pb-1">Para ti</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((id, index) => (
          <TikTokVideo 
            key={`${id}-${index}`} 
            videoId={id} 
            isActive={index === activeVideoIndex} 
          />
        ))}
      </div>

      {/* Bottom Nav Bar (Visual) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 z-[110] flex items-center justify-around px-4">
        <div className="flex flex-col items-center text-white opacity-100">
          <div className="p-1 font-bold">Home</div>
        </div>
        <div className="flex flex-col items-center text-white opacity-60">
          <div className="p-1 font-bold">Friends</div>
        </div>
        <div className="relative w-12 h-8 bg-white rounded-lg flex items-center justify-center">
           <div className="absolute -left-1 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-lg"></div>
           <div className="absolute -right-1 top-0 bottom-0 w-1 bg-pink-500 rounded-r-lg"></div>
           <div className="text-black font-black text-xl">+</div>
        </div>
        <div className="flex flex-col items-center text-white opacity-60">
          <div className="p-1 font-bold">Inbox</div>
        </div>
        <div className="flex flex-col items-center text-white opacity-60">
          <div className="p-1 font-bold">Profile</div>
        </div>
      </div>
    </div>
  );
}
