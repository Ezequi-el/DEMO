/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from './store/useAppStore';
import MinorDashboard from './components/MinorDashboard';
import TutorDashboard from './components/TutorDashboard';
import AuthorityDashboard from './components/AuthorityDashboard';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { Shield } from 'lucide-react';

export default function App() {
  const { role, setRole, isAuthenticated, isSigningUp } = useAppStore();

  if (!isAuthenticated) {
    if (isSigningUp) {
      return <SignUpPage />;
    }
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Role Switcher - Demo Only */}
      <div className="fixed top-4 right-4 z-[100] flex space-x-2">
         <button 
           onClick={() => setRole('minor')}
           className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${role === 'minor' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 hover:text-slate-600'}`}
         >
           Menor
         </button>
         <button 
           onClick={() => setRole('guardian')}
           className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${role === 'guardian' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400 hover:text-slate-600'}`}
         >
           Tutor
         </button>
         <button 
           onClick={() => setRole('authority')}
           className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${role === 'authority' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 hover:text-slate-600'}`}
         >
           Autoridad
         </button>
      </div>

      <div className="flex-1">
        {role === 'minor' && <MinorDashboard />}
        {role === 'guardian' && <TutorDashboard />}
        {role === 'authority' && <AuthorityDashboard />}
      </div>
    </div>
  );
}

