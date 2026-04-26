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
  Lock
} from 'lucide-react';
import { analyzeVideoUrl, AnalysisResult } from '../services/aiService';

const VIDEO_IDS = [
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
    <div className="relative w-full h-screen snap-start bg-black flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10 pointer-events-none" />
      
      {/* Video Iframe - TikTok Embed */}
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full max-w-[450px]"
        allow="autoplay; encrypted-media"
        title={`TikTok video ${videoId}`}
        style={{ border: 'none' }}
      />

      {/* AI Analysis Overlay (Safe/Warning) */}
      <AnimatePresence>
        {!isLoading && analysis && analysis.status !== 'blocked' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 left-4 z-20 flex flex-col gap-2 max-w-[80%]"
          >
            <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium backdrop-blur-md border ${
              analysis.status === 'safe' 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {analysis.status === 'safe' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              {analysis.status === 'safe' ? 'Video Seguro' : 'Video Neutral'}
            </div>
            <p className="text-white text-xs opacity-80 bg-black/40 p-2 rounded-lg backdrop-blur-sm">
              {analysis.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Block Banner */}
      <AnimatePresence>
        {analysis?.status === 'blocked' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/50">
              <ShieldAlert className="text-red-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Contenido Bloqueado</h2>
            <p className="text-stone-400 mb-8 max-w-xs">
              Este video ha sido bloqueado por el sistema de seguridad de IA para proteger tu bienestar.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 w-full max-w-xs">
              <div className="flex items-center gap-2 text-red-400 font-semibold mb-1 text-sm">
                <Lock size={14} /> Motivo de Seguridad
              </div>
              <p className="text-xs text-red-300/80">
                {analysis.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Actions (Visual only for TikTok feel) */}
      <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Heart className="text-white" size={24} /></div>
          <span className="text-white text-xs font-medium">1.2k</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><MessageCircle className="text-white" size={24} /></div>
          <span className="text-white text-xs font-medium">85</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Share2 className="text-white" size={24} /></div>
          <span className="text-white text-xs font-medium">Share</span>
        </div>
      </div>
    </div>
  );
};

export default function TikTokFeed({ onBack }: { onBack: () => void }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPos = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      setActiveVideoIndex(index);
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

  // Infinite scroll simulation: duplicate items
  const displayItems = [...VIDEO_IDS, ...VIDEO_IDS, ...VIDEO_IDS];

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
        <div className="flex gap-4 text-white font-bold">
          <span className="opacity-60">Following</span>
          <span className="border-b-2 border-white pb-1">For You</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-stone-800 border border-white/10 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="profile" />
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayItems.map((id, index) => (
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
