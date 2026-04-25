import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ScrollText } from 'lucide-react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

export default function TermsAndConditions({ onClose }: TermsAndConditionsProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center space-x-4">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-500" />
        </button>
        <div className="flex items-center space-x-2">
          <ScrollText className="w-6 h-6 text-[#4A90E2]" />
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Términos y Condiciones</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-600 leading-relaxed font-medium">
        <section className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">1. Aceptación de los Términos</h3>
          <p className="text-sm">
            Al acceder y utilizar SAFEFY, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestro servicio. SAFEFY es una herramienta diseñada para ayudar a los padres y tutores a supervisar la actividad digital de los menores a su cargo.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">2. Privacidad y Datos</h3>
          <p className="text-sm">
            Su privacidad es de suma importancia para nosotros. La recopilación y el uso de datos se rigen por nuestra Política de Privacidad. Al utilizar SAFEFY, usted reconoce que ha leído la Política de Privacidad y consiente la recopilación de datos necesaria para el funcionamiento del servicio de control parental.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">3. Responsabilidad del Usuario</h3>
          <p className="text-sm">
            Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Además, declara que tiene la autoridad legal para supervisar los dispositivos y las cuentas de los menores vinculados a su perfil de SAFEFY. El uso indebido de la plataforma para espiar a personas sin consentimiento legal está estrictamente prohibido.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">4. Limitación de Responsabilidad</h3>
          <p className="text-sm">
            SAFEFY se proporciona "tal cual" y no garantizamos que el servicio sea ininterrumpido o esté libre de errores. No seremos responsables de ningún daño indirecto, incidental o consecuente que surja del uso o la imposibilidad de usar el servicio.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">5. Modificaciones de los Términos</h3>
          <p className="text-sm">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos sobre cambios significativos a través de la aplicación o por correo electrónico. El uso continuado del servicio después de dichas modificaciones constituirá su aceptación de los nuevos términos.
          </p>
        </section>

        <div className="pt-10 pb-6 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Última actualización: 25 de Abril, 2026</p>
        </div>
      </div>

      <div className="p-8 border-t border-slate-100">
        <button 
          onClick={onClose}
          className="w-full bg-[#4A90E2] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#4A90E2]/20 hover:bg-[#357ABD] transition-all"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
