import { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Shield,
  ShieldAlert, 
  BarChart3, 
  Globe, 
  Zap, 
  Search, 
  LayoutList, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  FileJson, 
  FileType, 
  MapPin, 
  Cpu, 
  Database, 
  Eye,
  User,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Mail,
  Camera,
  LockKeyhole,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function AuthorityDashboard() {
  const mapboxToken = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_MAPBOX_TOKEN;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const handleMapContainerRef = useCallback((node: HTMLDivElement | null) => {
    mapContainerRef.current = node;
    setMapContainer(node);
  }, []);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'monitor' | 'ai'>('dashboard');
  const [currentView, setCurrentView] = useState<'main' | 'profile'>('main');
  const [exportOpen, setExportOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [mapStatus, setMapStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [profileData] = useState({
    name: 'Cmdte. Seguridad',
    email: 'seguridad.nacional@auth.gob',
    role: 'ADMINISTRADOR DE SISTEMAS'
  });

  const securityIncidents = [
    { id: 1, type: 'Grooming Attempt', risk: 'Critical', source: 'TikTok Embed', status: 'Blocked', time: '10m ago' },
    { id: 2, type: 'Narco Content', risk: 'High', source: 'Web Search', status: 'Logged', time: '2h ago' },
    { id: 3, type: 'Toxic Language', risk: 'Low', source: 'TikTok Comm.', status: 'Warned', time: '5h ago' },
  ];

  const mapPoints = [
    { id: 1, lng: -107.394, lat: 24.809, group: 'CDS (Mayiza)', state: 'Sinaloa', city: 'Culiacán', color: 'bg-red-500', markerColor: '#ef4444', isVpn: false },
    { id: 2, lng: -108.985, lat: 25.793, group: 'Sincronización Musical', state: 'Sinaloa', city: 'Los Mochis', color: 'bg-emerald-400', markerColor: '#34d399', isVpn: false },
    { id: 3, lng: -103.349, lat: 20.659, group: 'CJNG (4 Letras)', state: 'Jalisco', city: 'Guadalajara', color: 'bg-blue-500', markerColor: '#3b82f6', isVpn: false },
    { id: 4, lng: -104.903, lat: 20.544, group: 'Bélicos / Maña', state: 'Jalisco', city: 'Puerto Vallarta', color: 'bg-slate-900', markerColor: '#0f172a', isVpn: false },
    { id: 5, lng: -99.501, lat: 17.552, group: 'Bélicos / Maña', state: 'Guerrero', city: 'Chilpancingo', color: 'bg-slate-900', markerColor: '#0f172a', isVpn: false },
    { id: 6, lng: -99.89, lat: 16.853, group: 'CDS (Mayiza)', state: 'Guerrero', city: 'Acapulco', color: 'bg-red-500', markerColor: '#ef4444', isVpn: false },
    { id: 7, lng: -98.759, lat: 17.55, group: 'CJNG (4 Letras)', state: 'Guerrero', city: 'Tlapa', color: 'bg-blue-500', markerColor: '#3b82f6', isVpn: false },
    { id: 8, lng: -100.317, lat: 25.686, group: 'Sincronización Musical', state: 'Nuevo León', city: 'Monterrey', color: 'bg-emerald-400', markerColor: '#34d399', isVpn: true },
    { id: 9, lng: -100.009, lat: 25.424, group: 'CJNG (4 Letras)', state: 'Nuevo León', city: 'Santiago', color: 'bg-blue-500', markerColor: '#3b82f6', isVpn: false },
    { id: 10, lng: -99.549, lat: 27.476, group: 'Bélicos / Maña', state: 'Nuevo León', city: 'Colombia', color: 'bg-slate-900', markerColor: '#0f172a', isVpn: false },
  ];

  const [showCriminalCriteria, setShowCriminalCriteria] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== 'monitor' || currentView !== 'main') {
      return;
    }

    setMapStatus('loading');

    if (!mapContainer) {
      return;
    }

    if (!mapboxToken) {
      setMapStatus('error');
      return;
    }

    const container = mapContainer;
    let resizeObserver: ResizeObserver | null = null;
    const resizeTimeouts: number[] = [];
    const frameId = window.requestAnimationFrame(() => {
      mapboxgl.accessToken = mapboxToken;

      const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [-102.5528, 23.6345],
        zoom: 4.15,
        minZoom: 3.2,
        attributionControl: false,
      });

      mapRef.current = map;
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
      [0, 100, 300, 600].forEach((delay) => {
        resizeTimeouts.push(window.setTimeout(() => map.resize(), delay));
      });
      map.once('load', () => {
        map.resize();
        setMapStatus('ready');
      });
      map.once('error', () => setMapStatus('error'));
      resizeObserver = new ResizeObserver(() => map.resize());
      resizeObserver.observe(container);

      const visiblePoints = showCriminalCriteria
        ? mapPoints.filter((point) => point.group === showCriminalCriteria)
        : mapPoints;

      map.on('load', () => {
        map.resize();
        map.addSource('threat-points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: visiblePoints.map((point) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [point.lng, point.lat],
              },
              properties: {
                group: point.group,
                state: point.state,
                city: point.city,
                markerColor: point.markerColor,
                isVpn: point.isVpn,
                lat: point.lat,
                lng: point.lng,
              },
            })),
          },
        });

        map.addLayer({
          id: 'threat-point-halo',
          type: 'circle',
          source: 'threat-points',
          paint: {
            'circle-radius': 16,
            'circle-color': ['get', 'markerColor'],
            'circle-opacity': 0.22,
          },
        });

        map.addLayer({
          id: 'threat-points',
          type: 'circle',
          source: 'threat-points',
          paint: {
            'circle-radius': 8,
            'circle-color': ['get', 'markerColor'],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 3,
          },
        });

        map.on('mouseenter', 'threat-points', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'threat-points', () => {
          map.getCanvas().style.cursor = '';
        });

        map.on('click', 'threat-points', (event) => {
          const feature = event.features?.[0];
          const coordinates = feature?.geometry.type === 'Point' ? feature.geometry.coordinates.slice() : null;
          const properties = feature?.properties;

          if (!coordinates || !properties) {
            return;
          }

          new mapboxgl.Popup({ closeButton: false, offset: 14, className: 'authority-map-popup' })
            .setLngLat(coordinates as [number, number])
            .setHTML(`
              <div>
                <div class="flex items-center space-x-2 mb-2 pb-2 border-b border-white/10">
                  <span style="background:${properties.markerColor}" class="w-2 h-2 rounded-full"></span>
                  <span class="uppercase tracking-widest leading-none">${properties.isVpn ? 'VPN Detected' : properties.group}</span>
                </div>
                <div class="space-y-1.5 opacity-70">
                  <p class="flex justify-between gap-6"><span>ESTADO:</span><span class="font-mono">${properties.state}</span></p>
                  <p class="flex justify-between gap-6"><span>ZONA:</span><span class="font-mono">${properties.city}</span></p>
                  <p class="flex justify-between gap-6"><span>LAT:</span><span class="font-mono">${Number(properties.lat).toFixed(2)}° N</span></p>
                  <p class="flex justify-between gap-6"><span>LON:</span><span class="font-mono">${Math.abs(Number(properties.lng)).toFixed(2)}° W</span></p>
                </div>
              </div>
            `)
            .addTo(map);
        });
      });

      if (visiblePoints.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        visiblePoints.forEach((point) => bounds.extend([point.lng, point.lat]));
        map.fitBounds(bounds, {
          padding: 80,
          maxZoom: visiblePoints.length === 1 ? 7 : 5.8,
          duration: 700,
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [activeTab, currentView, mapboxToken, showCriminalCriteria, mapContainer]);

  const criminalCriterias: Record<string, { desc: string, indicators: string[], emojis: string[] }> = {
    'CDS (Mayiza)': {
      desc: 'Sincronización con facción vinculada al Cartel de Sinaloa. Uso recurrente de simbología de la "M" y la "Z".',
      indicators: ['#gentedelmz', '#mayozambada', '#operativamz', 'La Mayiza', 'Sombrerudos'],
      emojis: ['🍕', '🚜', '☘️', '🧿', '🤠']
    },
    'CJNG (4 Letras)': {
      desc: 'Célula con alta presencia en reclutamiento digital. Uso de simbología del gallo y referencias al "Mencho".',
      indicators: ['#4letras', '#ng', '#señormencho', 'Nueva Generación', '#ElSeñorDeLosGallos'],
      emojis: ['🐓', '💀', '🔫', '🚜', '👹']
    },
    'Bélicos / Maña': {
      desc: 'Contenido que glorifica la vida criminal, el uso de armas y la jerarquía delictiva (narcocultura).',
      indicators: ['#belicones', '#maña', '#trabajoparalamaña', '#ondeado', 'Belicón'],
      emojis: ['😈', '👻', '🦂', '📦', '💰']
    },
    'Sincronización Musical': {
      desc: 'Detección de audios y corridos vinculados a proselitismo criminal o reclutamiento.',
      indicators: ['#makabelico', 'JGL', 'Pura Gente del Mencho', 'El Azul', 'Cartel de Jalisco'],
      emojis: ['🎵', '🎧', '🎸', '🎤', '📣']
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Cuentas Activas', val: '12,402', color: 'text-auth-primary', sub: 'Matrícula Global' },
          { label: 'Alertas Críticas', val: '04', color: 'text-red-600', sub: '+2% vs ayer' },
          { label: 'Eficacia IA', val: '98.2%', color: 'text-emerald-600', sub: 'Modelo V1.2' },
          { label: 'Latencia Seg.', val: '140ms', color: 'text-indigo-600', sub: 'Tiempo real' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-auth-primary/20 transition-all">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">{stat.label}</span>
            <span className={`text-4xl font-black font-display ${stat.color} block mb-1`}>{stat.val}</span>
            <span className="text-xs text-slate-400 font-medium italic">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Incident Table */}
      <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-2xl font-black font-display text-auth-primary">Threat Analytics</h2>
          <div className="relative">
            <button 
              onClick={() => setExportOpen(!exportOpen)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center space-x-2"
            >
              <span>Exportar Reporte</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${exportOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {exportOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <button className="flex items-center space-x-3 w-full p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
                    <FileJson className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">Descargar CSV</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full p-4 hover:bg-slate-50 transition-colors">
                    <FileType className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-bold text-slate-700">Descargar PDF</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                <th className="px-8 py-6">Incident Hash</th>
                <th className="px-8 py-6">Type</th>
                <th className="px-8 py-6">Risk Index</th>
                <th className="px-8 py-6">Source Vector</th>
                <th className="px-8 py-6">Protocol</th>
                <th className="px-8 py-6">Delta Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {securityIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6 text-xs font-mono text-slate-400 group-hover:text-slate-900 transition-colors">0x{incident.id}...8f2c</td>
                  <td className="px-8 py-6 text-sm font-black text-slate-800">{incident.type}</td>
                  <td className="px-8 py-6">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                       incident.risk === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : 
                       incident.risk === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                     }`}>
                       {incident.risk}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase">
                      <Globe className="w-3.5 h-3.5 text-slate-300" />
                      <span>{incident.source}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       <div className={`w-2 h-2 rounded-full ${incident.status === 'Blocked' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                       <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{incident.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-400 italic">
                    {incident.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );

  const renderMonitor = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden min-h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black font-display text-auth-primary">Geo-localización de Amenazas</h2>
          <div className="bg-slate-100 p-1.5 rounded-[1.5rem] flex flex-wrap items-center gap-2">
            {[
              { label: 'CDS (Mayiza)', color: 'bg-red-500' },
              { label: 'CJNG (4 Letras)', color: 'bg-blue-500' },
              { label: 'Bélicos / Maña', color: 'bg-slate-900' },
              { label: 'Sincronización Musical', color: 'bg-emerald-400' }
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => setShowCriminalCriteria(showCriminalCriteria === item.label ? null : item.label)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border group ${
                  showCriminalCriteria === item.label ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${item.color} group-hover:animate-pulse`} />
                <span className={`text-[10px] font-black uppercase tracking-tight ${showCriminalCriteria === item.label ? 'text-white' : 'text-slate-700'}`}>{item.label}</span>
                <ChevronRight className={`w-3 h-3 ${showCriminalCriteria === item.label ? 'text-white/50' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showCriminalCriteria && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden border border-white/10"
            >
              <button 
                onClick={() => setShowCriminalCriteria(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronDown className="w-4 h-4 rotate-180" />
              </button>
              
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-black uppercase tracking-tighter italic">Análisis Forense IA: {showCriminalCriteria}</h3>
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-xl">
                    {criminalCriterias[showCriminalCriteria].desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[160px]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Lexicografía Detectada</span>
                    <div className="flex flex-wrap gap-2">
                      {criminalCriterias[showCriminalCriteria].indicators.map((word, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-md text-white border border-white/5">{word}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[120px]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Simbología (Emojis)</span>
                    <div className="flex gap-2 text-lg">
                      {criminalCriterias[showCriminalCriteria].emojis.map((emoji, idx) => (
                        <span key={idx}>{emoji}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Container */}
        <div className="w-full h-[500px] rounded-[3rem] relative overflow-hidden border border-slate-100">
          <div ref={handleMapContainerRef} className="absolute inset-0 h-full w-full" />
          {mapStatus !== 'ready' && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-black uppercase tracking-widest">
              {mapStatus === 'error' ? 'No se pudo cargar Mapbox' : 'Cargando mapa dinámico'}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-indigo-200">
             <Cpu className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black font-display text-auth-primary">Motores de Inteligencia Artificial</h2>
            <p className="text-slate-500 font-medium">Núcleo de análisis y detección de amenazas en tiempo real</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-start space-x-6">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                <Database className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="font-black text-xl text-slate-800">Gemini 1.5 Flash</h3>
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Activo</span>
                 </div>
                 <p className="text-slate-600 text-sm mb-4">Motor principal de procesamiento de lenguaje natural y visión computacional. Optimizado para baja latencia (Flash) sin sacrificar la profundidad de análisis contextual.</p>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 mb-1">CAPACIDAD</span>
                      <span className="text-sm font-bold text-slate-700 italic">Multimodal</span>
                    </div>
                    <div className="text-center p-3 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 mb-1">LATENCIA AVG</span>
                      <span className="text-sm font-bold text-slate-700 italic">140ms</span>
                    </div>
                    <div className="text-center p-3 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 mb-1">CONTEXTO</span>
                      <span className="text-sm font-bold text-slate-700 italic">1M Tokens</span>
                    </div>
                    <div className="text-center p-3 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 mb-1">SEGURIDAD</span>
                      <span className="text-sm font-bold text-slate-700 italic">Enterprise</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                 <Eye className="w-8 h-8 text-slate-300 mx-auto" />
                 <p className="text-slate-400 font-bold text-sm tracking-tight">Escaneando mejoras de firmware...</p>
                 <p className="text-[10px] text-slate-300 font-medium">Siguiente actualización programada: 05/05/2026</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className={`min-h-[calc(100vh-140px)] space-y-8 relative ${showSecurityModal ? 'overflow-hidden' : ''}`}>
      <div className={`transition-all duration-300 ${showSecurityModal ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 sm:gap-2">
          <button 
            onClick={() => setCurrentView('main')}
            className="flex items-center space-x-2 text-slate-500 hover:text-auth-primary transition-colors font-bold text-sm uppercase tracking-widest order-2 sm:order-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al panel central</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 order-1 sm:order-2 self-end sm:self-auto">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">SINCRONIZACIÓN LOCAL ACTIVA</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Header Card */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-6 group">
              <div className="w-28 h-28 bg-auth-primary rounded-[2.2rem] flex items-center justify-center font-black text-white text-4xl shadow-2xl relative overflow-hidden transition-all group-hover:scale-105">
                CS
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2.5 rounded-2xl border-4 border-white shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-auth-primary tracking-tight">{profileData.name}</h2>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mt-2 italic">{profileData.role}</p>
          </section>

          {/* Readonly Info Section */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Información Gubernamental</span>
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Registrado</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="text" 
                    readOnly
                    value={profileData.name}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 outline-none font-bold text-slate-400 cursor-not-allowed" 
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <LockKeyhole className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Institucional</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="email" 
                    readOnly
                    value={profileData.email}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 outline-none font-bold text-slate-400 cursor-not-allowed" 
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <LockKeyhole className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Action Card */}
          <section 
            onClick={() => setShowSecurityModal(true)}
            className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-indigo-500 transition-all"
          >
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                <Key className="w-7 h-7 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-800">Seguridad de Acceso</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Modificar Contraseña & Credenciales</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:translate-x-1 transition-all" />
          </section>

          {/* 2FA Configuration (Static/Readonly as per prompt) */}
          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="font-black text-lg uppercase tracking-tight">Verificación en 2 pasos</h3>
                <p className="text-xs text-white/40 font-bold">Funcionalidad de 2FA para futura implementación</p>
              </div>
              <button 
                onClick={() => setTwoFactorActive(!twoFactorActive)}
                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${twoFactorActive ? 'bg-emerald-500' : 'bg-white/20'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${twoFactorActive ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pt-4 border-t border-white/5">
              <ShieldAlert className="w-4 h-4" />
              <span>Nivel de Seguridad: Estándar (Pendiente 2FA)</span>
            </div>
          </section>
        </div>
      </div>

      {/* Security Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecurityModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.2)] scrollbar-hide border border-slate-100"
            >
              <div className="flex items-center space-x-4 mb-10">
                <div className="bg-slate-50 p-4 rounded-2xl text-slate-900 border border-slate-100 shadow-inner">
                  <Key className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Seguridad de la Cuenta - Modificar</h2>
              </div>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 outline-none focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-700" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 outline-none focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-700" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Repetir Nueva Contraseña</label>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 outline-none focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-700" 
                   />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-[2] bg-emerald-600 text-white py-5 px-6 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                >
                  Confirmar Cambio
                </button>
                <button 
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-1 bg-slate-100 text-slate-400 py-5 px-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-auth-bg flex flex-col font-sans">
      {/* Sidebar (Desktop Mockup) */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-20 lg:w-64 bg-auth-primary text-white hidden md:flex flex-col p-6 space-y-10 border-r border-white/5 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4 px-2">
             <div className="bg-emerald-600 p-2.5 rounded-2xl">
               <Shield className="w-5 h-5 text-white" />
             </div>
             <span className="text-xl font-display font-bold hidden lg:block uppercase tracking-tighter">GUARDIAN ADM</span>          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-3 w-full p-4 rounded-2xl font-bold transition-all border ${activeTab === 'dashboard' ? 'bg-white/10 border-white/10' : 'border-transparent text-white/40 hover:text-white'}`}
            >
              <LayoutList className="w-5 h-5 text-indigo-400" />
              <span className="hidden lg:block text-sm">Dashboard Central</span>
            </button>
            <button 
              onClick={() => setActiveTab('monitor')}
              className={`flex items-center space-x-3 w-full p-4 rounded-2xl font-bold transition-all border ${activeTab === 'monitor' ? 'bg-white/10 border-white/10' : 'border-transparent text-white/40 hover:text-white'}`}
            >
              <Globe className="w-5 h-5" />
              <span className="hidden lg:block text-sm">Monitor Global</span>
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex items-center space-x-3 w-full p-4 rounded-2xl font-bold transition-all border ${activeTab === 'ai' ? 'bg-white/10 border-white/10' : 'border-transparent text-white/40 hover:text-white'}`}
            >
              <Zap className="w-5 h-5" />
              <span className="hidden lg:block text-sm">Motores de IA</span>
            </button>
          </nav>

          <div className="mt-auto px-4 py-8 opacity-20 space-y-4">
             <div className="w-full h-1 bg-white/20 rounded" />
             <div className="w-full h-1 bg-white/20 rounded" />
             <div className="w-full h-1 bg-white/20 rounded" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <header className={`${currentView === 'profile' ? 'hidden' : 'flex'} flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6`}>
            <div>
              <span className="persona-label bg-slate-200 text-slate-700">AUTORIDADES</span>
              <h1 className="text-4xl text-auth-primary font-black tracking-tight">
                {activeTab === 'dashboard' ? 'Centro de Control' : activeTab === 'monitor' ? 'Geointeligencia' : 'Seguridad IA'}
              </h1>
              <p className="text-slate-500 font-medium mt-1">Supervisión sistémica de protección infantil</p>
            </div>
            
            <div className="flex items-center space-x-6 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ID de incidente..." 
                  className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-auth-primary/5 transition-all w-full lg:w-64 font-medium"
                />
              </div>

              {/* Profile Menu Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${showProfileMenu ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <User className={`w-6 h-6 ${showProfileMenu ? 'text-emerald-600' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Autoridad</p>
                        <h4 className="font-black text-slate-800 text-lg leading-tight">{profileData.name}</h4>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setCurrentView('profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-auth-primary group-hover:text-white transition-all">
                             <User className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-600 group-hover:text-slate-900">Ver perfil de autoridad</span>
                        </button>
                        
                        <button className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 rounded-2xl transition-all group">
                          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                             <LogOut className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-red-500 group-hover:text-red-600">Cerrar sesión</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="p-3 bg-auth-primary text-white rounded-2xl shadow-xl shadow-auth-primary/20">
                <BarChart3 className="w-6 h-6" />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentView === 'profile' ? 'profile' : activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'profile' ? renderProfileView() : (
                <>
                  {activeTab === 'dashboard' && renderDashboard()}
                  {activeTab === 'monitor' && renderMonitor()}
                  {activeTab === 'ai' && renderAI()}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
